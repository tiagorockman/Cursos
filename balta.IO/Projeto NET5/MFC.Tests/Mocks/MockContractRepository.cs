using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Queries;
using MFC.Domain.ContractContext.Repositories;
using System.Collections.Generic;

namespace MFC.Tests.Mocks
{
    public class MockContractRepository : IContractRepository
    {
        public bool CheckDealerShip(int dealerShipID)
        {
            return true;
        }

        public bool CheckMoviment(string contract, string movimentDescription)
        {
            //HappyWay
             return movimentDescription == "Inclusão" ? true : false;

        }

        public GetContractQueryResult GetByNumContract(string NumeroContrato)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ListContractQueryResult> GetListContractQueryResults(int dealerShipNum = 0)
        {
            throw new System.NotImplementedException();
        }

        public void Save(Contract contract)
        {
           
        }
    }
}
