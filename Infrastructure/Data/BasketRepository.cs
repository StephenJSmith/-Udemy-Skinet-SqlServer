using System;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Infrastructure.Data
{
  public class BasketRepository : IBasketRepository
  {
    private readonly IDatabase _database;

    public BasketRepository(IConnectionMultiplexer redis)
    {
      _database = redis.GetDatabase();
    }

    public async Task<bool> DeleteBasketAsync(string basketId)
    {
      var isDeleted = await _database.KeyDeleteAsync(basketId);

      return isDeleted;
    }

    public async Task<CustomerBasket> GetBasketAsync(string basketId)
    {
      var data = await _database.StringGetAsync(basketId);
      var basket = data.IsNullOrEmpty
        ? null
        : JsonConvert.DeserializeObject<CustomerBasket>(data);

      return basket;
    }

    public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
    {
      var serialised = JsonConvert.SerializeObject(basket);
      var expiry = TimeSpan.FromDays(30);
      var created = await _database.StringSetAsync(basket.Id, serialised, expiry);

      if (!created) { return null; }

      var updatedBasket = await GetBasketAsync(basket.Id);

      return updatedBasket;
    }
  }
}