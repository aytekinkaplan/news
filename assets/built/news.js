// DOM yüklendikten sonra çalışacak fonksiyonlar
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeSearch();
  initializeLiveNewsTicker();
});

// Navigasyon menüsünü initialize et
function initializeNavigation() {
  const menuToggle = document.querySelector(".gh-burger");
  const menu = document.querySelector(".gh-head-menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("is-active");
    });
  }
}

// Arama fonksiyonunu initialize et
function initializeSearch() {
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector(".search-input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // Arama sonuçları sayfasına yönlendir
        window.location.href = `/search?term=${encodeURIComponent(searchTerm)}`;
      }
    });
  }
}

// Canlı haber akışını initialize et
function initializeLiveNewsTicker() {
  const newsTicker = document.querySelector(".news-ticker");
  if (newsTicker) {
    fetchLiveNews().then((news) => {
      news.forEach((item) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-ticker-item");
        newsItem.textContent = item.title;
        newsTicker.appendChild(newsItem);
      });
    });
  }
}

// Canlı haberleri getir (örnek fonksiyon)
async function fetchLiveNews() {
  // Bu kısım normalde bir API'den veri çekecek
  return [
    { id: 1, title: "Breaking: Major economic reform announced" },
    { id: 2, title: "New COVID-19 variant discovered in South America" },
    { id: 3, title: "Tech giant unveils revolutionary AI technology" },
  ];
}

// Lazy loading için IntersectionObserver kullan
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      observer.unobserve(img);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  lazyImages.forEach((img) => imageObserver.observe(img));
});

// Sonsuz kaydırma fonksiyonu
let page = 1;
const loadMorePosts = async () => {
  const response = await fetch(`/api/posts?page=${page}`);
  const newPosts = await response.json();

  const postFeed = document.querySelector(".post-feed");
  newPosts.forEach((post) => {
    const postElement = createPostElement(post);
    postFeed.appendChild(postElement);
  });

  page++;
};

// Sayfa sonuna gelindiğinde yeni gönderiler yükle
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMorePosts();
  }
});

// Gönderi elementi oluştur
function createPostElement(post) {
  const article = document.createElement("article");
  article.classList.add("post-card");

  article.innerHTML = `
      <a class="post-card-image-link" href="${post.url}">
          <img class="post-card-image lazy" data-src="${
            post.feature_image
          }" alt="${post.title}">
      </a>
      <div class="post-card-content">
          <a class="post-card-content-link" href="${post.url}">
              <header class="post-card-header">
                  <h2 class="post-card-title">${post.title}</h2>
              </header>
              <div class="post-card-excerpt">${post.excerpt}</div>
          </a>
          <footer class="post-card-meta">
              <time class="post-card-meta-date" datetime="${
                post.published_at
              }">${formatDate(post.published_at)}</time>
          </footer>
      </div>
  `;

  return article;
}

// Tarih formatla
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
