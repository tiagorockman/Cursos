using System;
using Xunit;

namespace x_UnitTest.Utilidades
{
   public static class AssertExtension
    {
        public static void ValidarMensagem(this ArgumentException argumentException, string mensagemError)
        {
            if(argumentException.Message == mensagemError)
            {
                Assert.True(true);
            }
            else
            {
                Assert.False(true, $"A mensagem esperada é {mensagemError}");
            }
        }
    }
}
