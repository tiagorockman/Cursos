arquivo = open('teste.txt', 'w')  # cria arquivo no modo escrita write
arquivo.write("Primeira linha")
arquivo.close()


def atualizar_arquivo(texto):
    arquivo = open('teste.txt', 'a')  # modo atualização
    arquivo.write(texto)
    arquivo.close()


def ler_arquivo(nome_arquivo):
    arquivo = open(nome_arquivo, 'r')  # modo leitura
    text = arquivo.read()
    return text


if __name__ == '__main__':
    atualizar_arquivo("\nSegunda linha")
    print(ler_arquivo('teste.txt'))
# para copiar arquivo shutil.copy(nomeArquivo, caminho)
# para mover arquivo shutil.move(nomeArquivo, caminho)
