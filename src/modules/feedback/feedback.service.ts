import { HttpException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const { name, comment, star, bookId } = createFeedbackDto;

    const feedback: Feedback = await this.prisma.feedback.create({
      data: {
        name,
        comment,
        star,
        bookId,
      },
    });

    if (!feedback) throw new HttpException('Failed to create feedback', 500);
    return feedback;
  }

  async findAll() {
    const feedbacks: Feedback[] = await this.prisma.feedback.findMany();

    if (!feedbacks) throw new HttpException('empty feedbacks', 404);
    return feedbacks;
  }

  async findOne(id: number) {
    const feedback: Feedback = await this.prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!feedback) throw new HttpException('feedback not found', 404);
    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const { name, comment, star, bookId } = updateFeedbackDto;

    const parseId = Number(id);
    if (!parseId) throw new HttpException('invalid id', 400);

    const updateFeedback: Feedback = await this.prisma.feedback.update({
      where: {
        id: parseId,
      },
      data: {
        name,
        comment,
        star,
        book: {
          connect: {
            id: bookId,
          },
        },
      },
    });

    if (!updateFeedback) throw new HttpException('Failed to update feedback', 500);
    return updateFeedback;
  }

  async remove(id: number) {
    const parseId = Number(id);
    if (!parseId) throw new HttpException('invalid id', 400);

    const feedback: Feedback = await this.prisma.feedback.delete({
      where: {
        id: parseId,
      },
    });
    if (!feedback) throw new HttpException('Failed to delete feedback', 500);
    return `success delete feedback with id ${id}`;
  }
}
