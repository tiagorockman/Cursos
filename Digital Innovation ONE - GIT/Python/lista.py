# lista
lista = [1, 2, 3, 4, 5]
lista_animais = ['cachorro', 'gato', 'porquinho da india']
print(type(lista))
print(lista)
print(lista_animais)
print(lista_animais[1])

# maximo e minimo
print(sum(lista))
print(max(lista))
print(min(lista))
print(max(lista_animais))
print(min(lista_animais))

# percorre lista
for animal in lista_animais:
    print(animal)

# verifica se existe
if 'gato' in lista_animais:
    print("existe um gato na lista")
else:
    print("não existe um gato na lista")

# retira e insere ultimo item da lista
if 'lobo' in lista_animais:
    lista_animais.pop()
    print(lista_animais)
else:
    lista_animais.append('lobo')
    print(lista_animais)

# remove item por índice
lista_animais.pop(0)  # retira o primeiro
print(lista_animais)

# removendo pelo nome
lista_animais.remove('gato')
print(lista_animais)

# ordenando lista
lista.sort()
lista_animais.sort()
print("listaOrdenada: {}".format(lista))
print("listaAnimaisOrd: {}".format(lista_animais))

# tupla
tupla = (1, 10, 12, 14)
print("tupla : {}".format(tupla))
# tupla[0] = 12 - não consegue alterar objeto em tupla pois ela é imutável
print(len(tupla))  # quantidade registro na tupla, pode se usar para lista também

# convertendo lista para tuple
tupla_animais = tuple(lista_animais)
print(type(tupla_animais))
print("ConvertListToTuple: {}".format(tupla_animais))

# convertendo para lista
listadeTupla = list(tupla_animais)
print("ConvetTupletoList: {}".format(listadeTupla))

# exercicio
lista = [3, 5, 7, 10, 11]
resultado = []
for x in lista:
    if x % 2 == 1:
        resultado.append(x)
print(resultado)
