import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;
  breadcrumbAlias = '@OrderDetailed';

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private ordersService: OrdersService,
  ) {
    this.breadcrumbService.set(this.breadcrumbAlias, '');
  }

  ngOnInit(): void {
    this.getDetailedOrder();
  }

  private getDetailedOrder() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ordersService.getOrderForDetailed(id)
      .subscribe((order: IOrder) => {
        this.order = order;
        const breadcrumb = `Order# ${order.id} - ${order.status}`;
        this.breadcrumbService.set(
          this.breadcrumbAlias,
          breadcrumb);
      }, error => {
        console.log(error);
      });
  }
}
