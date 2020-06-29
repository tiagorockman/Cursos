# classe televisao
class Televisao:
    def __init__(self):
        self.ligada = False
        self.canal = 5

    def power(self):
        if self.ligada:
            self.ligada = False
        else:
            self.ligada = True

    def aumenta_canal(self):
        if self.ligada:
            self.canal += 1

    def diminui_canal(self):
        if self.ligada:
            self.canal -= 1

if __name__ == '__main__':
    televisao = Televisao()
    print("TV ligada?: {}".format(televisao.ligada))
    print("Aperta power")
    televisao.power()
    print("TV ligada?: {}".format(televisao.ligada))
    print("Muda canal: Atual={}".format(televisao.canal))
    televisao.aumenta_canal()
    print("Canal Atual ={}".format(televisao.canal))
    print("Aperta power")
    televisao.power()
    print("TV ligada?: {}".format(televisao.ligada))