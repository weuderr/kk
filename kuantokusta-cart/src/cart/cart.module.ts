import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartGateway } from './cart.gateway';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartGateway, CartService],
})
export class CartModule {}
