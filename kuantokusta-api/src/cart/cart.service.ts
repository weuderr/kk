import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class CartService {
  async create(cart): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8081');
        ws.on('open', () => {
          const message = {
            event: 'createCart',
            data: cart,
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
        const ws = new WebSocket('ws://localhost:8081');
        ws.on('open', () => {
          const message = {
            event: 'findAllCart',
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

  findOne(cartId: string): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8081');
        ws.on('open', () => {
          const message = {
            event: 'findOneCart',
            data: cartId,
          };
          console.log(message);
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

  async update(cartId: string, updateCart: any): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8081');
        ws.on('open', () => {
          const message = {
            event: 'updateCart',
            query: cartId,
            data: updateCart,
          };
          console.log(message);
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

  async remove(cartId: string): Promise<object> {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8081');
        ws.on('open', () => {
          const message = {
            event: 'removeCart',
            data: cartId,
          };
          console.log(message);
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

  sync(createCart: any) {
    try {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8081');
        ws.on('open', () => {
          const message = {
            event: 'syncProductCart',
            data: createCart,
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
