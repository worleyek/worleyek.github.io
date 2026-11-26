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


/* Opens the review dialog for either the book title or its star rating. */
(() => {
  const dialog = document.getElementById('reading-review-dialog');
  if (!dialog) return;

  const titleElement = document.getElementById('reading-review-title');
  const metaElement = document.getElementById('reading-review-meta');
  const spoilerElement = document.getElementById('reading-review-spoiler');
  const bodyElement = document.getElementById('reading-review-body');
  const closeButton = document.getElementById('reading-review-close');

  if (!titleElement || !metaElement || !spoilerElement || !bodyElement || !closeButton) return;

  const closeDialog = () => {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof Element
      ? event.target.closest('[data-review-trigger]')
      : null;

    if (!trigger) return;

    const entry = trigger.closest('.reading-entry');
    const reviewTemplate = entry?.querySelector('template.reading-review-content');

    if (!entry || !reviewTemplate) return;

    titleElement.textContent = entry.dataset.title || 'My review';

    const author = entry.dataset.author || '';
    const rating = entry.dataset.rating || '';
    metaElement.textContent = [author, rating].filter(Boolean).join(' · ');

    const spoilerStatus = entry.dataset.spoilers;

    spoilerElement.textContent = spoilerStatus === 'true'
      ? 'Spoilers ahead'
      : spoilerStatus === 'false'
        ? 'No spoilers!'
        : 'Spoiler status not specified';

    spoilerElement.classList.toggle('has-spoilers', spoilerStatus === 'true');

    bodyElement.replaceChildren(reviewTemplate.content.cloneNode(true));

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  });

  closeButton.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
})();
