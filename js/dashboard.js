// js/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Ambil dan tampilkan materi
    fetchMaterials();
    
    // Setup modal
    setupModal();
});

// Fungsi untuk mengambil data materi dari Supabase
async function fetchMaterials() {
    const container = document.getElementById('materials-container');
    
    try {
        // Tampilkan loading
        container.innerHTML = '<p>Memuat materi...</p>';
        
        const { data: materials, error } = await supabase
            .from('materials')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            throw error;
        }
        
        // Tampilkan materi
        displayMaterials(materials);
    } catch (error) {
        console.error('Error mengambil data materi:', error);
        container.innerHTML = '<p class="error">Gagal memuat materi. Silakan refresh halaman.</p>';
    }
}

// Fungsi untuk menampilkan materi dalam bentuk card
function displayMaterials(materials) {
    const container = document.getElementById('materials-container');
    
    if (!materials || materials.length === 0) {
        container.innerHTML = '<p>Tidak ada materi pembelajaran.</p>';
        return;
    }
    
    container.innerHTML = materials.map(material => `
        <div class="material-card">
            <h3>${material.title}</h3>
            <div class="material-date">${formatDate(material.created_at)}</div>
            <p class="material-description">${material.description}</p>
            <button class="btn-read-more" data-id="${material.id}">Baca Selengkapnya</button>
        </div>
    `).join('');
    
    // Tambahkan event listener untuk tombol "Baca Selengkapnya"
    document.querySelectorAll('.btn-read-more').forEach(button => {
        button.addEventListener('click', function() {
            const materialId = this.getAttribute('data-id');
            const material = materials.find(m => m.id == materialId);
            openModal(material);
        });
    });
}

// Fungsi untuk mengatur modal
function setupModal() {
    const modal = document.getElementById('material-modal');
    const closeBtn = document.querySelector('.close');
    
    // Tutup modal ketika tombol close diklik
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Tutup modal ketika area di luar konten modal diklik
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Fungsi untuk membuka modal dengan konten materi
function openModal(material) {
    const modal = document.getElementById('material-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = material.title;
    modalContent.textContent = material.content;
    
    modal.style.display = 'block';
}

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}
