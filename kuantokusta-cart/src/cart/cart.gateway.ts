import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway()
export class CartGateway {
  constructor(private readonly cartService: CartService) {}

  @SubscribeMessage('createCart')
  create(@MessageBody() createCartDto: CreateCartDto) {
    try {
      return new Promise((resolve, reject) => {
        this.cartService
          .create(createCartDto)
          .then((cart) => {
            if (!cart) {
              return reject('Cart not created');
            }
            resolve(cart);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @SubscribeMessage('syncProductCart')
  syncProductCart(@MessageBody() addCartDto: UpdateCartDto) {
    try {
      return new Promise((resolve, reject) => {
        this.cartService
          .syncProductCart(addCartDto)
          .then((cart) => {
            resolve(cart);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @SubscribeMessage('findAllCart')
  findAll() {
    return this.cartService.findAll();
  }

  @SubscribeMessage('findOneCart')
  findOne(@MessageBody() shoppingCartId: object) {
    return this.cartService.findOne(shoppingCartId);
  }
}
