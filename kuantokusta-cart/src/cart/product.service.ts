import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class ProductService {
  static findOneProduct(product: object): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.on('open', () => {
          const message = {
            event: 'findOneProduct',
            data: product,
          };
          ws.send(JSON.stringify(message));
        });
        ws.on('message', (data) => {
          ws.close();
          resolve(JSON.parse(data));
        });
        ws.on('error', (error) => {
          ws.close();
          reject(error);
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
