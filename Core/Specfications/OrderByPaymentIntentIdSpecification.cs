using Core.Entities.OrderAggregate;

namespace Core.Specfications
{
  public class OrderByPaymentIntentIdSpecification
      : BaseSpecification<Order>
  {
    public OrderByPaymentIntentIdSpecification(string paymentIntentId)
        : base(o => o.PaymentIntentId == paymentIntentId)
    {
    }
  }
}