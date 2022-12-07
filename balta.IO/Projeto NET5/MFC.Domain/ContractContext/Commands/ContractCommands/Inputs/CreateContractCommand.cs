using FluentValidator;
using FluentValidator.Validation;
using MFC.Shared.Commads;
using System;

namespace MFC.Domain.ContractContext.Commands.ContractCommands.Inputs
{
    public class CreateContractCommand : Notifiable, ICommand
    {
        public string NumContract {get; set; }
        public int DealershipCode { get;  set; }

        public string PersonType { get;  set; }

        public string StartDateEffective { get;  set; }

        public string EndDateEffective { get;  set; }

        public string RiskPlaceCEP { get;  set; }

        public string FIPECode { get;  set; }

        public string YearModelCar { get;  set; }

        public string PlateCar { get;  set; }

        public string Chassi { get;  set; }

        public string MovementType { get;  set; }


        public bool Valid()
        {
            AddNotifications(new ValidationContract()
                .Requires()
                .IsNotNullOrEmpty(NumContract, "NumContract", "O número do contrato deve estar preenchido.")
                .IsTrue(ValidateMovementType(MovementType), "MovementType", "Tipo de movimento informado desconhecido.")
                .IsTrue(ValidatePersonType(PersonType), "PersonType", "Tipo Pessoa ifnormado desconecido.")
                .HasLen(YearModelCar, 4, "YearModelCar", "Ano de Modelo informado incorretamente.")
                .IsTrue(ValidateDate(StartDateEffective), "StartDateEffective", "Data informada inválida.")
                .IsTrue(ValidateDate(EndDateEffective), "EndDateEffective", "Data informada inválida.")
                );
            return IsValid;
        }

        private bool ValidatePersonType(string personType)
        {
            return personType.Contains("F") || personType.Contains("J");
        }

        private bool ValidateMovementType(string movementType)
        {
           return movementType.Contains("E") || movementType.Contains("I");
        }
        private bool ValidateDate(string data){
            DateTime outData;
            return DateTime.TryParse(data, out outData);
        }
    }
}
