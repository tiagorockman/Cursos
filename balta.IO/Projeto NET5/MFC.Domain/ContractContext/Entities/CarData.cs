using FluentValidator;
using FluentValidator.Validation;

namespace MFC.Domain.ContractContext.Entities
{
    public class CarData : Notifiable
    {
        public CarData(string fIPECode, string yearModelCar, string plateCar, string chassi)
        {
            FIPECode = fIPECode;
            YearModelCar = yearModelCar;
            PlateCar = plateCar;
            Chassi = chassi;


            AddNotifications(new ValidationContract()
               .IsTrue(ValidateYear(YearModelCar), "YearModelCar", "Ano inválido")
            );
        }


        //codigo FIPE
        public string FIPECode { get; private set; }

        //Ano Modelo
        public string YearModelCar { get; private set; }

        //Placa
        public string PlateCar { get; private set; }

        //Chassi
        public string Chassi { get; private set; }


        //Validações
        private bool ValidateYear(string Year)
        {
            int outYear;
            return int.TryParse(Year, out outYear);
        }
    }
}