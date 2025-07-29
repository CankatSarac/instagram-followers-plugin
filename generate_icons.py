#!/usr/bin/env python3
"""
Instagram Unfollower Detective - Icon Generator
Creates PNG icons in required sizes for Chrome Web Store
"""

from PIL import Image, ImageDraw
import os

def create_icon(size):
    """Create an icon of the specified size"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Scale factor
    scale = size / 128
    
    # Instagram gradient colors (approximated with solid color for simplicity)
    instagram_color = (131, 58, 180)  # Instagram purple
    detective_color = (255, 255, 255)  # White for detective elements
    accent_color = (255, 68, 68)  # Red for unfollower indicators
    
    # Main circle background
    center = size // 2
    radius = int((size // 2) - (2 * scale))
    
    # Draw main circle
    draw.ellipse([center - radius, center - radius, center + radius, center + radius], 
                fill=instagram_color, outline=(51, 51, 51), width=max(1, int(2 * scale)))
    
    # Detective magnifying glass
    glass_center_x = center - int(8 * scale)
    glass_center_y = center - int(8 * scale)
    glass_radius = int(18 * scale)
    
    # Magnifying glass lens (outer)
    draw.ellipse([glass_center_x - glass_radius, glass_center_y - glass_radius,
                 glass_center_x + glass_radius, glass_center_y + glass_radius],
                outline=detective_color, width=max(1, int(4 * scale)))
    
    # Magnifying glass lens (inner)
    inner_radius = int(15 * scale)
    draw.ellipse([glass_center_x - inner_radius, glass_center_y - inner_radius,
                 glass_center_x + inner_radius, glass_center_y + inner_radius],
                outline=detective_color, width=max(1, int(2 * scale)))
    
    # Magnifying glass handle
    handle_start_x = center + int(8 * scale)
    handle_start_y = center + int(8 * scale)
    handle_end_x = center + int(22 * scale)
    handle_end_y = center + int(22 * scale)
    
    # Draw thick line for handle
    for i in range(max(1, int(4 * scale))):
        offset = i - (int(4 * scale) // 2)
        draw.line([handle_start_x + offset, handle_start_y,
                  handle_end_x + offset, handle_end_y], fill=detective_color)
        draw.line([handle_start_x, handle_start_y + offset,
                  handle_end_x, handle_end_y + offset], fill=detective_color)
    
    # Instagram camera icon inside lens (simplified)
    camera_size = max(2, int(8 * scale))
    camera_x = glass_center_x - camera_size // 2
    camera_y = glass_center_y - camera_size // 2
    
    # Camera body
    draw.rectangle([camera_x, camera_y, camera_x + camera_size, camera_y + camera_size],
                  outline=detective_color, width=max(1, int(2 * scale)))
    
    # Camera lens
    lens_radius = max(1, int(3 * scale))
    draw.ellipse([glass_center_x - lens_radius, glass_center_y - lens_radius,
                 glass_center_x + lens_radius, glass_center_y + lens_radius],
                outline=detective_color, width=max(1, int(1 * scale)))
    
    # Detective hat (simplified)
    hat_y = center - int(34 * scale)
    hat_width = int(40 * scale)
    hat_height = max(2, int(8 * scale))
    draw.rectangle([center - hat_width//2, hat_y - hat_height//2,
                   center + hat_width//2, hat_y + hat_height//2],
                  fill=(44, 44, 44))
    
    # Unfollower indicator dots
    dot_radius = max(1, int(3 * scale))
    
    # Dot positions (scaled)
    dots = [
        (int(30 * scale), int(45 * scale)),
        (int(98 * scale), int(55 * scale)),
        (int(35 * scale), int(85 * scale))
    ]
    
    for dot_x, dot_y in dots:
        if dot_x < size and dot_y < size:  # Make sure dots are within bounds
            draw.ellipse([dot_x - dot_radius, dot_y - dot_radius,
                         dot_x + dot_radius, dot_y + dot_radius],
                        fill=accent_color)
    
    return img

def main():
    """Generate all required icon sizes"""
    sizes = [16, 48, 128]
    
    # Create icons directory if it doesn't exist
    os.makedirs('icons', exist_ok=True)
    
    for size in sizes:
        print(f"Generating {size}x{size} icon...")
        icon = create_icon(size)
        filename = f"icons/icon{size}.png"
        icon.save(filename, "PNG")
        print(f"Saved {filename}")
    
    print("All icons generated successfully!")
    print("\nFiles created:")
    for size in sizes:
        print(f"  - icons/icon{size}.png")

if __name__ == "__main__":
    main()