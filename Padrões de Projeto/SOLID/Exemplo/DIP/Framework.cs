/**
Sobre o autor:
Guinther Pauli
Cursos Treinamentos Consultoria
Delphi Certified Professional - 3,5,6,7,2005,2006,Delphi Web,Kylix,XE
Microsoft Certified Professional - MCP,MCAD,MCSD.NET,MCTS,MCPD (C#, ASP.NET, Arquitetura)
Colaborador Editorial Revistas .net Magazine e ClubeDelphi
MVP (Most Valuable Professional)
Emails: guintherpauli@gmail.com / guinther@gpauli.com
http://www.gpauli.com
http://www.guintherpauli.blogspot.com.br
http://www.facebook.com/guintherpauli
http://www.twitter.com/guintherpauli
http://br.linkedin.com/in/guintherpauli
**/

using System;

namespace DIP
{
    public interface IFormaPagamento
    {
        void Pagar(double valor);
    }
    // OCP
    public class Pedido
    {
        // encapsulamento
        // programar para interfaces / abstrações
        private IFormaPagamento _forma;
        public void Pagar(double valor)
        {
            // delegação
            this._forma.Pagar(valor);
        }

        public Pedido(IFormaPagamento forma)
        {
            this._forma = forma;
        }
    }

    public class Boleto: IFormaPagamento
    {
        public void Pagar(double valor)
        {
            // simulando pagamento via boleto
            Console.WriteLine("Pago boleto no valor de " + valor);
        }
    }

    public class CartaoCredito : IFormaPagamento
    {
        public void Pagar(double valor)
        {
            // simulando pagamento via cartão
            Console.WriteLine("Debitado valor no cartão " + valor);
        }
    }

    public class Cheque : IFormaPagamento
    {
        public void Pagar(double valor)
        {
            // simulando pagamento via cartão
            Console.WriteLine("Cheque assinado no valor de " + valor);
        }
    }
}
