using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeliveryProject.Models
{
    public class Order
    {
        public const int addressMaxLength = 255;
        public Order(double weight, DateOnly pickupDate, int senderCityId, string senderAddress, int recipientCityId, string recipientAddress)
        {
            Weight = weight;
            PickupDate = pickupDate;           
            SenderAddress = senderAddress;
            SenderCityId = senderCityId;
            RecipientAddress = recipientAddress;    
            RecipientCityId = recipientCityId;
        }
        public int Id { get; set; }
        [Range(0, double.MaxValue, MinimumIsExclusive = false)]
        public double Weight { get; set; }
        public DateOnly PickupDate { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string SenderAddress { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string RecipientAddress { get; set; }

        public int SenderCityId { get; set; }
        public City SenderCity { get; set; }
        

        public int RecipientCityId { get; set; }
        public City RecipientCity { get; set; }
        
       
    }
}
