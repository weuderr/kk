import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductGateway } from './product.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductGateway, ProductService],
})
export class ProductModule {}
