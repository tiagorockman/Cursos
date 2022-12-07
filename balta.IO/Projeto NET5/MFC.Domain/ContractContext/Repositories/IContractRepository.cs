using MFC.Domain.ContractContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MFC.Domain.ContractContext.Queries;

namespace MFC.Domain.ContractContext.Repositories
{
    public interface IContractRepository
    {
        void Save(Contract contract);

        IEnumerable<ListContractQueryResult> GetListContractQueryResults(int dealerShipNum = 0);

        GetContractQueryResult GetByNumContract(string NumeroContrato);

        bool CheckDealerShip(int dealerShipID);

        //int Delete(string NumContrato);
        bool CheckMoviment(string contract, string movimentDescription);
    }
}
