// API keys normally would be stored in .env variables on server
 const NEWS_API_KEY = '4ee18cbebdb34b30ab8af59febc9160c';
const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;

// Fetch API news data 
async function fetchAndStoreData(container) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // From all the response data extract only first 5 news articles
        const articles = data.articles.slice(0, 5);
        displayNews(container, articles)
        console.log(articles);
    } catch(error) {
      console.log('Error while fetching', error);
    }
}

function displayNews(container, articles) {
  // When refresh clear the existing list so only the latest news articles are shown
    const list = container.querySelector('.news-list');
    list.innerHTML = '';
  // Loop through the articles array (because each article is an object), destructure the title, URL, and image URL, then build and append UI elements for each article
     articles.forEach(({ title, url, urlToImage }) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('news-image-wrapper');
// Create <a> image link element and add href with link to article
        const imageLink = document.createElement('a');
        imageLink.href = url;
// Create image element and add source and other data
        const img = document.createElement('img');
        img.href = url;
        img.src = urlToImage;
        img.alt = title;
        img.classList.add('news-image')

        const li = document.createElement('li');
        li.classList.add('news-item');
// Create clickable news headline with link to article
        const a = document.createElement('a');
        a.classList.add('news-link');
        a.href = url;
        a.textContent = title;
// Append all the elements
        imageDiv.appendChild(imageLink);
        imageLink.appendChild(img)
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