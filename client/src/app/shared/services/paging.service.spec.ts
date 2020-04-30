import { TestBed } from '@angular/core/testing';

import { PagingService } from './paging.service';

describe('PagingService', () => {
  let service: PagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentPageFrom()', () => {
    it('first page start from 1', () => {
      const expected = 1;
      const pageNr = 1;
      const pageSize = 5;

      const actual = service.getCurrentPageFrom(pageNr, pageSize);

      expect(expected).toEqual(actual);
    });

    it('second page range to start from pageSize + 1', () => {
      const expected = 6;
      const pageNr = 2;
      const pageSize = 5;

      const actual = service.getCurrentPageFrom(pageNr, pageSize);

      expect(expected).toEqual(actual);
    });

    it('third page range to equal ((pageNumber - 1) * pageSize) + 1', () => {
      const expected = 56;
      const pageNr = 12;
      const pageSize = 5;

      const actual = service.getCurrentPageFrom(pageNr, pageSize);

      expect(expected).toEqual(actual);
    });
  });

  describe('getCurrentPageTo()', () => {
    it('first page range to pageSize', () => {
      const expected = 5;
      const pageNr = 1;
      const pageSize = 5;
      const count = 12;

      const actual = service.getCurrentPageTo(pageNr, pageSize, count);

      expect(expected).toEqual(actual);
      });

    it('page range to equals pageNumber * pageSize where less than count', () => {
      const expected = 50;
      const pageNr = 10;
      const pageSize = 5;
      const count = 123;

      const actual = service.getCurrentPageTo(pageNr, pageSize, count);

      expect(expected).toEqual(actual);
    });

    it('page range to equals count where less than pageNumber * pageSize', () => {
      const expected = 48;
      const pageNr = 10;
      const pageSize = 5;
      const count = 48;

      const actual = service.getCurrentPageTo(pageNr, pageSize, count);

      expect(expected).toEqual(actual);
    });
  });

  describe('getPagesCount()', () => {
    it('zero pages where zero count', () => {
      const expected = 0;
      const pageSize = 5;
      const count = 0;

      const actual = service.getPagesCount(pageSize, count);

      expect(expected).toEqual(actual);
    });

    it('1 page where count less than page size', () => {
      const expected = 1;
      const pageSize = 5;
      const count = 1;

      const actual = service.getPagesCount(pageSize, count);

      expect(expected).toEqual(actual);
    });

    it('1 page where count equal page size', () => {
      const expected = 1;
      const pageSize = 5;
      const count = 5;

      const actual = service.getPagesCount(pageSize, count);

      expect(expected).toEqual(actual);
    });

    it('equals Math.ceil(count / pageSize)', () => {
      const expected = 11;
      const pageSize = 5;
      const count = 51;

      const actual = service.getPagesCount(pageSize, count);

      expect(expected).toEqual(actual);
    });
  });
});
