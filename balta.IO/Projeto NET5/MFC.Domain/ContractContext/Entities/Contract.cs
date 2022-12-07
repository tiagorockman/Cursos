using FluentValidator;
using MFC.Domain.ContractContext.Enums;

namespace MFC.Domain.ContractContext.Entities
{
    public class Contract : Notifiable
    {
        public Contract(string numContract, DealerShip dealerShip, CarData carData, EMovementType movementType)
        {
            Number = numContract;
            DealerShip = dealerShip;
            CarData = carData;
            MovementType = movementType;
        }

        //numero do Contrato
        public string Number { get; private set; }
        //dados da concessionária
        public DealerShip DealerShip { get; private set; }
        //dados do carro
        public CarData CarData { get; private set; }
        // Tipo de Movimento
        public EMovementType MovementType { get; private set; }


        //Inserir Contrato
        public void ContractInsert()
        {
            //Number = Guid.NewGuid().ToString().Replace("-", "").Substring(0,8).ToUpper();
            if (CarData.Invalid || DealerShip.Invalid)
                AddNotification("Contrato", "Não foi possível prosseguir com o contrato");
        }

    }
}