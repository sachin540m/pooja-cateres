/**
 * ROYAL SPICE & SAGE LUXURY INDIAN CATERING - MASTER JAVASCRIPT
 * Pure Vanilla ES6+ with Indian Rupee (₹) & en-IN Currency Formatting
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. STICKY NAVBAR & MOBILE MENU DRAWER
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');

  // Scroll effect for navbar and back-to-top button
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy: Highlight current active section in nav
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile drawer controls (Zero Blur, Crisp Slide-in)
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerOpenBtn = document.getElementById('drawerOpenBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerNavItems = document.querySelectorAll('.drawer-nav-item');

  function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (drawerOpenBtn) {
    drawerOpenBtn.addEventListener('click', openMobileDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  // Close mobile drawer when clicking any link
  drawerNavItems.forEach((link) => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileDrawer();
    }
  });

  // Smooth Back to Top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     2. CURATED MENU PACKAGES FILTER TABS
     ========================================================================== */
  /* ==========================================================================
     2. CURATED MENU PACKAGES TABS & RESPONSIVE SINGLE-VIEW CONTROLLER
     ========================================================================== */
  const packageTabs = document.querySelectorAll('.tab-btn');
  const packageCards = document.querySelectorAll('.package-card');
  const packageDotsContainer = document.getElementById('packageDots');
  const mobilePackageNav = document.getElementById('mobilePackageNav');
  const packagePrevBtn = document.getElementById('packagePrevBtn');
  const packageNextBtn = document.getElementById('packageNextBtn');
  const packagesGrid = document.querySelector('.packages-grid');

  let currentCategory = 'all';
  let currentCardIndex = 0;

  function getVisibleCards() {
    return Array.from(packageCards).filter(card => {
      const cat = card.getAttribute('data-category');
      return currentCategory === 'all' || cat === currentCategory;
    });
  }

  function renderPackages() {
    const isMobile = window.innerWidth <= 768;
    const visibleCards = getVisibleCards();

    if (currentCardIndex >= visibleCards.length) {
      currentCardIndex = 0;
    }

    packageCards.forEach(card => {
      const matchesCategory = currentCategory === 'all' || card.getAttribute('data-category') === currentCategory;
      if (!matchesCategory) {
        card.style.display = 'none';
        card.classList.remove('mobile-active');
      } else {
        if (!isMobile) {
          card.style.display = 'flex';
          card.classList.remove('mobile-active');
        }
      }
    });

    if (isMobile) {
      visibleCards.forEach((card, idx) => {
        if (idx === currentCardIndex) {
          card.classList.add('mobile-active');
        } else {
          card.classList.remove('mobile-active');
        }
      });

      // Update Dots
      if (packageDotsContainer) {
        packageDotsContainer.innerHTML = '';
        if (visibleCards.length <= 1) {
          if (mobilePackageNav) mobilePackageNav.style.display = 'none';
        } else {
          if (mobilePackageNav) mobilePackageNav.style.display = 'flex';
          visibleCards.forEach((card, idx) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${idx === currentCardIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `View package ${idx + 1}`);
            dot.addEventListener('click', () => {
              currentCardIndex = idx;
              renderPackages();
            });
            packageDotsContainer.appendChild(dot);
          });
        }
      }
    } else {
      if (mobilePackageNav) mobilePackageNav.style.display = 'none';
    }
  }

  if (packagePrevBtn) {
    packagePrevBtn.addEventListener('click', () => {
      const visible = getVisibleCards();
      currentCardIndex = (currentCardIndex - 1 + visible.length) % visible.length;
      renderPackages();
    });
  }

  if (packageNextBtn) {
    packageNextBtn.addEventListener('click', () => {
      const visible = getVisibleCards();
      currentCardIndex = (currentCardIndex + 1) % visible.length;
      renderPackages();
    });
  }

  // Mobile Touch Swipe Gesture
  let touchStartX = 0;
  if (packagesGrid) {
    packagesGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    packagesGrid.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        const visible = getVisibleCards();
        if (diff > 0) {
          currentCardIndex = (currentCardIndex - 1 + visible.length) % visible.length;
        } else {
          currentCardIndex = (currentCardIndex + 1) % visible.length;
        }
        renderPackages();
      }
    }, { passive: true });
  }

  packageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      packageTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter');
      currentCardIndex = 0;
      renderPackages();
    });
  });

  renderPackages();
  window.addEventListener('resize', renderPackages);

  /* ==========================================================================
     3. LIVE INTERACTIVE CATERING COST ESTIMATOR (INDIAN RUPEES ₹)
     ========================================================================== */
  const guestSlider = document.getElementById('guestSlider');
  const guestCountDisplay = document.getElementById('guestCountDisplay');
  const tierOptions = document.querySelectorAll('.tier-option');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');

  // Summary Elements
  const summaryGuests = document.getElementById('summaryGuests');
  const summaryTier = document.getElementById('summaryTier');
  const summaryFoodCost = document.getElementById('summaryFoodCost');
  const summaryAddonsCost = document.getElementById('summaryAddonsCost');
  const summaryTotal = document.getElementById('summaryTotal');
  const lockQuoteBtn = document.getElementById('lockQuoteBtn');

  // Default calculator state (Indian sample standards)
  let currentGuests = 150;
  let currentTierName = 'Royal Gold (Veg + Non-Veg)';
  let currentTierRate = 950; // per plate in INR

  // Indian Rupee format e.g. ₹1,42,500
  function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  function updateCalculator() {
    currentGuests = parseInt(guestSlider.value, 10);
    guestCountDisplay.textContent = `${currentGuests} Guests`;
    summaryGuests.textContent = `${currentGuests} Guests`;
    summaryTier.textContent = `${currentTierName} (₹${currentTierRate}/plate)`;

    // Calculate base food cost
    const baseFoodCost = currentGuests * currentTierRate;
    summaryFoodCost.textContent = formatINR(baseFoodCost);

    // Calculate add-ons cost
    let totalAddonsCost = 0;
    addonCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const type = checkbox.getAttribute('data-type');
        const price = parseFloat(checkbox.getAttribute('data-price'));

        if (type === 'per-person') {
          totalAddonsCost += currentGuests * price;
        } else if (type === 'flat') {
          totalAddonsCost += price;
        }
      }
    });

    summaryAddonsCost.textContent = formatINR(totalAddonsCost);

    // Grand total
    const grandTotal = baseFoodCost + totalAddonsCost;
    summaryTotal.textContent = formatINR(grandTotal);
  }

  // Slider input listener
  if (guestSlider) {
    guestSlider.addEventListener('input', updateCalculator);
  }

  // Tier option selection
  tierOptions.forEach((option) => {
    option.addEventListener('click', () => {
      tierOptions.forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');

      currentTierName = option.getAttribute('data-name');
      currentTierRate = parseFloat(option.getAttribute('data-rate'));
      updateCalculator();
    });
  });

  // Addon checkbox listeners & parent card styling
  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const card = e.target.closest('.addon-card');
      if (card) {
        if (e.target.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      }
      updateCalculator();
    });
  });

  // Package Card "Select for Quote" buttons
  const selectPackageBtns = document.querySelectorAll('.select-package-btn');
  selectPackageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTier = btn.getAttribute('data-tier');
      const tierEl = document.querySelector(`.tier-option[data-tier="${targetTier}"]`);
      if (tierEl) {
        tierEl.click();
      }

      // Smooth scroll to calculator
      const calcSection = document.getElementById('calculator');
      if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // "Lock This Quote" button -> pre-fills booking form below
  if (lockQuoteBtn) {
    lockQuoteBtn.addEventListener('click', () => {
      const bookingSection = document.getElementById('booking');
      const guestInput = document.getElementById('formGuests');
      const packageInput = document.getElementById('formPackage');
      const notesInput = document.getElementById('formNotes');

      if (guestInput) guestInput.value = currentGuests;
      if (packageInput) packageInput.value = currentTierName;

      // Collect selected add-ons names
      const selectedAddonNames = [];
      addonCheckboxes.forEach((cb) => {
        if (cb.checked) {
          selectedAddonNames.push(cb.getAttribute('data-name'));
        }
      });

      if (notesInput) {
        const addonText = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None';
        notesInput.value = `Estimated Quote: ${summaryTotal.textContent}\nSelected Tier: ${currentTierName} (₹${currentTierRate}/plate)\nGuest Count: ${currentGuests}\nSelected Add-ons: ${addonText}`;
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial calculation run
  updateCalculator();

  /* ==========================================================================
     4. EVENT & FOOD GALLERY LIGHTBOX
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay h4');

        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = caption ? caption.textContent : 'Luxury Event Catering';
          lightbox.classList.add('active');
        }
      });
    });

    // Close on button click
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     5. TESTIMONIAL CAROUSEL (SWIPE + AUTOPLAY + CONTROLS)
     ========================================================================== */
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('carouselDots');

  let currentSlide = 0;
  let autoplayTimer = null;

  if (track && slides.length > 0) {
    // Generate indicator dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateSlidePosition() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      updateSlidePosition();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoplay();
      });
    }

    // Autoplay functionality
    function startAutoplay() {
      autoplayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    startAutoplay();

    // Pause autoplay on mouse hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    track.addEventListener('mouseleave', () => startAutoplay());

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        goToSlide(currentSlide + 1);
        resetAutoplay();
      } else if (touchEndX - touchStartX > 50) {
        goToSlide(currentSlide - 1);
        resetAutoplay();
      }
    }, { passive: true });
  }

  /* ==========================================================================
     6. EVENT BOOKING & INQUIRY FORM SUBMISSION
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Inquiry...';

      // Simulate API submission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Show celebratory success banner
        if (successBanner) {
          successBanner.classList.add('show');
          successBanner.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
            <h4>Inquiry Received Successfully! (धन्यवाद)</h4>
            <p>Thank you for reaching out to Royal Spice & Sage Catering. Our Master Catering Director will review your requirements and call you on WhatsApp/Phone within 2 hours with your customized menu draft and quote.</p>
          `;
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form
        bookingForm.reset();
      }, 1000);
    });
  }

});
