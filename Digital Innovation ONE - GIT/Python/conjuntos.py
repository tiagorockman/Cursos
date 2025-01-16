
# conjuntos
conjunto = {1, 2, 3, 4}  # não pode ter duplicidade
print(type(conjunto))  # tipo set
conjunto.add(5)  # adiciona
conjunto.discard(2)  # remove
print(conjunto)

# uniao de conjuntos
conjunto = {1, 2, 3, 4, 5}
conjunto2 = {5, 6, 7, 8, 9}
conjuntoUniao = conjunto.union(conjunto2)  # une e tira duplicidade
print("ConjuntoUniao: {}".format(conjuntoUniao))
# interseção
conjunoIntersecao = conjunto.intersection(conjunto2)
print("ConjuntoIntersecao: {}".format(conjunoIntersecao))
# diferenca
conjuntoDiferenca1 = conjunto.difference(conjunto2)
conjuntoDiferenca2 = conjunto2.difference(conjunto)
print("DiferencaConj1para2: {}".format(conjuntoDiferenca1))
print("DiferencaConj2para1: {}".format(conjuntoDiferenca2))
# diferenca simetrica
conjDiffSimetric = conjunto.symmetric_difference(conjunto2)
print("DiferencaSimetrica: {}".format(conjDiffSimetric))
# retorna se 1 conjunto é subconjunto do outro
conjunto_a = {1, 2, 3}
conjunto_b = {1, 2, 3, 4, 5}
conjunto_subset1 = conjunto_a.issubset(conjunto_b)
conjunto_subset2 = conjunto_b.issubset(conjunto_a)
# sim pois 1,2,3 estão em B
print("ConjAéSubConjB? : {} ".format(conjunto_subset1))
# Não pois 4,5 não estão em A
print("ConjBéSubConjA? : {} ".format(conjunto_subset2))
# conjunto Superset
conjunto_superset = conjunto_b.issuperset(conjunto_a)
print("ConjuntoBéSuperSetA?: {}".format(conjunto_superset))

lista = ['cachorro', 'gato', 'elefante', 'gato']
print("Lista: {}".format(lista))
conjunto_animais = set(lista)
print("ListToConj: {}".format(conjunto_animais))  # sem duplicidade
