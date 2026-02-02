// ============================================
// LIGHTBOX - Full-screen Image Viewer
// ============================================

class Lightbox {
    constructor(carousel) {
        this.carousel = carousel;
        this.currentIndex = 0;
        this.isOpen = false;
        
        // DOM elements
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.querySelector('.lightbox-caption');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.counter = {
            current: document.querySelector('.lightbox-current'),
            total: document.querySelector('.lightbox-total')
        };
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Make carousel images clickable
        this.makeImagesClickable();
        
        console.log('Lightbox initialized');
    }
    
    makeImagesClickable() {
        // Add click handlers to carousel images
        this.carousel.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    this.open(index);
                });
            }
        });
    }
    
    setupEventListeners() {
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Click outside image to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
    }
    
    open(index) {
        this.currentIndex = index;
        this.isOpen = true;
        
        // Stop carousel autoplay
        if (this.carousel.isAutoPlaying) {
            this.carousel.stopAutoPlay();
        }
        
        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
        
        // Load image
        this.loadImage(index);
        
        console.log('Lightbox opened at index:', index);
    }
    
    close() {
        this.isOpen = false;
        this.lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        
        // Restart carousel autoplay if it was on
        if (this.carousel.config.settings.autoPlay) {
            this.carousel.startAutoPlay();
        }
        
        console.log('Lightbox closed');
    }
    
    loadImage(index) {
        const imageData = this.carousel.config.images[index];
        const imagePath = this.carousel.config.imagePath + imageData.filename;
        
        // Show loading state
        const container = document.querySelector('.lightbox-image-container');
        container.classList.add('loading');
        
        // Load image
        this.lightboxImage.src = imagePath;
        this.lightboxImage.alt = imageData.alt;
        
        // Update caption
        this.lightboxCaption.textContent = imageData.caption;
        
        // Update counter
        this.updateCounter();
        
        // Remove loading state when image loads
        this.lightboxImage.onload = () => {
            container.classList.remove('loading');
        };
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.carousel.config.images.length;
        this.loadImage(this.currentIndex);
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.carousel.config.images.length) % this.carousel.config.images.length;
        this.loadImage(this.currentIndex);
    }
    
    updateCounter() {
        this.counter.current.textContent = this.currentIndex + 1;
        this.counter.total.textContent = this.carousel.config.images.length;
    }
}

// Initialize lightbox when carousel is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for carousel to be created
    setTimeout(() => {
        if (window.carousel) {
            window.lightbox = new Lightbox(window.carousel);
            console.log('Lightbox connected to carousel');
        }
    }, 100);
});
