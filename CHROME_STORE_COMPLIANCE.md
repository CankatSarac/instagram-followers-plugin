# Chrome Web Store Compliance Form Responses

## Single Purpose

### Single purpose description (1000 characters max):
```
Instagram Unfollower Detective has a single, focused purpose: to help Instagram users identify accounts they follow that don't follow them back. The extension analyzes public follower/following relationships on Instagram.com using Instagram's standard APIs, displays the results in an organized interface, and allows users to manage their following list efficiently. All analysis is performed locally in the user's browser for privacy. The extension does not perform any other functions beyond unfollower detection and basic list management features like search, filtering, and whitelisting favorite accounts.
```

## Permission Justifications

### activeTab justification (1000 characters max):
```
The activeTab permission is essential for accessing the current Instagram tab when users click the extension icon. This permission allows the extension to read Instagram page content and inject the detective interface only when the user actively requests it. Without activeTab, the extension cannot access Instagram's DOM structure to retrieve follower data or display the analysis interface. This permission is used exclusively for the core functionality of detecting unfollowers and operates only on the active Instagram tab when the user initiates the action.
```

### storage justification (1000 characters max):
```
The storage permission is required to save user preferences locally in their browser, including whitelisted accounts and filter settings. Users can whitelist important accounts (friends, family, business partners) to exclude them from unfollower analysis results. The extension also remembers user preferences like display filters and search history for a better user experience. All data is stored locally in the user's browser using Chrome's storage API and never transmitted externally. This enhances usability by preserving user choices between sessions while maintaining complete privacy.
```

### scripting justification (1000 characters max):
```
The scripting permission is necessary to inject the detective analysis interface into Instagram pages. When users activate the extension, it dynamically creates and displays the unfollower detection dashboard within the Instagram website. This permission allows the extension to execute the core analysis code that retrieves follower/following data from Instagram's APIs and presents the results in an organized, user-friendly interface. The scripting is used exclusively for displaying the detective interface and processing follower relationships locally in the user's browser.
```

### Host permission justification (1000 characters max):
```
The host permission for https://www.instagram.com/* is essential for accessing Instagram's public GraphQL API endpoints to retrieve follower and following data. The extension needs to make API requests to Instagram's servers to fetch public follower/following lists that are already visible on the user's Instagram profile. This permission is strictly limited to Instagram domains and is used only to access public data through Instagram's standard APIs. Without this permission, the extension cannot retrieve the follower data necessary for unfollower analysis.
```

## Remote Code

### Are you using remote code?
```
No, I am not using Remote code
```

### Justification (if Yes - leave empty since we selected No):
```
[Leave empty - not applicable]
```

## Data Usage

### What user data do you plan to collect?

**Select NONE of the checkboxes** - We don't collect any user data:

- ❌ Personally identifiable information
- ❌ Health information  
- ❌ Financial and payment information
- ❌ Authentication information
- ❌ Personal communications
- ❌ Location
- ❌ Web history
- ❌ User activity
- ❌ Website content

### Certifications (Check ALL three):
- ✅ I do not sell or transfer user data to third parties, outside of the approved use cases
- ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose  
- ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes

## Privacy Policy

### Privacy policy URL:
```
https://github.com/CankatSarac/instagram-followers-plugin/blob/main/PRIVACY_POLICY.md
```

---

## Additional Developer Information

### Developer Contact:
- **Email**: srccankat@gmail.com
- **GitHub**: https://github.com/CankatSarac/instagram-followers-plugin
- **Support**: https://github.com/CankatSarac/instagram-followers-plugin/issues

### Key Privacy Points:
1. **No data collection** - Extension processes data locally only
2. **No external transmission** - All analysis happens in user's browser
3. **No third-party services** - No analytics, tracking, or external APIs
4. **User control** - All data can be cleared at any time
5. **Open source** - Full transparency through GitHub repository

### Security Compliance:
- Chrome Manifest V3 compliant
- Content Security Policy implemented
- Minimal permissions requested
- Instagram-domain restrictions only
- No unsafe code evaluation

---

## Summary for Review Team

Instagram Unfollower Detective is a privacy-focused Chrome extension that:
- Has a single, clear purpose: unfollower detection on Instagram
- Processes all data locally in the user's browser
- Does not collect, store, or transmit any personal data
- Uses minimal permissions only for essential functionality
- Provides full transparency through open source code
- Includes comprehensive privacy policy and user documentation

The extension is designed to be completely privacy-compliant and meets all Chrome Web Store developer program policies.