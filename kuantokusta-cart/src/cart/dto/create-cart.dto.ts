export class CreateCartDto {
  shoppingCartId: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  products: any;
  status: string;
}
