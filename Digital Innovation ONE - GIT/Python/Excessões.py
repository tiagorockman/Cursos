# forçando erro
lista = [1, 10]
try:
    divisao = 10/1  # para erro 10/0
    numero = lista[1]  # para erro lista[3]

except ZeroDivisionError:
    print("Não é possível realizar uma divisão por 0")
except IndexError:  # encadeando erro
    print("Erro ao acessar um indice invalido")
except Exception as e:
    print("Erro desconhecido. Erro: {} ".format(e))
else:
    print("Executa apenas se nao houve nenhum erro")
finally:
    print("Sempre executa essa parte, Util para fechamento de conexoes ou arquivo")
