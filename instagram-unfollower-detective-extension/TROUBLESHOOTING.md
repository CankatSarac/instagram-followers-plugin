# 🔧 Troubleshooting Guide

## ✅ **FIXED: Chrome Scripting API Error**

The `chrome.scripting` error has been resolved by:
1. ✅ Adding "scripting" permission to manifest.json
2. ✅ Adding better error handling in popup.js
3. ✅ Adding API availability checks

---

## 🚀 **Fresh Installation Steps**

**IMPORTANT:** After making these fixes, you need to reload the extension:

1. **Go to:** `chrome://extensions/`
2. **Find:** "Instagram Unfollower Detective" 
3. **Click:** The reload button (🔄) next to the extension
4. **Or:** Remove and re-load the extension folder

---

## 🐛 **Common Issues & Solutions**

### **"Cannot read properties of undefined (reading 'executeScript')"**
- ✅ **FIXED** - Added "scripting" permission to manifest
- **Solution:** Reload the extension in Chrome

### **"Chrome scripting API not available"**
- **Cause:** Extension permissions not properly loaded
- **Solution:** Reload the extension or restart Chrome

### **"Please navigate to Instagram.com first"**
- **Cause:** Not on Instagram website
- **Solution:** Go to https://www.instagram.com and log in

### **"No active tab found"**
- **Cause:** Chrome can't detect the current tab
- **Solution:** Refresh the page and try again

---

## 📋 **Updated Files**

The following files have been updated to fix the scripting error:

### **manifest.json**
```json
"permissions": [
  "activeTab",
  "storage",
  "scripting"  // ← Added this permission
]
```

### **popup.js**
- ✅ Added chrome.scripting availability check
- ✅ Added better error handling
- ✅ Added tab validation
- ✅ Improved status messages

---

## 🎯 **Testing Steps**

1. **Reload Extension:** Use the reload button in `chrome://extensions/`
2. **Go to Instagram:** Navigate to https://www.instagram.com
3. **Log In:** Make sure you're logged into your Instagram account
4. **Open Extension:** Click the extension icon in your toolbar
5. **Start Investigation:** Click "Start Investigation" button

---

## 🆘 **Still Having Issues?**

If you're still getting errors:

1. **Check Console:** Open Chrome DevTools (F12) and check for errors
2. **Restart Chrome:** Close and reopen Chrome completely
3. **Clear Cache:** Clear your browser cache and cookies
4. **Extension Page:** Make sure the extension shows "Active" status

---

## ✨ **Success Indicators**

You'll know it's working when:
- ✅ Extension loads without manifest errors
- ✅ Popup shows "Ready to investigate" on Instagram
- ✅ Button is enabled and clickable
- ✅ No console errors about chrome.scripting

The extension should now work perfectly! 🎉