/* =====================================================================
   MOZAIC ÎN COMUNICARE - JAVASCRIPT
   ===================================================================== */

// Initialize Cookie Banner
initCookieBanner();

document.addEventListener("DOMContentLoaded", function () {
  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      menu.classList.toggle("active");
    });

    // Zichide meniu când se apasă pe un link
    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menu.classList.remove("active");
      });
    });
  }

  // 2. SEARCH FUNCTIONALITY
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      performSearch();
    });

    if (searchInput) {
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          performSearch();
        }
      });
    }
  }

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      alert("Te rog introdu un termen de căutare!");
      return;
    }

    // Simulare căutare - în producție, asta ar merge la server
    const searchTerms = {
      comunicare: "servicii.html",
      coaching: "servicii.html",
      blog: "blog.html",
      contact: "contact.html",
      despre: "despre-mine.html",
      servicii: "servicii.html",
      workshop: "servicii.html",
      training: "servicii.html",
    };

    let found = false;
    for (let term in searchTerms) {
      if (query.includes(term)) {
        window.location.href = searchTerms[term];
        found = true;
        break;
      }
    }

    if (!found) {
      alert('Nu am găsit rezultate pentru: "' + searchInput.value + '"');
      searchInput.value = "";
    }
  }

  // 3. SMOOTH SCROLL pentru anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // 4. CONTACT FORM VALIDATION
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleContactForm(this);
    });
  }

  // 5. NEWSLETTER FORM
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleNewsletterForm(this);
    });
  }

  // 6. ACTIVE MENU INDICATOR
  highlightCurrentPage();

  // 7. SCROLL ANIMATIONS
  initScrollAnimations();
});

/**
 * Gestiune Contact Form
 */
function handleContactForm(form) {
  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  // Validare
  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    showNotification(
      "Te rog completează toate câmpurile obligatorii!",
      "error",
    );
    return;
  }

  if (!isValidEmail(formData.email)) {
    showNotification("Te rog introdu o adresă de email validă!", "error");
    return;
  }

  // Simulare trimitere (în producție, asta ar merge la backend)
  showNotification(
    "Mulțumesc! Mesajul a fost trimis. Te voi contacta în curând.",
    "success",
  );

  // Reset form
  form.reset();

  // Log data (în producție, asta s-ar trimite la server)
  console.log("Contact Data:", formData);
}

/**
 * Gestiune Newsletter Form
 */
function handleNewsletterForm(form) {
  const email = form.querySelector('input[type="email"]').value;

  if (!isValidEmail(email)) {
    showNotification("Te rog introdu o adresă de email validă!", "error");
    return;
  }

  showNotification(
    "Mulțumesc pentru abonare! Vei primi emails cu articole noi.",
    "success",
  );
  form.reset();

  console.log("Newsletter Subscription:", { email: email });
}

/**
 * Validare Email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Notificări
 */
function showNotification(message, type = "info") {
  const notificationDiv = document.createElement("div");
  notificationDiv.className = `notification notification-${type}`;

  const notificationContent = document.createElement("div");
  notificationContent.className = "notification-content";

  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.className = "close-notification";
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", function () {
    notificationDiv.remove();
  });

  notificationContent.appendChild(messageSpan);
  notificationContent.appendChild(closeButton);
  notificationDiv.appendChild(notificationContent);
  document.body.appendChild(notificationDiv);

  // Auto-remove după 4 secunde
  setTimeout(() => {
    notificationDiv.remove();
  }, 4000);
}

/**
 * Highlight Current Page în Menu
 */
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const menuLinks = document.querySelectorAll(".menu a");

  menuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Scheduling Handler
 */
function handleScheduling(type) {
  const messages = {
    consultation: "Consultație Inițială",
    session: "Sesiune de Coaching",
    call: "Apel Inițial",
  };

  alert(
    "Mulțumesc pentru interes pentru " +
      messages[type] +
      "! Te voi contacta în curând pentru a programa.",
  );

  // În producție, asta s-ar deschide un calendar sau forma de scheduling
  console.log("Scheduling request for:", type);
}

/**
 * Scroll Animations (Fade-in efecte pe scroll)
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observă carduri și elemente
  document
    .querySelectorAll(
      ".feature-card, .service-card, .blog-card, .testimonial-card, .package-card",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });
}

/**
 * Sticky Header Effect
 */
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

/* =====================================================================
   CSS PENTRU NOTIFICĂRI ȘI ANIMAȚII
   ===================================================================== */

// Adaugă style pentru notificări
const style = document.createElement("style");
style.type = "text/css";
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    }

    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        gap: 15px;
    }

    .notification-success {
        background-color: #27ae60;
        color: white;
    }

    .notification-error {
        background-color: #e74c3c;
        color: white;
    }

    .notification-info {
        background-color: #3498db;
        color: white;
    }

    .close-notification {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        min-width: 24px;
        min-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-notification:hover {
        opacity: 0.8;
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Mobile responsiveness */
    @media (max-width: 480px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

document.head.appendChild(style);

/* =====================================================================
   UTILITY FUNCTIONS
   ===================================================================== */

/**
 * Format Date (pentru blog dates, etc.)
 */
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("ro-RO", options);
}

/**
 * Debounce Function (pentru recherche, etc.)
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Copy to Clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Copiat în clipboard!", "success");
    })
    .catch(() => {
      showNotification("Eroare la copiere", "error");
    });
}

/**
 * Cookie Banner Management
 */
function initCookieBanner() {
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    showCookieBanner();
  }
}

function showCookieBanner() {
  const bannerDiv = document.createElement("div");
  bannerDiv.id = "cookieBanner";
  bannerDiv.className = "cookie-banner";

  const cookieContent = document.createElement("div");
  cookieContent.className = "cookie-content";

  const cookieText = document.createElement("div");
  cookieText.className = "cookie-text";

  const titleParagraph = document.createElement("p");
  const titleStrong = document.createElement("strong");
  titleStrong.textContent = "🍪 Utilizăm cookies";
  titleParagraph.appendChild(titleStrong);

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent =
    "Utilizăm cookies pentru a îmbunătăți experiența ta pe site și pentru analytics. Prin continuarea navigării, accepți utilizarea cookies.";

  cookieText.appendChild(titleParagraph);
  cookieText.appendChild(descriptionParagraph);

  const cookieButtons = document.createElement("div");
  cookieButtons.className = "cookie-buttons";

  const acceptButton = document.createElement("button");
  acceptButton.className = "cookie-btn cookie-accept";
  acceptButton.type = "button";
  acceptButton.textContent = "Accept";

  const declineButton = document.createElement("button");
  declineButton.className = "cookie-btn cookie-decline";
  declineButton.type = "button";
  declineButton.textContent = "Declin";

  cookieButtons.appendChild(acceptButton);
  cookieButtons.appendChild(declineButton);
  cookieContent.appendChild(cookieText);
  cookieContent.appendChild(cookieButtons);
  bannerDiv.appendChild(cookieContent);
  document.body.appendChild(bannerDiv);

  acceptButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    bannerDiv.remove();
    showNotification("Mulțumesc! Cookies acceptate.", "success");
  });

  declineButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined");
    bannerDiv.remove();
  });
}

console.log("Oana Anea Coaching - Website initialized successfully");
