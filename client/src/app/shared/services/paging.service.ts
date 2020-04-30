import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor() { }

  getCurrentPageFrom(
    pageNumber: number,
    pageSize: number,
  ): number {
    return ((pageNumber - 1) * pageSize) + 1;
  }

  getCurrentPageTo(
    pageNumber: number,
    pageSize: number,
    count: number
  ): number {
    return Math.min(count, (pageNumber * pageSize));
  }

  getPagesCount(pageSize: number, count: number): number {
    return Math.ceil(count / pageSize);
  }
}
