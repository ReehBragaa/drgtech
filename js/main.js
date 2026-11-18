/* ============================================
   DRGTECH — main.js
   Interatividade: progresso, busca, accordion, TOC, navegação
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Reading Progress Bar ───
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }

  // ─── Scroll to Top Button ───
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Mobile Hamburger Menu ───
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // ─── Homepage Article Search ───
  const searchInput = document.getElementById('search-input');
  const articleCards = document.querySelectorAll('.article-card');
  const noResults = document.getElementById('no-results');

  if (searchInput && articleCards.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      articleCards.forEach(card => {
        const title = card.dataset.title?.toLowerCase() || '';
        const category = card.dataset.category?.toLowerCase() || '';
        const visible = !query || title.includes(query) || category.includes(query);
        card.style.display = visible ? 'flex' : 'none';
      });

      if (noResults) {
        const anyVisible = [...articleCards].some(c => c.style.display !== 'none');
        noResults.style.display = anyVisible ? 'none' : 'block';
      }
    });
  }

  // ─── Category Filter Buttons ───
  const catBtns = document.querySelectorAll('.cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.category;
      articleCards.forEach(card => {
        const cardCat = card.dataset.category?.toLowerCase() || '';
        card.style.display = (filter === 'todos' || cardCat === filter) ? 'flex' : 'none';
      });

      if (noResults) {
        const anyVisible = [...articleCards].some(c => c.style.display !== 'none');
        noResults.style.display = anyVisible ? 'none' : 'block';
      }
    });
  });

  // ─── Header & Mobile Nav Category Filter & Smooth Scroll ───
  const navLinks = document.querySelectorAll('.header-nav .nav-link, .mobile-nav .nav-link');
  
  function applyCategoryFilter(catHash) {
    if (!catHash) return;
    const cleanCat = catHash.replace('#', '').toLowerCase();
    
    const targetBtn = document.querySelector(`.cat-btn[data-category="${cleanCat}"]`);
    if (targetBtn) {
      targetBtn.click();
      
      const articlesSection = document.querySelector('.articles-section');
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        applyCategoryFilter(href);

        if (mobileNav && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
        }
      });
    }
  });

  // Check URL hash on initial page load (e.g. index.html#windows)
  if (window.location.hash) {
    setTimeout(() => {
      applyCategoryFilter(window.location.hash);
    }, 150);
  }

  // ─── FAQ Accordion ───
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ─── Copy Code Buttons ───
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.cmd-box')?.querySelector('.cmd-code')?.textContent || '';
      navigator.clipboard.writeText(code.trim()).then(() => {
        const original = btn.textContent;
        btn.textContent = '✓ Copiado!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // ─── Interactive Tool: Password Generator ───
  function initPasswordGenerators() {
    const btnGeneratePass = document.getElementById('btn-generate-pass');
    const btnCopyPass = document.getElementById('btn-copy-pass');
    const generatedPassInput = document.getElementById('generated-password');
    const passLengthInput = document.getElementById('pass-length');
    const passLengthVal = document.getElementById('pass-length-val');
    const chkUpper = document.getElementById('chk-upper');
    const chkLower = document.getElementById('chk-lower');
    const chkNum = document.getElementById('chk-num');
    const chkSym = document.getElementById('chk-sym');

    if (passLengthInput && passLengthVal) {
      passLengthInput.addEventListener('input', (e) => {
        passLengthVal.textContent = e.target.value;
      });
    }

    function generateSecurePassword() {
      let chars = '';
      if (!chkUpper || chkUpper.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (!chkLower || chkLower.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (!chkNum || chkNum.checked) chars += '0123456789';
      if (!chkSym || chkSym.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

      if (!chars) chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

      const length = passLengthInput ? parseInt(passLengthInput.value, 10) : 16;
      let pass = '';
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        pass += chars[array[i] % chars.length];
      }
      return pass;
    }

    if (btnGeneratePass && generatedPassInput) {
      btnGeneratePass.addEventListener('click', () => {
        generatedPassInput.value = generateSecurePassword();
      });
      // Auto-generate on load if empty
      if (!generatedPassInput.value) {
        generatedPassInput.value = generateSecurePassword();
      }
    }

    if (btnCopyPass && generatedPassInput) {
      btnCopyPass.addEventListener('click', () => {
        if (!generatedPassInput.value) return;
        navigator.clipboard.writeText(generatedPassInput.value).then(() => {
          const orig = btnCopyPass.textContent;
          btnCopyPass.textContent = '✓ Copiado!';
          setTimeout(() => { btnCopyPass.textContent = orig; }, 2000);
        });
      });
    }
  }

  initPasswordGenerators();

  // ─── Table of Contents — Active Highlighting ───
  const tocLinks = document.querySelectorAll('.toc-list a');
  const headings = document.querySelectorAll('.article-body h2[id], .article-body h3[id]');

  if (tocLinks.length > 0 && headings.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.toc-list a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    headings.forEach(h => observer.observe(h));
  }

  // ─── Scroll Animations ───
  const animEls = document.querySelectorAll('.animate-in');
  if (animEls.length > 0 && 'IntersectionObserver' in window) {
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    animEls.forEach(el => {
      el.style.animationPlayState = 'paused';
      animObserver.observe(el);
    });
  }

  // ─── Feedback & Question Form handlers removed in v3.0 (editorial compliance) ───

  // ─── Header Instant Search Autocomplete ───
  const headerSearchInput = document.getElementById('site-search-input');
  if (headerSearchInput) {
    // Create dropdown container dynamically
    const dropdown = document.createElement('div');
    dropdown.className = 'search-autocomplete-dropdown';
    headerSearchInput.parentElement.appendChild(dropdown);

    headerSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      // Filter existing cards or links
      const allCards = document.querySelectorAll('.article-card');
      const matches = [];

      allCards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent || '';
        const href = card.getAttribute('href') || '#';
        if (title.toLowerCase().includes(query)) {
          matches.push({ title, href });
        }
      });

      if (matches.length > 0) {
        dropdown.innerHTML = matches.slice(0, 5).map(m => `
          <a href="${m.href}" class="search-autocomplete-item">
            ${m.title}
          </a>
        `).join('');
      } else {
        dropdown.innerHTML = `<div class="search-autocomplete-no-results">Nenhum tutorial encontrado. Sua dúvida será registrada para criação!</div>`;
      }
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!headerSearchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

});
