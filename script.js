
window.onload = function() {
    preencher();
  };
  
      function calcular() {
          var tn1 = window.document.getElementById('txtn1');
          var tn2 = window.document.getElementById('txtn2');
          var operacao = window.document.getElementById('operacao').value;
          var resultado = window.document.getElementById('resultado');
          var n1 = Number(tn1.value);
          var n2 = Number(tn2.value);
          const url = 'http://240326api.reaperpt.com/operacao.php?operador='+operacao+'&valor1='+n1+'&valor2='+n2;
  
          const xhttpr = new XMLHttpRequest();
          xhttpr.open('GET', url, true);
  
          xhttpr.onload = () => {
              if (xhttpr.status === 200) {
                var s = xhttpr.response;
                resultado.innerHTML = 'A '+ operacao +' entre '+ n1 +' e '+ n2 +' é igual a: '+ s;
              } else {
              }
          };
  
          xhttpr.onerror = () => {
              window.alert('Erro de rede ao realizar o pedido.');
          };
  
          xhttpr.send();
        
        
          
        }
  
        function preencher(){
  
          var select = document.getElementById("operacao");
  
          const url = `http://240326api.reaperpt.com/listaoperacoesxml.php`;
  
          const xhttpr = new XMLHttpRequest();
          xhttpr.open('GET', url, true);
  
          xhttpr.onload = () => {
              if (xhttpr.status === 200) {
                const parser = new DOMParser();
                console.log(xhttpr.response);
                const xmlP = parser.parseFromString(xhttpr.response, "text/xml");
                //const jsonArray = JSON.parse(xhttpr.response);
              
                const operacao = xmlP.getElementsByTagName("operacao");
                
                // Iterate through each book element
                for (let i = 0; i < operacao.length; i++) {
                  console.log( operacao[i].getElementsByTagName("operador")[0].childNodes[0].nodeValue);
                  var newOption = new Option( operacao[i].getAttribute("id"),operacao[i].getElementsByTagName("operador")[0].childNodes[0].nodeValue);
                  select.add(newOption);
                }
  
                /*jsonArray.map(function(item) {
                  var newOption = new Option(item.operacao, item.operador);
                  select.add(newOption);
                });*/
              } else {
              }
          };
  
          xhttpr.onerror = () => {
              window.alert('Erro de rede ao realizar o pedido.');
          };
  
          xhttpr.send();
  
        }