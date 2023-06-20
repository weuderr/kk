import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProduct: any) {
    return this.productService.create(createProduct);
  }

  @Get('all')
  async findAll() {
    return this.productService.findAll();
  }

  @Get()
  async findOne(@Query() productId: string) {
    return this.productService.findOne(productId);
  }
}
