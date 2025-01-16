from datetime import date, time, datetime

# data
data_atual = date.today()
print(data_atual)
print(data_atual.strftime('%d/%m/%y'))
print(data_atual.strftime('%A %B %Y'))

# time
h = time(hour=15, minute=18, second=30)
print(h)  # tipo datetime
print(h.strftime('%H:%M:%S'))  # tipo string

# datetime
dTAtual = datetime.now()
print(dTAtual)
print(dTAtual.strftime('%Y-%m-%d %H:%M:%S'))
print(dTAtual.strftime('%c'))
tupla = ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')
print(str(dTAtual.weekday()))
print(tupla[dTAtual.weekday()])
#data_convertida = datetime.strptime(dTAtual, '%d do %m de %Y às %H e %M')
