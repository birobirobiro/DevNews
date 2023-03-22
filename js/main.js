function GithubTrending() {
  fetch('https://api.hackertab.dev/data/v2/github/global/daily.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

function ProductHunt() {
  fetch('https://api.hackertab.dev/data/v2/producthunt.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

function HackerNews() {
  fetch('https://api.hackertab.dev/data/v2/hackernews.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

function TabNews() {
  fetch('https://www.tabnews.com.br/api/v1/contents?page=1&per_page=50&strategy=relevant')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

GithubTrending();
ProductHunt();
HackerNews();
TabNews();