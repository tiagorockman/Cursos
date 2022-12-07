using System.Collections.Generic;
using MFC.Domain.ContractContext.Entities;
using MFC.Domain.ContractContext.Commands.ContractCommands.Inputs;
using MFC.Domain.ContractContext.Enums;
using Microsoft.AspNetCore.Mvc;
using System;
using MFC.Domain.ContractContext.Queries;
using MFC.Domain.ContractContext.Repositories;
using MFC.Domain.ContractContext.Handlers;
using MFC.Domain.ContractContext.Commands.ContractCommands.Outputs;
using Swashbuckle.AspNetCore.Annotations;

namespace MotorFleetContract.Api.Controllers
{
    [Route("v1/")]
    public class ContractController : Controller
    {
        private readonly IContractRepository _contractRepository;
        private readonly ContractHandler _handler;       
        public ContractController(IContractRepository contractRepository, ContractHandler handler)
        {
            _contractRepository = contractRepository;
            _handler = handler;
        }

        [SwaggerResponse(statusCode: 201, description: "Sucesso", Type = typeof(ListContractQueryResult))]
        [SwaggerResponse(400, "Bad Request")]
        [SwaggerResponse(500, "Internal Error")]
        [SwaggerOperation(Summary = "Return All Contracts", Description = "This operation returns all registered contracts.")]
        [HttpGet]
        [Route("contracts")]
        public IEnumerable<ListContractQueryResult> Get()
        {
           return _contractRepository.GetListContractQueryResults();
        }


        [SwaggerResponse(statusCode: 201, description: "Sucesso", Type = typeof(GetContractQueryResult))]
        [SwaggerResponse(statusCode: 204, description: "Registro não Encontrado", Type = typeof(GetContractQueryResult))]
        [SwaggerResponse(400, "Bad Request")]
        [SwaggerResponse(500, "Internal Error")]        
        [SwaggerOperation(Summary = "Return Contract by Number", Description = "This operation returns a Contract by his Number.")]
        [HttpGet]
        [Route("contracts/{contractNum}")]
        public GetContractQueryResult Get(string contractNum)
        {
            return _contractRepository.GetByNumContract(contractNum);
        }

        [SwaggerResponse(statusCode: 201, description: "Sucesso", Type = typeof(IEnumerable<ListContractQueryResult>))]
        [SwaggerResponse(400, "Bad Request")]
        [SwaggerResponse(500, "Internal Error")]
        [SwaggerOperation(Summary = "Return Dealership by Number", Description = "This operation returns DealerShip by his Number.")]
        [HttpGet]
        [Route("contracts/dealership/{dealershipNum}")]
        public IEnumerable<ListContractQueryResult> Get(int dealershipNum)
        {
            return _contractRepository.GetListContractQueryResults(dealershipNum);
        }


        [SwaggerResponse(statusCode: 201, description: "Sucesso ao Cadastrar", Type = typeof(ContractCommandResult))]
        [SwaggerResponse(statusCode: 500, description: "Erro Interno", Type = typeof(ContractCommandResult))]
        [SwaggerResponse(400, "Bad Request")]
        [SwaggerResponse(500, "Internal Error")]
        [SwaggerOperation(Summary = "Insert a new Contract", Description = "This operation inserts a new contract.")]
        [HttpPost]
        [Route("contract")]
        public ContractCommandResult Post([FromBody]CreateContractCommand command)
        {
            var result = (ContractCommandResult)_handler.Handle(command);
            return result;
        }


      

    }
}
