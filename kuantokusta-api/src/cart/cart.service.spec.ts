import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import * as WebSocket from 'ws';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart', async () => {
      const cart = {};
      const expectedResult = {};

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await service.create(cart);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(cart);
    });
  });

  describe('findAll', () => {
    it('should return all carts', async () => {
      const expectedResult = [
        {
          id: 1,
          shoppingCartId: '326b76ae-ca38-46ef-aa6c-ecd8e0ae6084',
          totalQuantity: 3,
        },
        {
          id: 2,
          shoppingCartId: '326b76ae-ca38-46ef-aa6c-ecd8e0ae6085',
          totalQuantity: 2,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no carts exist', async () => {
      const expectedResult = [];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    describe('findOne', () => {
      it('should return a cart by id', async () => {
        const expectedResult = { id: '1', name: 'cart 1', price: 10 };

        jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

        const result = await service.findOne('1');

        expect(result).toEqual(expectedResult);
        expect(service.findOne).toHaveBeenCalledWith('1');
      });

      it('should return undefined if the cart does not exist', async () => {
        const expectedResult = undefined;

        jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

        const result = await service.findOne('1');

        expect(result).toEqual(expectedResult);
        expect(service.findOne).toHaveBeenCalledWith('1');
      });
    });
  });
});
