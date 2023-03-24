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
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=19d46d1f32ff78d3d8ac964b5063827e&lang=pt_br&units=metric`
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
