import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCart: any) {
    return this.cartService.create(createCart);
  }

  @Put('sync')
  async sync(@Body() createCart: any) {
    return this.cartService.sync(createCart);
  }

  @Get('all')
  async findAll() {
    return this.cartService.findAll();
  }

  @Get()
  async findOne(@Query() cartId: string) {
    return this.cartService.findOne(cartId);
  }
}
