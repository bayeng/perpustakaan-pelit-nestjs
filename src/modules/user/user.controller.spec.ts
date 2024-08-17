import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

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
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue(mockUsers),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should return all users with status 200 and message', async () => {
    const result = await controller.findAll();

    expect(userService.findAll()).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: 'success get all users',
      data: mockUsers,
    });
  });
});
