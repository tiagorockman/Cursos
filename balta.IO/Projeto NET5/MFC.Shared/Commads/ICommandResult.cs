using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MFC.Shared.Commads
{
    public interface ICommandResult
    {
        public string Movimento { get; set; }

        public string DataRecebimento { get; set; }

        public object Retorno { get; set; }
    }
}
