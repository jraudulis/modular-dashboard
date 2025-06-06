const NEWS_API_KEY = '4ee18cbebdb34b30ab8af59febc9160c';
const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;

async function fetchAndStoreData(container) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = data.articles.slice(0, 5);
        displayNews(container, articles)
        console.log(articles);
    } catch(error) {
      console.log('Error while fetching', error);
    }
}

function displayNews(container, articles) {
    const list = container.querySelector('.news-list');
    list.innerHTML = '';

     articles.forEach(({ title, url, urlToImage }) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('news-image-wrapper');

        const img = document.createElement('img');
        img.src = urlToImage;
        img.alt = title;
        img.classList.add('news-image')

        const li = document.createElement('li');
        li.classList.add('news-item');

        const a = document.createElement('a');
        a.classList.add('news-link');
        a.href = url;
        a.textContent = title;

        imageDiv.appendChild(img);
        list.appendChild(imageDiv);
        li.appendChild(a);
        list.appendChild(li);
     })
}

export function initNews(container) {
    container.innerHTML = `
    <div class="news-widget">
    <h2>Latest News</h2>
    <ul class="news-list">
      <li class="news-item">
        <a href="#" class="news-link" target="_blank">Loading...</a>
      </li>
    </ul>
  </div>
 `;

 fetchAndStoreData(container);
}