#!/bin/bash
# Create placeholder images using ImageMagick (if available)

cd images/gallery

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "Creating placeholder images..."
    for i in {1..5}; do
        convert -size 800x600 xc:#$(openssl rand -hex 3) \
                -gravity center -pointsize 72 -fill white \
                -annotate +0+0 "Image $i" \
                sample$i.jpg
    done
    echo "Created 5 placeholder images"
else
    echo "ImageMagick not installed. Creating text placeholders instead..."
    for i in {1..5}; do
        echo "Placeholder for sample$i.jpg" > sample$i.txt
    done
    echo "Note: Install ImageMagick with 'sudo apt install imagemagick' to create actual images"
fi
