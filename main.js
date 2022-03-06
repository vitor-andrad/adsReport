// SETUP BASE DA REQUISIÇÃO À API DO FACEBOOK
var api_base_url = "https://graph.facebook.com/v12.0/act_";
var ad_account_id = "999999999999458";

// User token. Link para consultar validade do token e gerar novos: 
// https://developers.facebook.com/tools/debug/accesstoken/?access_token=
var token = "&access_token=EAA87894sdhND5d457fbBSSdx54dS54D54545b4nm87DdSSEAA87894sdhND5d457fbBSSdx54dS54D54545b4nm87DdSS";


// Setup da planilha do google sheets que receberá os dados
// Documentação para ajuda >>> https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openbyidid 
var ss = SpreadsheetApp.openByUrl("UrlDaPlanilhaAqui");
var sheetName = "NomeDaPaginaDaPlanilhaAqui"; // Nome da página da planilha 
var sheet = ss.getSheetByName(this.sheetName); 


// Setup dos campos a serem retornados pela requisição
// Nível de agrupamento dos dados. Valores possíveis: ad, adset, campaign, account
var level = '/insights?level=ad';

// Campos e métricas a serem retornados
var fields = '&fields=campaign_name%2cadset_name%2cad_name%2cad_id%2cspend%2creach%2cimpressions%2cinline_link_clicks%2cactions%2caction_values';

// Período do relatório
var datePreset = "&date_preset=yesterday"; 
// Também é possível utilizar "&time_range=%7B'since':'2022-02-12'%2c'until':'2022-02-16'%7D&time_increment=1";


var request = fetch(api_base_url + ad_account_id + level + fields + datePreset + token);
var adInsight = request.data;
var paging = request.paging;

function insertInsight() {

  if (adInsight != undefined) {
    registra(adInsight);
  }

  if(paging.next != undefined){
    while(paging.next != undefined){
      next(paging.next);
    }
  }
}

function registra(adInsight){

  var valorGasto, alcance, impressoes, cliques, compras, adId, checkout, valorVendido = 0;
  var campanha, conjunto, criativo = "";

  for (var x = 0; x < adInsight.length; x++) {

    valorGasto = parseFloat(adInsight[x].spend);
    alcance = parseInt(adInsight[x].reach);
    impressoes = parseInt(adInsight[x].impressions);
    cliques = adInsight[x].inline_link_clicks !== undefined ? parseInt(adInsight[x].inline_link_clicks) : 0;
    adId = parseInt(adInsight[x].ad_id);
    carrinho = getCarrinho(x);
    checkout = getCheckout(x);
    compras = getCompras(x);
    valorVendido = getValorVendido(x);
    campanha = adInsight[x]['campaign_name'];
    conjunto = adInsight[x]['adset_name'];
    criativo = adInsight[x]['ad_name'];
    timestamp = new Date(adInsight[x].date_start);

    sheet.appendRow([Utilities.formatDate(timestamp, "GMT", "dd/MM/yyyy"), campanha, conjunto, criativo, adId, valorGasto, alcance, impressoes, cliques, checkout, compras, valorVendido]);

  }
  return
}

function next(next){
  request = fetch(next);
  adInsight = request.data;
  paging = request.paging;
  registra(adInsight);
  return
}

function getCarrinho(z) {
  if (adInsight[z].actions !== undefined) {
    for (var i = 0; i < adInsight[z].actions.length; i++) {

      if (adInsight[z].actions[i].action_type === "add_to_cart") {
        return parseInt(adInsight[z].actions[i].value);
        break;
      }
    }
  }
  return 0;
}

function getCheckout(z) {
  if (adInsight[z].actions !== undefined) {
    for (var i = 0; i < adInsight[z].actions.length; i++) {

      if (adInsight[z].actions[i].action_type === "initiate_checkout") {
        return parseInt(adInsight[z].actions[i].value);
        break;
      }
    }
  }
  return 0;
}

function getCompras(z) {
  if (adInsight[z].actions !== undefined) {
    for (var i = 0; i < adInsight[z].actions.length; i++) {

      if (adInsight[z].actions[i].action_type === "purchase") {
        return parseInt(adInsight[z].actions[i].value);
        break;
      }
    }
  }
  return 0;
}

function getValorVendido(z) {
  if (adInsight[z].action_values !== undefined) {
    for (var i = 0; i < adInsight[z].action_values.length; i++) {
      if (adInsight[z].action_values[i].action_type === "omni_purchase") {
        return parseFloat(adInsight[z].action_values[i].value);
        break;
      }
    }
  }
  return 0;
}

function fetch(url) {
  var source = UrlFetchApp.fetch(url, { 'muteHttpExceptions': true }).getContentText();
  var data = JSON.parse(source);
  return data;
}