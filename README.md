<p align="center">
    <h1 align="center">📈 Planilhamento automatizado do Facebook Ads 📈‍</h1>
</p>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />

  <a href="https://www.linkedin.com/in/vitor-andrade-mkt/" target="_blank">
    <img alt="Linkedin: vitor-andrade-mkt" src="https://img.shields.io/badge/-vitor--andrade--mkt-gray?style=flat&logo=linkedin" />
  </a>
</p>

---

## Introdução:
Desenvolvi esse script como forma de otimizar o meu trabalho enquanto gestor de tráfego e coordenador de um time.

O objetivo é que diariamente sejam registrados em uma planilha todos os resultados das campanhas veiculadas no dia anterior.

---

## Instruções
### Como funciona:
Trata-se de um script simples que é executado sem custo no [Google Apps Scripts](https://script.google.com/). 

É possível configurar para que seja executado todos os dias em um determinado horário automaticamente.

O script realiza uma requisição à API de insights do facebook que retorna os dados solicitados. Com os dados já no script é possível tratá-los e armazená-los em uma planilha do google ou em algum banco de dados.

---

### Pré requisitos:
* Conta de desenvolvedor no facebook (Instruções de como criar: https://developers.facebook.com/docs/development/register)
* Gmail ou G Suite

Isso é tudo o que você irá precisar.

---

### 5 Passos para começar a utilizar:
- 1) O primeiro passo é criar a planilha que receberá os dados diariamente. https://docs.google.com/spreadsheets/u/0/ ;<br>
- 2) Com a planilha criada, recomendo nomear a Página e as colunas de acordo com os dados que irá coletar diariamente;<br>
_Antes_
<img src="https://i.ibb.co/yd4G5Xg/Planilha-inicial.png" alt="Planilha-inicial" border="0"> <br>
_Depois_
<img src="https://i.ibb.co/b7SQG94/Planilha-configurada.png" alt="Planilha-configurada" border="0"><br>
- 3) Agora abra o [Google Apps Scripts](https://script.google.com/home) e clique em "Novo Projeto". Copie todo o script que está aqui no arquivo "main.gs" e cole substituindo o código que está no seu projeto do Apps Script;
<img src="https://i.ibb.co/mN24Brk/Apps-script-configurado.png" alt="Apps-script-configurado" border="0"><br>
- 4) Importante! Agora você precisará editar o código para a sua necessidade;
    - Na linha 3 substitua os números pelo id da conta de anúncios que deseja buscar os dados;
        ```js
        var ad_account_id = "999999999999458";
        //Substitua pelo ID da sua conta de anúncios
        ```

    - Na linha 7 substitua o token de exemplo por um que seja válido. Você pode obter um token através do [Explorador da Graph API](https://developers.facebook.com/tools/explorer/) clicando em "Generate Access Token";
        - Esse token dura aproximadamente 1h então seria inviável utilizá-lo, mas você pode prolongar para 3 meses a vida útil dele neste link: https://developers.facebook.com/tools/debug/accesstoken/?access_token= rolando a página até o final e clicando em "Estender token de acesso".
        
        ```js
        var token = "&access_token=EAA87894sdhND5d457fbBSSdx54dS54D54545b4nm87DdSSEAA87894sdhND5d457fbBSSdx54dS54D54545b4nm87DdSS";
        ```
    
    - Nas linhas 12 e 13 insira a URL e o nome da página da sua planilha, respectivamente;
        ```js
        var ss = SpreadsheetApp.openByUrl("UrlDaPlanilhaAqui");
        var sheetName = "NomeDaPaginaDaPlanilhaAqui"; // Nome da página da planilha 
        ```

    - Na linha 19 é possível configurar se os dados serão agrupados em nível de anúncio, conjunto, campanha ou conta. Os valores possíveis estão comentados na linha 18 do código.<br>
    - **Para entender e personalizar os outros campos do código você pode consultar a documentação da [API de Marketing do Facebook](https://developers.facebook.com/docs/marketing-apis/)** <br>
- 5) Com o código pronto vamos à execução:
    - Dê um nome ao seu projeto e clique em "Salvar"
<img src="https://i.ibb.co/LS2ZY0z/C-digo-Pronto.png" alt="C-digo-Pronto" border="0">

    - Após salvar garanta que a função selecionada é _InsertInsight_ e clique em _Executar_
<img src="https://i.ibb.co/pWgTcZw/executar.png" alt="executar" border="0">

    - Surgirá um pop-up solicitando a permissão para executar o script em seu nome. Clique em _Revisar Permissões_ em seguida escolha a sua conta do google que utilizou para criar a planilha.<br>
    - Caso apareça o aviso "O Google não verificou este app", basta clicar em "Avançado" e depois em "Acessar". <br>
    - Finalmente, clique em "Permitir"

**_Neste ponto o seu script já está funcionando e a sua planilha já foi preenchida._**

---

### Agora vamos configurar as execuções diárias.

- Ainda no Apps Script procure pelo ícone de _despertador_ no menu à esquerda e clique nele.
- Em seguida, clique em "Adicionar Acionador"
- Preencha da seguinte forma:
    ```
    Escolha a função que será executada
    [insertInsight]

    Escolha qual implantação deve ser executada
    [Teste]

    Selecione a origem do evento
    [Baseado no Tempo]

    Selecione o tipo de acionador com base no tempo
    [Contador de dias]

    Selecione a hora do dia
    [4h às 5h]
    ```
- Clique em Salvar

**🎉Pronto! O seu script será executado automaticamente todos os dias entre as 4h e 5h da manhã.**

#### Parabéns! Agora você já pode utilizar o seu tempo com o que mais importa. 

---

## Desafio
Com os dados em mãos, que tal criar um dashboard no Google Data Studio como esse abaixo?

<img src="https://i.ibb.co/nk7011W/Dashboard.png" alt="Dashboard" border="0">

---

## 👤 Author

**Vitor Andrade**

* Website: https://www.vitorandrade.me
* Instagram: [@vitor_._andrade](https://www.instagram.com/vitor_._andrade)
* Github: [@vitor-andrad](https://github.com/vitor-andrad)
* LinkedIn: [vitor-andrade-mkt](https://linkedin.com/in/vitor-andrade-mkt)

## 👏🏽 Mostre o seu apoio

Marque com uma ⭐️ se esse projeto te ajudou!

---

## 📝 Licença

Copyright © 2022 [Vitor Andrade](https://github.com/vitor-andrad).<br>
Esse projeto possui licença [MIT](https://github.com/vitor-andrad/adsReport/blob/main/LICENSE).
