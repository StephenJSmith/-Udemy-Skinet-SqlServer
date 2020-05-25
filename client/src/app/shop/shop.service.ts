import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean) {
    const url = `${this.baseUrl}products`;

    if (!useCache) {
      this.productCache = new Map();
    }

    if (useCache && this.productCache.size) {
      const cacheKey = this.getCacheKey();
      if (this.productCache.has(cacheKey)) {
        this.pagination = this.productCache.get(cacheKey);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();
    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(url, { observe: 'response', params })
      .pipe(
        map((response) => {
          const cacheKey = this.getCacheKey();
          this.productCache.set(cacheKey, response.body);
          this.pagination = response.body;

          return this.pagination;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  private getCacheKey() {
    return Object.values(this.shopParams).join('-');
  }

  private getProductFromCache(id: number) {
    const cacheKeys = Array.from(this.productCache.keys());
    for (const key of cacheKeys) {
      const pagedData = (this.productCache.get(key) as IPagination).data;
      const product = pagedData.find(p => p.id === id);
      if (product) {
        return product;
      }
    }

    return null;
  }

  getProduct(id: number) {
    const product = this.getProductFromCache(id);
    if (product) {
      return of(product);
    }

    const url = `${this.baseUrl}products/${id}`;

    return this.http.get<IProduct>(url);
  }

  getBrands() {
    if (this.brands.length) {
      return of(this.brands);
    }

    const url = `${this.baseUrl}products/brands`;

    return this.http.get<IBrand[]>(url).pipe(
      map((response) => {
        this.brands = response;

        return response;
      })
    );
  }

  getTypes() {
    if (this.types.length) {
      return of(this.types);
    }

    const url = `${this.baseUrl}products/types`;

    return this.http.get<IType[]>(url).pipe(
      map((response) => {
        this.types = response;

        return response;
      })
    );
  }
}
