import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = {};
      const expectedResult = {};

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(product);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(product);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const expectedResult = {};

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific product', async () => {
      const productId = 'product-id';
      const expectedResult = {};

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(productId);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(productId);
    });
  });
});
