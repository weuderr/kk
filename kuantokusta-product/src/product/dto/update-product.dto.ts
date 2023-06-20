import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  productId: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
