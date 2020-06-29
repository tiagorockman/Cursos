# funcao anonima
def contador_letras(lista): return [len(x) for x in lista]
# retorno como lista por causa do colchete,
# for na lista recebida e conta o x


lista_animais = ['cachorro', 'gato', 'elefante']
print(contador_letras(lista_animais))


def soma(a, b): return a+b


print(soma(5, 10))

# dicionario de funçoes lambda
calculadora = {
    'somar': lambda a, b: a+b,
    'subtracao': lambda a, b: a-b,
    'multiplicacao': lambda a, b: a*b,
    'divisao': lambda a, b: a/b,
}

print(type(calculadora))
somar = calculadora['somar']
print(somar(10, 4))
multiplicacao = calculadora['multiplicacao']
print(multiplicacao(3, 4))
