/* Roomaity - Modern JavaScript Enhancements */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initGenderTabs();
  initFormValidation();
  initLanguageSwitcher();
  initMobileOptimizations();
  initSearchFilters();
  initLazyLoading();
  initAnimations();
  initMessageSystem();
  initNotifications();
  initProfileInteractions();
  initListingInteractions();
  initAccessibility();
  initDarkModeToggle();
});

/**
 * Modern Navigation System
 */
function initNavigation() {
  // Mobile navigation toggle
  const navbarToggler = document.getElementById('navbarToggler');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (navbarToggler && navbarMenu) {
    navbarToggler.addEventListener('click', function() {
      // Toggle the menu with animation
      if (navbarMenu.classList.contains('show')) {
        // Hide menu
        navbarMenu.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          navbarMenu.classList.remove('show');
        }, 300);
      } else {
        // Show menu
        navbarMenu.classList.add('show');
        setTimeout(() => {
          navbarMenu.style.transform = 'translateX(0)';
        }, 10);
      }
      
      // Toggle aria-expanded attribute for accessibility
      const expanded = navbarToggler.getAttribute('aria-expanded') === 'true' || false;
      navbarToggler.setAttribute('aria-expanded', !expanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navbarMenu.classList.contains('show') && 
          !navbarMenu.contains(event.target) && 
          !navbarToggler.contains(event.target)) {
        navbarToggler.click();
      }
    });
    
    // Handle mobile bottom navigation active states
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    if (mobileNavItems.length > 0) {
      mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
          mobileNavItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }
  }
  
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navbarMenu && navbarMenu.classList.contains('show')) {
          navbarToggler.click();
        }
        
        // Smooth scroll to target
        window.scrollTo({
          top: target.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Gender Tabs System
 */
function initGenderTabs() {
  const tabButtons = document.querySelectorAll('[data-toggle="pill"]');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default anchor behavior if any

      const targetPaneSelector = this.dataset.target;
      const targetPane = document.querySelector(targetPaneSelector);
      
      if (!targetPane) {
        console.error(`Target pane not found: ${targetPaneSelector}`);
        return;
      }

      const tabList = this.closest('[role="tablist"]');
      const tabContentContainer = targetPane.closest('.tab-content');

      if (!tabList || !tabContentContainer) {
          console.error('Could not find tabList or tabContentContainer for', this);
          return;
      }

      // Deactivate all tabs in the current tab list
      tabList.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      });

      // Hide all tab panes in the associated content container
      tabContentContainer.querySelectorAll('.tab-pane').forEach(pane => {
        if (pane.classList.contains('active')) {
            // Add fade-out animation before removing active classes
            pane.classList.add('fade-out');
            setTimeout(() => {
              pane.classList.remove('show', 'active', 'fade-out');
            }, 150); // Match animation duration
        } else {
            pane.classList.remove('show', 'active'); // Ensure others are hidden
        }
      });
      
      // Activate current tab
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      
      // Show and animate target pane after a short delay to allow fade-out
      setTimeout(() => {
          targetPane.classList.add('fade-in');
          // Need 'show' for visibility and 'active' for Bootstrap styles/logic
          targetPane.classList.add('show', 'active'); 
          // Remove fade-in class after animation completes
          setTimeout(() => {
              targetPane.classList.remove('fade-in');
          }, 150); // Match animation duration
      }, 50); // Delay to ensure fade-out starts
    });
  });
}

