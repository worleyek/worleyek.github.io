const toggle = document.querySelector('.theme-toggle');

if (toggle) {
	// get saved theme, or fallback to 'dark' on their first visit
	const saved = localStorage.getItem('theme') || 'dark';

	// apply it immediately to the HTML element
	document.documentElement.dataset.theme = saved;

	// set the button text based on what theme is currently active
	toggle.textContent = saved === 'dark' ? 'Light mode' : 'Dark mode';

	toggle.addEventListener('click', () => {
		// look at the active theme attribute to decide the next theme
		const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

		// update the attribute, storage, and button text cleanly
		document.documentElement.dataset.theme = next;
		localStorage.setItem('theme', next);
		toggle.textContent = next === 'dark' ? 'Light mode' : 'Dark mode';
	});
}

document.querySelectorAll('.gallery img').forEach((img) => {
	img.addEventListener('click', () => {
		const lb = document.querySelector('.lightbox');

		if (lb) {
			lb.querySelector('img').src = img.src;
			lb.classList.add('open');
		}
	});
});

const lb = document.querySelector('.lightbox');

if (lb) {
	lb.addEventListener('click', () => lb.classList.remove('open'));
}

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".lightbox");
  const expandedImage = lightbox?.querySelector("img");
  const caption = lightbox?.querySelector(".lightbox-title");

  document.querySelectorAll(".image-container").forEach(container => {
    const img = container.querySelector("img");
    if (!img) return;

    // use the custom title, falling back to the alt description
    const title = img.dataset.title?.trim() || img.alt || "";

    // create or update the hover title
    if (title) {
      let overlay = container.querySelector(".image-overlay");

      if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("image-overlay");
        container.appendChild(overlay);
      }

      overlay.textContent = title;
    }

    // show the image and its title when clicked or tapped
    img.addEventListener("click", () => {
      if (!lightbox || !expandedImage) return;

      expandedImage.src = img.currentSrc || img.src;
      expandedImage.alt = img.alt;

      if (caption) caption.textContent = title;

      lightbox.classList.add("open");
    });
  });

  // click or tap the lightbox to close it
  lightbox?.addEventListener("click", () => {
    lightbox.classList.remove("open");
  });

  // also allow closing with Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      lightbox?.classList.remove("open");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // select your button and mobile navigation menu
  const menuButton = document.querySelector('.menu');
  const mobileNav = document.querySelector('.mobile-nav');

  // listen for the click event on the hamburger button
  menuButton.addEventListener('click', () => {
    // toggle existing 'open' class on the navigation
    const isOpen = mobileNav.classList.toggle('open');
    
    // dynamically update aria-expanded (true if open, false if closed)
    menuButton.setAttribute('aria-expanded', isOpen);
  });
});
