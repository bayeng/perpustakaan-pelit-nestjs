import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { LoanModule } from './modules/loan/loan.module';

@Module({
  imports: [UserModule, PrismaModule, BookModule, AuthModule, FeedbackModule, LoanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