/**
 * Form Validation
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form.needs-validation');
  
  forms.forEach(form => {
    // Add novalidate attribute to all forms
    form.setAttribute('novalidate', '');
    
    form.addEventListener('submit', function(e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        
        // Highlight invalid fields
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach(field => {
          field.classList.add('is-invalid');
          
          // Add shake animation to invalid fields
          field.classList.add('shake');
          setTimeout(() => {
            field.classList.remove('shake');
          }, 600);
          
          // Clear invalid state on input
          field.addEventListener('input', function() {
            if (this.checkValidity()) {
              this.classList.remove('is-invalid');
              this.classList.add('is-valid');
            }
          });
        });
        
        // Scroll to first invalid field
        if (invalidFields.length > 0) {
          invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          invalidFields[0].focus();
        }
      } else {
        // Add valid class to all fields
        form.querySelectorAll('.form-control').forEach(field => {
          field.classList.add('is-valid');
        });
      }
      
      form.classList.add('was-validated');
    });
    
    // Real-time validation for password strength
    const passwordFields = form.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
      field.addEventListener('input', function() {
        const value = this.value;
        const strengthMeter = this.parentNode.querySelector('.password-strength');
        
        if (strengthMeter) {
          // Check password strength
          let strength = 0;
          if (value.length >= 8) strength++;
          if (value.match(/[a-z]/)) strength++;
          if (value.match(/[A-Z]/)) strength++;
          if (value.match(/[0-9]/)) strength++;
          if (value.match(/[^a-zA-Z0-9]/)) strength++;
          
          // Update strength meter
          strengthMeter.className = 'password-strength';
          if (strength === 0) strengthMeter.classList.add('empty');
          else if (strength <= 2) strengthMeter.classList.add('weak');
          else if (strength <= 4) strengthMeter.classList.add('medium');
          else strengthMeter.classList.add('strong');
        }
      });
    });
  });
}

/**
 * Language Switcher
 */
function initLanguageSwitcher() {
  const languageToggle = document.getElementById('languageToggle');
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      const currentLang = document.documentElement.getAttribute('lang');
      const currentDir = document.documentElement.getAttribute('dir');
      
      if (currentLang === 'en') {
        // Switch to Arabic
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
        languageToggle.innerHTML = '<i class="fas fa-globe"></i> English';
        
        // Add transition class to body
        document.body.classList.add('lang-transition');
        setTimeout(() => {
          document.body.classList.remove('lang-transition');
        }, 500);
        
        // Call translation function
        translateToArabic();
      } else {
        // Switch to English
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
        languageToggle.innerHTML = '<i class="fas fa-globe"></i> العربية';
        
        // Add transition class to body
        document.body.classList.add('lang-transition');
        setTimeout(() => {
          document.body.classList.remove('lang-transition');
        }, 500);
        
        // Call translation function
        translateToEnglish();
      }
    });
  }
}

/**
 * Mobile Optimizations
 */
function initMobileOptimizations() {
  // Detect touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    // Optimize hover states for touch
    document.querySelectorAll('.card, .btn, .nav-link').forEach(element => {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      
      element.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 300);
      });
    });
    
    // Add pull-to-refresh functionality
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    }, false);
    
    document.addEventListener('touchmove', function(e) {
      touchEndY = e.touches[0].clientY;
      
      // If at top of page and pulling down
      if (window.scrollY === 0 && touchEndY > touchStartY) {
        const pullDistance = touchEndY - touchStartY;
        
        // Create or update pull indicator
        let pullIndicator = document.querySelector('.pull-indicator');
        if (!pullIndicator) {
          pullIndicator = document.createElement('div');
          pullIndicator.className = 'pull-indicator';
          document.body.prepend(pullIndicator);
        }
        
        // Update indicator height based on pull distance
        const maxHeight = 80;
        const height = Math.min(pullDistance / 2, maxHeight);
        pullIndicator.style.height = height + 'px';
        
        if (height >= maxHeight) {
          pullIndicator.classList.add('ready');
        } else {
          pullIndicator.classList.remove('ready');
        }
      }
    }, false);
    
    document.addEventListener('touchend', function() {
      const pullIndicator = document.querySelector('.pull-indicator');
      if (pullIndicator) {
        if (pullIndicator.classList.contains('ready')) {
          // Refresh the page
          pullIndicator.classList.add('refreshing');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // Remove indicator with animation
          pullIndicator.style.height = '0';
          setTimeout(() => {
            pullIndicator.remove();
          }, 300);
        }
      }
      
      // Reset touch positions
      touchStartY = 0;
      touchEndY = 0;
    }, false);
  }
  
  // Handle orientation changes
  window.addEventListener('orientationchange', function() {
    // Add class to body during orientation change
    document.body.classList.add('orientation-change');
    
    // Remove class after orientation change is complete
    setTimeout(() => {
      document.body.classList.remove('orientation-change');
    }, 300);
  });
  
  // Optimize inputs for mobile
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    // Auto-focus next input on enter for mobile
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !this.classList.contains('textarea')) {
        e.preventDefault();
        
        // Find next input
        const form = this.closest('form');
        if (form) {
          const formElements = Array.from(form.elements);
          const currentIndex = formElements.indexOf(this);
          const nextElement = formElements[currentIndex + 1];
          
          if (nextElement) {
            nextElement.focus();
          } else {
            // If last element, submit form
            form.dispatchEvent(new Event('submit'));
          }
        }
      }
    });
  });
}

