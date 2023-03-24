import { API_KEY } from "./config.js";

const greetingSpan = document.getElementById("greeting");
const previsaoTempo = document.getElementById("previsao-tempo");

const now = new Date();
const dateNow = now.getHours();

window.onload = function () {
  var greeting;

  // Define a saudação com base na hora atual
  if (dateNow >= 5 && dateNow < 12) {
    greeting = "Bom dia! Hoje é";
  } else if (dateNow >= 12 && dateNow < 18) {
    greeting = "Boa tarde! Hoje é";
  } else {
    greeting = "Boa noite! Hoje é";
  }

  // Exibe a data e hora atual
  var date = now.toLocaleDateString("pt-BR", {
    weekday: "long",
  });

  var hour = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  greetingSpan.textContent = `${greeting} ${date} às ${hour}`;

  previsaoTempo.textContent = "Carregando previsão do tempo...";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            const description = data.weather[0].description;
            const descriptionCapitalized =
              description.charAt(0).toUpperCase() + description.slice(1);
            const temp = data.main.temp;
            const city = data.name;
            previsaoTempo.textContent = `${descriptionCapitalized} e temperatura de ${temp}°C em ${city}`;
          })

          .catch((error) => {
            console.error(error);
            previsaoTempo.textContent =
              "Não foi possível obter a previsão do tempo";
          });
      },

      (error) => {
        console.error(error);
        previsaoTempo.textContent = "Não foi possível obter a localização";
      }
    );
  } else {
    previsaoTempo.textContent = "Geolocalização não suportada pelo navegador";
  }
};
