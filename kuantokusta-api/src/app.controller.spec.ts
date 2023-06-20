import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(`<html>
    <head>
      <title>Kuantokusta</title>
    </head>
    <body>
      <h1>Hello World! This is the Kuantokusta API.</h1>
    </body>
    <style>
      body {
        background-color: #f5f5f5;
        color: #333;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
      }
      h1 {
        font-size: 48px;
        font-weight: 300;
        line-height: 1.1;
        margin-bottom: 0;
      }
    </style>
  </html>`);
    });
  });
});
