// 1. Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 2. Fungsi Scroll ke Section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// 3. Fitur Pencarian & Filter
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const plantCards = document.querySelectorAll('.plant-card');

function filterPlants() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    // Hapus pesan "tidak ditemukan" jika ada
    const existingMessage = document.getElementById('no-results');
    if (existingMessage) {
        existingMessage.remove();
    }

    let visibleCount = 0;

    plantCards.forEach(card => {
        // Ambil teks penting dari kartu
        const title = card.querySelector('h2').textContent.toLowerCase();
        const species = card.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const description = card.querySelector('p:nth-of-type(3)').textContent.toLowerCase();

        // Cek apakah teks pencarian muncul di salah satu bagian
        const matchesSearch =
            title.includes(searchText) ||
            species.includes(searchText) ||
            description.includes(searchText);

        // Cek kategori
        const category = card.getAttribute('data-category');
        const matchesCategory = !selectedCategory || category === selectedCategory;

        // Tampilkan atau sembunyikan kartu
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Tampilkan pesan jika tidak ada hasil
    if (visibleCount === 0) {
        const message = document.createElement('p');
        message.id = 'no-results';
        message.textContent = '❌ Tidak ada tumbuhan yang cocok dengan pencarian Anda.';
        message.style.textAlign = 'center';
        message.style.color = '#d32f2f';
        message.style.fontStyle = 'italic';
        message.style.margin = '2rem auto';
        message.style.maxWidth = '800px';
        message.style.fontSize = '1.1rem';

        const container = document.querySelector('.plants-container');
        container.appendChild(message);
    }
}

// Event listener untuk pencarian dan filter
if (searchInput) searchInput.addEventListener('input', filterPlants);
if (categoryFilter) categoryFilter.addEventListener('change', filterPlants);

// Jalankan filter sekali saat halaman dimuat (untuk antisipasi)
if (plantCards.length > 0) {
    filterPlants();
}

// 4. Tombol "Selengkapnya" untuk Expand Deskripsi
document.querySelectorAll('.btn-readmore').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.plant-card');
        const info = card.querySelector('.plant-info');
        const isExpanded = info.classList.toggle('expanded');

        // Ubah teks tombol
        this.textContent = isExpanded ? 'Tutup' : 'Selengkapnya';

        // Opsional: tambahkan animasi halus
        card.style.transition = 'all 0.3s ease';
    });
});

// Tambahkan gaya untuk mode expanded (jika belum ada di CSS)
const style = document.createElement('style');
style.textContent = `
    .plant-info {
        max-height: 200px;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    .plant-info.expanded {
        max-height: 500px;
    }
`;
document.head.appendChild(style);