import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadcrumb$: Observable<any[]>;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$ = this.breadcrumbService.breadcrumbs$;
  }

  getBreadcrumbsLabel(breadcrumbs: any[]): string {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return '';
    }

    const label = breadcrumbs[breadcrumbs.length - 1].label;

    return label;
  }

  canShowBreadcrumbs(breadcrumbs: any[]): boolean {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return false;
    }

    const canShow = this.getBreadcrumbsLabel(breadcrumbs) !== 'Home';

    return canShow;
  }
}
