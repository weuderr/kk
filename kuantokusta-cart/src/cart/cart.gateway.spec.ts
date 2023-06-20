import { Test } from '@nestjs/testing';
import { CartGateway } from './cart.gateway';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

describe('CartGateway', () => {
  let cartGateway: CartGateway;
  let cartService: CartService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CartGateway, CartService],
    }).compile();

    cartGateway = moduleRef.get<CartGateway>(CartGateway);
    cartService = moduleRef.get<CartService>(CartService);
  });

  describe('create', () => {
    it('should create a cart', async () => {
      const createCartDto: CreateCartDto = new CreateCartDto();

      const createdCart: any = {
        id: 'cart-1',
        shoppingCartId: 'cart-1',
        userId: 'user-1',
        totalPrice: 100,
        totalQuantity: 5,
        status: 'active',
        products: [
          {
            id: 'product-1',
            quantity: 2,
          },
        ],
      };

      jest.spyOn(cartService, 'create').mockResolvedValue(createdCart);

      const result = await cartGateway.create(createCartDto);

      expect(result).toBe(createdCart);
      expect(cartService.create).toHaveBeenCalledWith(createCartDto);
    });

    it('should throw an error if cart is not created', async () => {
      const createCartDto: CreateCartDto = {
        shoppingCartId: 'cart-1',
        userId: 'user-1',
        totalPrice: 100,
        totalQuantity: 5,
        status: 'active',
        products: [
          {
            id: 'product-1',
            name: 'Product 1',
            price: 20,
            quantity: 2,
          },
          {
            id: 'product-2',
            name: 'Product 2',
            price: 30,
            quantity: 3,
          },
        ],
      };

      jest.spyOn(cartService, 'create').mockResolvedValue(null);

      await expect(cartGateway.create(createCartDto)).rejects.toThrow(
        'Cart not created',
      );
      expect(cartService.create).toHaveBeenCalledWith(createCartDto);
    });

    it('should throw an error if an error occurs during cart creation', async () => {
      const createCartDto: CreateCartDto = {
        shoppingCartId: 'cart-1',
        userId: 'user-1',
        totalPrice: 100,
        totalQuantity: 5,
        status: 'active',
        products: [
          {
            id: 'product-1',
            name: 'Product 1',
            price: 20,
            quantity: 2,
          },
          {
            id: 'product-2',
            name: 'Product 2',
            price: 30,
            quantity: 3,
          },
        ],
      };

      const error = new Error('Something went wrong');

      jest.spyOn(cartService, 'create').mockRejectedValue(error);

      await expect(cartGateway.create(createCartDto)).rejects.toThrow(error);
      expect(cartService.create).toHaveBeenCalledWith(createCartDto);
    });
  });

  // create a test unit syncProductCart will update the cart with the new product or quantity
  describe('syncProductCart', () => {
    it('should add a product to a cart', async () => {
      const updateCartDto: UpdateCartDto = {
        shoppingCartId: 'cart-1',
        product: {
          productId: 'product-1',
          quantity: 2,
        },
      };

      const updatedCart: any = {
        id: 'cart-1',
        shoppingCartId: 'cart-1',
        userId: 'user-1',
        totalPrice: 100,
        totalQuantity: 5,
        status: 'active',
        products: [
          {
            id: 'product-1',
            quantity: 2,
          },
        ],
      };

      jest.spyOn(cartService, 'syncProductCart').mockResolvedValue(updatedCart);

      const result = await cartGateway.syncProductCart(updateCartDto);

      expect(result).toBe(updatedCart);
      expect(cartService.syncProductCart).toHaveBeenCalledWith(updateCartDto);
    });

    it('should throw an error if the product is not added to the cart', async () => {
      const updateCartDto: any = {
        shoppingCartId: 'cart-1',
        product: {
          productId: 'product-1',
          quantity: 2,
        },
      };

      jest.spyOn(cartService, 'syncProductCart').mockResolvedValue(null);

      await expect(cartGateway.syncProductCart(updateCartDto)).rejects.toThrow(
        'Product not added to cart',
      );
      expect(cartService.syncProductCart).toHaveBeenCalledWith(updateCartDto);
    });

    it('should throw an error if an error occurs during product addition', async () => {
      const updateCartDto: any = {
        shoppingCartId: 'cart-1',
        product: {
          productId: 'product-1',
          quantity: 2,
        },
      };

      const error = new Error('Something went wrong');

      jest.spyOn(cartService, 'syncProductCart').mockRejectedValue(error);

      await expect(cartGateway.syncProductCart(updateCartDto)).rejects.toThrow(
        error,
      );
      expect(cartService.syncProductCart).toHaveBeenCalledWith(updateCartDto);
    });
  });
});
