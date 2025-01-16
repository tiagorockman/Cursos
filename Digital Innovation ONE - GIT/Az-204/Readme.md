### BOOTCAMP
=================================
## Comandos
-------------------------------
--> Baixar Azure cli
-az login --> loga pelo terminal
-mkdir <name> - cd to dir - clonar dir [ git clone https://github.com/Azure-Samples/html-docs-hello-world  ]
-az group list --query "[].{id:name}" --> lista resource group como json
-az group list --query "[].{id:name}" -o  tsv --> lista resource group como lista
-az webapp up -g <resourse_group> -n <app_name> --html --> sobe WebApp da pasta atual
-g --> resourse group 
-n --> aplicativo
-az webapp log tail --name <appname> --resource-group <resource_name>

Detro do Configuration opção Always on --> se estiver ligado a API nunca hiberna

Tecnica Blue Green Deployment
-Com esse tipo de tecnica DEVops eu consigo determinar quem irá acessar PRD (blue) e Uat/Pre-prod (green). Os slots de implantação permitem a implatação de aplicativo dinamicos, possibilitando a troca rápida de configuração e conteúdo entre PR e Rollbacks.

-Release Canaria
Posso deixar apenas 1% do meu público caindo nessa nova release.

