import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(MaterialApp(
    home: Home(),
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Lista de Tarefas"),
          backgroundColor: Colors.blueAccent,
          centerTitle: true,
        ),
        body: Column(
          children: <Widget>[
            Container(
                padding: EdgeInsets.fromLTRB(17.0, 1.0, 7.0, 1.0),
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: TextField(
                        controller: _toDoController,
                        decoration: InputDecoration(
                            labelText: "Nova Tarefa",
                            labelStyle: TextStyle(color: Colors.blueAccent)),
                      ),
                    ),
                    RaisedButton(
                      color: Colors.blueAccent,
                      child: Text("ADD"),
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
            ))
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
          _todoList[index]["concluido"] = c;
          _saveData();
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
}
