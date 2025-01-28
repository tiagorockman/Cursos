using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace az_func_valida_cpf
{
    public class Function1
    {
        private readonly ILogger<Function1> _logger;

        public Function1(ILogger<Function1> logger)
        {
            _logger = logger;
        }

        [Function("fnvalidaCPF")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            _logger.LogInformation("Iniciando a validação do CPF.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            if (data == null)
                return new BadRequestObjectResult("Por favor, informe o CPF.");

            string cpf = data?.cpf;
            cpf.Replace(".", "");
            cpf.Replace("-", "");

            if (ValidarCpf(cpf) == false)
            {
                return new BadRequestObjectResult("CPF inválido");
            }

            return new OkObjectResult("CPF válido");
            
        }



        public static bool ValidarCpf(string cpf)
        {
            // Remove caracteres não numéricos
            cpf = new string(cpf.Where(char.IsDigit).ToArray());

            // Verifica se o CPF tem 11 dígitos
            if (cpf.Length != 11) return false;

            // Verifica se todos os dígitos são iguais (a menos que seja "00000000000")
            if (cpf.Distinct().Count() == 1 && cpf != "00000000000") return false;

            // Calcula os dígitos verificadores
            int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            string tempCpf = cpf.Substring(0, 9);
            int soma = 0;

            for (int i = 0; i < 9; i++)
            {
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            }

            int resto = soma % 11;
            int digito1 = resto < 2 ? 0 : 11 - resto;

            tempCpf += digito1;
            soma = 0;

            for (int i = 0; i < 10; i++)
            {
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            }

            resto = soma % 11;
            int digito2 = resto < 2 ? 0 : 11 - resto;

            // Verifica se os dígitos verificadores estão corretos
            string cpfVerificado = tempCpf + digito2;
            return cpf == cpfVerificado || cpf == "00000000000";
        }
    }
}
