import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  get deliveryForm(): AbstractControl {
    return this.checkoutForm.get('deliveryForm');
  }

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,
  ) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod()
      .subscribe((dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
      }, error => {
        console.log(error);
      });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
