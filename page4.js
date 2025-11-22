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

// Fungsi untuk animasi pantun box
function animatePantunBox() {
  const pantunBox = document.getElementById('pantunBox');
  
  setTimeout(() => {
    pantunBox.classList.add('active');
  }, 500); // Delay agar tidak langsung setelah fade in
}

// Jalankan animasi saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
  fadeInPage();
  animatePantunBox();
});