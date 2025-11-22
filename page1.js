function goToPage(pageNumber) {
  // Buat overlay secara dinamis dengan warna background container
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = '#faf9f6'; // Warna sama dengan background container
  overlay.style.zIndex = '9999';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 2s ease-out';
  overlay.style.webkitTransition = 'opacity 2s ease-out';
  
  document.body.appendChild(overlay);
  
  // Force reflow dan mulai animasi
  setTimeout(() => {
    overlay.style.opacity = '1';
  }, 10);
  
  // Pindah halaman setelah animasi selesai
  setTimeout(() => {
    window.location.href = `page${pageNumber}.html`;
  }, 2000);
}

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(urlParams.get('name') || 'Sahabat yang Dirahmati');
  document.getElementById('visitorName').textContent = name;
});