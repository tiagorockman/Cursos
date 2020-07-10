import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';

import 'package:url_launcher/url_launcher.dart';


const requestURL = "https://api.whatsapp.com/send?phone=";

void main() {
  runApp(MaterialApp(
    home: Home(),
    title: "Envio de Mensagem Whatsapp",
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      primarySwatch: Colors.green,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    ),
  ));
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final _toDoController = TextEditingController();
  List _todoList = [];
  Map<String, dynamic> _lastRemoved;
  int _lastRemovedPos;

  //
  Future<void> _launched;

  Future<void> _launchInBrowser() async {
   var url = requestURL ;
   var phone = _todoList.firstWhere((element) => element['concluido'] == true);
   url += phone['title'].toString();
   //print(phone['title']);
   print(url);
    if (await canLaunch(url)) {
      await launch(
        url,
        forceSafariVC: false,
        forceWebView: false,
        headers: <String, String>{'my_header_key': 'my_header_value'},
      );
    } else {
      throw 'Could not launch $url';
    }
  }

//reescrevendo metodo que é executado toda ver que app abre
  @override
  void initState() {
    super.initState();
    _readData().then((data) {
      setState(() {
        _todoList = json.decode(data);
      });
    });
  }


  void _addToDo() {
    var msg = _validarCelular(_toDoController.text);
      if(msg != null){
        print(msg);
          AlertDialog alerta = AlertDialog(
            title: Text("Atenção!"),
            content: Text(msg),
            actions: <Widget>[
          RaisedButton(
              color: Colors.green,
                child: Text("OK"),
                textColor: Colors.white,
                onPressed: () {Navigator.of(context).pop();},
              )
            ],
          );
          showDialog(context: context,
          builder: (BuildContext context){
            return alerta;
          },
          );
        return null;
      }

    setState(() {
      Map<String, dynamic> newToDo = Map();
      newToDo["title"] = _toDoController.text;
      _toDoController.text = "";
      newToDo["concluido"] = false;
      _todoList.add(newToDo);
      _saveData();
    });
  }

  Future<Null> _refresh() async {
    await Future.delayed(Duration(seconds: 1)); //obriga esperar 1 segundo

    //Atualiza lista ordenando alista
    setState(() {
      _todoList.sort((a, b) {
        //chama essa funçao passando 2 itens da lista
        //vamos ordernar os não concluidos primeiro
        if (a["concluido"] && !b["concluido"])
          return 1; //se o item a for concluido e b não for retorna 1
        else if (!a["concluido"] && b["concluido"])
          return -1; //se a não estiver concluido e b estiver retorna -1
        else
          return 0; //se a e b iguais
      });

      //ordena alfabeticamente por grupo
      /* _todoList.sort((current, next) {
        if (current["concluido"] && next["concluido"]) {
          //se atual e proximo estiver concluido
          if (current["title"] < next["title"]) return -1;
          if (current["title"] > next["title"]) return 1;
          return 0;
        } else if (!current["concluido"] && !next["concluido"]) {
          //se atual e proximo não estiver
          if (current["title"] < next["title"]) return -1;
          if (current["title"] > next["title"]) return 1;
          return 0;
        } else
          return 0;
      });
      print(_todoList);*/

      _saveData();
    });

    return null;
  }

  String _validarCelular(String value) {
    String patttern = r'(^[0-9]*$)';
    RegExp regExp = new RegExp(patttern);
    if (value.length == 0) {
      return "Informe o celular";
    } else if(value.length > 15){
      return "O celular deve ter até 15 dígitos";
    }else if (!regExp.hasMatch(value)) {
      return "O número do celular so deve conter dígitos";
    }else if(value.length < 13){
      return "Número de telefone inválido.";
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Envio de Mensagem Whatsapp"),
          backgroundColor: Colors.green,
          centerTitle: true,
        ),
        body: Column(
          children: <Widget>[
            Container(
                padding: EdgeInsets.fromLTRB(17.0, 1.0, 7.0, 1.0),
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: TextFormField(
                        controller: _toDoController,
                        keyboardType: TextInputType.number,
                        inputFormatters: <TextInputFormatter>[
                          LengthLimitingTextInputFormatter(15),
                          WhitelistingTextInputFormatter.digitsOnly,
                          BlacklistingTextInputFormatter.singleLineFormatter,
                        ],
                        decoration: InputDecoration(
                            labelText: "Novo Número",
                            hintText: 'Ex: 5531999999999',
                            labelStyle: TextStyle(color: Colors.green)),
                      ),
                    ),
                    RaisedButton(
                      color: Colors.green,
                      child: Text("Adicionar"),
                      textColor: Colors.white,
                      onPressed: _addToDo,
                    )
                  ],
                )),
            Expanded(
                child: RefreshIndicator(
                  onRefresh: _refresh,
                  child: ListView.builder(
                      padding: EdgeInsets.only(top: 10.0),
                      itemCount: _todoList.length,
                      itemBuilder: buildItem),
                )),
            RaisedButton(
              onPressed: () => setState(() {
                _launched = _launchInBrowser();
              }),
              child: const Text('Enviar Mensagem'),
              color: Colors.green,
              textColor: Colors.white,
            ),
          ],

        ));
  }

  Widget buildItem(BuildContext context, int index) {
    return Dismissible(
      // componente responsavel pelo arraste
      key: Key(DateTime.now().millisecondsSinceEpoch.toString()),
      direction: DismissDirection.startToEnd,
      background: Container(
        color: Colors.red,
        child: Align(
          alignment: Alignment(
              -0.9, 0.0), //como se estivesse dizendo 90% para esquerda
          child: Icon(
            Icons.delete,
            color: Colors.white,
          ),
        ),
      ),
      child: checklist(context, index),
      onDismissed: (direction) {
        setState(() {
          _lastRemoved = Map.from(_todoList[index]);
          _lastRemovedPos = index;
          _todoList.removeAt(index);

          _saveData();

          final snack = SnackBar(
            content: Text("Tarefa \"${_lastRemoved["title"]}\" removida!"),
            action: SnackBarAction(
              label: "Desvazer",
              onPressed: () {
                setState(() {
                  _todoList.insert(_lastRemovedPos, _lastRemoved);
                  _saveData();
                });
              },
            ),
            duration: Duration(seconds: 2),
          );
          Scaffold.of(context).removeCurrentSnackBar(); //remove a atual
          Scaffold.of(context).showSnackBar(snack); //exibe o snackbar
        });
      },
    );
  }

  Widget checklist(context, index) {
    return CheckboxListTile(
      title: Text(_todoList[index]["title"]),
      value: _todoList[index]["concluido"],
      secondary: CircleAvatar(
        child: Icon(_todoList[index]["concluido"] ? Icons.check : Icons.error),
      ),
      onChanged: (c) {
        setState(() {
          if(c) { //só entra se for true
            _desmarca();
            _todoList[index]["concluido"] = c;
            _saveData();
          }
        });
      },
    );
  }

  Future<File> _getFile() async {
    final directory = await getApplicationDocumentsDirectory();
    return File("${directory.path}/data.json");
  }

  Future<File> _saveData() async {
    String data = json.encode(_todoList);

    final file = await _getFile();
    return file.writeAsString(data);
  }

  Future<String> _readData() async {
    try {
      final file = await _getFile();
      return file.readAsStringSync();
    } catch (e) {
      return null;
    }
  }

  void _desmarca() {
    _todoList.forEach((element) {
      if(element['concluido'] == true){
        element['concluido'] = false;
      }
    });
  }



}