using Alura.Estacionamento.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Alura.Estacionamento.Tests
{
    public class AutomovelTeste:IDisposable
    {
        public ITestOutputHelper Output { get; }
        private Veiculo carro = new Veiculo();
        public AutomovelTeste(ITestOutputHelper output)
        {
            Output = output;
            Output.WriteLine("Execução do  construtor.");

            carro.Proprietario = "Carlos Silva";
            carro.Placa = "ZAP-7419";
            carro.Cor = "Verde";
            carro.Modelo = "Variante";
        }
        public void Dispose()
        {
            Output.WriteLine("Execução do  Cleanup.");
        }

        [Fact(Skip = "Teste ainda não implementado")]
        public void ValidaPropriedadeProprietarioAutomovel()
        {
            // Exemplo de utilização do Skip
        }

        [Fact]
        public void ExibeDadosdoProprioAutomoveltaEstacionadaNoPatio()
        {
            //Arrange
            //var carro = new Automovel();
            //carro.Proprietario = "Carlos Silva";
            //carro.Placa = "ZAP-7419";
            //carro.Cor = "Verde";
            //carro.Modelo = "Variante";     

            //Act
            string dados = carro.ToString();

            //Assert
            Assert.Contains("Tipo do Veículo:", dados);
           
        }

        
    }
}
