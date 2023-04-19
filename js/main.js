function GithubTrending() {
  fetch("https://api.hackertab.dev/data/v2/github/global/daily.json")
    .then((response) => response.json())
    .then((data) => {
      const githubSection = document.querySelector("#github .scroll");
      const content = data
        .map(
          (item) => `
    <div class="row-news">
      <a href="${item.url}" target="_blank">
      <p><strong>${item.title}</strong>: ${item.description}</p>
      </a>
    </div>
    `
        )
        .join("");
      githubSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}

function ProductHunt() {
  fetch("https://api.hackertab.dev/data/v2/producthunt.json")
    .then((response) => response.json())
    .then((data) => {
      const producthuntSection = document.querySelector("#product-hunt .scroll");
      const content = data
        .map(
          (item) => `
    <div class="row-news">
      <a href="${item.url}" target="_blank">
      <p><strong>${item.title}</strong>: ${item.description}</p>
      </a>
    </div>
    `
        )
        .join("");
      producthuntSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}

function Medium() {
  fetch("https://api.hackertab.dev/data/v2/medium/javascript.json")
    .then((response) => response.json())
    .then((data) => {
      const mediumSection = document.querySelector("#medium .scroll");
      const content = data
        .map(
          (item) => `
    <div class="row-news">
      <a href="${item.url}" target="_blank">
      <p><strong>${item.title}</strong></p>
      </a>
    </div>
    `
        )
        .join("");
      mediumSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}

function TabNews() {
  fetch(
    "https://www.tabnews.com.br/api/v1/contents?strategy=relevant"
  )
    .then((response) => response.json())
    .then((data) => {
      const tabnewsSection = document.querySelector("#tabnews .scroll");
      const content = data
        .map(
          (item) => `
  <div class="row-news">
    <a href="https://tabnews.com.br/${item.owner_username}/${item.slug}" target="_blank">
      <p>${item.title}</p>
    </a>
  </div>
  `
        )
        .join("");
      tabnewsSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// function DailyDev() {
//   fetch("https://cors-everywhere.onrender.com/https://dailydev.up.railway.app/")
//     .then((response) => response.json())
//     .then((data) => {
//       const dailydevSection = document.querySelector("#dailydev .scroll");
//       const content = data
//         .map(
//           (item) => `
//     <div class="row-news">
//       <a href="${item.link}" target="_blank">
//       <p>${item.title}</p>
//       </a>
//     </div>
//     `
//         )
//         .join("");
//       dailydevSection.innerHTML = content;

//       // Salvar dados no cookie
//       setCookie("dailydevData", JSON.stringify(data), 1); // 1 dia de duração do cookie
//     })
//     .catch((error) => console.error(error));
// }

// Função para carregar dados do cookie e chamar a função DailyDev()
function loadFromCookie() {
  const data = getCookie("dailydevData");
  if (data) {
    const parsedData = JSON.parse(data);
    const dailydevSection = document.querySelector("#dailydev .scroll");
    const content = parsedData
      .map(
        (item) => `
  <div class="row-news">
    <a href="${item.link}" target="_blank">
    <p>${item.title}</p>
    </a>
  </div>
  `
      )
      .join("");
    dailydevSection.innerHTML = content;
  }
}

GithubTrending();
Medium();
ProductHunt();
TabNews();
// DailyDev();
