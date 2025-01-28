### BOOTCAMP
=================================
### Material de apoio
[https://github.com/MicrosoftLearning/AZ-204-DevelopingSolutionsforMicrosoftAzure.git] Repo

[https://microsoftlearning.github.io/AZ-204-DevelopingSolutionsforMicrosoftAzure/] 

[https://github.com/MicrosoftLearning/AZ-204-DevelopingSolutionsforMicrosoftAzure/archive/refs/heads/master.zip] Zip


## Comandos
-------------------------------
--> Baixar Azure cli
-az login --> loga pelo terminal
´´´´
Como não consegui logar via az login nunca achava a subscription os passos abaixo funcionaram.

az config set core.encrypt_token_cache=false
az account clear
az config set core.encrypt_token_cache=true

And then:
**az login --use-device-code **


´´´´


- mkdir <name> - cd to dir - clonar dir [ git clone https://github.com/Azure-Samples/html-docs-hello-world  ]
- az group list --query "[].{id:name}" --> lista resource group como json
- az group list --query "[].{id:name}" -o  tsv --> lista resource group como lista
- az webapp up -g <resourse_group> -n <app_name> --html --> sobe WebApp da pasta atual
- g --> resourse group 
- n --> aplicativo
- az webapp log tail --name <appname> --resource-group <resource_name>
- az webapp list --resource-group  <resource-group-name>  --lista todos os resoursegroup
- az webapp list --resource-group <resource-group-name> --query "[?starts_with(name, 'ima')]" --lista groups 
- az webapp list --resource-group <resource-group-name> --query "[?starts_with(name, 'ima')].{Name:name}" --output tsv --lista como tabela
- az webapp deployment source config-zip --resource-group <resource-g-name> --src api.zip --name <name-of-your-web-app> --deploy da api no web app encontrado com o filtro acima (executar de dentro da pasta onde se tem o zip)
- az webapp deployment source config-zip --resource-group <resource-g-name> --src web.zip --name <name-of-your-web-app> --deploy da web front end
- az webapp deployment source config-zip --resource-group dio-az-204LAB --src web.zip --name imgwebtiagoneves001
- az webapp list --resource-group dio-az-204LAB --query "[?starts_with(name, 'img')].{Name:name}" --output tsv
- func azure functionapp publish <func_name> --dotnet-version 8.0 --> Usado para publicar a função no Azure, precisa estar dentro da pasta da function e ter instalado o Azure Functions Core Tools
[https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-csharp]
- az group create --name <resource_group_name> --location <location_name> --> Cria resourcegroup locations (eastus)
- az acr create --resource-group <resourgname> --name <nomecontainer_acr> --sku Basic --> ACR é um gerenciador de imagens tipo o Docker. O nome não pode conter traço
- echo "FROM mcr.microsoft.com/hello-world" > Dockerfile --> Cria um arquivo tipo DockerFile
- az acr build --image sample/hello-world:v1 --registry <nomecontainer_acr> --file Dockerfile --> builda imagem criada anteriormente no acr
- az acr repository list --name acr01az204tiago --> lista imagens existentes
- az acr repository list --name acr01az204tiago table --> lista como tabela
- az acr run --registry acr01az204tiago --cmd '$Registry/sample/hello-world:v1' /dev/null --> sobe e executa a imagem
- az group delete --name <sourcegroupe_name> --no-wait -->deleta o sourcegroup
- DNS_NAME_LABEL=aci_example-tnsousa-$RANDOM -> Definindo label de uma var de ambiente

-- ### Implantando Um Aplicativo de Container 
Executar as acoes abaixo pelo Bash é melhor
- az extension add --name containerapp --upgrade
- az provider register --namespace Microsoft.App --> Prove um namespace para o app
- az provider register --namespace Microsoft.OperationalInsights --> Prove um namespace para o app container

--cria variaveis de ambiente
myRG=dio-az-204LAB
myLocation=eastus
myAppContEnv=az204-tns-env-$RANDOM

--Se a sessão cair a var myAppContEnv precisa ser difinida de acordo com o que foi criado senão mudara o nome devido ao Random
myAppContEnv=az204-tns-env-481


az group create --name $myRG --location $myLocation

# Create a container app
az containerapp env create \
     --name $myAppContEnv \
     --resource-group $myRG \
     --location $myLocation

# implementar Aplicativo dentro do container app
az containerapp create \
    --name my-container-app \
    --resource-group $myRG \
    --environment $myAppContEnv \
    --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
    --target-port 80 \
    --ingress 'external' \
    --query properties.configuration.ingress.fqdn

No final voce conseguirá ver so link do container online

[https://github.com/TheRobBrennan/azure-certification-renewal-az-204-azure-developer-associate/blob/main/azure-container-apps/README.md]

Problemas ao subir o programa para acr, o usuário owner não tem permissao de rodar tasks
az login
az acr login --name conregistrytns440

-- ### Fim Implantando Um Aplicativo de Container



## API Always ON
Detro do Configuration opção Always on --> se estiver ligado a API nunca hiberna


---- > .NET
--  dotnet new console --name lab03 --> Cria um console app local
-- dotnet add package Azure.Storage.Blobs --> adiciona package
-- dotnet build --> builda a aplicacao
-- dotnet run --> roda a aplicacao e retorna o resultado da execução



## Tecnica Blue Green Deployment
-Com esse tipo de tecnica DEVops eu consigo determinar quem irá acessar PRD (blue) e Uat/Pre-prod (green). Os slots de implantação permitem a implatação de aplicativo dinamicos, possibilitando a troca rápida de configuração e conteúdo entre PR e Rollbacks.

-Release Canaria
Posso deixar apenas 1% do meu público caindo nessa nova release.


## Usando Keyvault
mykeyVault=keyvault-az204-tns
resourceName=dio-az-204LAB
myLocation=brazilsouth

-- az keyvault create --name $mykeyVault --resource-group $resourceName --location $myLocation --> Cria o recurso Keyvault, todas as variáveis de ambiente estão com $ antes do nome
-- az keyvault secret set --vault-name $mykeyVault --name "ExemploPass" --value "tns-pass" --> cria um segredo de acesso ao keyvault
**Para a ação acima funcionar:
É necessário conceder permissão "Key Vault Administrator" para o seu usuário.
Entre no recurso KeyVault criado.
Access control (IAM)
Clica no Add role assignment
Filtra por Key Vault Administrator e seleciona
Clica em next
Clica no seu usuário que aparece no canto direito e no botão Select abaixo
Finalmente clica em Review+assign e pronto pode executar o comando novamente.

-- az keyvault secret show --name "ExemploPass" --vault-name $mykeyVault --> recupera acesso à alguma keyvault

func azure functionapp publish funappvalidacpftns --dotnet-version 8.0