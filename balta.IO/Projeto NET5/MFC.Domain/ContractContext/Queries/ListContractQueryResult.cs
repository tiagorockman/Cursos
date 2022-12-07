using System;

namespace MFC.Domain.ContractContext.Queries
{
    public class ListContractQueryResult
    {
        public string ContractNumber {get; set;}
        public int DealershipCode { get;  set; }

        public string PersonType { get;  set; }

        public string StartDateEffective { get;  set; }

        public string EndDateEffective { get;  set; }

        public string RiskPlaceCEP { get;  set; }

        public string FIPECode { get;  set; }

        public string YearModelCar { get;  set; }

        public string PlateCar { get;  set; }

        public string Chassi { get;  set; }

        public string MovementType { get; set; }

    }
}