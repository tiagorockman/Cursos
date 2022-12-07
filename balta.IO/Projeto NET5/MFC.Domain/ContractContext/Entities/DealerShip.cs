using FluentValidator;
using MFC.Domain.ContractContext.Enums;
using MFC.Shared.Entities;
using System;

namespace MFC.Domain.ContractContext.Entities
{
  public class DealerShip : Notifiable
  {

    //codigo concessionária
    public DealerShip(int dealershipCode, ETypePerson personType, DateTime startDateEffective, DateTime endDateEffective, string riskPlaceCEP)
    {
      DealershipCode = dealershipCode;
      PersonType = personType;
      StartDateEffective = startDateEffective;
      EndDateEffective = endDateEffective;
      RiskPlaceCEP = riskPlaceCEP;
    }
    public int DealershipCode { get; private set; }

    //tipo pessoa
    public ETypePerson PersonType { get; private set; }

    //Data de inicio Efetiva
    public DateTime StartDateEffective { get; private set; }

    //Data de fim Efetiva
    public DateTime EndDateEffective { get; private set; }

    //CEP local de risco
    public string RiskPlaceCEP { get; private set; }

  }
}