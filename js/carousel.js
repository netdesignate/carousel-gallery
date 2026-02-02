// ============================================
// CAROUSEL GALLERY - Main JavaScript
// ============================================

class CarouselGallery {
    constructor(config) {
        this.config = config;
        this.currentIndex = 0;
        this.isAutoPlaying = false;
        this.autoPlayTimer = null;
        
        // DOM Elements
        this.track = null;
        this.slides = [];
        this.prevButton = null;
        this.nextButton = null;
        this.indicators = [];
        this.thumbnails = [];
        this.counter = null;
        
        // Initialize
        this.init();
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        console.log('Initializing carousel with', this.config.images.length, 'images');
        
        // Get DOM references
        this.track = document.querySelector('.carousel-track');
        this.prevButton = document.querySelector('.carousel-control.prev');
        this.nextButton = document.querySelector('.carousel-control.next');
        this.counter = {
            current: document.querySelector('.current-slide'),
            total: document.querySelector('.total-slides')
        };
        
        // Build carousel
        this.createSlides();
        this.createIndicators();
        this.createThumbnails();
        this.updateCounter();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start autoplay if enabled
        if (this.config.settings.autoPlay) {
            this.startAutoPlay();
        }
        
        console.log('Carousel initialized successfully');
    }
    
    // ============================================
    // CREATE SLIDES
    // ============================================
   createSlides() {
        this.config.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            
            // Add active class to first slide
            if (index === 0) {
                slide.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = this.config.imagePath + image.filename;
            img.alt = image.alt;
            img.loading = index === 0 ? 'eager' : 'lazy';
            
            // Add load event listener
            img.addEventListener('load', () => {
                console.log('Image loaded:', image.filename);
            });
            
            img.addEventListener('error', () => {
                console.error('Failed to load image:', image.filename);
                img.alt = 'Image failed to load';
            });
            
            // Create caption
            const caption = document.createElement('div');
            caption.className = 'carousel-caption';
            const captionText = document.createElement('p');
            captionText.className = 'carousel-caption-text';
            captionText.textContent = image.caption;
            caption.appendChild(captionText);
            
            slide.appendChild(img);
            slide.appendChild(caption);
            this.track.appendChild(slide);
            this.slides.push(slide);
        });
    }
 
    // ============================================
    // CREATE INDICATORS (DOTS)
    // ============================================
    createIndicators() {
        const indicatorContainer = document.querySelector('.carousel-indicators');
        indicatorContainer.innerHTML = '';
        
        this.config.images.forEach((image, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.dataset.index = index;
            
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            indicatorContainer.appendChild(indicator);
            this.indicators.push(indicator);
        });
    }
    
    // ============================================
    // CREATE THUMBNAILS
    // ============================================
    createThumbnails() {
        const thumbnailContainer = document.querySelector('.thumbnail-strip');
        thumbnailContainer.innerHTML = '';
        
        this.config.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.index = index;
            
            if (index === 0) {
                thumbnail.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = this.config.imagePath + image.filename;
            img.alt = `Thumbnail ${index + 1}`;
            img.loading = 'lazy';
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            thumbnailContainer.appendChild(thumbnail);
            this.thumbnails.push(thumbnail);
        });
    }
    
    // ============================================
    // NAVIGATION
    // ============================================
   goToSlide(index) {
        // Normalize index (wrap around)
        if (index < 0) {
            index = this.config.images.length - 1;
        } else if (index >= this.config.images.length) {
            index = 0;
        }
        
        this.currentIndex = index;
        
        // Update track position
        const offset = -100 * index;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update active slide
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update active states
        this.updateActiveStates();
        this.updateCounter();
        
        // Reset autoplay timer
        if (this.config.settings.autoPlay) {
            this.resetAutoPlay();
        }
    }
 
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    // ============================================
    // UPDATE UI STATES
    // ============================================
    updateActiveStates() {
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update thumbnails
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentIndex);
        });
        
        // Scroll active thumbnail into view
        if (this.thumbnails[this.currentIndex]) {
            this.thumbnails[this.currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    updateCounter() {
        this.counter.current.textContent = this.currentIndex + 1;
        this.counter.total.textContent = this.config.images.length;
    }
    
    // ============================================
    // AUTO-PLAY
    // ============================================
    startAutoPlay() {
        this.isAutoPlaying = true;
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.config.settings.autoPlayInterval);
        console.log('Autoplay started');
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
            this.isAutoPlaying = false;
            console.log('Autoplay stopped');
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        if (this.config.settings.autoPlay) {
            this.startAutoPlay();
        }
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Previous/Next buttons
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
        });
        
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Keyboard navigation
        if (this.config.settings.enableKeyboard) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                } else if (e.key === 'Escape') {
                    this.stopAutoPlay();
                }
            });
        }
        
        // Touch/Swipe support
        if (this.config.settings.enableTouch) {
            this.setupTouchEvents();
        }
        
        // Pause autoplay on hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => {
            if (this.isAutoPlaying) {
                this.stopAutoPlay();
            }
        });
        
        carousel.addEventListener('mouseleave', () => {
            if (this.config.settings.autoPlay) {
                this.startAutoPlay();
            }
        });
    }
    
    // ============================================
    // TOUCH/SWIPE SUPPORT
    // ============================================
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        const carousel = document.querySelector('.carousel-viewport');
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - go to next
                this.nextSlide();
            } else {
                // Swiped right - go to previous
                this.prevSlide();
            }
        }
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting carousel...');
    
    // Check if config exists
    if (typeof galleryConfig === 'undefined') {
        console.error('Gallery config not found!');
        return;
    }
    
    // Create carousel instance
    const carousel = new CarouselGallery(galleryConfig);
    
    // Make it globally accessible for debugging
    window.carousel = carousel;
    
    console.log('Carousel ready! Use window.carousel to access it from console.');
});
