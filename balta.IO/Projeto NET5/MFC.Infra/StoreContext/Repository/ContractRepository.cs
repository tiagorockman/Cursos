using Dapper;
using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Enums;
using MFC.Domain.ContractContext.Queries;
using MFC.Domain.ContractContext.Repositories;
using MFC.Infra.StoreContext.DataContexts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MFC.Infra.StoreContext.Repository
{
    public class ContractRepository : IContractRepository
    {
        private readonly DataContext _context;

        public ContractRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<ListContractQueryResult> GetListContractQueryResults(int dealerShipNum = 0)
        {
            return _context.connection.Query<ListContractQueryResult>("SP_SELECT_CONCESSIONARIA_MOTOR_FLEET",
                                    new { CODIGO_CONCESSIONARIA = dealerShipNum }, commandType: System.Data.CommandType.StoredProcedure);
        }

        public GetContractQueryResult GetByNumContract(string ContractNumber)
        {
            return _context.connection.Query<GetContractQueryResult>("SP_SELECT_CONTRATO_MOTOR_FLEET",
                new { CODIGO_CONTRATO = ContractNumber }, commandType: System.Data.CommandType.StoredProcedure
                ).FirstOrDefault();
        }

        public void Save(Contract contract)
        {
            var MovementTypeDescription = EMovementTypeGetValue.GetDescription(contract.MovementType);
            _context.connection.Execute("SP_INCLUI_CONTRATO_MOTOR_FLEET",
                new
                {
                    CODIGO_CONTRATO = contract.Number,
                    TIPO_PESSOA = contract.DealerShip.PersonType,
                    DATA_INICIO_VIGENCIA = contract.DealerShip.StartDateEffective,
                    DATA_FIM_VIGENCIA = contract.DealerShip.EndDateEffective,
                    CODIGO_FIPE = contract.CarData.FIPECode,
                    ANO_MODELO = contract.CarData.YearModelCar,
                    PLACA = contract.CarData.PlateCar,
                    CHASSI = contract.CarData.Chassi,
                    CEP_LOCAL_RISCO = contract.DealerShip.RiskPlaceCEP,
                    TIPO_MOVIMENTO = MovementTypeDescription,
                    CODIGO_CONCESSIONARIA = contract.DealerShip.DealershipCode
                }, commandType: System.Data.CommandType.StoredProcedure);
        }

        public bool CheckDealerShip(int dealerShipID)
        {
            return _context
                .connection
                .Query<bool>("SP_VERIFICA_CONC_MOT_FLEET",
                new { Codigo = dealerShipID },
                commandType: CommandType.StoredProcedure)
                .FirstOrDefault();
        }

        public bool CheckMoviment(string contractNum, string MovimentType)
        {
            return _context
            .connection
            .Query<bool>(@"Select Case When Exists ( Select count(*) from dbo.CONCESSIONARIA_MOTOR_FLEET where CODIGO_CONTRATO = @contractNum AND TIPO_MOVIMENTO = @MovimentDescription ) 
                            then CAST(1 as bit)
                            else Cast(0 as bit)
                        End ",
                        new { contractNum = contractNum, MovimentDescription = MovimentType },
            commandType: CommandType.Text)
            .FirstOrDefault();
        }

        //public int Delete(string NumContrato)
        //{
        //    var parameters = new DynamicParameters();
        //    parameters.Add("CODIGO_CONTRATO", NumContrato, direction: ParameterDirection.Input);
        //    parameters.Add("LINES_DELETED", DbType.Int32, direction: ParameterDirection.Output);

        //     _context.connection.Query("SP_EXCLUI_CONTRATO_MOTOR_FLEET", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

        //    return parameters.Get<int>("LINES_DELETED");
        //}
    }
}
