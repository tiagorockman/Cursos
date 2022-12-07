using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MotorFleetContract.Api.Controllers
{
    public class ValidateController : Controller
    {
        [HttpGet]
        [Route("v1/validate")]
        public object Index()
        {
            return new { mensagem = "Valid project is working!" };
        }

    }
}
