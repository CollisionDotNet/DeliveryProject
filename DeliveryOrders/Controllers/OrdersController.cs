using Microsoft.AspNetCore.Mvc;
using DeliveryProject.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryProject.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OrdersController : ControllerBase
    {
        private readonly DeliveryDBContext _dbContext;
        public OrdersController(DeliveryDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderCreateRequest request)
        {
            Order order = new Order(
                request.weight, 
                request.pickupDate, 
                request.senderCityId, 
                request.senderAddress, 
                request.recipientCityId, 
                request.recipientAddress);
            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return Ok(order);
        }
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            Order order = await _dbContext.Orders.FirstAsync(o => o.Id == id);
            return Ok(order);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // TODO: Check if this include chain is OK
            List<Order> orders = await _dbContext.Orders
                .Include(o => o.SenderCity)
                .Include(o => o.RecipientCity)
                .ToListAsync();
            return Ok(orders);
        }
        public record OrderCreateRequest(
            double weight, 
            DateOnly pickupDate, 
            int senderCityId, 
            string senderAddress, 
            int recipientCityId, 
            string recipientAddress);
    }
}
