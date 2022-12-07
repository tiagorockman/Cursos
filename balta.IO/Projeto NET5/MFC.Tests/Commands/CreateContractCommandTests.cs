using MFC.Domain.ContractContext.Commands.ContractCommands.Inputs;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MFC.Tests.Commands
{
    [TestClass]
    public class CreateContractCommandTests
    {
        private CreateContractCommand _command;

        [TestMethod]
        public void ValidateWhenCommandIsValid()
        {
            _command = new CreateContractCommand
            {
                PersonType = "F",
                MovementType = "Inclusão",
                PlateCar = "654asdf",
                RiskPlaceCEP = "33564968",

                YearModelCar = "2016",
                FIPECode = "654968436",
                Chassi = "654a6sdf6565",
                DealershipCode = 1,
                StartDateEffective = "08/01/2013",
                EndDateEffective = "08/01/2013"
            };

            Assert.AreEqual(true, _command.Valid());
        }
        [TestMethod]
        public void PersonTypeNotExists()
        {
            _command = new CreateContractCommand
            {
                PersonType = "O",
                MovementType = "Inclusão",
                PlateCar = "654asdf",
                RiskPlaceCEP = "33564968",

                YearModelCar = "2016",
                FIPECode = "654968436",
                Chassi = "654a6sdf6565",
                DealershipCode = 1,
                StartDateEffective = "08/01/2013",
                EndDateEffective = "08/01/2013"
            };

            Assert.AreEqual(false, _command.Valid());
        }

        [TestMethod]
        public void MovementTypeNotExits()
        {
            _command = new CreateContractCommand
            {
                PersonType = "F",
                MovementType = "Edição",
                PlateCar = "654asdf",
                RiskPlaceCEP = "33564968",

                YearModelCar = "2016",
                FIPECode = "654968436",
                Chassi = "654a6sdf6565",
                DealershipCode = 1,
                StartDateEffective = "08/01/2013",
                EndDateEffective = "08/01/2013"
            };
            Assert.AreEqual(false, _command.Valid());
        }

    }
}
