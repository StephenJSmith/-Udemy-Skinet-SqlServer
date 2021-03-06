import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    const url = `${this.baseUrl}orders`;

    return this.http.get<IOrder[]>(url);
  }

  getOrderForDetailed(id: number) {
    const url = `${this.baseUrl}orders/${id}`;

    return this.http.get<IOrder>(url);
  }
}
