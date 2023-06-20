import { Test, TestingModule } from '@nestjs/testing';
import { CartModule } from './cart.module';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

describe('CartModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CartModule],
      controllers: [CartController],
      providers: [CartService],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should resolve the CartController', () => {
    const controller = module.get<CartController>(CartController);
    expect(controller).toBeDefined();
  });

  it('should resolve the CartService', () => {
    const service = module.get<CartService>(CartService);
    expect(service).toBeDefined();
  });
});
