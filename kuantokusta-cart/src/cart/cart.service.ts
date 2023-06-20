import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import * as uuid from 'uuid';
import { ProductService } from './product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartEntityManager: EntityManager,
  ) {}

  findAll() {
    return this.cartEntityManager.find(Cart);
  }

  findOne(value: object) {
    return this.cartEntityManager.findOneBy(null, {
      where: value,
    });
  }

  async remove(shoppingCartId: object) {
    const cart = await this.findOne(shoppingCartId);
    // verify if obj cart exists
    if (Object.keys(cart).length !== 0) {
      console.log(cart);
      this.cartEntityManager.remove(cart);
      return true;
    }
    return false;
  }

  async syncProductCart(addCartDto: any) {
    try {
      const cart = await this.findOne(addCartDto.shoppingCartId);

      if (Object.keys(cart).length === 0) {
        throw new Error('Cart not found');
      }
      // Check if the product already exists in the cart
      const existingProduct = cart['products'].find(
        (product: any) => product.productId === addCartDto.product.productId,
      );

      console.log('addCartDto: ', addCartDto.product);
      console.log('existingProduct', existingProduct);

      let cartTotalQuantity = 0;
      let cartTotalPrice = 0.0;

      const newProduct = {
        productId: addCartDto.product.productId,
        quantity: addCartDto.product.quantity,
      };

      const getProduct = await ProductService.findOneProduct(
        newProduct['productId'],
      );

      if (!existingProduct) {
        cart['products'].forEach((product: any) => {
          cartTotalQuantity += parseInt(product.quantity);
          cartTotalPrice +=
            parseFloat(product.price) * parseInt(product.quantity);
        });
        const newProductPrice = (
          parseInt(newProduct.quantity) * getProduct['price']
        ).toFixed(2);
        cartTotalPrice = cartTotalPrice + parseFloat(newProductPrice);

        cartTotalQuantity += parseInt(newProduct.quantity);

        cart['products'].push(newProduct);
      } else {
        if (addCartDto.product.quantity > 0) {
          const listProducts = [];
          cart['products'].forEach((product: any) => {
            if (
              product.productId === addCartDto.product.productId &&
              product.quantity !== addCartDto.product.quantity
            ) {
              cartTotalQuantity += parseInt(addCartDto.product.quantity);
              cartTotalPrice +=
                parseFloat(product.price) *
                parseInt(addCartDto.product.quantity);
              product.quantity = addCartDto.product.quantity;
            } else {
              cartTotalQuantity += parseInt(product.quantity);
              cartTotalPrice +=
                parseFloat(product.price) * parseInt(product.quantity);
            }
            listProducts.push(product);
          });
          cart['products'] = listProducts;
        } else {
          cart['products'] = cart['products'].filter(
            (product: any) =>
              product.productId !== addCartDto.product.productId,
          );
          cart['products'].forEach((product: any) => {
            cartTotalQuantity += parseInt(product.quantity);
            cartTotalPrice +=
              parseFloat(product.price) * parseInt(product.quantity);
          });
        }
      }

      cart['totalPrice'] = parseFloat(cartTotalPrice.toFixed(2));
      cart['totalQuantity'] = cartTotalQuantity;

      cart['products'] = cart['products'].map((product: any) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
        };
      });
      console.log('cart final: ', cart);
      // persist the cart
      await this.cartEntityManager.save(cart);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      console.log(createCartDto);
      const cart = new Cart();
      cart.shoppingCartId = uuid.v4();
      cart.userId = createCartDto.userId;
      cart.totalQuantity = createCartDto.products.quantity;
      const getProduct = await ProductService.findOneProduct(
        createCartDto.products.productId,
      );
      cart.totalPrice = parseFloat(
        (createCartDto.products.quantity * getProduct['price']).toFixed(2),
      );
      cart.products = [
        {
          productId: createCartDto.products.productId,
          quantity: createCartDto.products.quantity,
        },
      ];

      return this.cartEntityManager.save(cart);
    } catch (error) {
      throw new Error(error);
    }
  }
}
