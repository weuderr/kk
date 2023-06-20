import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      listen: jest.fn().mockResolvedValue(undefined),
    }),
  },
}));

describe('main', () => {
  it('should bootstrap the application', async () => {
    // Arrange

    // Act
    await require('./main');

    // Assert
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(NestFactory.create).toHaveBeenCalledTimes(1);
  });
});
