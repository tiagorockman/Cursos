from tvclass import Televisao
from metodo_contador_letras import contador_letras

# executando o import da classe de televisao
televisao = Televisao()
print(televisao.ligada)
televisao.power()
print(televisao.ligada)

# executando o import do metodo
lista = ['cachorro', 'gato', 'elefante']
total_letras = contador_letras(lista)
print("Total de letras por palavra na lista: {}".format(total_letras))
