// Fungsi untuk pindah ke page tertentu
function goToPage(pageNumber) {
  // Langsung pindah halaman tanpa overlay
  window.location.href = `page${pageNumber}.html`;
}

// Fungsi untuk animasi fade in dari background gelap ke terang
function fadeInPage() {
  // Buat overlay dengan warna background container (#faf9f6)
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = '#faf9f6'; // Warna sama dengan background container
  overlay.style.zIndex = '9999';
  overlay.style.opacity = '1';
  overlay.style.transition = 'opacity 2s ease-out'; // Durasi 2 detik
  
  document.body.appendChild(overlay);
  
  // Force reflow dan mulai animasi
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 50);
  
  // Hapus overlay setelah animasi selesai
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 2000);
}

// Fungsi untuk animasi gift boxes
function animateGiftBoxes() {
  const giftBoxes = document.querySelectorAll('.gift-box');
  
  giftBoxes.forEach((box, index) => {
    setTimeout(() => {
      box.classList.add('active');
    }, index * 300); // Delay antar box
  });
}

// Jalankan animasi saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
  fadeInPage();
  animateGiftBoxes();
});