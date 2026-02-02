// Image Configuration
// This file manages the gallery images
// Image Configuration
const galleryConfig = {
    imagePath: '../images/gallery/',
    
    images: [
        {
            filename: 'P1055780.JPG',
            alt: 'Photo 1',
            caption: 'Add your caption here'
        },
        {
            filename: 'P1055792.JPG',
            alt: 'Photo 2',
            caption: 'Add your caption here'
        },
        {
            filename: 'P1055796.JPG',
            alt: 'Photo 3',
            caption: 'Add your caption here'
        },
        {
            filename: 'P1055798.JPG',
            alt: 'Photo 4',
            caption: 'Add your caption here'
        },
        {
            filename: 'P1055817.JPG',
            alt: 'Photo 5',
            caption: 'Add your caption here'
        },
        {
            filename: 'P1055822.JPG',
            alt: 'Photo 6',
            caption: 'Add your caption here'
        }
    ],
    
    settings: {
        autoPlay: true,
        autoPlayInterval: 3000,
        transitionSpeed: 500,
        enableKeyboard: true,
        enableTouch: true,
        showThumbnails: true,
        showIndicators: true,
        showCounter: true
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryConfig;
}
