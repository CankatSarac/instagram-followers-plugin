# 🕵️ Instagram Unfollower Detective - Chrome Extension

A unique Chrome extension that helps you discover who doesn't follow you back on Instagram with a beautiful, modern interface.

## 📁 Extension Directory

Load this entire folder in Chrome as an unpacked extension:
`~/Documents/SideProj/instagram-unfollower-detective-extension/`

## 🚀 Quick Installation

1. **Open Chrome Extensions**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

2. **Load the Extension**
   - Click "Load unpacked"
   - Select this folder: `instagram-unfollower-detective-extension`
   - The extension should appear in your extensions list

3. **Start Using**
   - Go to `https://www.instagram.com` and log in
   - Click the extension icon in your browser toolbar
   - Click "Start Investigation" to begin

## 🎯 How It Works

1. **Visit Instagram**: Navigate to Instagram.com and log in
2. **Launch Extension**: Click the extension icon in your toolbar
3. **Start Investigation**: Click the purple "Start Investigation" button
4. **Watch Progress**: A beautiful overlay appears showing scanning progress
5. **View Results**: See detailed statistics in the extension popup

## ✨ Features

- **Unique Design**: Purple gradient theme with detective styling
- **Real-time Progress**: Visual progress bar during scanning
- **Detailed Results**: Shows total following, mutual follows, and unfollowers
- **Safe & Secure**: All processing happens locally in your browser
- **No Data Storage**: No external servers or data collection

## 🎨 UI Highlights

- Gradient purple-blue background with floating particles
- Modern typography and smooth animations  
- Responsive design that works on all screen sizes
- Beautiful overlay that appears on Instagram during scanning
- Progress tracking with shimmer effects

## 📋 Files Included

- `manifest.json` - Extension configuration
- `popup.html` - Main popup interface
- `popup.js` - Extension logic and Instagram integration
- `content.js` - Content script that injects into Instagram
- `content.css` - Styling for the investigation overlay
- `create_icons.html` - Tool to create custom icons (optional)

## 🛠️ Optional: Create Custom Icons

1. Open `create_icons.html` in your browser
2. Download the generated PNG files
3. Create an `icons/` folder in the extension directory
4. Move the PNG files to the `icons/` folder
5. Update `manifest.json` to include the icons section:
   ```json
   "icons": {
     "16": "icons/icon16.png",
     "48": "icons/icon48.png", 
     "128": "icons/icon128.png"
   }
   ```

## ⚠️ Important Notes

- **Instagram Login Required**: Must be logged into Instagram.com
- **Processing Time**: Larger follower counts take longer to scan
- **Rate Limits**: Respects Instagram's API rate limits with built-in delays
- **Chrome Only**: Designed specifically for Chrome browser
- **No Unfollowing**: This extension only identifies unfollowers, it doesn't unfollow

## 🔒 Privacy & Security

- ✅ No external servers
- ✅ No data collection
- ✅ All processing happens locally
- ✅ Open source code
- ✅ Respects Instagram's terms of service

## 🐛 Troubleshooting

**Extension won't load?**
- Make sure you're loading the correct folder
- Check that all files are present
- Enable Developer mode in Chrome

**Investigation not starting?**
- Ensure you're logged into Instagram.com
- Try refreshing the Instagram page
- Check browser console for any errors

**No results showing?**
- Wait for the investigation to complete (100%)
- Make sure you have both followers and following
- Try running the investigation again

## 🎉 Success!

Once loaded, you'll see "Instagram Unfollower Detective" in your Chrome extensions. Click it while on Instagram to start investigating your unfollowers with style!

---

**Made with ❤️ for Instagram users who want to know who's really following them back.**