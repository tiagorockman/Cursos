using FluentValidator;
using MFC.Domain.ContractContext.Commands.ContractCommands.Inputs;
using MFC.Domain.ContractContext.Commands.ContractCommands.Outputs;
using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Enums;
using MFC.Domain.ContractContext.Repositories;
using MFC.Shared.Commads;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MFC.Domain.ContractContext.Handlers
{
    public class ContractHandler : Notifiable, ICommandHandler<CreateContractCommand>
    {
        private readonly IContractRepository _contractRepository;

        public ContractHandler(IContractRepository contractRespository)
        {
            _contractRepository = contractRespository;
        }

        public ICommandResult Handle(CreateContractCommand command)
        {
            var movementTypeDescription = "";
            try
            {
                #region Valida-Comando
                if (!command.Valid())
                    return new ContractCommandResult(movementTypeDescription, DateTime.Now.ToString(), new
                    {
                        Resultado = "Erro",
                        Mensagem = String.Join(",", Notifications.Select(n => n.Message).ToArray())
                    });
                #endregion

                if (!_contractRepository.CheckDealerShip(command.DealershipCode))
                       this.AddNotification("Concessionária", "Codigo Concessionária não cadastrado");

                //Criar as entidades
                var dealerShip = new DealerShip(command.DealershipCode, EtypersonGetValue.Get(command.PersonType), System.DateTime.Parse(command.StartDateEffective), System.DateTime.Parse(command.EndDateEffective), command.RiskPlaceCEP);
                var carData = new CarData(command.FIPECode, command.YearModelCar, command.PlateCar, command.Chassi);
                var contract = new Contract(command.NumContract, dealerShip, carData, EMovementTypeGetValue.Get(command.MovementType));
                movementTypeDescription = EMovementTypeGetValue.GetDescription(contract.MovementType);

                if (contract.MovementType == EMovementType.Exclusion)
                    CheckMovimentation(contract);

                //Validar 
                AddNotifications(dealerShip.Notifications);
                AddNotifications(carData.Notifications);
                AddNotifications(contract.Notifications);
                AddNotifications(command.Notifications);

                if (Invalid)
                    return new ContractCommandResult(movementTypeDescription, DateTime.Now.ToString(), new
                    {
                        Resultado = "Erro",
                        Mensagem = String.Join(" | ", Notifications.Select(n => n.Message).ToArray())
                    });

                //Persistir dados
                _contractRepository.Save(contract);

                //Retornar informacao
                return new ContractCommandResult(movementTypeDescription, DateTime.Now.ToString(), new
                {
                    Resultado = "Sucesso",
                    Mensagem = "Requisição Processada com sucesso."
                });
            }
            catch (Exception ex)
            {
                return new ContractCommandResult(movementTypeDescription, DateTime.Now.ToString(), new
                {
                    Resultado = "Erro",
                    Mensagem = "Erro ao processar soliciação."
                });
            }
        }

        public void CheckMovimentation(Contract contract)
        {
            var InclusionDescription = EMovementTypeGetValue.GetDescription(EMovementType.Inclusion);
            var Exclusiondescription = EMovementTypeGetValue.GetDescription(EMovementType.Exclusion);
            //Verifica se existe contrato do tipo I
            //se não existe adiciona anotacoes contract
            bool hasInstalation = _contractRepository.CheckMoviment(contract.Number, InclusionDescription);
            if (!hasInstalation)
                this.AddNotification("Tipo Movimento", "Movimento Inválido, não existe cadastro de Inclusão.");


            //verifica se existe contrato do tipo E
            //se existe 
            bool hasExclusion = _contractRepository.CheckMoviment(contract.Number, Exclusiondescription);

            if (hasExclusion)
                this.AddNotification("Tipo Movimento", "Movimento Inválido, já existe cadastro de Exclusão.");
        }
    }
}
