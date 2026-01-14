// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.classList.remove('fa-moon');
            darkModeToggle.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.classList.remove('fa-sun');
            darkModeToggle.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.remove('fa-moon');
        darkModeToggle.classList.add('fa-sun');
    }
    
    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
    
    // Booking form validation
    const bookingForm = document.getElementById('bookingForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const dateInput = document.getElementById('date');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const emailError = document.getElementById('email-error');
    const dateError = document.getElementById('date-error');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Validation functions
    function validateName() {
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validatePhone() {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.style.display = 'block';
            return false;
        } else {
            phoneError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validateDate() {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!dateInput.value || selectedDate < today) {
            dateError.textContent = 'Please select a future date';
            dateError.style.display = 'block';
            return false;
        } else {
            dateError.style.display = 'none';
            return true;
        }
    }
    
    // Event listeners for real-time validation
    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    emailInput.addEventListener('blur', validateEmail);
    dateInput.addEventListener('change', validateDate);
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isDateValid = validateDate();
        
        if (isNameValid && isPhoneValid && isEmailValid && isDateValid) {
            // In a real application, you would submit the form data to a server here
            alert('Thank you for your booking! We will contact you shortly to confirm your appointment.');
            bookingForm.reset();
            
            // Hide all error messages
            [nameError, phoneError, emailError, dateError].forEach(error => {
                error.style.display = 'none';
            });
        } else {
            alert('Please fix the errors in the form before submitting.');
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
    
    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    let currentImageIndex = 0;
    const galleryImages = [
        { src: 'pic1.jpeg', alt: 'Braiding style' },
        { src: 'pic10.jpeg', alt: 'Hair installation' },
        { src: 'pic9.jpeg', alt: 'Nail art' },
        { src: 'pic8.jpeg', alt: 'Braids updo' },
        { src: 'pic7.jpeg', alt: 'Hair extensions' },
        { src: 'pic11.jpeg', alt: 'Nail design' }
    ];
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    function updateLightbox() {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
        lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
    }
    
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    });
    
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightbox();
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Testimonials carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show current slide and update indicator
        testimonialSlides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = testimonialSlides.length - 1;
        showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});