using DomainProject;
using ExpectedObjects;
using System;
using x_UnitTest.Utilidades;
using Xunit;


namespace x_UnitTest
{
    public class CursoTest
    {
        
        [Fact(DisplayName ="CriacaoDoCurso")]
        public void CriarCurso()
        {
            var cursoEsperado = new
            {
                Nome = "Curso de Informatica",
                CargaHoraria = (double)40,
                PublicoAlvo = PublicoAlvo.Estudante,
                Valor = (double)50,
            };
           

            var curso = new Curso(cursoEsperado.Nome, cursoEsperado.CargaHoraria, cursoEsperado.PublicoAlvo, cursoEsperado.Valor);

            //cursoEsperado.ToExpectedObject().ShouldMatch(curso);
            Assert.Equal(cursoEsperado.Nome, curso.Nome);
            Assert.Equal(cursoEsperado.CargaHoraria, curso.CargaHoraria);
            Assert.Equal(cursoEsperado.PublicoAlvo, curso.PublicoAlvo);
            Assert.Equal(cursoEsperado.Valor, curso.Valor);

        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public void Curso_NomeVazioOuNulo_RetornaArgumentException(string nomeInvalido)
        {
            var cursoEsperado = new
            {
                Nome = "Curso de Informatica",
                CargaHoraria = (double)40,
                PublicoAlvo = PublicoAlvo.Estudante,
                Valor = (double)50
            };

            Assert.Throws<ArgumentException>(() => new Curso(nomeInvalido, cursoEsperado.CargaHoraria, cursoEsperado.PublicoAlvo, cursoEsperado.Valor));
        }


        [Theory]
        [InlineData(0)]
        [InlineData(-2)]
        public void Curso_ValorMenorQue1_RetornaArgumentException(double valorInvalido)
        {
            string mensagemError = "Parametros inválidos!";
            var cursoEsperado = new
            {
                Nome = "Curso de Informatica",
                CargaHoraria = (double)40,
                PublicoAlvo = PublicoAlvo.Estudante,
                Valor = (double)50,
            };

            Assert.Throws<ArgumentException>(() => new Curso(cursoEsperado.Nome, cursoEsperado.CargaHoraria, cursoEsperado.PublicoAlvo, valorInvalido)).ValidarMensagem(mensagemError);
        }

        [Fact(DisplayName = "CriacaoDoCursoNuget")]
        public void CriarCursoNuget()
        {
            var cursoEsperado = new
            {
                Nome = "Curso de Informatica",
                CargaHoraria = (double)50,
                PublicoAlvo = PublicoAlvo.Empregado,
                Valor = (double)50
            };

            var curso = new Curso(cursoEsperado.Nome, cursoEsperado.CargaHoraria, cursoEsperado.PublicoAlvo, cursoEsperado.Valor);

            cursoEsperado.ToExpectedObject().ShouldMatch(curso);
        }
    }
}

