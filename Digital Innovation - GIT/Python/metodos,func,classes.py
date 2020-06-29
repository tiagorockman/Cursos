# função
def soma(a, b):
    return a + b


print("Resultado da funcSOMA: {}".format(soma(1, 2)))

# classe


class Calculadora:
    def __init__(self, _a, _b):  # se não informar a e b no momento da instaciação não passa valor a e b
        self.a = _a
        self.b = _b
        # pass # ou sem o init

    def soma(self):
        return self.a+self.b

    def subtracao(self):
        return self.a-self.b


calculadora = Calculadora(10, 2)  # instanciando a classe
# sem passagem de valor calc = Calculadora()
print("Instancia Classe: valorA={}, valorB={}".format(
    calculadora.a, calculadora.b))
print("Resultado SOMA classe: {}".format(calculadora.soma()))
print("Resultaod SUBTR classe: {}".format(calculadora.subtracao()))



