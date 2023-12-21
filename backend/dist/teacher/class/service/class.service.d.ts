import { Model } from "mongoose";
import { CreateClassDto } from "../dto/createClass.dto";
import { Types } from 'mongoose';
import { ClassDocument } from "src/utils/schema/class.schema";
import { ClassUserDocument } from "src/utils/schema/classUser.schema";
import { User, UserDocument } from "src/utils/schema/user.schema";
import { UserGradeDocument } from "src/utils/schema/userGrade.schema";
export declare class ClassService {
    private readonly classRepository;
    private readonly classUserRepository;
    private readonly userRepository;
    private readonly userGradeRepository;
    constructor(classRepository: Model<ClassDocument>, classUserRepository: Model<ClassUserDocument>, userRepository: Model<UserDocument>, userGradeRepository: Model<UserGradeDocument>);
    checkInClass(user: User, classId: Types.ObjectId): Promise<any>;
    checkIsHost(user: User, classId: Types.ObjectId): Promise<any>;
    create(host: User, dto: CreateClassDto): Promise<any>;
    deleteClass(host: User, classid: string): Promise<any>;
    getAll(user: User): Promise<any>;
    getJoinedClasses(user: User): Promise<any>;
    getClassDetail(host: User, classid: string): Promise<any>;
    getTeachers(user: User, classid: string): Promise<any>;
    getStudents(host: User, classid: string): Promise<any>;
}
