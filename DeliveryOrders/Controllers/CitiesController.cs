using DeliveryProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeliveryProject.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CitiesController : ControllerBase
    {
        private readonly DeliveryDBContext _dbContext;
        public CitiesController(DeliveryDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CityCreateRequest request)
        {
            City city = new City(request.name);
            await _dbContext.Cities.AddAsync(city);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            City city = await _dbContext.Cities.Where(c => c.Id == id).FirstAsync();           
            return Ok(city);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<City> allCities = await _dbContext.Cities.ToListAsync();
            return Ok(allCities);
        }
        //Использование типа-враппера позволяет обойти особенность контроллеров с одним параметром в Web API.
        //Такие контроллеры ждут JSON в виде одного значения, а не стандартной пары ключ-значение
        public record CityCreateRequest (string name);
    }
}
