# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Nos quadros abaixo são apresentadas as personas definidas durante o processo de entendimento do problema.


| <img src="img/Camila.jpg" width="100" height="100"> | **Camila Silva** <br> 29 anos   |
|:---------------------------------------:|:-------------------------------:|
|**Ocupação** |<br> Lojista <br> Possui ensino médio completo.|
|**Motivação** |<br> Quer ter mais facilidade para trocar dias da escala de trabalho.
|**Dispositivos** | Samsung Galaxy |
|**Aplicativos** |Instagram <br>  |  

<br><br>

| <img src="img/Jonas.jpg" width="100" height="100"> | **Jonas Pereira** <br> 35 anos   |
|:---------------------------------------:|:-------------------------------:|
|**Ocupação** |<br> Técnico de enfermagem <br> Possui ensino técnico completo.|
|**Motivação** |<br> Trabalha em dois hospitais e gostaria de uma solução prática, onde consiga trocar os horários do turno do trabalho com colegas de uma forma mais rápida e sem burocracias.
|**Dispositivos** | Motorola Edge |
|**Aplicativos** |Instagram <br> Tiktok  |  

<br><br>

| <img src="img/Fernanda.jpeg" width="100" height="100"> | **Fernanda Sá** <br> 30 anos   |
|:---------------------------------------:|:-------------------------------:|
|**Ocupação** |<br> Gerente de Logística <br> Administradora com especialização e mestrado em logística.|
|**Motivação** |<br> Atua em uma multinacional e precisa controlar trocas de turnos dos mais de 100 colaboradores de seu time em uma planilha em excel. Sua motivação é um sistema que seja fácil realizar troca de turnos.
|**Dispositivos** | iPhone 12 |
|**Aplicativos** |LinkedIn |  

<br><br>

| <img src="img/Carlos%20Brito.png" width="100" height="100"> | **Carlos Brito** <br> 42 anos   |
|:---------------------------------------:|:-------------------------------:|
|**Ocupação** |<br> Jornalista e Redator <br> Ensino superior em Comunicação Social - Jornalismo.|
|**Motivação** |<br> Trabalha há 14 anos em uma grande emissora e possui dificuldade para trocar turnos quando há necessidade, devido as informações ficarem restritas apenas as diretorias. Por trabalhar com escala de plantão, acredita que um sistema aberto que mostre as pessoas escaladas por turno, haveria mais flexibilidade para realizar trocas sempre que houvesse um imprevisto.
|**Dispositivos** | iPhone 11 |
|**Aplicativos** |LinkedIn <br> Instagram |  

<br><br>

| <img src="img/Samuel.jpeg" width="100" height="100"> | **Samuel Andrade** <br> 21 anos   |
|:---------------------------------------:|:-------------------------------:|
|**Ocupação** |<br> Garçom <br> Estudante de engenharia.|
|**Motivação** |<br> Trabalha há 1 ano como garçom em uma rede de restaurantes localizada dentro de um shopping center, com funcionamento de domingo a domingo das 9:00 às 22:00. Ele precisa realizar trocas de turnos com frequência devido os horários da faculdade que são incertos. Um sistema iria agilizar o processo, pois ele conseguiria ver quais garçons estariam disponíveis nos dias que ele precisa.
|**Dispositivos** | Samsung A12 |
|**Aplicativos** | Instagram |  

<br><br>


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Criar cadastro como usário         | Conseguir acessar paltaforma           |
|Usuário do sistema  | Enviar solicitações de troca de escala diretamente para um colaborador| Realizar troca de escala |
|Usuário do sistema  | Aceitar pedidos de troca de escala | Substituir colaborador que precisa da troca  |
|Usuário do sistema  | Negar solicitações de troca de escala | Rejeitar pedidos de troca |
|Usuário do sistema  | Visualizar solicitações de troca de escala | Aceitar ou rejeitar as solicitações |
|Administrador       | Criar cadastro como gestor         | Conseguir acessar a plataforma         |
|Administrador       | Alterar permissões                 | Permitir que outros perfis possam administrar contas |
|Administrador       | Visualizar histórico de trocas realizadas       | Controlar as escalas|
|Administrador       | Notificar trocas aceitas           | Acompanhar em tempo real as mudanças |
|Administrador       | Editar informações cadastrais      | Manter as informações sempre atualizadas |


<br><br>


## Modelagem do Processo de Negócio 

### Análise da Situação Atual

