# materi
Aplikasi Web Manajemen Materi Pembelajaran
Buatkan saya aplikasi web sederhana menggunakan HTML, CSS, JavaScript (vanilla), dan Supabase (Authentication + Database) dengan dua fitur utama:
1. Login pengguna dan 2. Manajemen materi pembelajaran (baca saja).

Fitur Login:

Halaman login responsif dengan input email & password.
Validasi client-side: email valid, password ≥6 karakter.
Gunakan Supabase Auth (email/password).
Redirect ke dashboard.html jika sukses.
Jika akses halaman dashboard tanpa login → redirect ke login.
Dashboard Materi:

Tampilkan daftar materi dari tabel Supabase materials (kolom: id, title, description, content, created_at).
Tampilan card responsif (grid).
Klik “Baca Selengkapnya” → tampilkan content dalam modal popup sederhana.
Tampilkan email pengguna di header dashboard.
Tombol Logout → signOut() → redirect ke login.
Keamanan:

Aktifkan Row Level Security (RLS) di tabel materials agar hanya pengguna terautentikasi yang bisa membaca.
Contoh policy: auth.role() = 'authenticated'.
Desain:

Minimalis, mobile-friendly. Boleh gunakan Tailwind CDN atau CSS murni.
Struktur Proyek:

/css
  └── style.css
/js
  ├── config.js      ← Supabase config
  ├── auth.js        ← login/logout logic
  └── dashboard.js   ← fetch & tampilkan materi
index.html           ← halaman login
dashboard.html       ← halaman materi
Dokumentasi:
Sertakan langkah-langkah:

Buat proyek Supabase.
Aktifkan Email/Password di Authentication.
Buat tabel materials + contoh data (3–5 baris).

Catatan: 

Tidak perlu fitur registrasi — cukup login dengan akun yang sudah dibuat di Supabase Auth.
Tidak ada perbedaan role — semua pengguna login bisa lihat materi.
Fokus pada fungsionalitas inti dan proteksi akses halaman.
