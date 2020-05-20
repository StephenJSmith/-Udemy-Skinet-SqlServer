import {v4 as uuidv4 } from 'uuid';
import { IBasketItem } from './basketItem';

export interface IBasket {
  id: string;
  items: IBasketItem[];
  deliveryMethodId?: number;
}

export class Basket implements IBasket {
  id = uuidv4();
  items: IBasketItem[] = [];
}

export interface IBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
