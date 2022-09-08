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


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

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

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


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

![Orçamento](img/02-orcamento.png)
