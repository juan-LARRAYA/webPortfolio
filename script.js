document.addEventListener('DOMContentLoaded', () => {
  // Oculta inicialmente la versión en inglés
  document.querySelectorAll('.lang-en').forEach(el => {
    el.style.display = 'none';
  });

  const btnEs = document.getElementById('btn-es');
  const btnEn = document.getElementById('btn-en');

  btnEs.addEventListener('click', () => {
    document.querySelectorAll('.lang-es').forEach(el => el.style.display = '');
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
    btnEs.classList.add('active');
    btnEn.classList.remove('active');
  });

  btnEn.addEventListener('click', () => {
    document.querySelectorAll('.lang-es').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = '');
    btnEn.classList.add('active');
    btnEs.classList.remove('active');
  });
});