No modelo atual, para que um funcionário consiga fazer a troca de turno com outro funcionário, deve ser feito um pedido manual ao seu gestor, que fica encarregado de analisar os horários de funcionários disponíveis para a troca, comunicar com o funcionário que está disponível e trazer a resposta ao funcionário que pediu a troca. Nesse modelo, existem muitos processos manuais que poderiam ser automatizados para facilitar a troca de turno entre os funcionários.

### Descrição Geral da Proposta

No nosso modelo, trazemos a automatização do processo de comunicação e aprovação do pedido de troca, passamos a responsabilidade de análise de horário para o próprio funcionário e diminuímos o tempo gasto com a troca de turnos.

### Processo 1 – PROCESSO MANUAL

![Processo 1](https://i.imgur.com/oaUERtT.png)


### Processo 2 – PROCESSO TROCAÍ


![Processo 2](https://i.imgur.com/WEs14bY.png)

## Indicadores de Desempenho

| # | Indicador | Objetivos | Descrição | Cálculo | Fonte | Perspectiva|  
|---|-----------|-----------|-----------|---------|-------|------------|
| 1 | Downloads | Acompanhar o crescimento do aplicativo | Avaliar a taxa de downloads realizados na loja| nº de downloads / período | Playstore | Crescimento e Aprendizado |
| 2 | Usuários Cadastrados | Mensurar a quantidade de cadastros efetuados no aplicativo | Avaliar a taxa de cadastros realizados no aplicativo após o download | nº de cadastros / período | Banco de Dados| Crescimento e Aprendizado |
| 3 | Engajamento | Avaliar o sucesso do aplicativo | O engajamento medirá o tempo em que as pessoas permanecem utilizando o aplicativo e quantas vezes ele é aberto | Realizado pela ferramenta Google Mobile App Analytics | Google Mobile App Analytics | Crescimento e Aprendizado |
| 4 | Avaliação | Acompanhar as opiniões de usuários | Analisar os comentários dos usuários | Análise direta da nota | Playstore | Crescimento e Apendizado | 
| 5 | Desinstalação | Compreender as razões que levaram à desinstalação | Avaliar o que pode ser mudado para prevenir outras desinstalações do aplicativo | nº de desinstalações / período | Playstore | Processos Internos | 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário busque colegas que tenham turnos livres num determinado dia | ALTA | 
|RF-002| Permitir que o usuário envie pedidos de troca  | ALTA |
|RF-003| Permitir que o usuário receba pedidos de troca  | ALTA |
|RF-004| Permitir que o usuário visualize pedidos de troca enviados por ele  | ALTA |
|RF-005| Permitir que o usuário visualize pedidos de troca recebidos  | ALTA |
|RF-006| Permitir que o usuário aceite pedidos de troca  | ALTA |
|RF-007| Permitir que o usuário rejeite pedidos de troca  | ALTA |
|RF-008| Notificar usuários envolvidos em qualquer alteração de escala realizada  | ALTA |
|RF-009| Notificar gerentes de todas as alterações de escala realizadas  | MÉDIA |
|RF-010| Permitir que o gerente vizualize a escala de todos os funcionários  | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| Pedidos de troca deverão poder ser enviados desde um dispositivo móvel |  ALTA | 
|RNF-003| Pedidos de troca deverão poder ser enviados desde uma página web |  ALTA | 
|RNF-004| A informação do usuário deve ser mantida em uma base de dados segura |  ALTA | 
|RNF-005| A API do sistema será desenvolvida em linguagem JAVA |  ALTA | 
|RNF-006| A informação do programa será mantida em uma base de dados NOSQL |  ALTA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O projeto contemplará casos simplificados de trocas, em que a legislação trabalhista e maiores complexidades serão desconsideradas        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.


## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

Com o objetivo de mapear e explicitar as dependências internas e externas do projeto, desenvolvemos uma matriz de rastreabilidade de requisitos (Requirements Traceability Matrix - RTM).

Esse tipo de ferramenta facilita a visualização do relacionamento entre requisitos, artefatos e stakeholders, permitindo rastrear a ligação entre eses elementos. Esse rastreamento, por sua vez, é essencial para gerenciar a evolução do projeto, uma vez que permite monitorar, com mais clareza, o impacto gerado por mudanças solicitadas ao longo do desenvolvimento do produto.

A matriz que elaboramos está em constante atualização e será atualizada à medida em que avancemos com nosso projeto.

![Matriz de rastreabilidade](https://i.imgur.com/sPBFV3C.png)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.


