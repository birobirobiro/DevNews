function GithubTrending() {
  fetch("https://api.hackertab.dev/data/v2/github/global/daily.json")
    .then((response) => response.json())
    .then((data) => {
      const githubSection = document.querySelector("#github .scroll");
      const content = data
        .map(
          (item) => {
            let url = item.url;
            let title = item.title;
            let description = item.description;
            return rowNews(url, title, description);
          }
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
          (item) => {
            let url = item.url;
            let title = item.title;
            let description = item.description;
            return rowNews(url, title, description);
          }
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
          (item) => {
            let url = `https://news.ycombinator.com/item?id=${item.id}`;
            let title = item.title;
            return rowNews(url, title);
          }
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
          (item) => {
            let url = `https://tabnews.com.br/${item.owner_username}/${item.slug}`;
            let title = item.title;
            return rowNews(url, title);
          }
        )
        .join("");
      githubSection.innerHTML = content;
    })
    .catch((error) => console.error(error));
}


function rowNews(url, title, description) {
  return `
  <div class="row-news">
    <a href="${url}" target="_blank">
      <p>${description ? `${title}: ${description}`: `${title}`}</p>
    </a>
  </div>
  `
}

GithubTrending();
ProductHunt();
HackerNews();
TabNews();
