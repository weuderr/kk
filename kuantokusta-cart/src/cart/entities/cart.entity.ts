import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterLoad,
} from 'typeorm';
import { ProductService } from '../product.service';

@Entity()
export class Cart {
  constructor() {
    this.products = [];
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shoppingCartId: string;

  @Column()
  userId: string;

  @Column('decimal', { precision: 16, scale: 2 })
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @Column('json', { nullable: true })
  products: object[];

  @Column('enum', {
    enum: ['pending', 'completed', 'canceled', 'deleted'],
    default: 'pending',
  })
  status: string;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  updatedAt: Date;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  deletedAt: Date;

  @AfterLoad()
  async updateProductInfos() {
    if (this.products && this.products.length) {
      const productPromises = [];
      for (const product of this.products) {
        if (product && product['productId'])
          productPromises.push(
            ProductService.findOneProduct(product['productId']),
          );
      }

      this.totalPrice = 0;
      this.totalQuantity = 0;

      await Promise.all(productPromises).then((resolvedProducts) => {
        resolvedProducts.forEach((product, index) => {
          if (product) {
            const bindedProduct = this.products.find(
              (p) => p['productId'] === product['productId'],
            );
            if (bindedProduct) {
              this.products[index]['name'] = product['name'];
              this.products[index]['price'] =
                product['price'] * parseInt(bindedProduct['quantity']);
              this.products[index]['description'] = product['description'];
              this.products[index]['image'] = product['image'];
              this.products[index]['category'] = product['category'];
              this.totalPrice += this.products[index]['price'];
              this.totalQuantity += parseInt(this.products[index]['quantity']);
            }
          }
        });
      });
    }
  }
}
