import { Component, Input, OnChanges } from '@angular/core';
import { PagingService } from '../../services/paging.service';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnChanges {
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;

  currentPageFrom: number;
  currentPageTo: number;

  constructor(private pagingService: PagingService) { }

  ngOnChanges(): void {
    this.calculateCurrentPageRange();
  }

  private calculateCurrentPageRange() {
    this.currentPageFrom = this.pagingService.getCurrentPageFrom(
      this.pageNumber, this.pageSize);
    this.currentPageTo = this.pagingService.getCurrentPageTo(
      this.pageNumber, this.pageSize, this.totalCount);
  }
}
