import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { StorageService } from '../storage/storage.service';
import { UserSchema } from 'src/utils/schema/user.schema';
import { RegisterOtpSchema } from 'src/utils/schema/registerOtp.schema';
import { ResetOtpSchema } from 'src/utils/schema/resetOtp.schema';
import { SearchService } from 'src/elastic/search.service';
import { SearchModule } from 'src/elastic/search.module';
import { ClassSchema } from 'src/utils/schema/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'RegisterOtp', schema: RegisterOtpSchema }]),
    MongooseModule.forFeature([{ name: 'ResetOtp', schema: ResetOtpSchema }]),
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
    MailModule,
    SearchModule,
  ],
  controllers: [UserController],
  providers: [UserService, StorageService, SearchService],
  exports: [UserService],
})
export class UserModule { }
