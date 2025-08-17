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
		let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
		if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
			// Скроллим вниз — скрыть
			header.style.top = '-' + header.offsetHeight + 'px';
		} else {
			// Скроллим вверх — показать
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
			// Скролл вниз — скрываем шапку и снимаем блокировку клика
			header.style.transform = "translate(-50%, -100%)";
			header.style.opacity = "0";
			clickedRecently = false;
		} else {
			// Скролл вверх — показываем шапку только если не было недавнего клика
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

			// При клике всегда сразу скрываем шапку, вне зависимости от текущего состояния
			header.style.transform = "translate(-50%, -100%)";
			header.style.opacity = "0";
			clickedRecently = true;

			// Обновляем позцию lastScrollY, чтобы избежать конфликтов со скроллом
			lastScrollY = window.scrollY;

			// Плавный скролл к верхней части блока
			sec.scrollIntoView({ behavior: "smooth", block: "start" });

			// Через некоторое время снимаем блокировку, чтобы шапка могла появляться при обычном скролле вверх
			setTimeout(() => {
				clickedRecently = false;
			}, 1200);
		});
	});
});
