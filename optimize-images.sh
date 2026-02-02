#!/bin/bash
echo "Optimizing images for web..."

cd images/gallery

for img in P*.JPG; do
    if [ -f "$img" ]; then
        echo "Processing $img..."
        
        # Resize to max 1920px width, maintain aspect ratio, 85% quality
        convert "$img" \
            -resize '1920x1920>' \
            -quality 85 \
            -strip \
            "optimized/${img%.JPG}.jpg"
        
        # Show size comparison
        original=$(du -h "$img" | cut -f1)
        optimized=$(du -h "optimized/${img%.JPG}.jpg" | cut -f1)
        echo "  Original: $original → Optimized: $optimized"
    fi
done

echo ""
echo "Optimization complete!"
echo "Original total: $(du -ch P*.JPG 2>/dev/null | tail -1 | cut -f1)"
echo "Optimized total: $(du -ch optimized/*.jpg 2>/dev/null | tail -1 | cut -f1)"
