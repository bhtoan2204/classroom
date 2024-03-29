import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PostCommentDto } from "src/student/dto/postComment.dto";
import { RequestReviewDto } from "src/student/dto/requestReview.dto";
import { Class, ClassDocument } from "src/utils/schema/class.schema";
import { GradeReview, GradeReviewDocument } from "src/utils/schema/gradeReview.schema";
import { User } from "src/utils/schema/user.schema";
import { UserGrade, UserGradeDocument } from "src/utils/schema/userGrade.schema";

@Injectable()
export class GradeViewerService {
    constructor(
        @InjectModel(UserGrade.name) private readonly userGradeRepository: Model<UserGradeDocument>,
        @InjectModel(Class.name) private readonly classRepository: Model<ClassDocument>,
        @InjectModel(GradeReview.name) private readonly gradeReviewRepository: Model<GradeReviewDocument>,
    ) { }

    async checkInClass(user: User, classId: Types.ObjectId): Promise<any> {
        const userGrade = await this.userGradeRepository.findOne({
            user_id: user._id,
            class_id: classId,
        })
        if (!userGrade) {
            return new HttpException('You are not in this class', HttpStatus.FORBIDDEN);
        }
    }

    async viewGradeCompostitions(user: User, classid: string) {
        const classId = new Types.ObjectId(classid);
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            return new HttpException("Class not found", HttpStatus.NOT_FOUND);
        }
        this.checkInClass(user, classId);

        const userGrade = await this.userGradeRepository.findOne({
            user_id: user._id,
            class_id: classId,
        });
        const combinedData = clazz.grade_compositions.map((classGrade) => {
            const userGradeDetail = userGrade.grades.find((grade) => grade.gradeCompo_name === classGrade.gradeCompo_name);
            return {
                gradeCompo_name: classGrade.gradeCompo_name,
                gradeCompo_scale: classGrade.gradeCompo_scale,
                current_grade: userGradeDetail ? userGradeDetail.current_grade : null,
                is_finalized: classGrade.is_finalized,
            };
        })
        let rows = []
        let total_scale = 0
        let user_total = 0
        combinedData.forEach((item) => {
            if (item.is_finalized) {
                rows.push(item);
                user_total += (item.current_grade) ? item.current_grade : 0
            }
            else {
                rows.push({
                    gradeCompo_name: item.gradeCompo_name,
                    gradeCompo_scale: item.gradeCompo_scale,
                    current_grade: null,
                    is_finalized: false
                })
            }
            total_scale += item.gradeCompo_scale
        })

        return {
            rows, total_scale, user_total
        };
    }

    async requestReview(user: User, dto: RequestReviewDto) {
        const classId = new Types.ObjectId(dto.class_id);
        const clazz = await this.classRepository.findOne({ _id: classId }).exec();
        if (!clazz) {
            return new HttpException("Class not found", HttpStatus.NOT_FOUND);
        }
        this.checkInClass(user, classId);
        const userGrade = await this.userGradeRepository.findOne({
            user_id: user._id,
            class_id: classId,
        });

        const grade = userGrade.grades.find((grade) => grade.gradeCompo_name === dto.gradeCompo_name);
        if (!grade) {
            return new HttpException("Grade composition not found", HttpStatus.NOT_FOUND);
        }

        const is_finalized = clazz.grade_compositions.find((grade) => grade.gradeCompo_name === dto.gradeCompo_name).is_finalized;
        if (!is_finalized) {
            return new HttpException("Grade composition is not finalized", HttpStatus.FORBIDDEN);
        }
        const gradeReview = await this.gradeReviewRepository.findOne({
            user_id: user._id,
            class_id: classId,
            gradeCompo_name: dto.gradeCompo_name,
        });
        if (gradeReview) {
            return new HttpException("You have already requested a review", HttpStatus.FORBIDDEN);
        }
        const newGradeReview = new this.gradeReviewRepository({
            class_id: classId,
            student_id: user._id,
            gradeCompo_name: dto.gradeCompo_name,
            expected_grade: dto.expected_grade,
            student_explain: dto.explaination,
            current_grade: grade.current_grade,
            comments: [],
            finalDecision: {
                status: 'PENDING',
                updatedGrade: 0
            }
        });

        return await newGradeReview.save();
    }

    async viewGradeReview(user: User, reviewId: string) {
        const dbReview = await this.gradeReviewRepository.findOne({ _id: reviewId });
        if (!dbReview) {
            return new HttpException("Review not found", HttpStatus.NOT_FOUND);
        }
        if (dbReview.student_id.toString() !== user._id.toString()) {
            return new HttpException("You are not allowed to view this review", HttpStatus.FORBIDDEN);
        }

        const classDetail = await this.classRepository.findOne({ _id: dbReview.class_id })

        const review =
        {
            _id: dbReview._id,
            class_id: dbReview.class_id,
            class_name: classDetail.className,
            description: classDetail.description,
            is_active: classDetail.is_active,
            host: classDetail.host,
            gradeCompo_name: dbReview.gradeCompo_name,
            current_grade: dbReview.current_grade,
            expected_grade: dbReview.expected_grade,
            student_explain: dbReview.student_explain,
            comments: dbReview.comments,
            finalDecision: dbReview.finalDecision
        }

        return review;
    }

    async postAComment(user: User, dto: PostCommentDto) {
        const review = await this.gradeReviewRepository.findOne({ _id: new Types.ObjectId(dto.gradeReview_id) });
        if (!review) {
            return new HttpException("Review not found", HttpStatus.NOT_FOUND);
        }
        if (review.student_id.toString() !== user._id.toString()) {
            return new HttpException("You are not allowed to post a comment", HttpStatus.FORBIDDEN);
        }
        review.comments.push({
            commenter: user.fullname.toString(),
            text: dto.content
        });
        return await review.save();
    }

    async getGradeReviews(user: User) {
        const dbGradeReviews = await this.gradeReviewRepository.find({ student_id: user._id })

        if (dbGradeReviews.length < 1) {
            return [];
        }

        const classDetails = new Map()

        dbGradeReviews.forEach((review: GradeReview) => {
            classDetails.set(review.class_id, {});
        })

        const classIds = Array.from(classDetails.keys());

        const dbClasses = await this.classRepository.find({ _id: classIds }).select("_id className description host is_active").exec();

        classDetails.clear();

        //clear Map<ObjectId, Object> to use Map<String_ClassID, Object>

        dbClasses.forEach((record: any) => {
            const id = record._id.toString();
            classDetails.set(id, record)
        })

        const results = dbGradeReviews.map((review: GradeReview) => {
            const str_key = review.class_id.toString();
            const classDetail = classDetails.get(str_key)

            const result =
            {
                _id: review._id,
                class_id: review.class_id,
                class_name: classDetail.className,
                description: classDetail.description,
                is_active: classDetail.is_active,
                host: classDetail.host,
                gradeCompo_name: review.gradeCompo_name,
                current_grade: review.current_grade,
                expected_grade: review.expected_grade,
                student_explain: review.student_explain,
                finalDecision: review.finalDecision
            }

            return result;
        })


        return results;
    }

    async getComments(user: User, review_id: string) {
        const dbReview_id = new Types.ObjectId(review_id);
        const dbGradeReview = await this.gradeReviewRepository.findOne({ _id: dbReview_id })
        if (!dbGradeReview) {
            return new HttpException("Grade review not found", HttpStatus.NOT_FOUND);
        }

        if (user._id.toString() != dbGradeReview.student_id.toString()) {
            return new HttpException("You are not allowed to view this document", HttpStatus.FORBIDDEN)
        }

        return dbGradeReview.comments;
    }
}