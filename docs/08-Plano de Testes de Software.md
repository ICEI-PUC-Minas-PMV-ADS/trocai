# Plano de Testes de Software


<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Os requisitos para realização dos testes de software são:
- API publicada na Internet e apk disponível para download
- Emulador Android ou ios ou aparelho android ou ios 
- Conectividade de Internet para acesso às plataformas (APIs)

Os testes funcionais a serem realizados no aplicativo são descritos a seguir.

<br>

|Caso de teste   | CT-001 - Sistema deve permitir busca de usuários
|------|-----------------------------------------|
|Requisitos associados | RF-001​​ Permitir que o usuário busque colegas que tenham turnos livres num determinado dia ​ <br/>
|Objetivo do teste | Verificar se o sistema permite que o usuário busque outros usuários
|Critérios de Êxito | <ul><li>Pesquisa por data deve funcionar </li> <li>Dados devem ser buscados do banco de dados</li> <li> Usuários disponíveis devem aparecer </li></ul>

<br>

|Caso de teste   | CT-002 - Sistema deve permitir que usuários enviem pedidos de troca
|------|-----------------------------------------|
|Requisitos associados | RF-002​  	Permitir que o usuário envie pedidos de troca
|Objetivo do teste | Verificar se o sistema permite que usuário envie pedidos de troca
|Critérios de Êxito | <ul><li>Aparecer mensagem de êxito ao relizar envio </li><li>Envio registrado no banco de dados</li></ul>

<br>

|Caso de teste   | CT-003 - Sistema deve permitir que usuários recebam pedidos de troca
|------|-----------------------------------------|
|Requisitos associados | RF-003  Permitir que o usuário receba pedidos de troca​
|Objetivo do teste | Verificar se o sistema permite que usuário receba pedidos de troca
|Critérios de Êxito | <ul><li>Ao visualizar pedidos, os recebidos devem aparecer.</li></ul>

<br>

|Caso de teste   | CT-004 - Sistema deve permitir que o usuário visualize pedidos de troca enviados por ele
|------|-----------------------------------------|
|Requisitos associados | RF-04 Permitir que o usuário visualize pedidos de troca enviados por ele​​
|Objetivo do teste |  Verificar se o sistema permite que o usuário visualize pedidos de troca que por ele foram enviados
|Critérios de Êxito | <ul><li>A lista de pedidos enviados trárá os pedidos enviados pelo usuário.</li></ul>

<br>

|Caso de teste   | CT-005 - Sistema deve permitir que o usuário visualize pedidos de troca recebidos
|------|-----------------------------------------|
|Requisitos associados | RF-005​​ Permitir que o usuário visualize pedidos de troca recebidos
|Objetivo do teste | Verficar se o sistema permite que o usuário visualize pedidos de troca recebidos
|Critérios de Êxito | <ul><li>A lista trará os pedidos enviados a ele.</li></ul>

<br>

|Caso de teste   | CT-006 - Sistema deve permitir que o usuário aceite pedidos de troca
|------|-----------------------------------------|
|Requisitos associados | RF-006 - Permitir que o usuário aceite pedidos de troca
|Objetivo do teste | Verficar se o sistema permite que o usuário aceite pedidos de troca
|Critérios de Êxito | <ul><li>O usuário deve conseguir, através da UI, aceitar o pedido de troca.</li></ul>

<br>

|Caso de teste   | CT-007 - Sistema deve permitir que o usuário rejeite pedidos de troca
|------|-----------------------------------------|
|Requisitos associados | RF-007 - Permitir que o usuário rejeite pedidos de trocas
|Objetivo do teste | Verficar se o sistema permite que o usuário rejeite pedidos de trocas
|Critérios de Êxito | <ul><li>Na lista, ao clicar em rejeitar, o pedido deve ser rejeitado e avisado ao outro usuário.</li></ul>

<br>

## Técnica de Testes
Os testes serão realizados utilizando o a técnica de teste de caixa-preta, teste funcional, para validação dos requisitos. 
