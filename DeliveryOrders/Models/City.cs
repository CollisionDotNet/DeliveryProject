using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DeliveryProject.Models
{
    public class City
    {
        public const int nameMaxLength = 50;
        public City(string name)
        {
            Name = name;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        //Во избежание цикличных ссылок в JSON ответах от API
        [JsonIgnore]
        public List<Order>? SenderOrders { get; set; }
        [JsonIgnore]
        public List<Order>? RecipientOrders { get; set; }
    }
}
