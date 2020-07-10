from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=("GET", "POST"))
def ola():
    return "Olá, Flask!"


@app.route('/pessoa/<int:id>')
def pessoa(id):
    return jsonify({'id':id, 'nome': 'Tiago', 'profissao': 'Dev'})

@app.route('/soma/<int:valor1>/<int:valor2>')
def soma(valor1, valor2):
    return jsonify({'soma': valor1+valor2})

@app.route('/soma', methods=['POST'])
def suma():
    dados = json.loads(request.data)
    total = sum(dados['valores'])
    return jsonify({'soma total':total})


if __name__ == "__main__":
    app.run(debug=True)
