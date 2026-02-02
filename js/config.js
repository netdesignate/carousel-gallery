// Image Configuration
// This file manages the gallery images

const galleryConfig = {
    // Path to images folder
    imagePath: '../images/gallery/',
    
    // Image array - add your images here
    images: [
        {
            filename: 'sample1.jpg',
            alt: 'Sample image 1',
            caption: 'Beautiful landscape'
        },
        {
            filename: 'sample2.jpg',
            alt: 'Sample image 2',
            caption: 'City skyline at sunset'
        },
        {
            filename: 'sample3.jpg',
            alt: 'Sample image 3',
            caption: 'Mountain vista'
        },
        {
            filename: 'sample4.jpg',
            alt: 'Sample image 4',
            caption: 'Ocean waves'
        },
        {
            filename: 'sample5.jpg',
            alt: 'Sample image 5',
            caption: 'Forest path'
        }
    ],
    
    // Carousel settings
    settings: {
        autoPlay: true,
        autoPlayInterval: 3000, // milliseconds
        transitionSpeed: 500,   // milliseconds
        enableKeyboard: true,
        enableTouch: true,
        showThumbnails: true,
        showIndicators: true,
        showCounter: true
    }
};

// Export for use in carousel.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryConfig;
}
