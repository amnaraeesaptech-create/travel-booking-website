/* ==========================================================================
   WANDERLUST HORIZON - Main Application Logic (Debugged & Robust)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 0. Website Preloader Loader Handler
  // ------------------------------------------------------------------------
  const hidePreloader = () => {
    const preloader = document.getElementById("pagePreloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 600);
    }
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }

  // ------------------------------------------------------------------------
  // 1. Global Application State
  // ------------------------------------------------------------------------
  const state = {
    theme: localStorage.getItem("av_theme") || "light",
    currency: localStorage.getItem("av_currency") || "USD",
    currencySymbol: "$",
    wishlist: JSON.parse(localStorage.getItem("av_wishlist")) || [],
    bookings: JSON.parse(localStorage.getItem("av_bookings")) || [],
    user: JSON.parse(localStorage.getItem("av_user")) || null,
    selectedPackage: null,
    activeFilters: {
      searchQuery: "",
      category: "All",
      maxPrice: 2500,
      duration: "All",
      sortBy: "featured"
    },
    bookingDraft: {
      packageId: null,
      packageTitle: "",
      pricePerPerson: 0,
      startDate: "",
      adults: 2,
      children: 0,
      infants: 0,
      addons: [],
      totalPrice: 0,
      customer: {}
    }
  };

  // Currency multipliers relative to USD
  const currencyRates = {
    USD: { symbol: "$", rate: 1 },
    EUR: { symbol: "€", rate: 0.92 },
    GBP: { symbol: "£", rate: 0.78 },
    JPY: { symbol: "¥", rate: 155.5 }
  };

  // ------------------------------------------------------------------------
  // 2. Initialization & Event Handlers
  // ------------------------------------------------------------------------
  initTheme();
  initNavbar();
  initHeroDateInput();
  renderDestinations();
  renderPackages();
  renderStays();
  renderActivities();
  renderGallery("All");
  renderTestimonials();
  renderFAQs();
  updateWishlistUI();
  updateBookingsUI();
  updateUserUI();

  // Theme Toggle Listener
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("av_theme", state.theme);
      initTheme();
    });
  }

  // Currency Selector Listener
  const currencySelect = document.getElementById("currencySelect");
  if (currencySelect) {
    currencySelect.value = state.currency;
    currencySelect.addEventListener("change", (e) => {
      state.currency = e.target.value;
      localStorage.setItem("av_currency", state.currency);
      state.currencySymbol = currencyRates[state.currency].symbol;

      // Update Price range display label
      const priceRangeVal = document.getElementById("priceRangeVal");
      if (priceRangeVal) priceRangeVal.textContent = formatPrice(state.activeFilters.maxPrice);

      renderDestinations();
      renderPackages();
      renderStays();
      renderActivities();
      updateWishlistUI();
      updateBookingsUI();
      showToast(`Currency updated to ${state.currency}`, "info");
    });
  }

  // ------------------------------------------------------------------------
  // 3. Theme & Navbar Helper Functions
  // ------------------------------------------------------------------------
  function initTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const themeIcon = document.getElementById("themeIcon");
    if (themeIcon) {
      themeIcon.className = state.theme === "dark" ? "fas fa-sun text-warning" : "fas fa-moon";
    }
  }

  function initNavbar() {
    const navbar = document.querySelector(".navbar-custom");
    const navLinks = document.querySelectorAll(".nav-link-custom");
    const sections = document.querySelectorAll("section[id]");

    // Sticky Navbar shadow on scroll
    window.addEventListener("scroll", () => {
      if (navbar) {
        if (window.scrollY > 40) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      // ScrollSpy Active Link Update (Only on single-page section scrolling)
      let currentSection = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      if (currentSection) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${currentSection}`) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      }
    });
  }

  function initHeroDateInput() {
    const heroDateInput = document.getElementById("heroDateInput");
    if (heroDateInput) {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      heroDateInput.value = today.toISOString().split('T')[0];
      heroDateInput.min = new Date().toISOString().split('T')[0];
    }
  }

  // Format currency helper
  function formatPrice(amountUsd) {
    const info = currencyRates[state.currency] || currencyRates.USD;
    const converted = Math.round(amountUsd * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  }

  // Sanitize user inputs against XSS
  function sanitizeInput(str) {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  // Toast Notification System
  window.showToast = function(message, type = "success") {
    const toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) return;

    const toastEl = document.createElement("div");
    const bgClass = type === "success" ? "bg-success" : type === "danger" ? "bg-danger" : "bg-primary";
    toastEl.className = `toast align-items-center text-white ${bgClass} border-0 show shadow-lg mb-2`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body font-heading fw-semibold">
          <i class="fas ${type === "success" ? "fa-check-circle" : "fa-info-circle"} me-2"></i> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    toastContainer.appendChild(toastEl);
    setTimeout(() => {
      toastEl.remove();
    }, 4000);
  };

  // ------------------------------------------------------------------------
  // 4. Universal Hero Search Bar & Travelers Counter
  // ------------------------------------------------------------------------
  const travelerText = document.getElementById("travelerCountText");

  window.adjustTraveler = function(type, delta) {
    if (type === 'adults') {
      state.bookingDraft.adults = Math.max(1, state.bookingDraft.adults + delta);
    } else if (type === 'children') {
      state.bookingDraft.children = Math.max(0, state.bookingDraft.children + delta);
    } else if (type === 'infants') {
      state.bookingDraft.infants = Math.max(0, state.bookingDraft.infants + delta);
    }

    const adultEl = document.getElementById("adultCount");
    const childEl = document.getElementById("childCount");
    const infantEl = document.getElementById("infantCount");

    if (adultEl) adultEl.textContent = state.bookingDraft.adults;
    if (childEl) childEl.textContent = state.bookingDraft.children;
    if (infantEl) infantEl.textContent = state.bookingDraft.infants;

    const total = state.bookingDraft.adults + state.bookingDraft.children;
    if (travelerText) {
      travelerText.textContent = `${total} Guest${total > 1 ? 's' : ''}`;
    }
  };

  // Hero Search Form Handler
  const heroSearchForm = document.getElementById("heroSearchForm");
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const destinationInput = document.getElementById("heroSearchInput").value.trim();
      state.activeFilters.searchQuery = destinationInput;

      // Scroll to packages section smoothly
      const packagesSection = document.getElementById("packages");
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: "smooth" });
      }

      // Update package search input field
      const pkgSearchInput = document.getElementById("pkgSearchInput");
      if (pkgSearchInput) {
        pkgSearchInput.value = destinationInput;
      }
      renderPackages();
    });
  }

  // Quick category pills on hero
  window.filterCategoryQuick = function(cat) {
    state.activeFilters.category = cat;
    const packagesSection = document.getElementById("packages");
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: "smooth" });
    }
    const filterBtns = document.querySelectorAll(".category-filter-btn");
    filterBtns.forEach(btn => {
      if (btn.dataset.category === cat) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    renderPackages();
  };

  // ------------------------------------------------------------------------
  // 5. Popular Destinations Component
  // ------------------------------------------------------------------------
  function renderDestinations() {
    const grid = document.getElementById("destinationsGrid");
    if (!grid) return;

    grid.innerHTML = destinationsData.map(dest => `
      <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div class="destination-card" onclick="filterCategoryQuick('${dest.category}')">
          <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'">
          <div class="destination-price-badge">From ${formatPrice(dest.startingPrice)}</div>
          <div class="destination-card-overlay">
            <span class="badge badge-tag mb-1 w-auto align-self-start">${dest.continent}</span>
            <h3 class="h4 mb-1 text-white fw-bold">${dest.name}</h3>
            <p class="small text-white-50 mb-2">${dest.country}</p>
            <div class="d-flex align-items-center justify-content-between">
              <span class="rating-stars small"><i class="fas fa-star"></i> ${dest.rating}</span>
              <span class="small fw-semibold text-white">Explore <i class="fas fa-arrow-right ms-1"></i></span>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // ------------------------------------------------------------------------
  // 6. Tour Packages Engine & Live Filtering
  // ------------------------------------------------------------------------
  function renderPackages() {
    const grid = document.getElementById("packagesGrid");
    const countEl = document.getElementById("packageCountText");
    if (!grid) return;

    // Filter Logic
    let filtered = packagesData.filter(pkg => {
      const matchSearch = state.activeFilters.searchQuery === "" ||
        pkg.title.toLowerCase().includes(state.activeFilters.searchQuery.toLowerCase()) ||
        pkg.destinationName.toLowerCase().includes(state.activeFilters.searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(state.activeFilters.searchQuery.toLowerCase());

      const matchCategory = state.activeFilters.category === "All" || pkg.category === state.activeFilters.category;
      const matchPrice = pkg.price <= state.activeFilters.maxPrice;

      let matchDuration = true;
      if (state.activeFilters.duration === "short") matchDuration = pkg.durationDays <= 5;
      else if (state.activeFilters.duration === "medium") matchDuration = pkg.durationDays >= 6 && pkg.durationDays <= 7;
      else if (state.activeFilters.duration === "long") matchDuration = pkg.durationDays >= 8;

      return matchSearch && matchCategory && matchPrice && matchDuration;
    });

    // Sorting Logic
    if (state.activeFilters.sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.activeFilters.sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.activeFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (state.activeFilters.sortBy === "duration") {
      filtered.sort((a, b) => a.durationDays - b.durationDays);
    }

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} Travel Packages`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fas fa-compass fa-3x text-muted mb-3"></i>
          <h4 class="fw-bold">No packages match your search criteria</h4>
          <p class="text-muted">Try adjusting your filters or search query to explore more options.</p>
          <button class="btn btn-outline-brand rounded-pill mt-2" onclick="resetPackageFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(pkg => {
      const isWishlisted = state.wishlist.includes(pkg.id);
      return `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div class="package-card">
            <div class="package-img-container">
              <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'">
              <button class="package-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                      onclick="toggleWishlist('${pkg.id}')" 
                      title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
              </button>
              <span class="package-duration-pill"><i class="far fa-clock me-1"></i> ${pkg.durationDays} Days / ${pkg.durationDays - 1} Nights</span>
              ${pkg.badge ? `<span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 fw-bold">${pkg.badge}</span>` : ''}
            </div>
            <div class="package-body">
              <div class="package-meta">
                <span><i class="fas fa-map-marker-alt text-danger me-1"></i> ${pkg.destinationName}</span>
                <span class="rating-stars ms-auto"><i class="fas fa-star"></i> ${pkg.rating} (${pkg.reviewsCount})</span>
              </div>
              <h3 class="package-title">${pkg.title}</h3>
              <p class="small text-muted line-clamp-2 mb-3">${pkg.description}</p>
              
              <div class="package-price-wrap">
                <div>
                  <span class="price-amount">${formatPrice(pkg.price)}</span>
                  <span class="price-original">${formatPrice(pkg.originalPrice)}</span>
                  <div class="small text-muted">per traveler</div>
                </div>
                <button class="btn btn-brand btn-sm" onclick="openPackageDetailModal('${pkg.id}')">
                  View Details <i class="fas fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Filter Event Listeners
  const pkgSearchInput = document.getElementById("pkgSearchInput");
  if (pkgSearchInput) {
    pkgSearchInput.addEventListener("input", (e) => {
      state.activeFilters.searchQuery = e.target.value.trim();
      renderPackages();
    });
  }

  const priceRange = document.getElementById("priceRange");
  const priceRangeVal = document.getElementById("priceRangeVal");
  if (priceRange) {
    priceRange.value = state.activeFilters.maxPrice;
    if (priceRangeVal) priceRangeVal.textContent = formatPrice(state.activeFilters.maxPrice);

    priceRange.addEventListener("input", (e) => {
      state.activeFilters.maxPrice = parseInt(e.target.value);
      if (priceRangeVal) priceRangeVal.textContent = formatPrice(state.activeFilters.maxPrice);
      renderPackages();
    });
  }

  const durationFilter = document.getElementById("durationFilter");
  if (durationFilter) {
    durationFilter.addEventListener("change", (e) => {
      state.activeFilters.duration = e.target.value;
      renderPackages();
    });
  }

  const sortFilter = document.getElementById("sortFilter");
  if (sortFilter) {
    sortFilter.addEventListener("change", (e) => {
      state.activeFilters.sortBy = e.target.value;
      renderPackages();
    });
  }

  window.filterCategory = function(cat, btnEl) {
    state.activeFilters.category = cat;
    document.querySelectorAll(".category-filter-btn").forEach(btn => btn.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    renderPackages();
  };

  window.resetPackageFilters = function() {
    state.activeFilters = {
      searchQuery: "",
      category: "All",
      maxPrice: 2500,
      duration: "All",
      sortBy: "featured"
    };

    const heroSearchInput = document.getElementById("heroSearchInput");
    if (heroSearchInput) heroSearchInput.value = "";
    if (pkgSearchInput) pkgSearchInput.value = "";
    if (priceRange) priceRange.value = 2500;
    if (priceRangeVal) priceRangeVal.textContent = formatPrice(2500);
    if (durationFilter) durationFilter.value = "All";
    if (sortFilter) sortFilter.value = "featured";

    document.querySelectorAll(".category-filter-btn").forEach((btn, idx) => {
      if (idx === 0) btn.classList.add("active");
      else btn.classList.remove("active");
    });
    renderPackages();
  };

  // ------------------------------------------------------------------------
  // 7. Package Details Modal & Actions
  // ------------------------------------------------------------------------
  window.openPackageDetailModal = function(pkgId) {
    const pkg = packagesData.find(p => p.id === pkgId);
    if (!pkg) return;
    state.selectedPackage = pkg;

    document.getElementById("modalPkgTitle").textContent = pkg.title;
    document.getElementById("modalPkgDestination").textContent = pkg.destinationName;
    document.getElementById("modalPkgRating").innerHTML = `<i class="fas fa-star text-warning"></i> ${pkg.rating} (${pkg.reviewsCount} reviews)`;
    
    const imgEl = document.getElementById("modalPkgImg");
    if (imgEl) {
      imgEl.src = pkg.image;
      imgEl.onerror = () => { imgEl.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'; };
    }

    document.getElementById("modalPkgDesc").textContent = pkg.description;
    document.getElementById("modalPkgPrice").textContent = formatPrice(pkg.price);
    document.getElementById("modalPkgOriginalPrice").textContent = formatPrice(pkg.originalPrice);

    // Itinerary
    const itineraryContainer = document.getElementById("modalPkgItinerary");
    if (itineraryContainer) {
      itineraryContainer.innerHTML = pkg.itinerary.map(item => `
        <div class="itinerary-step">
          <div class="itinerary-day-title">Day ${item.day}: ${item.title}</div>
          <p class="small text-muted mb-0">${item.details}</p>
        </div>
      `).join("");
    }

    // Inclusions & Exclusions
    const incContainer = document.getElementById("modalPkgInclusions");
    if (incContainer) {
      incContainer.innerHTML = pkg.included.map(inc => `
        <li><i class="fas fa-check-circle text-success me-2"></i> ${inc}</li>
      `).join("");
    }

    const excContainer = document.getElementById("modalPkgExclusions");
    if (excContainer) {
      excContainer.innerHTML = pkg.excluded.map(exc => `
        <li><i class="fas fa-times-circle text-danger me-2"></i> ${exc}</li>
      `).join("");
    }

    // Hotel Info
    const hotelContainer = document.getElementById("modalPkgHotel");
    if (hotelContainer && pkg.hotelInfo) {
      hotelContainer.innerHTML = `
        <h5 class="fw-bold">${pkg.hotelInfo.name}</h5>
        <p class="small text-muted mb-2"><i class="fas fa-map-marker-alt me-1 text-danger"></i> ${pkg.hotelInfo.location}</p>
        <div class="d-flex gap-2 flex-wrap mb-2">
          ${pkg.hotelInfo.amenities.map(a => `<span class="badge bg-light text-dark border">${a}</span>`).join("")}
        </div>
      `;
    }

    // Safely Show Modal
    const modalEl = document.getElementById("packageDetailModal");
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
  };

  // Direct Book Button from Detail Modal
  const modalBookNowBtn = document.getElementById("modalBookNowBtn");
  if (modalBookNowBtn) {
    modalBookNowBtn.addEventListener("click", () => {
      const detailModalEl = document.getElementById("packageDetailModal");
      const detailModal = bootstrap.Modal.getOrCreateInstance(detailModalEl);
      if (detailModal) detailModal.hide();

      startBookingFlow(state.selectedPackage);
    });
  }

  // ------------------------------------------------------------------------
  // 8. Multi-Step Interactive Booking System
  // ------------------------------------------------------------------------
  function startBookingFlow(pkg) {
    if (!pkg) return;
    state.bookingDraft.packageId = pkg.id;
    state.bookingDraft.packageTitle = pkg.title;
    state.bookingDraft.pricePerPerson = pkg.price;
    state.bookingDraft.addons = [];

    // Use date from hero input if set, else 14 days from today
    const heroDateInput = document.getElementById("heroDateInput");
    let chosenDate = heroDateInput ? heroDateInput.value : "";
    
    if (!chosenDate) {
      const today = new Date();
      today.setDate(today.getDate() + 14);
      chosenDate = today.toISOString().split('T')[0];
    }

    const pkgNameEl = document.getElementById("bookingPkgName");
    if (pkgNameEl) pkgNameEl.textContent = pkg.title;
    
    const basePriceEl = document.getElementById("bookingBasePrice");
    if (basePriceEl) basePriceEl.textContent = formatPrice(pkg.price);
    
    const travelDateInput = document.getElementById("bookingTravelDate");
    if (travelDateInput) {
      travelDateInput.value = chosenDate;
      travelDateInput.min = new Date().toISOString().split('T')[0];
    }

    showBookingStep(1);
    recalculateBookingTotal();

    const bookingModalEl = document.getElementById("bookingModal");
    const bsBookingModal = bootstrap.Modal.getOrCreateInstance(bookingModalEl);
    bsBookingModal.show();
  }

  window.showBookingStep = function(stepNum) {
    document.querySelectorAll(".booking-step-content").forEach(el => el.classList.add("d-none"));
    const stepEl = document.getElementById(`bookingStep${stepNum}`);
    if (stepEl) stepEl.classList.remove("d-none");

    for (let i = 1; i <= 4; i++) {
      const stepItem = document.getElementById(`stepIndicator${i}`);
      if (!stepItem) continue;

      if (i < stepNum) {
        stepItem.className = "step-item completed";
        stepItem.innerHTML = `<i class="fas fa-check"></i>`;
      } else if (i === stepNum) {
        stepItem.className = "step-item active";
        stepItem.textContent = i;
      } else {
        stepItem.className = "step-item";
        stepItem.textContent = i;
      }
    }
  };

  window.recalculateBookingTotal = function() {
    const adults = state.bookingDraft.adults;
    const children = state.bookingDraft.children;
    const basePrice = state.bookingDraft.pricePerPerson;

    let subtotal = (adults * basePrice) + (children * basePrice * 0.7);

    let addonsTotal = 0;
    const checkedAddons = document.querySelectorAll(".addon-checkbox:checked");
    state.bookingDraft.addons = [];
    checkedAddons.forEach(chk => {
      const cost = parseFloat(chk.dataset.cost);
      addonsTotal += cost * (adults + children);
      state.bookingDraft.addons.push({
        name: chk.dataset.name,
        costPerPerson: cost
      });
    });

    state.bookingDraft.totalPrice = Math.round(subtotal + addonsTotal);

    const summarySubtotal = document.getElementById("summarySubtotal");
    const summaryAddons = document.getElementById("summaryAddons");
    const summaryTotal = document.getElementById("summaryTotal");

    if (summarySubtotal) summarySubtotal.textContent = formatPrice(subtotal);
    if (summaryAddons) summaryAddons.textContent = formatPrice(addonsTotal);
    if (summaryTotal) summaryTotal.textContent = formatPrice(state.bookingDraft.totalPrice);
  };

  document.querySelectorAll(".addon-checkbox").forEach(chk => {
    chk.addEventListener("change", recalculateBookingTotal);
  });

  window.proceedToStep2 = function() {
    const travelDateInput = document.getElementById("bookingTravelDate");
    const travelDate = travelDateInput ? travelDateInput.value : "";
    if (!travelDate) {
      showToast("Please select your departure date.", "danger");
      return;
    }
    state.bookingDraft.startDate = travelDate;
    showBookingStep(2);
  };

  window.proceedToStep3 = function() {
    showBookingStep(3);
  };

  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullNameEl = document.getElementById("custFullName");
      const emailEl = document.getElementById("custEmail");
      const phoneEl = document.getElementById("custPhone");

      const fullName = fullNameEl ? fullNameEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const phone = phoneEl ? phoneEl.value.trim() : "";

      if (!fullName || !email || !phone) {
        showToast("Please fill out all passenger details.", "danger");
        return;
      }

      state.bookingDraft.customer = {
        fullName: sanitizeInput(fullName),
        email: sanitizeInput(email),
        phone: sanitizeInput(phone)
      };

      const confirmBtn = document.getElementById("confirmPaymentBtn");
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Processing Payment...`;

      setTimeout(() => {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = `<i class="fas fa-lock me-2"></i> Pay & Confirm Booking`;

        const bookingRef = "AV-" + Math.floor(100000 + Math.random() * 900000);
        const newBooking = {
          ref: bookingRef,
          packageId: state.bookingDraft.packageId,
          packageTitle: state.bookingDraft.packageTitle,
          totalPrice: state.bookingDraft.totalPrice,
          startDate: state.bookingDraft.startDate,
          travelers: `${state.bookingDraft.adults} Adult(s), ${state.bookingDraft.children} Child(ren)`,
          customer: state.bookingDraft.customer,
          bookingDate: new Date().toLocaleDateString(),
          addons: state.bookingDraft.addons
        };

        state.bookings.unshift(newBooking);
        localStorage.setItem("av_bookings", JSON.stringify(state.bookings));
        updateBookingsUI();

        renderETicket(newBooking);
        showBookingStep(4);
        showToast("Booking Confirmed Successfully!", "success");
      }, 1500);
    });
  }

  function renderETicket(booking) {
    const eticketContainer = document.getElementById("eticketReceipt");
    if (!eticketContainer) return;

    eticketContainer.innerHTML = `
      <div class="eticket-container">
        <div class="eticket-header">
          <div>
            <h4 class="fw-bold text-gradient mb-0"><i class="fas fa-paper-plane me-2"></i> Aetheria Voyages</h4>
            <div class="small text-muted">Official Electronic Boarding Pass</div>
          </div>
          <div class="eticket-stamp">CONFIRMED</div>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="small text-muted">Booking Reference:</div>
            <div class="fw-bold fs-5 text-primary">${booking.ref}</div>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="small text-muted">Booking Date:</div>
            <div class="fw-semibold">${booking.bookingDate}</div>
          </div>
          <div class="col-md-6">
            <div class="small text-muted">Package Title:</div>
            <div class="fw-bold">${booking.packageTitle}</div>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="small text-muted">Departure Date:</div>
            <div class="fw-bold text-success">${booking.startDate}</div>
          </div>
          <div class="col-md-6">
            <div class="small text-muted">Lead Passenger:</div>
            <div class="fw-semibold">${booking.customer.fullName}</div>
            <div class="small text-muted">${booking.customer.email}</div>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="small text-muted">Travelers:</div>
            <div class="fw-semibold">${booking.travelers}</div>
          </div>
        </div>

        <div class="border-top pt-3 d-flex align-items-center justify-content-between">
          <div>
            <div class="small text-muted">Total Paid Amount:</div>
            <div class="fw-bold fs-4 text-gradient">${formatPrice(booking.totalPrice)}</div>
          </div>
          <div class="text-end">
            <i class="fas fa-qrcode fa-3x text-dark"></i>
            <div class="small text-muted mt-1">Scan for Check-In</div>
          </div>
        </div>
      </div>
    `;
  }

  window.printETicket = function() {
    window.print();
  };

  // ------------------------------------------------------------------------
  // 9. Wishlist & My Bookings Drawers
  // ------------------------------------------------------------------------
  window.toggleWishlist = function(pkgId) {
    const index = state.wishlist.indexOf(pkgId);
    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast("Package removed from Wishlist", "info");
    } else {
      state.wishlist.push(pkgId);
      showToast("Package saved to Wishlist!", "success");
    }
    localStorage.setItem("av_wishlist", JSON.stringify(state.wishlist));
    updateWishlistUI();
    renderPackages();
  };

  function updateWishlistUI() {
    const badge = document.getElementById("wishlistCountBadge");
    if (badge) badge.textContent = state.wishlist.length;

    const listEl = document.getElementById("wishlistDrawerList");
    if (!listEl) return;

    if (state.wishlist.length === 0) {
      listEl.innerHTML = `<div class="text-center text-muted py-5"><i class="far fa-heart fa-3x mb-3"></i><p>Your wishlist is empty.</p></div>`;
      return;
    }

    const items = packagesData.filter(p => state.wishlist.includes(p.id));
    listEl.innerHTML = items.map(item => `
      <div class="d-flex align-items-center gap-3 p-3 border-bottom">
        <img src="${item.image}" alt="${item.title}" style="width:70px; height:70px; object-fit:cover; border-radius:12px;" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'">
        <div class="flex-grow-1">
          <h6 class="fw-bold mb-1">${item.title}</h6>
          <div class="small text-primary fw-bold">${formatPrice(item.price)}</div>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="toggleWishlist('${item.id}')"><i class="fas fa-trash"></i></button>
      </div>
    `).join("");
  }

  function updateBookingsUI() {
    const badge = document.getElementById("bookingsCountBadge");
    if (badge) badge.textContent = state.bookings.length;

    const listEl = document.getElementById("bookingsDrawerList");
    if (!listEl) return;

    if (state.bookings.length === 0) {
      listEl.innerHTML = `<div class="text-center text-muted py-5"><i class="fas fa-ticket-alt fa-3x mb-3"></i><p>No active bookings yet.</p></div>`;
      return;
    }

    listEl.innerHTML = state.bookings.map(b => `
      <div class="p-3 border rounded-3 mb-3 bg-light text-dark">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge bg-success">${b.ref}</span>
          <span class="small text-muted">${b.startDate}</span>
        </div>
        <h6 class="fw-bold mb-1">${b.packageTitle}</h6>
        <div class="small text-muted mb-2">Lead: ${b.customer.fullName}</div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold text-primary">${formatPrice(b.totalPrice)}</span>
          <button class="btn btn-sm btn-brand" onclick="viewExistingTicket('${b.ref}')">View Ticket</button>
        </div>
      </div>
    `).join("");
  }

  window.viewExistingTicket = function(ref) {
    const booking = state.bookings.find(b => b.ref === ref);
    if (!booking) return;

    renderETicket(booking);

    // Safely hide Offcanvas Drawer
    const drawerEl = document.getElementById("bookingsOffcanvas");
    const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
    if (bsDrawer) bsDrawer.hide();

    // Safely show Booking Modal on Step 4
    showBookingStep(4);
    const bookingModalEl = document.getElementById("bookingModal");
    const bsBookingModal = bootstrap.Modal.getOrCreateInstance(bookingModalEl);
    bsBookingModal.show();
  };

  // ------------------------------------------------------------------------
  // 10. Stays, Activities, Gallery & Testimonials
  // ------------------------------------------------------------------------
  function renderStays() {
    const grid = document.getElementById("staysGrid");
    if (!grid) return;

    grid.innerHTML = staysData.map(stay => `
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="position-relative" style="height: 200px;">
            <img src="${stay.image}" class="w-100 h-100 object-fit-cover" alt="${stay.name}" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'">
            <span class="badge bg-primary position-absolute top-0 end-0 m-3">${stay.badge}</span>
          </div>
          <div class="card-body d-flex flex-direction-column">
            <div class="small text-muted mb-1"><i class="fas fa-map-marker-alt text-danger me-1"></i> ${stay.location}</div>
            <h5 class="fw-bold card-title">${stay.name}</h5>
            <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
              <span class="fw-bold text-primary fs-5">${formatPrice(stay.pricePerNight)} <small class="text-muted fs-6">/ night</small></span>
              <span class="rating-stars small"><i class="fas fa-star"></i> ${stay.rating}</span>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderActivities() {
    const grid = document.getElementById("activitiesGrid");
    if (!grid) return;

    grid.innerHTML = activitiesData.map(act => `
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="position-relative" style="height: 200px;">
            <img src="${act.image}" class="w-100 h-100 object-fit-cover" alt="${act.title}" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'">
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 fw-bold">${act.category}</span>
          </div>
          <div class="card-body d-flex flex-direction-column">
            <div class="small text-muted mb-1"><i class="far fa-clock me-1"></i> ${act.duration}</div>
            <h5 class="fw-bold card-title">${act.title}</h5>
            <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
              <span class="fw-bold text-primary fs-5">${formatPrice(act.price)}</span>
              <span class="rating-stars small"><i class="fas fa-star"></i> ${act.rating}</span>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderGallery(cat = "All") {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    const filtered = cat === "All" ? galleryData : galleryData.filter(g => g.category === cat);

    grid.innerHTML = filtered.map(item => `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="gallery-item-card" onclick="openLightbox('${item.image}', '${item.title}', '${item.location}')">
          <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'">
          <div class="gallery-overlay">
            <i class="fas fa-search-plus"></i>
          </div>
        </div>
      </div>
    `).join("");
  }

  window.filterGallery = function(cat, btnEl) {
    document.querySelectorAll(".gallery-filter-btn").forEach(btn => btn.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    renderGallery(cat);
  };

  window.openLightbox = function(imgUrl, title, location) {
    const imgEl = document.getElementById("lightboxImg");
    if (imgEl) {
      imgEl.src = imgUrl;
      imgEl.onerror = () => { imgEl.src = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'; };
    }
    document.getElementById("lightboxTitle").textContent = title;
    document.getElementById("lightboxLocation").textContent = location;

    const modalEl = document.getElementById("lightboxModal");
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
  };

  function renderTestimonials() {
    const grid = document.getElementById("testimonialsGrid");
    if (!grid) return;

    grid.innerHTML = testimonialsData.map(rev => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 p-4 glass-card">
          <div class="d-flex align-items-center gap-3 mb-3">
            <img src="${rev.avatar}" class="rounded-circle" style="width:55px; height:55px; object-fit:cover;" alt="${rev.name}" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'">
            <div>
              <h6 class="fw-bold mb-0">${rev.name}</h6>
              <span class="small text-muted">${rev.country}</span>
              <div class="rating-stars small mt-1">
                ${'<i class="fas fa-star text-warning"></i>'.repeat(rev.rating)}
              </div>
            </div>
          </div>
          <p class="small text-muted fst-italic mb-3">"${rev.comment}"</p>
          <div class="mt-auto border-top pt-2 small text-primary fw-bold d-flex justify-content-between">
            <span>${rev.tripTitle}</span>
            <span class="text-muted font-normal">${rev.date}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameEl = document.getElementById("revName");
      const countryEl = document.getElementById("revCountry");
      const tripEl = document.getElementById("revTrip");
      const textEl = document.getElementById("revComment");

      const name = nameEl ? nameEl.value.trim() : "";
      const country = countryEl ? countryEl.value.trim() : "";
      const trip = tripEl ? tripEl.value.trim() : "";
      const text = textEl ? textEl.value.trim() : "";

      if (!name || !text) return;

      testimonialsData.unshift({
        id: "rev-" + Date.now(),
        name: sanitizeInput(name),
        country: sanitizeInput(country) || "Traveler",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        tripTitle: sanitizeInput(trip) || "Custom Tour",
        date: "Just now",
        comment: sanitizeInput(text)
      });

      renderTestimonials();

      const modalEl = document.getElementById("addReviewModal");
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      if (bsModal) bsModal.hide();

      showToast("Thank you for submitting your review!", "success");
      reviewForm.reset();
    });
  }

  function renderFAQs() {
    const accordion = document.getElementById("faqAccordion");
    if (!accordion) return;

    accordion.innerHTML = faqsData.map((faq, idx) => `
      <div class="accordion-item border-0 mb-3 rounded-3 shadow-sm overflow-hidden">
        <h2 class="accordion-header">
          <button class="accordion-button ${idx !== 0 ? 'collapsed' : ''} fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse${idx}">
            <i class="far fa-question-circle text-primary me-2"></i> ${faq.question}
          </button>
        </h2>
        <div id="faqCollapse${idx}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            ${faq.answer}
          </div>
        </div>
      </div>
    `).join("");
  }

  // ------------------------------------------------------------------------
  // 11. AI Travel Assistant Chatbot Popover
  // ------------------------------------------------------------------------
  const chatbotToggleBtn = document.getElementById("chatbotToggleBtn");
  const chatbotBox = document.getElementById("chatbotBox");
  const chatbotCloseBtn = document.getElementById("chatbotCloseBtn");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotMessages = document.getElementById("chatbotMessages");

  if (chatbotToggleBtn && chatbotBox) {
    chatbotToggleBtn.addEventListener("click", () => {
      chatbotBox.classList.toggle("hidden");
    });

    if (chatbotCloseBtn) {
      chatbotCloseBtn.addEventListener("click", () => {
        chatbotBox.classList.add("hidden");
      });
    }

    if (chatbotForm) {
      chatbotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = chatbotInput.value.trim();
        if (!msg) return;

        chatbotMessages.innerHTML += `<div class="chat-bubble user">${sanitizeInput(msg)}</div>`;
        chatbotInput.value = "";
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        setTimeout(() => {
          let botReply = "I can assist you with destination recommendations, package bookings, visa requirements, or customize an itinerary for your trip!";
          const lower = msg.toLowerCase();

          if (lower.includes("bali")) {
            botReply = "Bali is fantastic! Our 7-Day Ubud & Nusa Penida package is currently our #1 bestseller starting at $999.";
          } else if (lower.includes("swiss") || lower.includes("alps")) {
            botReply = "The Swiss Alps Glacier Wonder package includes a 1st Class Swiss Rail Pass and Jungfraujoch summit excursion.";
          } else if (lower.includes("cancel") || lower.includes("refund")) {
            botReply = "We offer 100% full refund for cancellations up to 14 days before your departure date.";
          }

          chatbotMessages.innerHTML += `<div class="chat-bubble bot"><i class="fas fa-robot me-1 text-primary"></i> ${botReply}</div>`;
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 800);
      });
    }
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Message sent! Our travel advisor will reach out within 2 hours.", "success");
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Subscribed! Check your email for exclusive travel discounts.", "success");
      newsletterForm.reset();
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = document.getElementById("loginEmail");
      const email = emailEl ? emailEl.value.trim() : "";
      if (!email) return;

      const name = sanitizeInput(email.split('@')[0]);

      state.user = { name, email: sanitizeInput(email) };
      localStorage.setItem("av_user", JSON.stringify(state.user));
      updateUserUI();

      const modalEl = document.getElementById("authModal");
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      if (bsModal) bsModal.hide();

      showToast(`Welcome back, ${name}!`, "success");
    });
  }

  function updateUserUI() {
    const userBtn = document.getElementById("userAuthBtn");
    if (!userBtn) return;

    if (state.user) {
      userBtn.innerHTML = `<i class="fas fa-user-circle text-primary"></i> <span class="d-none d-md-inline fw-semibold">${state.user.name}</span>`;
    } else {
      userBtn.innerHTML = `<i class="far fa-user"></i> <span class="d-none d-md-inline">Sign In</span>`;
    }
  }
});
