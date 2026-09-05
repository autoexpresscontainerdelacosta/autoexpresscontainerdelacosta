
const menu = document.querySelector('.hamb');
const nav = document.querySelector('nav');

menu?.addEventListener('click', () => {
  nav.classList.toggle('open');
  menu.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    if (menu) menu.textContent = '☰';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, {threshold:0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.pin').forEach(pin => {
  pin.addEventListener('click', () => {
    document.querySelectorAll('.pin').forEach(p => p.classList.remove('selected'));
    pin.classList.add('selected');
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById('quoteForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = `Solicitud de cotización - ${data.get('empresa') || data.get('nombre') || 'Cliente'}`;
  const body = [
    `Nombre: ${data.get('nombre') || ''}`,
    `Empresa: ${data.get('empresa') || ''}`,
    `Origen: ${data.get('origen') || ''}`,
    `Destino: ${data.get('destino') || ''}`,
    `Peso / carga: ${data.get('carga') || ''}`,
    `Teléfono: ${data.get('telefono') || ''}`,
    `Detalles: ${data.get('detalles') || ''}`
  ].join('\\n');
  // Correo provisional: cámbialo por el correo comercial real antes de publicar.
  window.location.href = `mailto:ventas1.mzo@autoexpresscontainer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
