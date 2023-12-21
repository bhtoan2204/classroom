import { ClassService } from "../service/class.service";
import { CreateClassDto } from "../dto/createClass.dto";
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    create(host: any, dto: CreateClassDto): Promise<any>;
    getAll(host: any): Promise<any>;
    getJoinedClasses(host: any): Promise<any>;
    getClassDetail(host: any, params: any): Promise<any>;
    deleteClass(host: any, params: any): Promise<any>;
    getTeacher(user: any, params: any): Promise<any>;
    getStudents(user: any, params: any): Promise<any>;
}
