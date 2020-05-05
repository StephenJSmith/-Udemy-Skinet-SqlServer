using System.Net;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BuggyController : BaseApiController
  {
    private readonly StoreContext _context;
    public BuggyController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet("testauth")]
    [Authorize]
    public ActionResult<string> GetSecretText() {
      return "secret text";
    }

    [HttpGet("notfound")]
    public ActionResult GetNotFoundRequest()
    {
      var notFound = _context.Products.Find(42);
      if (notFound == null)
      {
        var notFoundCode = (int)HttpStatusCode.NotFound;
        var apiResponse = new ApiResponse(notFoundCode);

        return NotFound(apiResponse);
      }

      return Ok();
    }

    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
      var notFound = _context.Products.Find(42);
      var dto = notFound.ToString();

      return Ok();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
        var badRequestCode = (int)HttpStatusCode.BadRequest;
        var apiResponse = new ApiResponse(badRequestCode);

      return BadRequest(apiResponse);
    }

    [HttpGet("badrequest/{id}")]
    public ActionResult GetBadParameterTypeRequest(int id)
    {
      return Ok();
    }
  }
}