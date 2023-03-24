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
      const githubSection = document.querySelector("#product-hunt .scroll");
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

function HackerNews() {
  fetch("https://api.hackertab.dev/data/v2/hackernews.json")
    .then((response) => response.json())
    .then((data) => {
      const githubSection = document.querySelector("#hackernews .scroll");
      const content = data
        .map(
          (item) => `
    <div class="row-news">
      <a href="${item.url}" target="_blank">
      <p>${item.title}</p>
      </a>
    </div>
    `
        )
        .join("");
      githubSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}

function TabNews() {
  fetch(
    "https://www.tabnews.com.br/api/v1/contents?page=1&per_page=50&strategy=relevant"
  )
    .then((response) => response.json())
    .then((data) => {
      const githubSection = document.querySelector("#tabnews .scroll");
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
      githubSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}

GithubTrending();
ProductHunt();
HackerNews();
TabNews();
