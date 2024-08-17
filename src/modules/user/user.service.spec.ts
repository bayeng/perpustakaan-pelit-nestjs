import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockUsers = [
    {
      id: 1,
      username: 'emasddfl@gmail.com',
      password: 'kljsdflksdjf',
      name: 'Kunamai',
      isAdmin: false,
    },
    {
      id: 2,
      username: 'emasdsdfdsdfl@gmail.com',
      password: 'kljsdflksdjf',
      name: 'Manuk',
      isAdmin: true,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue(mockUsers),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(prismaService.user.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});
