// js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita di halaman login atau dashboard
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Jika di halaman login
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Validasi input email
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', validateEmail);
        
        // Validasi input password
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('blur', validatePassword);
        
        // Cek apakah sudah login, jika ya redirect ke dashboard
        checkAuthStatus();
    }
    
    // Jika di halaman dashboard
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        
        // Cek apakah sudah login, jika tidak redirect ke login
        checkAuthStatus();
    }
});

// Fungsi untuk memeriksa status autentikasi
async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Jika di halaman login dan sudah login, redirect ke dashboard
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        if (session) {
            window.location.href = 'dashboard.html';
        }
    } 
    // Jika di halaman dashboard dan belum login, redirect ke login
    else if (window.location.pathname.includes('dashboard.html')) {
        if (!session) {
            window.location.href = 'index.html';
        } else {
            // Tampilkan email pengguna
            document.getElementById('user-email').textContent = session.user.email;
        }
    }
}

// Fungsi untuk validasi email
function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');
    
    if (!email) {
        emailError.textContent = 'Email harus diisi';
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Format email tidak valid';
        return false;
    }
    
    emailError.textContent = '';
    return true;
}

// Fungsi untuk validasi password
function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    
    if (!password) {
        passwordError.textContent = 'Password harus diisi';
        return false;
    }
    
    if (password.length < 6) {
        passwordError.textContent = 'Password minimal 6 karakter';
        return false;
    }
    
    passwordError.textContent = '';
    return true;
}

// Fungsi untuk menangani login
async function handleLogin(e) {
    e.preventDefault();
    
    // Validasi form
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('login-message');
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) {
            messageDiv.textContent = error.message;
            messageDiv.className = 'message error';
        } else {
            messageDiv.textContent = 'Login berhasil! Mengalihkan...';
            messageDiv.className = 'message success';
            
            // Redirect ke dashboard setelah 1 detik
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    } catch (error) {
        messageDiv.textContent = 'Terjadi kesalahan saat login';
        messageDiv.className = 'message error';
    }
}

// Fungsi untuk menangani logout
async function handleLogout() {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Error saat logout:', error.message);
        }
        
        // Redirect ke halaman login
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Terjadi kesalahan saat logout:', error);
    }
}
