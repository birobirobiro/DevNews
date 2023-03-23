const greeting = document.getElementById("greeting");
const data = document.getElementById("data");
const hora = document.getElementById("hora");
const previsaoTempo = document.getElementById("previsao-tempo");

const agora = new Date();
const horaAtual = agora.getHours();

window.onload = function () {
  // Define a saudação com base na hora atual
  if (horaAtual >= 5 && horaAtual < 12) {
    greeting.textContent = "Bom dia!";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    greeting.textContent = "Boa tarde!";
  } else {
    greeting.textContent = "Boa noite!";
  }

  // Exibe a data e hora atual
  data.textContent = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });

  hora.textContent = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Obtém a localização do usuário
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Obtém a previsão do tempo da região atual usando a API OpenWeatherMap
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=19d46d1f32ff78d3d8ac964b5063827e&lang=pt_br&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            const descricao = data.weather[0].description;
            const temperatura = data.main.temp;
            previsaoTempo.textContent = `Tempo ${descricao} e temperatura de ${temperatura}°C`;
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
