// ====== MENU TOGGLE (untuk navbar mobile) ======
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// ====== SMOOTH SCROLL untuk semua anchor link ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Jika sedang di mode mobile, tutup menu setelah klik
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle?.classList.remove('active');
    }
  });
});

// ====== GALLERY NAVIGATION BUTTONS ======
const galleryButtons = document.querySelectorAll('.gallery-nav');
if (galleryButtons.length > 0) {
  galleryButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('Gallery navigation clicked:', button.textContent);
      // 💡 nanti bisa tambahkan logika filter gambar di sini
    });
  });
}

// ====== CATEGORY FILTER BUTTONS ======
const categoryButtons = document.querySelectorAll('.flex a');
if (categoryButtons.length > 0) {
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Hapus kelas aktif dari semua tombol
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-romantic', 'text-white');
        btn.classList.add('bg-gray-200', 'text-romantic');
      });

      // Tambahkan kelas aktif ke tombol yang diklik
      this.classList.remove('bg-gray-200', 'text-romantic');
      this.classList.add('bg-romantic', 'text-white');
    });
  });
}
// ====== POPUP DETAIL KARYA ======
const artCards = document.querySelectorAll('.aspect-\\[3\\/4\\]');
const artModal = document.getElementById('artModal');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalDesc = document.getElementById('modalDesc');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

artCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.title;
    const year = card.dataset.year;
    const desc = card.dataset.desc;
    const imgSrc = card.querySelector('img').src;

    modalTitle.textContent = title;
    modalYear.textContent = year;
    modalDesc.textContent = desc;
    modalImage.src = imgSrc;

    artModal.classList.remove('hidden');
    artModal.classList.add('flex');
  });
});

// Tutup modal dengan tombol
closeModal.addEventListener('click', () => {
  artModal.classList.add('hidden');
  artModal.classList.remove('flex');
});

// Tutup modal dengan klik area luar
artModal.addEventListener('click', e => {
  if (e.target === artModal) {
    artModal.classList.add('hidden');
    artModal.classList.remove('flex');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const galleryWrapper = document.getElementById('galleryWrapper');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!galleryWrapper) {
    console.warn('galleryWrapper not found — pastikan elemen dengan id="galleryWrapper" ada di HTML');
    return;
  }
  if (!nextBtn || !prevBtn) {
    console.warn('Tombol next/prev tidak ditemukan — pastikan id="nextBtn" dan id="prevBtn" ada');
    return;
  }

  // Coba cari lebar item pertama untuk menentukan step (termasuk gap)
  const firstItem = galleryWrapper.querySelector('[data-title], img, .group');
  let gap = 16; // fallback gap
  try {
    const cs = getComputedStyle(galleryWrapper);
    // cs.gap mungkin tersedia; jika tidak, pakai fallback
    gap = cs.gap ? parseInt(cs.gap) : gap;
  } catch (e) {}

  const itemWidth = firstItem ? firstItem.offsetWidth : 250;
  const scrollStep = itemWidth + (isNaN(gap) ? 16 : gap);

  // safety: enable smooth scrolling via JS if not present
  galleryWrapper.style.scrollBehavior = 'smooth';

  nextBtn.addEventListener('click', () => {
    galleryWrapper.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    galleryWrapper.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });

  // Optional: keyboard navigation (kiri/kanan)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // Debug: tampilkan info di console saat klik (hapus kalau sudah ok)
  nextBtn.addEventListener('click', () => console.log('NEXT clicked, step:', scrollStep));
  prevBtn.addEventListener('click', () => console.log('PREV clicked, step:', scrollStep));
});