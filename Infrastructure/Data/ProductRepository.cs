using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
  public class ProductRepository : IProductRepository
  {
    private readonly StoreContext _context;

    public ProductRepository(StoreContext context)
    {
      _context = context;
    }

    public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
    {
      var items = await _context.ProductBrands.ToListAsync();

      return items;
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
      var product = await _context.Products
        .Include(p => p.ProductType)
        .Include(p => p.ProductBrand)
        .FirstOrDefaultAsync(p => p.Id == id);

      return product;
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
      var products = await _context.Products
        .Include(p => p.ProductType)
        .Include(p => p.ProductBrand)
        .ToListAsync();

      return products;
    }

    public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
    {
       var items = await _context.ProductTypes.ToListAsync();

      return items;
   }
  }
}