/**
 * Search Filters
 */
function initSearchFilters() {
  // Range sliders
  const rangeInputs = document.querySelectorAll('input[type="range"]');
  rangeInputs.forEach(input => {
    const valueDisplay = document.querySelector(`#${input.id}-value`);
    
    if (valueDisplay) {
      // Update value display on input
      input.addEventListener('input', function() {
        valueDisplay.textContent = this.value;
      });
    }
  });
  
  // Price range inputs
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  
  if (minPriceInput && maxPriceInput) {
    // Ensure min price doesn't exceed max price
    minPriceInput.addEventListener('change', function() {
      if (parseInt(this.value) > parseInt(maxPriceInput.value)) {
        maxPriceInput.value = this.value;
      }
    });
    
    // Ensure max price isn't less than min price
    maxPriceInput.addEventListener('change', function() {
      if (parseInt(this.value) < parseInt(minPriceInput.value)) {
        minPriceInput.value = this.value;
      }
    });
  }
  
  // Filter toggles
  const filterToggles = document.querySelectorAll('.search-filter');
  filterToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
      
      // Update filter count
      updateFilterCount();
    });
  });
  
  // Filter sidebar toggle for mobile
  const filterToggleBtn = document.querySelector('.filter-toggle');
  const filterSidebar = document.querySelector('.filter-sidebar');
  const filterCloseBtn = document.querySelector('.filter-close');
  
  if (filterToggleBtn && filterSidebar) {
    filterToggleBtn.addEventListener('click', function() {
      filterSidebar.classList.add('show');
      document.body.classList.add('filter-open');
    });
    
    if (filterCloseBtn) {
      filterCloseBtn.addEventListener('click', function() {
        filterSidebar.classList.remove('show');
        document.body.classList.remove('filter-open');
      });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
      if (filterSidebar.classList.contains('show') && 
          !filterSidebar.contains(event.target) && 
          !filterToggleBtn.contains(event.target)) {
        filterSidebar.classList.remove('show');
        document.body.classList.remove('filter-open');
      }
    });
  }
  
  // Helper function to update filter count
  function updateFilterCount() {
    const activeFilters = document.querySelectorAll('.search-filter.active');
    const filterCount = document.querySelector('.filter-count');
    
    if (filterCount) {
      filterCount.textContent = activeFilters.length;
      
      if (activeFilters.length > 0) {
        filterCount.classList.add('show');
      } else {
        filterCount.classList.remove('show');
      }
    }
  }
}

/**
 * Lazy Loading
 */
function initLazyLoading() {
  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          
          // Load high-res version if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      
      img.classList.add('loaded');
    });
  }
  
  // Lazy load background images
  const lazyBackgrounds = document.querySelectorAll('[data-background]');
  
  if ('IntersectionObserver' in window) {
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.style.backgroundImage = `url(${element.dataset.background})`;
          element.classList.add('loaded');
          backgroundObserver.unobserve(element);
        }
      });
    });
    
    lazyBackgrounds.forEach(bg => {
      backgroundObserver.observe(bg);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyBackgrounds.forEach(bg => {
      bg.style.backgroundImage = `url(${bg.dataset.background})`;
      bg.classList.add('loaded');
    });
  }
}

/**
 * Animations
 */
function initAnimations() {
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animatedElements.forEach(element => {
      element.classList.add('animated');
    });
  }
  
  // Add hover animations
  const hoverElements = document.querySelectorAll('.hover-animate');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
}

/**
 * Message System
 */
