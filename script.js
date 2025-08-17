document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openInvitation');
    const mainContent = document.getElementById('mainContent');
    const hero = document.getElementById('hero');
    const bgMusic = document.getElementById('bgMusic');

    // Set guest name from query param 'to'
    const params = new URLSearchParams(window.location.search);
    const toName = params.get('to');
    if(toName) {
        const guestEl = document.getElementById('guestName');
        if(guestEl) guestEl.textContent = decodeURIComponent(toName.replace(/\+/g, ' '));
    }

    // Navbar section dan mainContent hidden sebelum buka undangan
    const navbarSection = document.getElementById('navbar-section');
    if(mainContent) mainContent.style.display = 'none';
    if(navbarSection) navbarSection.style.display = 'none';

    if(openBtn) {
        openBtn.addEventListener('click', function() {
            if(mainContent) {
                mainContent.style.display = 'block';
            }
            if(navbarSection) navbarSection.style.display = 'block';
            setTimeout(function() {
                window.scrollTo({ top: mainContent.offsetTop - 24, behavior: 'smooth' });
            }, 50);
            if(bgMusic) {
                bgMusic.play().catch(function(err){
                    console.warn('Autoplay blocked:', err);
                });
            }
        });
    }

    // Navbar: semua anchor smooth scroll ke section (id harus sesuai)
    document.querySelectorAll('.bottom-navbar .nav-item').forEach(function(navItem) {
        navItem.addEventListener('click', function(e) {
            const href = navItem.getAttribute('href');
            if(href && href.startsWith('#')) {
                e.preventDefault();
                let target = null;
                try {
                    target = document.querySelector(href);
                } catch(err) {}
                if(target) {
                    if(href === '#hero') {
                        // Tampilkan hero, sembunyikan mainContent, scroll ke hero
                        if(mainContent) mainContent.style.display = 'none';
                        if(hero) {
                            window.scrollTo({ top: hero.offsetTop, behavior: 'smooth' });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    } else {
                        // Tampilkan mainContent jika section di dalamnya
                        if(mainContent && mainContent.style.display === 'none') {
                            mainContent.style.display = 'block';
                        }
                        setTimeout(function() {
                            window.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' });
                        }, 30);
                    }
                }
            }
        });
    });

    // Hero slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    if(slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3500);
    }

    // Thank you section slider
    const thankSlides = document.querySelectorAll('.thankyou-bg-slide');
    let thankCurrent = 0;
    if(thankSlides.length > 1) {
        setInterval(() => {
            thankSlides[thankCurrent].classList.remove('active');
            thankCurrent = (thankCurrent + 1) % thankSlides.length;
            thankSlides[thankCurrent].classList.add('active');
        }, 3500);
    }

    // RSVP Form
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpResult = document.getElementById('rsvpResult');
    if(rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const kehadiran = document.getElementById('kehadiran').value;
            if(nama && kehadiran) {
                rsvpResult.innerHTML = `<p>Terima kasih, <strong>${nama}</strong>. Konfirmasi kehadiran Anda: <strong>${kehadiran === 'hadir' ? 'Hadir' : 'Tidak Hadir'}</strong>.</p>`;
                rsvpForm.reset();
            }
        });
    }

    // Ucapan Form
    const ucapanForm = document.getElementById('ucapanForm');
    const ucapanList = document.getElementById('ucapanList');
    if(ucapanForm && ucapanList) {
        ucapanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('ucapanNama').value.trim();
            const pesan = document.getElementById('ucapanPesan').value.trim();
            const konfirmasi = document.getElementById('ucapanKonfirmasi').value.trim();
            if(nama && pesan && konfirmasi) {
                if(ucapanList.querySelector('.ucapan-empty')) ucapanList.innerHTML = '';
                const ucapanItem = document.createElement('div');
                ucapanItem.className = 'ucapan-item';
                ucapanItem.innerHTML = `<strong>${nama}</strong> <span style="font-size:0.95em;color:#eab676;">(${konfirmasi})</span><br><span style="font-size:1.05em;">${pesan}</span><hr style="border:0;border-top:1px solid #eab676;margin:0.7em 0;">`;
                ucapanList.prepend(ucapanItem);
                ucapanForm.reset();
            }
        });
    }

    // Countdown Wedding Event
    function updateCountdown() {
        // Target: 29 Agustus 2025 08:00:00 WIB (GMT+7)
        var eventDate = new Date('2025-08-29T01:00:00Z'); // 08:00 WIB = 01:00 UTC
        var now = new Date();
        var diff = eventDate - now;
        if (diff < 0) diff = 0;
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var minutes = Math.floor((diff / (1000 * 60)) % 60);
        var seconds = Math.floor((diff / 1000) % 60);
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Copy Rekening
    const copyRekBtn = document.getElementById('copyRekBtn');
    const rekNo = document.getElementById('rekNo');
    if(copyRekBtn && rekNo) {
        copyRekBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(rekNo.textContent.trim());
            const oldText = copyRekBtn.innerHTML;
            copyRekBtn.innerHTML = '<span class="btn-icon">✅</span> Tersalin!';
            setTimeout(() => { copyRekBtn.innerHTML = oldText; }, 1500);
        });
    }

    // Toggle Rekening
    const toggleRekBtn = document.getElementById('toggleRekBtn');
    const rekInfo = document.getElementById('rekInfo');
    const giftRekening = toggleRekBtn ? toggleRekBtn.closest('.gift-rekening') : null;
    if(toggleRekBtn && rekInfo && giftRekening) {
        toggleRekBtn.addEventListener('click', function() {
            if(giftRekening.classList.contains('active')) {
                giftRekening.classList.remove('active');
                rekInfo.style.display = 'none';
                toggleRekBtn.innerHTML = '<span class="btn-icon">🔍</span> Lihat Rekening';
            } else {
                giftRekening.classList.add('active');
                rekInfo.style.display = 'block';
                toggleRekBtn.innerHTML = '<span class="btn-icon">✖️</span> Sembunyikan Rekening';
            }
        });
    }
});
