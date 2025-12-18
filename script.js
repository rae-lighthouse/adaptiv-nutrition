// Modal open/close + form handling
const modal = document.getElementById('order-modal');
const openBtn = document.querySelector('.primary-button');
const closeBtns = modal.querySelectorAll('[data-close], .modal__close');
const orderForm = document.getElementById('orderForm');
const orderMessage = document.getElementById('orderMessage');

function openModal(){
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  const firstInput = modal.querySelector('input, textarea, button');
  if (firstInput) firstInput.focus();
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  openBtn.focus();
}

openBtn.addEventListener('click', openModal);
closeBtns.forEach(b => b.addEventListener('click', closeModal));
modal.addEventListener('click', (e) => { if(e.target === modal.querySelector('.modal__overlay')) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

// inside openModal()
const iframe = document.getElementById('airtable-embed');
if (iframe && !iframe.src) {
  iframe.src = iframe.dataset.src; // lazy-load the Airtable form

  // Optional: auto-close if Airtable redirects to a same-origin thank-you page
  iframe.addEventListener('load', () => {
    try {
      // Only possible if Airtable redirects to your domain (same origin)
      const loc = iframe.contentWindow.location;
      if (loc && loc.hostname === window.location.hostname) {
        // You can check path or a specific query to be sure this is the success page
        if (loc.pathname.includes('thank-you')) closeModal();
      }
    } catch (err) {
      // cross-origin access will throw — ignore (can't auto-close in that case)
    }
  });
}