import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class ProductService {
  create(product): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.on('open', () => {
          const message = {
            event: 'createProduct',
            data: product,
          };
          ws.send(JSON.stringify(message));
        });
        ws.on('message', (data) => {
          resolve(JSON.parse(data));
          ws.close();
        });
        ws.on('error', (error) => {
          reject(error);
          ws.close();
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.on('open', () => {
          const message = {
            event: 'findAllProducts',
          };
          ws.send(JSON.stringify(message));
        });
        ws.on('message', (data) => {
          resolve(JSON.parse(data));
          ws.close();
        });
        ws.on('error', (error) => {
          reject(error);
          ws.close();
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(productId: string): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.on('open', () => {
          const message = {
            event: 'findOneProduct',
            data: productId,
          };
          ws.send(JSON.stringify(message));
        });
        ws.on('message', (data) => {
          resolve(JSON.parse(data));
          ws.close();
        });
        ws.on('error', (error) => {
          reject(error);
          ws.close();
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
