var latitude;
var longitude;
var zzz = 20;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log( `Latitude: ${position.coords.latitude} Longitude:   ${position.coords.longitude}`);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  Mapa(latitude, longitude, zzz);
  Clima();
}

var input = document.getElementById("cidade");
input.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    event.preventDefault();
    document.getElementById("botao").click();
  }
});

async function Clima(){
    var cidade = document.getElementById("cidade").value;
   
  
    if(cidade != ""){
      var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=4faef3f6b6fa48b5c01471d24ff954fb&lang=pt_br&units=metric";
    }else{
      var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=4faef3f6b6fa48b5c01471d24ff954fb&lang=pt_br&units=metric";
    }
    
    try {
        const response = await fetch(url);
    if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
    }

    var json = await response.json();
    console.log(json);
    var nome = json.name;
    var temperatura = json.main.temp;
    var ceu = json.weather[0].description;
    ceu = ceu.charAt(0).toUpperCase() + ceu.substring(1);
    var umidade = json.main.humidity;
    var vento = json.wind.speed;
    document.getElementById("cidade").value = nome;
    painel1.innerHTML = "<h3 style='color: #61c0ff'>" + nome + "</h3>";  
    painel2.innerHTML = "<p>" + parseInt(temperatura) + "Cº</p>";
    painel2.innerHTML += "<p>" + ceu + "</p>";
    painel2.innerHTML += "<p>" + umidade + " % Umidade</p>";
    painel2.innerHTML += "<p>" + parseInt(vento) + " Km/h </p>";
    longitude = json.coord.lon;
    latitude = json.coord.lat;
    var url_icone = "https://openweathermap.org/img/wn/"+ json.weather[0].icon +"@2x.png"
    document.getElementById("icone").src = url_icone;
    //painel.innerHTML = painel.innerHTML + JSON.stringify(json);
    var tipoCeu = json.weather[0].main;
    var borda = document.getElementById("centro");
    if(tipoCeu == "Rain"){
        borda.style.borderColor = "rgb(49, 40, 185)";
        painel1.style.color = "rgb(49, 40, 185)";
      }
  
      if(tipoCeu == "Thunderstorm"){
        borda.style.borderColor = "rgb(81, 16, 184)";
        painel1.style.color = "rgb(81, 16, 184)";
      }
  
      if(tipoCeu == "Clear"){
        borda.style.borderColor = "rgb(19, 193, 246)";
        painel1.style.color = "rgb(19, 193, 246)";
      }
  
      if(tipoCeu == "Clouds"){
        borda.style.borderColor = "rgb(78, 96, 102)";
        painel1.style.color = "rgb(78, 96, 102)";
      }

    } catch (error) {
    console.error(error.message);
    }
    Mapa(latitude, longitude, zzz);
}
 function Mapa(lat, lon, zoom){
 
  document.getElementById('mapa').innerHTML = `
  <iframe src="https://embed.waze.com/iframe?
  zoom=${zoom}&lat=${lat}&lon=${lon}in=1"
  width="300" height="600"></iframe>`

}