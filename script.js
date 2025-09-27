
document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      if(nav.style.display === 'flex') nav.style.display = 'none';
      else nav.style.display = 'flex';
    });
  }

  // Reveal gallery images on scroll
  const imgs = document.querySelectorAll('.grid img');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.15});
  imgs.forEach(img=>io.observe(img));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('.lb-content img');
  const thumbs = Array.from(document.querySelectorAll('.lightbox-thumb'));
  let current = 0;

  function openLightbox(index){
    current = index;
    lbImg.src = thumbs[index].dataset.full || thumbs[index].src;
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){ lightbox.setAttribute('aria-hidden','true'); }
  function nextLightbox(){ current = (current+1) % thumbs.length; openLightbox(current); }
  function prevLightbox(){ current = (current-1 + thumbs.length) % thumbs.length; openLightbox(current); }

  thumbs.forEach((t,i)=> t.addEventListener('click', ()=> openLightbox(i)));
  lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lb-next').addEventListener('click', nextLightbox);
  lightbox.querySelector('.lb-prev').addEventListener('click', prevLightbox);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLightbox(); if(e.key==='ArrowRight') nextLightbox(); if(e.key==='ArrowLeft') prevLightbox(); });

  // Contact form handler
  window.handleContact = function(e){
    e.preventDefault();
    alert('Thanks! Your message has been received (demo).');
    e.target.reset();
  };
});
