using MFC.Shared.Commads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MFC.Domain.ContractContext.Commands.ContractCommands.Outputs
{
   public class ContractCommandResult : ICommandResult
    {
        public ContractCommandResult() { }

        public ContractCommandResult(string movimento, string dataRecebimento, object retorno)
        {
            Movimento = movimento;
            DataRecebimento = dataRecebimento;
            Retorno = retorno;
        }

        public string Movimento { get; set; }

        public string DataRecebimento { get; set; }

        public object Retorno { get; set; }
    }
}
