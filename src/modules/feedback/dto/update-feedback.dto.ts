import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  star: number;

  @IsString()
  name: string;
}
