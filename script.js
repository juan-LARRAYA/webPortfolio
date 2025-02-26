// script.js
document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('#hero h1');
    
    setInterval(() => {
      if (titulo.style.visibility === 'hidden') {
        titulo.style.visibility = 'visible';
      } else {
        titulo.style.visibility = 'hidden';
      }
    }, 1000); // Parpadea cada 1 segundo
  });
  