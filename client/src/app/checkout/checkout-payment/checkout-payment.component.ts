import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrderToCreate, IOrder } from 'src/app/shared/models/order';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  get paymentForm(): AbstractControl {
    return this.checkoutForm.get('paymentForm');
  }

  get nameOnCard(): AbstractControl {
    return this.paymentForm.get('nameOnCard');
  }

  get deliveryForm(): AbstractControl {
    return this.checkoutForm.get('deliveryForm');
  }

  get deliveryMethod(): AbstractControl {
    return this.deliveryForm.get('deliveryMethod');
  }

  get addressForm(): AbstractControl {
    return this.checkoutForm.get('addressForm');
  }

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate)
      .subscribe((order: IOrder) => {
        this.toastr.success('Order created successfully');
        this.basketService.deleteLocalBasket(basket.id);
        const navigationExtras: NavigationExtras = {state: order};
        this.router.navigate(['checkout/success'], navigationExtras);
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
  }

  private getOrderToCreate(basket: IBasket) {
    const orderToCreate: IOrderToCreate = {
      basketId: basket.id,
      deliveryMethodId: +this.deliveryMethod.value,
      shipToAddress: this.addressForm.value,
    };

    return orderToCreate;
  }
}