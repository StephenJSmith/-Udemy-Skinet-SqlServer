using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Infrastructure.Data
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
      try
      {
        if (!context.ProductBrands.Any())
        {
          var brandsData =
              File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
          var brands = JsonConvert.DeserializeObject<List<ProductBrand>>(brandsData);

          foreach (var item in brands)
          {
            context.ProductBrands.Add(item);
          }

          await context.SaveChangesAsync();
        }

        if (!context.ProductTypes.Any())
        {
          var typesData =
              File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
          var types = JsonConvert.DeserializeObject<List<ProductType>>(typesData);

          foreach (var item in types)
          {
            context.ProductTypes.Add(item);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Products.Any())
        {
          var productsData =
              File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
          var products = JsonConvert.DeserializeObject<List<Product>>(productsData);

          foreach (var item in products)
          {
            if (item.Name.Length > 100)
            {
              item.Name = item.Name.Substring(0, 100);
            }

            if (item.Description.Length > 180)
            {
              item.Description = item.Description.Substring(0, 180);
            }
            context.Products.Add(item);
          }

          await context.SaveChangesAsync();
        }

        if (!context.DeliveryMethods.Any())
        {
          // TODO: Unable to get SET IDENTITY_INSERT ON/OFF to work
          // Removed Id identity column from .json in alternative file
          var dmData =
              File.ReadAllText("../Infrastructure/Data/SeedData/deliveryWithoutId.json");
          var methods = JsonConvert.DeserializeObject<List<DeliveryMethod>>(dmData);

          foreach (var item in methods)
          {
            context.DeliveryMethods.Add(item);
          }

          await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.DeliveryMethods ON");
          await context.SaveChangesAsync();
          await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.DeliveryMethods OFF");
        }
      }
      catch (Exception ex)
      {
          var logger = loggerFactory.CreateLogger<StoreContextSeed>();
          logger.LogError(ex.Message);
      }
    }
  }
}