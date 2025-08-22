// scroll.js

// Smooth scroll + highlight active section
document.querySelectorAll('header nav a').forEach(anchor => {
    tabIndex = 0;
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 10;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            // Highlight active block with animation
            document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-highlight'));
            targetElement.classList.add('active-highlight');
            setTimeout(() => targetElement.classList.remove('active-highlight'), 1200);
        }
    });
});

(function(){
    let lastScroll = 0;
    const header = document.querySelector('header');
    if (!header) return;
    let mobile = window.matchMedia("(max-width: 900px)").matches;

    window.addEventListener('resize', function() {
        mobile = window.matchMedia("(max-width: 900px)").matches;
        if (!mobile) header.style.top = '0';
    });

    window.addEventListener('scroll', function() {
        if (!mobile) return;

        // If scrolled to very top, always show header
        if (window.scrollY === 0) {
            header.style.top = '0';
            lastScroll = 0;
            return;
        }

        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
            // Scrolling down — hide
            header.style.top = '-' + header.offsetHeight + 'px';
        } else {
            // Scrolling up — show
            header.style.top = '0';
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;
    let clickedRecently = false;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scroll down — hide header
            header.style.transform = "translate(-50%, -100%)";
            header.style.opacity = "0";
            clickedRecently = false;
        } else {
            // Scroll up — show header if no recent click
            if (!clickedRecently) {
                header.style.transform = "translate(-50%, 0)";
                header.style.opacity = "1";
            }
        }

        lastScrollY = currentScrollY;
    });

    document.querySelectorAll("section").forEach(sec => {
        sec.style.cursor = "pointer";
        sec.addEventListener("click", e => {
            if (e.target.tagName.toLowerCase() === "a") return;

            // On click always hide header immediately
            header.style.transform = "translate(-50%, -100%)";
            header.style.opacity = "0";
            clickedRecently = true;

            // Update lastScrollY to avoid conflicts
            lastScrollY = window.scrollY;

            // Smooth scroll to top of block
            sec.scrollIntoView({ behavior: "smooth", block: "start" });

            // After timeout allow header to reappear on scroll up
            setTimeout(() => {
                clickedRecently = false;
            }, 1200);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = document.documentElement.getAttribute('lang') || 'en';
        let filePath, fileName;
        if (lang === 'ru') {
            filePath = 'cv_uladzimir_zadarozhny_ru.pdf';
            fileName = 'Uladzimir_Zadarozhny_CV_RU_ATS.pdf';
        } else {
            filePath = 'cv_uladzimir_zadarozhny_en.pdf';
            fileName = 'Uladzimir_Zadarozhny_CV_EN_ATS.pdf';
        }
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});