function initMessageSystem() {
  // Message form submission
  const messageForm = document.querySelector('.message-form');
  
  if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const messageInput = this.querySelector('.message-input');
      const messageBody = document.querySelector('.message-body');
      
      if (messageInput.value.trim() !== '' && messageBody) {
        // Create new message element
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item sent';
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.textContent = messageInput.value;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageItem.appendChild(messageBubble);
        messageItem.appendChild(messageTime);
        
        // Add message to chat
        messageBody.appendChild(messageItem);
        
        // Clear input
        messageInput.value = '';
        
        // Scroll to bottom
        messageBody.scrollTop = messageBody.scrollHeight;
        
        // Add typing indicator for demo
        setTimeout(() => {
          const typingIndicator = document.createElement('div');
          typingIndicator.className = 'typing-indicator';
          typingIndicator.innerHTML = '<span></span><span></span><span></span>';
          messageBody.appendChild(typingIndicator);
          
          // Scroll to bottom
          messageBody.scrollTop = messageBody.scrollHeight;
          
          // Remove typing indicator and add response after delay
          setTimeout(() => {
            typingIndicator.remove();
            
            // Create response message
            const responseItem = document.createElement('div');
            responseItem.className = 'message-item received';
            
            const responseBubble = document.createElement('div');
            responseBubble.className = 'message-bubble';
            responseBubble.textContent = 'Thanks for your message! This is a demo response.';
            
            const responseTime = document.createElement('div');
            responseTime.className = 'message-time';
            responseTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            responseItem.appendChild(responseBubble);
            responseItem.appendChild(responseTime);
            
            // Add response to chat
            messageBody.appendChild(responseItem);
            
            // Scroll to bottom
            messageBody.scrollTop = messageBody.scrollHeight;
          }, 2000);
        }, 1000);
      }
    });
  }
  
  // Conversation list item click
  const conversationItems = document.querySelectorAll('.conversation-item');
  
  conversationItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      conversationItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Remove unread badge
      const badge = this.querySelector('.conversation-badge');
      if (badge) {
        badge.remove();
      }
    });
  });
}

/**
 * Notifications
 */
function initNotifications() {
  // Mark notifications as read
  const notificationItems = document.querySelectorAll('.notification-item.unread');
  
  notificationItems.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.remove('unread');
    });
  });
  
  // Notification counter
  const notificationCounter = document.querySelector('.notification-counter');
  
  if (notificationCounter) {
    // Update counter based on unread notifications
    function updateNotificationCounter() {
      const unreadCount = document.querySelectorAll('.notification-item.unread').length;
      
      if (unreadCount > 0) {
        notificationCounter.textContent = unreadCount;
        notificationCounter.classList.add('show');
      } else {
        notificationCounter.classList.remove('show');
      }
    }
    
    // Initial update
    updateNotificationCounter();
    
    // Update when notifications are marked as read
    notificationItems.forEach(item => {
      item.addEventListener('click', updateNotificationCounter);
    });
  }
}

/**
 * Profile Interactions
 */
function initProfileInteractions() {
  // Profile tabs
  const profileTabs = document.querySelectorAll('.profile-tab');
  
  profileTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Get target content
      const target = document.querySelector(this.dataset.target);
      
      if (target) {
        // Hide all tab contents
        document.querySelectorAll('.profile-tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Deactivate all tabs
        profileTabs.forEach(t => {
          t.classList.remove('active');
        });
        
        // Activate current tab and content
        this.classList.add('active');
        target.classList.add('active');
      }
    });
  });
  
  // Follow/Unfollow button
  const followButton = document.querySelector('.profile-follow-btn');
  
  if (followButton) {
    followButton.addEventListener('click', function() {
      this.classList.toggle('following');
      
      if (this.classList.contains('following')) {
        this.textContent = 'Following';
      } else {
        this.textContent = 'Follow';
      }
    });
  }
}

/**
 * Listing Interactions
 */
