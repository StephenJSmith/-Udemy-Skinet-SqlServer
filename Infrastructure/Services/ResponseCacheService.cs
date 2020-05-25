using System;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Infrastructure.Services
{
  public class ResponseCacheService : IResponseCacheService
  {
    private readonly IDatabase _database;

    public ResponseCacheService(IConnectionMultiplexer redis)
    {
      _database = redis.GetDatabase();
    }

    public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
    {
      if (response == null) { return; }

      var contractResolver = new DefaultContractResolver
      {
        NamingStrategy = new CamelCaseNamingStrategy
        {
          OverrideSpecifiedNames = false
        }
      };

      var serialisedResponse = JsonConvert.SerializeObject(response, new JsonSerializerSettings
      {
        ContractResolver = contractResolver,
        Formatting = Formatting.Indented
      });

      await _database.StringSetAsync(cacheKey, serialisedResponse, timeToLive);
    }

    public async Task<string> GetCachedResponseAsync(string cacheKey)
    {
      var cachedResponse = await _database.StringGetAsync(cacheKey);
      if (cachedResponse.IsNullOrEmpty)
      {
          return null;
      }

      return cachedResponse;
    }
  }
}