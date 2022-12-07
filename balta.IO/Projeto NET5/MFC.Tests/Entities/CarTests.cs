using MFC.Domain.ContractContext.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MFC.Tests.Entities
{
    [TestClass]
    public class CarTests
    {

        [TestMethod]
        public void CarYearModelInValid()
        {
            var car = new CarData("165465", "20d16", "555495", "6546ASDf");
            Assert.AreEqual(false, car.IsValid);
        }
        
        [TestMethod]
        public void CarYearModelValid()
        {
            var car = new CarData("165465", "2016", "555495", "6546ASDf");
            Assert.AreEqual(true, car.IsValid);
        }
    }
}
