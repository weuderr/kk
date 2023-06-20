import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart', async () => {
      const createCart = {};
      const expectedResult = {};

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createCart);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCart);
    });
  });

  describe('findAll', () => {
    it('should return all carts', async () => {
      const expectedResult = {};

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific cart', async () => {
      const cartId = 'cart-id';
      const expectedResult = {};

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(cartId);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(cartId);
    });
  });
});
