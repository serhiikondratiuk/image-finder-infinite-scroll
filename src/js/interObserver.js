const options = {
 rootMargin: '500px',
};
const callback = entries => {
 entries.forEach(entry => {
  if (entry.isIntersecting) {
   console.log(entry);
  }
 });
};

const observer = new IntersectionObserver(callback, options);

const sentinel = document.querySelector('.sentinel');
observer.observe(sentinel);
