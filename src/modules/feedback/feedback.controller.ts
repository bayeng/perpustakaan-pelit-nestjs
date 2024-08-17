import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Response } from '../../helper/response';
import { Feedback } from './entities/feedback.entity';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    try {
      const feedback = this.feedbackService.create(createFeedbackDto);
      return Response.successResponse(HttpStatus.CREATED, 'success create feedback', feedback);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const feedbacks = this.feedbackService.findAll();
      return Response.successResponse(HttpStatus.OK, 'success get all feedbacks', feedbacks);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const feedback = this.feedbackService.findOne(+id);
      return Response.successResponse(HttpStatus.OK, 'success get feedback', feedback);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    try {
      const feedback = this.feedbackService.update(+id, updateFeedbackDto);
      return Response.successResponse(HttpStatus.OK, 'success update feedback', feedback);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const feedback = this.feedbackService.remove(+id);
      return Response.successResponse(HttpStatus.OK, 'success delete feedback', feedback);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }
}
