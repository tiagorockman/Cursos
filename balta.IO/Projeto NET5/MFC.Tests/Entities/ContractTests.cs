using MFC.Domain.ContractContext.Commands.ContractCommands.Inputs;
using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Enums;
using MFC.Domain.ContractContext.Handlers;
using MFC.Tests.Mocks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace MFC.Tests.Entities
{
    [TestClass]
    public class ContractTests
    {
        private CarData _carNOk;
        private CarData _carOk;
        private DealerShip _dealerShip;

        public ContractTests()
        {
            _carNOk = new CarData("165465", "20d16", "555495", "6546ASDf");
            _carOk = new CarData("165465", "2016", "555495", "6546ASDf");
            _dealerShip = new DealerShip(1, ETypePerson.Fisica, DateTime.UtcNow, DateTime.UtcNow.AddMinutes(2), "33355465");
        }

        [TestMethod]
        public void CreateContractWhenIsValid()
        {
            var contract = new Contract("0001",_dealerShip, _carOk, EMovementType.Inclusion);
            contract.ContractInsert();
            Assert.AreEqual(true, contract.IsValid);
        }

        [TestMethod]
        public void NotCreateContractWhenIsInValid()
        {
            var contract = new Contract("0001", _dealerShip, _carNOk, EMovementType.Inclusion);
            contract.ContractInsert();
            Assert.AreEqual(false, contract.IsValid);
        }


    }
}
