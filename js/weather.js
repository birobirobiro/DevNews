import { API_KEY } from "./config.js";

const greeting = document.getElementById("greeting");
const data = document.getElementById("data");
const hora = document.getElementById("hora");
const previsaoTempo = document.getElementById("previsao-tempo");

const now = new Date();
const dateNow = now.getHours();

window.onload = function () {
  // Define a saudação com base na hora atual
  if (dateNow >= 5 && dateNow < 12) {
    greeting.textContent = "Bom dia! Hoje é";
  } else if (dateNow >= 12 && dateNow < 18) {
    greeting.textContent = "Boa tarde! Hoje é";
  } else {
    greeting.textContent = "Boa noite! Hoje é";
  }

  // Exibe a data e hora atual
  data.textContent = now.toLocaleDateString("pt-BR", {
    weekday: "long",
  });

  hora.textContent = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  previsaoTempo.textContent = "Carregando previsão do tempo...";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        // Para usar a localização do navegador, descomente esse código
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Latitude e longitude de São Paulo
        // const latitude = -23.5489;
        // const longitude = -46.6388;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            const description = data.weather[0].description;
            const descriptionCapitalized =
              description.charAt(0).toUpperCase() + description.slice(1);
            const temp = data.main.temp;
            const tempFormatted = temp.toFixed(0);
            const city = data.name;
            const weatherIconCode = data.weather[0].icon;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

            previsaoTempo.innerHTML = `
            <div class="info-weather">
            <img src="${weatherIconUrl}" alt="${descriptionCapitalized}"/> ${descriptionCapitalized} e temperatura de ${tempFormatted}°C em ${city}
            </div>`;
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
