import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SearchService } from "src/elastic/search.service";
import { MapStudentIdDto } from "src/student/dto/mapStudentId.dto";
import { Class, ClassDocument } from "src/utils/schema/class.schema";
import { ClassUser, ClassUserDocument } from "src/utils/schema/classUser.schema";
import { Invitation, InvitationDocument } from "src/utils/schema/invitation.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { UserGrade, UserGradeDocument } from "src/utils/schema/userGrade.schema";

@Injectable()
export class ClassService {
    constructor(
        @InjectModel(Class.name) private readonly classRepository: Model<ClassDocument>,
        @InjectModel(ClassUser.name) private readonly classUserRepository: Model<ClassUserDocument>,
        @InjectModel(Invitation.name) private readonly invitationRepository: Model<InvitationDocument>,
        @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
        @InjectModel(UserGrade.name) private readonly userGradeRepository: Model<UserGradeDocument>,
        @Inject(SearchService) private readonly searchService: SearchService,
    ) { }

    async checkInClassForView(user: User, classId: Types.ObjectId): Promise<any> {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        });

        const foundResult = classUser.students.find((student) => student.user_id.equals(user._id))

        if(foundResult)
        {

            return true;
        }
        else
        {

            return false;
        }
    }

    async checkInClassForJoin(user: User, classId: Types.ObjectId): Promise<any> {
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        });

        classUser.students.forEach(student => {
            if (student.user_id.equals(user._id)) {
                throw new ForbiddenException('You are already in this class');
            }
        });
    }

    async joinClass(user: User, classToken: string, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) {
            return new NotFoundException("Class not found");
        }
        try {
            this.checkInClassForJoin(user, classId);

            const invitation = await this.invitationRepository.findOne({ class_id: classId, class_token: classToken }).exec();
            if (!invitation) {
                return new NotFoundException("Invitation not found");
            }
            const classUser = await this.classUserRepository.findOne(
                { class_id: classId },
            )
            classUser.students.push({
                user_id: user._id,
                student_id: `${classUser.students.length + 1}-2023`
            });
            classUser.save();
            const clazz = await this.classRepository.findOne({ _id: classId }).exec();
            const updatedUser = await this.userRepository.findOneAndUpdate(
                { _id: user._id },
                {
                    $push: {
                        classes: {
                            class_id: classId,
                            class_name: clazz.className,
                            class_description: clazz.description,
                        }
                    }
                }
            ).exec();
            await this.searchService.update(updatedUser);

            const grades = clazz.grade_compositions.map(comp => ({
                gradeCompo_name: comp.gradeCompo_name,
                gradeCompo_scale: comp.gradeCompo_scale,
                current_grade: null,
            }));

            const newUserGrade = {
                user_id: user._id,
                classId: classId,
                grades: grades,
            }
            await this.userGradeRepository.create(newUserGrade);

            return { message: "Join class successfully" };
        }
        catch (err) {
            return new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async joinClassByClassId(user: User, classid: string): Promise<any> {
        const classId = new Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();

        if (!clazzz) {
            return new NotFoundException("Class not found");
        }

        try {
            this.checkInClassForJoin(user, classId);
            const classUser = await this.classUserRepository.findOne(
                { class_id: classId },
            )
            classUser.students.push({
                user_id: user._id,
                student_id: `${classUser.students.length + 1}-2023`
            });
            classUser.save();

            const clazz = await this.classRepository.findOne({ _id: classId }).exec();

            const updatedUser = await this.userRepository.findOneAndUpdate(
                { _id: user._id },
                {
                    $push: {
                        classes: {
                            class_id: classId,
                            class_name: clazz.className,
                            class_description: clazz.description,
                        }
                    }
                }
            ).exec();
            await this.searchService.update(updatedUser);

            const grades = clazz.grade_compositions.map(comp => ({
                gradeCompo_name: comp.gradeCompo_name,
                gradeCompo_scale: comp.gradeCompo_scale,
                current_grade: null,
            }));

            const newUserGrade = {
                user_id: user._id,
                class_id: classId,
                grades: grades,
            }

            await this.userGradeRepository.create(newUserGrade);

            return { message: "Join class successfully" };
        }
        catch (err) {
            return new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async getJoinedClasses(user: User) {
        const clazz = await this.userRepository.findOne({ _id: user._id }).select('classes');
        return clazz;
    }

    async viewGradeStructure(user: User, classid: string) {
        const classId = new Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) return new NotFoundException("Class not found");
        const check = await this.checkInClassForView(user, classId);
        if (!check) {
            return new ForbiddenException('You are not in this class')
        }
        const clazz = await this.classRepository.findOne({ _id: classId });
        return clazz.grade_compositions;
    }

    async viewClassMembers(user: User, classid: string) {
        const classId = new Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) return new NotFoundException("Class not found");

        const check = await this.checkInClassForView(user, classId);

        if (!check) {
            return new ForbiddenException('You are not in this class')
        }
        const classUser = await this.classUserRepository.findOne({
            class_id: classId,
        })

        const studentIds = classUser.students.map(student => student.user_id);
        const students = await this.userRepository.find({ _id: { $in: studentIds } }).select("fullname email").exec();

        return students;
    }

    async viewClassTeachers(user: User, classid: string) {
        const classId = new Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) return new NotFoundException("Class not found");

        const check = await this.checkInClassForView(user, classId);
        if (!check) {
            return new ForbiddenException('You are not in this class')
        }
        const classUser = await this.classUserRepository.findOne({
            class_id: classId
        })
        const teacherIds = classUser.teachers.map(teacher => teacher.user_id);
        const teachers = await this.userRepository.find({ _id: { $in: teacherIds } }).select("fullname email").exec();

        return teachers;
    }

    async mapStudentId(user: User, dto: MapStudentIdDto) {
        const classId = new Types.ObjectId(dto.class_id);
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) return new NotFoundException("Class not found");
        const classUser = await this.classUserRepository.findOne({
            class_id: new Types.ObjectId(classId)
        })
        const student = classUser.students.map(student => student.user_id === user._id);
        if (!student) return new NotFoundException("You are not in this class");

        const updatedClassUser = await this.classUserRepository.findOneAndUpdate(
            { class_id: classId, 'students.user_id': user._id },
            { $set: { 'students.$.student_id': dto.new_studentId } },
            { new: true }
        ).exec();

        if (!updatedClassUser) {
            throw new HttpException('Student not found or student_id not updated', HttpStatus.NOT_FOUND);
        }

        return {
            message: 'Map student id successful'
        };
    }

    async leaveClass(user: User, classid: string) {
        const classId = new Types.ObjectId(classid);
        const clazzz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazzz) return new NotFoundException("Class not found");
        const classUser = await this.classUserRepository.findOne({
            class_id: new Types.ObjectId(classId)
        })
        const student = classUser.students.map(student => student.user_id === user._id);
        if (!student) return new NotFoundException("You are not in this class");
    }

    async getClassDetail(user: User, classId: string)
    {
        const class_id = new Types.ObjectId(classId)
        const dbUserClassesProp = (await this.userRepository.findOne({_id: user._id}).exec()).classes;

        const isJoinedClass = dbUserClassesProp.findIndex((value: any) => value.class_id == classId)
        if(isJoinedClass == -1)
        {
            return new HttpException("Class not found", HttpStatus.NOT_FOUND)
        }
        const dbClass = await this.classRepository.findOne({_id: class_id}).exec();
        
        if(!dbClass)
        {
            return new HttpException("Class not found", HttpStatus.NOT_FOUND)
        }
        return dbClass;
    }

    async getStudentId(user: User, class_id: string)
    {
        const dbClassId = new Types.ObjectId(class_id);

        const dbUserClassesProp = (await this.userRepository.findOne({_id: user._id}).exec()).classes;

        const isJoinedClass = dbUserClassesProp.findIndex((value: any) => value.class_id == class_id)
        if(isJoinedClass == -1)
        {

            return new HttpException("Class not found", HttpStatus.NOT_FOUND)
        }

        const dbUserClass = await this.classUserRepository.findOne({class_id: dbClassId})

        const target = dbUserClass.students.find((student) => student.user_id.equals(user._id));
        if(target === undefined)
        {

            return new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        else
        {

            return {student_id: target.student_id};
        }
    }
}