import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ProductGateway {
  constructor(private readonly productService: ProductService) {}

  @SubscribeMessage('createProduct')
  create(@MessageBody() createProductDto: CreateProductDto) {
    try {
      return new Promise((resolve, reject) => {
        this.productService
          .create(createProductDto)
          .then((product) => {
            if (!product) {
              return reject('Product not created');
            }
            resolve(product);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @SubscribeMessage('findAllProducts')
  findAll() {
    try {
      return new Promise((resolve, reject) => {
        this.productService
          .findAll()
          .then((products) => {
            if (!products) {
              return reject('Products not found');
            }
            resolve(products);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @SubscribeMessage('findOneProduct')
  findOne(@MessageBody() productId: string) {
    try {
      console.log('productId', productId);
      return new Promise((resolve, reject) => {
        this.productService
          .findOne(productId)
          .then((product) => {
            if (!product) {
              return reject('Product not found');
            }
            resolve(product);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
