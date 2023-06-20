import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, MongoRepository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productMongoRepository: MongoRepository<Product>,
    private readonly productEntityManager: EntityManager,
  ) {}

  create(input: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.productId = uuid.v4();
    product.name = input.name;
    product.price = input.price;
    product.description = input.description;
    product.image = input.image;
    product.category = input.category;

    return this.productEntityManager.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productMongoRepository.find();
  }

  findOne(productId: string): Promise<Product> {
    let where = {};
    if (typeof productId === 'string') {
      where = {
        productId: productId,
      };
    } else {
      where = {
        productId,
      };
    }
    try {
      return this.productMongoRepository.findOneBy(where);
    } catch (error) {
      throw new Error(error);
    }
  }
}
