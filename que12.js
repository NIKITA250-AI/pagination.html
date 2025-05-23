const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let limit = 10;
let page = 1;
let loading = false;

async function fetchPhotos(page, limit) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    if (!res.ok) throw new Error(`Error fetching data: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    loader.textContent = err.message;
    return [];
  }
}

function renderPhotos(photos) {
  photos.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${photo.thumbnailUrl}" alt="${photo.title}" title="${photo.title}">`;
    gallery.appendChild(div);
  });
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
    loadMorePhotos();
  }
}

async function loadMorePhotos() {
  loading = true;
  loader.style.display = 'block';
  const photos = await fetchPhotos(page, limit);
  renderPhotos(photos);
  page++;
  loading = false;
  loader.style.display = 'none';
}

loadMorePhotos();

window.addEventListener('scroll', handleScroll);