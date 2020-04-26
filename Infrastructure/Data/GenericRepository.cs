using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specfications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
  public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
  {
    private readonly StoreContext _context;

    public GenericRepository(StoreContext context)
    {
      _context = context;
    }

    public async Task<T> GetByIdAsync(int id)
    {
        var item = await _context.Set<T>().FindAsync(id);

      return item;
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        var items = await _context.Set<T>().ToListAsync();
        
        return items;
    }

    public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
    {
      var tEntity = await ApplySpecification(spec).FirstOrDefaultAsync();

      return tEntity;
    }

    public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
    {
      var tEntities = await ApplySpecification(spec).ToListAsync();

      return tEntities;
    }

    private IQueryable<T> ApplySpecification(ISpecification<T> spec) {
      var queryable = SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);

      return queryable;
    }
  }
}