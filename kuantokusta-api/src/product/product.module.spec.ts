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
    it('should create a product', async () => {
      // Arrange
      const createProduct = { name: 'Test Product', price: 10 };
      const expectedResult = { id: 1, ...createProduct };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createProduct);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      // Arrange
      const expectedResult = [{ id: 1, name: 'Product 1', price: 10 }, { id: 2, name: 'Product 2', price: 20 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      // Arrange
      const productId = '1';
      const expectedResult = { id: 1, name: 'Test Product', price: 10 };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findOne(productId);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(productId);
    });
  });
});
