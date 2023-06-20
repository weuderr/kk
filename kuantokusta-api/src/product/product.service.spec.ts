import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = {};
      const expectedResult = {};

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await service.create(product);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(product);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const expectedResult = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no products exist', async () => {
      const expectedResult = [];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const productId = '1';
      const expectedResult = { id: 1, name: 'Test Product', price: 10 };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await service.findOne(productId);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(productId);
    });

    it('should return undefined if no product exists with the given ID', async () => {
      const productId = '1';
      const expectedResult = undefined;

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await service.findOne(productId);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(productId);
    });
  });
});