function initListingInteractions() {
  // Room gallery
  const mainImage = document.querySelector('.room-gallery-main');
  const thumbs = document.querySelectorAll('.room-gallery-thumb');
  
  if (mainImage && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Update main image
        mainImage.src = this.dataset.src;
        
        // Update active thumb
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  
  // Favorite button
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  
  favoriteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Show toast notification
        showToast('Added to favorites');
      } else {
        this.innerHTML = '<i class="far fa-heart"></i>';
        
        // Show toast notification
        showToast('Removed from favorites');
      }
    });
  });
  
  // Helper function to show toast notifications
  function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
  // Add aria attributes to interactive elements
  document.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach(element => {
    // Skip elements that already have aria-label
    if (!element.hasAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
      // Use text content as label if available
      if (element.textContent.trim()) {
        element.setAttribute('aria-label', element.textContent.trim());
      }
    }
  });
  
  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to content';
  document.body.prepend(skipLink);
  
  // Add main-content id to main content area if not present
  if (!document.getElementById('main-content')) {
    const main = document.querySelector('main') || document.querySelector('.main-content');
    if (main) {
      main.id = 'main-content';
    }
  }
  
  // Focus trap for modals
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    modal.addEventListener('keydown', function(e) {
      // If Tab key is pressed
      if (e.key === 'Tab') {
        // Get all focusable elements in modal
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // If shift key is pressed and focus is on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // If focus is on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  });
}

/**
 * Dark Mode Toggle
 */
function initDarkModeToggle() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  if (darkModeToggle) {
    // Check system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check saved preference
    const savedPreference = localStorage.getItem('darkMode');
    
    // Set initial state
    if (savedPreference === 'dark' || (savedPreference !== 'light' && prefersDarkMode)) {
      document.documentElement.classList.add('dark-mode');
      darkModeToggle.classList.add('active');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      this.classList.toggle('active');
      
      // Save preference
      if (document.documentElement.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'dark');
      } else {
        localStorage.setItem('darkMode', 'light');
      }
    });
  }
}

/**
 * Translation Functions
 */
function translateToArabic() {
  // This would be replaced with actual translations from a JSON file or API
  const translations = {
    'Find Your Perfect Roommate in Saudi Arabia': 'ابحث عن شريك السكن المثالي في المملكة العربية السعودية',
    'Connect with compatible roommates': 'تواصل مع شركاء سكن متوافقين',
    'Male Section': 'قسم الرجال',
    'Female Section': 'قسم النساء',
    'Select City': 'اختر المدينة',
    'Price Range': 'نطاق السعر',
    'Find Rooms': 'ابحث عن غرف',
    'Why Choose Roomaity?': 'لماذا تختار روميتي؟',
    'Safe & Secure': 'آمن ومضمون',
    'Culturally Appropriate': 'مناسب ثقافياً',
    'Smart Matching': 'تطابق ذكي',
    'How It Works': 'كيف يعمل',
    'Create Profile': 'إنشاء ملف شخصي',
    'List or Search': 'أضف أو ابحث',
    'Connect': 'تواصل',
    'Move In': 'انتقل للسكن',
    'Featured Listings': 'القوائم المميزة',
    'Male Listings': 'قوائم الرجال',
    'Female Listings': 'قوائم النساء',
    'For Males': 'للرجال',
    'For Females': 'للنساء',
    'View Details': 'عرض التفاصيل',
    'View All Male Listings': 'عرض جميع قوائم الرجال',
    'View All Female Listings': 'عرض جميع قوائم النساء',
    'Find Your Ideal Roommate': 'ابحث عن شريك السكن المثالي',
    'Male Roommates': 'شركاء سكن (رجال)',
    'Female Roommates': 'شريكات سكن (نساء)',
    'View Profile': 'عرض الملف الشخصي',
    'What Our Users Say': 'ماذا يقول مستخدمونا',
    'Ready to Find Your Perfect Roommate?': 'هل أنت مستعد للعثور على شريك السكن المثالي؟',
    'Sign Up Now': 'سجل الآن',
    'Quick Links': 'روابط سريعة',
    'Resources': 'موارد',
    'Contact Us': 'اتصل بنا',
    'Home': 'الرئيسية',
    'Login': 'تسجيل الدخول',
    'All rights reserved.': 'جميع الحقوق محفوظة.'
  };
  
  // Replace text content with Arabic translations
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
  
  // Add data-translate attributes to elements that need translation
  if (!document.querySelector('[data-translate]')) {
    addTranslateAttributes();
  }
}

function translateToEnglish() {
  // Restore original English text
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = key;
  });
}

function addTranslateAttributes() {
  // Add data-translate attributes to elements that need translation
  const elementsToTranslate = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, button, label, option');
  
  elementsToTranslate.forEach(element => {
    if (element.textContent.trim()) {
      element.setAttribute('data-translate', element.textContent.trim());
    }
  });
}
