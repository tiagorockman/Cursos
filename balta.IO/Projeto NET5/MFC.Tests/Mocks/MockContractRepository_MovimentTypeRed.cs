using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Queries;
using MFC.Domain.ContractContext.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MFC.Tests.Mocks
{
    class MockContractRepository_MovimentTypeRed : IContractRepository
    {
        public bool CheckDealerShip(int dealerShipID)
        {
            return true;
        }

        public bool CheckMoviment(string contract, string movimentDescription)
        {
            //RedWay
            return true;
        }

        public GetContractQueryResult GetByNumContract(string NumeroContrato)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ListContractQueryResult> GetListContractQueryResults(int dealerShipNum = 0)
        {
            throw new NotImplementedException();
        }

        public void Save(Contract contract)
        {
          
        }
    }
}
