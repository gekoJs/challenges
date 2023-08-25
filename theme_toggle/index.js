// give to the html the attribute data-theme
const button = document.querySelector('button');
const html = document.querySelector('html');
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

button.addEventListener('click', () => {
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }
});

darkModeMediaQuery.addEventListener('change', (event) => {
  if (event.matches) {
    // Device switched to dark mode
    html.setAttribute('data-theme', 'dark');
  } else {
    // Device switched to light mode
    html.setAttribute('data-theme', 'light');
  }
});

// this goes into css 

// [data-theme="dark"] {
//   --background-body: #f09;
// }
// [data-theme="light"] {
//   --background-body: #fff;
// }