/* ============================================
   DRGTECH — main.js
   Interatividade: progresso, busca, accordion, TOC
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
      hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // ─── Homepage Article Search ───
  const searchInput = document.getElementById('search-input');
  const articleCards = document.querySelectorAll('.article-card');
  const articlesGrid = document.getElementById('articles-grid');
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
    });
  });

  // ─── FAQ Accordion ───
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle current
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

  // ─── Smooth Scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
