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
  overlay.style.transition = 'opacity 2s ease-out'; // Durasi diperpanjang jadi 2 detik

  document.body.appendChild(overlay);

  // Force reflow dan mulai animasi
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 50); // Delay kecil agar CSS transition aktif

  // Hapus overlay setelah animasi selesai
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 2000); // Sesuaikan dengan durasi CSS
}

// Fungsi untuk tab navigation (Sangat Sederhana dan Langsung)
function setupTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab'); // Ambil ID tab target dari data-tab
      const targetContent = document.getElementById(targetTabId); // Temukan elemen konten target

      // Cek apakah tombol yang diklik adalah tombol yang sedang aktif
      if (btn.classList.contains('active')) {
        // Jika ya, tidak perlu lakukan apa-apa
        return;
      }

      // Hapus class 'active' dari semua tombol
      tabBtns.forEach(b => b.classList.remove('active'));

      // Hapus class 'active' dari semua konten tab
      tabContents.forEach(content => content.classList.remove('active'));

      // Tambahkan class 'active' ke tombol yang diklik
      btn.classList.add('active');

      // Tambahkan class 'active' ke konten tab yang sesuai
      targetContent.classList.add('active');
    });
  });

  // Inisialisasi: Pastikan tab pertama aktif saat halaman dimuat
  // Cari tombol pertama dan aktifkan secara otomatis
  const firstTabBtn = document.querySelector('.tab-btn');
  const firstTabContent = document.querySelector('.tab-content'); // Ambil ID dari konten pertama

  if (firstTabBtn && firstTabContent) {
    // Hapus class 'active' dari semua (jika ada)
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Tambahkan class 'active' ke yang pertama
    firstTabBtn.classList.add('active');
    firstTabContent.classList.add('active');
  }
}

// Jalankan animasi dan setup tab saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
  fadeInPage();
  setupTabNavigation();
});