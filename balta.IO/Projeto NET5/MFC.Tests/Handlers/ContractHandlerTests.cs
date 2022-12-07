using MFC.Domain.ContractContext.Commands.ContractCommands.Inputs;
using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Enums;
using MFC.Domain.ContractContext.Handlers;
using MFC.Tests.Mocks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MFC.Tests.Handlers
{
    [TestClass]
    public class ContractHandlerTests
    {
        private CreateContractCommand _command;

        [TestMethod]
        public void CreateContractWhenValid_InclusionType()
        {

            _command = new CreateContractCommand
            {
                PersonType = "J",
                MovementType = "I",
                PlateCar = "RMM4J44",
                RiskPlaceCEP = "6542089",
                YearModelCar = "2021",
                FIPECode = "654968436",
                Chassi = "98861112XMK379864",
                DealershipCode = 1,
                StartDateEffective = "12/03/2021",
                EndDateEffective = "12/03/2023",
                NumContract = "0001"
            };

            var handler = new ContractHandler(new MockContractRepository());
            var result = handler.Handle(_command);

            string resultTitle = result.Retorno.GetType().GetProperty("Resultado").GetValue(result.Retorno, null).ToString();

            Assert.AreNotEqual("Erro", resultTitle);
            Assert.AreEqual(true, handler.IsValid);


        }

        [TestMethod]
        public void DontCreateContractWhenInValid_ExclusionType()
        {

            _command = new CreateContractCommand
            {
                PersonType = "J",
                MovementType = "E",
                PlateCar = "RMM4J44",
                RiskPlaceCEP = "6542089",
                YearModelCar = "2021",
                FIPECode = "654968436",
                Chassi = "98861112XMK379864",
                DealershipCode = 1,
                StartDateEffective = "12/03/2021",
                EndDateEffective = "12/03/2023",
                NumContract = "0001"
            };

            var handler = new ContractHandler(new MockContractRepository_MovimentTypeRed());
            var result = handler.Handle(_command);

            string resultTitle = result.Retorno.GetType().GetProperty("Resultado").GetValue(result.Retorno, null).ToString();

            Assert.AreEqual("Erro", resultTitle);
            Assert.AreEqual(true, handler.Invalid);

        }



    }
}
