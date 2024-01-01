import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateClassDto } from "../dto/createClass.dto";
import { Class, ClassDocument } from "src/utils/schema/class.schema";
import { ClassUser, ClassUserDocument } from "src/utils/schema/classUser.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { UserGrade, UserGradeDocument } from "src/utils/schema/userGrade.schema";
import { PaginateDto } from "../dto/paginate.dto";

@Injectable()
export class ClassService {
    constructor(
        @InjectModel(Class.name) private readonly classRepository: Model<ClassDocument>,
        @InjectModel(ClassUser.name) private readonly classUserRepository: Model<ClassUserDocument>,
        @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
        @InjectModel(UserGrade.name) private readonly userGradeRepository: Model<UserGradeDocument>,
    ) { }

    async checkInClass(user: User, classId: Types.ObjectId): Promise<any> {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        }).exec();

        const check = classUser.teachers.findIndex(teacher => teacher.user_id == user._id);

        if (check === -1) {
            return new HttpException('You are not in this class', HttpStatus.FORBIDDEN);
        }
    }

    async checkIsHost(user: User, classId: Types.ObjectId): Promise<any> {
        const clazz = await this.classRepository.findOne({ _id: classId, host: user._id }).exec();
        if (!clazz) {
            return new HttpException('You are not the host of this class', HttpStatus.FORBIDDEN);
        }
    }

    async create(host: User, dto: CreateClassDto): Promise<any> {
        const newClass = new this.classRepository({
            className: dto.className,
            description: dto.description,
            host: host._id,
        });

        const newClassUser = await this.classUserRepository.create({
            class_id: newClass._id,
            teachers: [{ user_id: host._id }]
        });

        const user = await this.userRepository.findOne({ _id: host._id });
        user.classes.push({
            class_id: newClass._id,
            class_name: dto.className,
            class_description: dto.description
        });

        await newClass.save();
        await newClassUser.save();
        await user.save();

        return {
            message: "Create class successfully",
            class: {
                class_id: newClass._id,
                class_name: dto.className,
                class_description: dto.description
            }
        };
    }

    async deleteClass(host: User, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);
        this.checkIsHost(host, classId);

        const clazz = await this.classRepository.findOne({ _id: classId, host: host._id }).exec();
        if (!clazz) return new NotFoundException("Class not found");

        await this.classRepository.findOneAndDelete({ _id: classId, host: host._id }).exec();
        await this.classUserRepository.findOneAndDelete({ class_id: classId }).exec();
        await this.userGradeRepository.deleteMany({ class_id: classId }).exec();
        const users = await this.userRepository.find({ classes: { $elemMatch: { class_id: classId } } }).exec();
        users.forEach(async user => {
            const index = user.classes.findIndex(clazz => clazz.class_id == classId);
            user.classes.splice(index, 1);
            await user.save();
        });

        return new HttpException("Delete class successfully", HttpStatus.OK);
    }

    async getMyClasses(user: User, dto: PaginateDto): Promise<any> {
        const { page, itemPerPage } = dto;
        const skip = (page - 1) * itemPerPage;

        const [classes, totalCount] = await Promise.all([
            this.classRepository
                .find({ host: user._id })
                .select('_id className description')
                .skip(skip)
                .limit(itemPerPage)
                .exec(),
            this.classRepository.countDocuments({ host: user._id }),
        ]);

        if (!classes || classes.length === 0) {
            return new NotFoundException('No classes found for the given host');
        }

        return { classes, totalCount };
    }

    async getJoinedClasses(user: User, dto: PaginateDto): Promise<any> {
        const { page, itemPerPage } = dto;
        const skip = (page - 1) * itemPerPage;

        const classUsers = await this.classUserRepository.find({ teachers: { $elemMatch: { user_id: user._id } } }).exec();
        const classIds = classUsers.map(classUser => classUser.class_id);

        const [classes, totalCount] = await Promise.all([
            this.classRepository
                .find({ _id: { $in: classIds } })
                .select('_id className description')
                .skip(skip)
                .limit(itemPerPage)
                .exec(),
            this.classRepository.countDocuments({ _id: { $in: classIds } }),
        ]);

        if (!classes || classes.length === 0) {
            return new NotFoundException('No classes found for the given host');
        }

        return { classes, totalCount };
    }

    async getClassDetail(host: User, classid: string) {
        const classId = new Types.ObjectId(classid);
        this.checkInClass(host, classId);
        const classDetail = await this.classRepository
            .findOne({ _id: new Types.ObjectId(classId) })
            .populate({
                path: 'host',
                model: 'User',
                select: 'fullname avatar',
            })
            .exec();
        return classDetail;
    }

    async asd(host: User, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);
        this.checkInClass(host, classId);

        const clazz = await this.classRepository.findOne({ _id: classId, host: host._id })
            .select('_id className description is_active host')
            .exec();

        if (!clazz) return new ConflictException("You already in this class");
        const hostName = await this.userRepository.findOne({ _id: clazz.host }).select('name').exec();
        return { ...clazz, hostName };
    }

    async getTeachers(user: User, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);
        this.checkInClass(user, classId);
        try {
            const classUsers = await this.classUserRepository.find({ class_id: new Types.ObjectId(classId) });
            const userIds = classUsers.flatMap(classUser => classUser.teachers.map(teachers => teachers.user_id));
            const teachers = await this.userRepository.find(
                { _id: { $in: userIds } },
                {
                    password: 0,
                    role: 0,
                    birthday: 0,
                    refreshToken: 0,
                    classes: 0,
                }
            ).exec();
            return teachers;
        } catch (error) {
            return { message: `Error: ${error.message}` };
        }
    }

    async getStudents(user: User, classid: string, page: number, itemPerPage: number = 10): Promise<any> {
        const classId = new Types.ObjectId(classid);
        this.checkInClass(user, classId);
        try {
            const skipCount = (page - 1) * itemPerPage;

            const classUsers = await this.classUserRepository
                .aggregate([
                    { $match: { class_id: classId } },
                    { $unwind: "$students" },
                    {
                        $lookup: {
                            from: "users",
                            localField: "students.user_id",
                            foreignField: "_id",
                            as: "user",
                        },
                    },
                    { $unwind: "$user" },
                    {
                        $project: {
                            user: {
                                _id: 1,
                                email: 1,
                                fullname: 1,
                                avatar: 1,
                                login_type: 1,
                                is_ban: 1,
                            },
                            student_id: "$students.student_id",
                        },
                    },
                    { $skip: skipCount },
                    { $limit: itemPerPage },
                ]);

            return classUsers;
        } catch (error) {
            return { message: `Error: ${error.message}` };
        }
    }

    async manualMapStudentId(user: User, classId: string, userId: string, studentId: string) {
        const classObjectId = new Types.ObjectId(classId);
        const userObjectId = new Types.ObjectId(userId);
        this.checkInClass(user, classObjectId);
        try {
            await this.classUserRepository.updateOne(
                {
                    class_id: classObjectId,
                    'students.user_id': userObjectId,
                },
                {
                    $set: {
                        'students.$.student_id': studentId,
                    },
                }
            );
        } catch (error) {
            throw new Error('ClassUser document not found: ' + error.message);
        }
    }
}