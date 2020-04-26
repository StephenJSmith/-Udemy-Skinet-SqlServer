using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Controllers;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specfications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Infrastructure.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly IGenericRepository<Product> _productsRepo;
    private readonly IGenericRepository<ProductBrand> _brandsRepo;
    private readonly IGenericRepository<ProductType> _typesRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> brandsRepo, IGenericRepository<ProductType> typesRepo, IMapper mapper)
    {
      _mapper = mapper;
      _typesRepo = typesRepo;
      _brandsRepo = brandsRepo;
      _productsRepo = productsRepo;
    }

    [HttpGet]
    public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
      [FromQuery]ProductSpecParams productParams)
    {
      var countSpec = new ProductWithFiltersForCountSpecification(productParams);
      var totalItems = await _productsRepo.CountAsync(countSpec);

      var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
      var products = await _productsRepo.ListAsync(spec);
      var dtos = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
      var pagination = new Pagination<ProductToReturnDto>(
        productParams.PageIndex,
        productParams.PageSize,
        totalItems,
        dtos);

      return Ok(pagination);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
      var spec = new ProductsWithTypesAndBrandsSpecification(id);

      var product = await _productsRepo.GetEntityWithSpec(spec);
      if (product == null)
      {
        var notFoundCode = (int)HttpStatusCode.NotFound;
        var apiResponse = new ApiResponse(notFoundCode);

        return NotFound(apiResponse);
      }

      var dto = _mapper.Map<Product, ProductToReturnDto>(product);

      return Ok(dto);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetBrands()
    {
      var items = await _brandsRepo.ListAllAsync();

      return Ok(items);
    }

    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetTypes()
    {
      var items = await _typesRepo.ListAllAsync();

      return Ok(items);
    }

  }
}