using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class UserManagerExtensions
  {
    public static async Task<AppUser> FindUserByClaimsPrincipalWithAddressSync(
        this UserManager<AppUser> input,
        ClaimsPrincipal user)
    {
      var email = user?.Claims?
        .FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

      var appUser = await input.Users
        .Include(u => u.Address)
        .SingleOrDefaultAsync(u => u.Email == email);

      return appUser;
    }

    public static async Task<AppUser> FindByEmailFromClaimsPrincipal(
        this UserManager<AppUser> input,
        ClaimsPrincipal user) {
      var email = user?.Claims?
        .FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

      var appUser = await input.Users
        .SingleOrDefaultAsync(u => u.Email == email);

      return appUser;
    }
  }
}