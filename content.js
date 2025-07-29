class InstagramDetectiveContent {
    constructor() {
        this.isInjected = false;
        this.setupMessageListener();
        this.setupChromeMessageListener();
    }

    setupMessageListener() {
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'DETECTIVE_UPDATE') {
                chrome.runtime.sendMessage({
                    type: 'DETECTIVE_DATA',
                    data: event.data.data
                });
            }
        });
    }

    setupChromeMessageListener() {
        // Listen for messages from the popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('📨 [CONTENT] Received message:', request);
            
            if (request.type === 'START_INVESTIGATION') {
                console.log('🚀 [CONTENT] Starting investigation at:', new Date().toLocaleTimeString());
                this.startInvestigation();
                sendResponse({ success: true });
            } else if (request.type === 'START_ADVANCED_INVESTIGATION') {
                console.log('🚀 [CONTENT] Starting advanced investigation at:', new Date().toLocaleTimeString());
                // The advanced detective UI is already injected and ready
                sendResponse({ success: true });
            }
        });
    }

    startInvestigation() {
        if (this.isInjected) {
            console.log('⚠️ [CONTENT] Investigation already running, skipping...');
            return;
        }
        
        this.isInjected = true;
        console.log('💉 [CONTENT] Injecting detective script...');

        // Inject the detective script directly
        this.injectDetectiveScript();
    }

    injectDetectiveScript() {
        if (window.unfollowerDetectiveInjected) {
            return;
        }
        window.unfollowerDetectiveInjected = true;

        // Inject the advanced Instagram unfollower detective from the minified code
        const script = document.createElement('script');
        script.textContent = `
            (() => {
                "use strict";
                
                // Advanced Instagram Unfollower Detective Implementation
                class AdvancedInstagramDetective {
                    constructor() {
                        this.results = [];
                        this.whitelistedResults = [];
                        this.selectedResults = [];
                        this.unfollowLog = [];
                        this.currentTab = 'non_whitelisted';
                        this.page = 1;
                        this.searchTerm = '';
                        this.percentage = 0;
                        this.status = 'initial';
                        this.filter = {
                            showNonFollowers: true,
                            showFollowers: false,
                            showVerified: true,
                            showPrivate: true,
                            showWithOutProfilePicture: true,
                            showSucceeded: true,
                            showFailed: true
                        };
                        
                        this.isRunning = false;
                        this.setupUI();
                    }

                    setupUI() {
                        if (document.getElementById('iu-advanced-overlay')) return;
                        
                        const overlay = document.createElement('div');
                        overlay.id = 'iu-advanced-overlay';
                        overlay.innerHTML = \`
                            <div class="iu-modal">
                                <div class="iu-header">
                                    <h2>🕵️ Advanced Instagram Detective</h2>
                                    <button id="iu-close" class="iu-close">×</button>
                                </div>
                                <div class="iu-content">
                                    <div class="iu-sidebar">
                                        <div class="iu-filters">
                                            <h3>Filter Options</h3>
                                            <label><input type="checkbox" id="show-non-followers" checked> Non-Followers</label>
                                            <label><input type="checkbox" id="show-followers"> Followers</label>
                                            <label><input type="checkbox" id="show-verified" checked> Verified</label>
                                            <label><input type="checkbox" id="show-private" checked> Private</label>
                                        </div>
                                        <div class="iu-controls">
                                            <button id="iu-start-scan" class="iu-btn primary">Start Advanced Scan</button>
                                            <button id="iu-pause-scan" class="iu-btn secondary" disabled>Pause</button>
                                        </div>
                                        <div class="iu-stats">
                                            <div>Displayed: <span id="iu-displayed">0</span></div>
                                            <div>Total: <span id="iu-total">0</span></div>
                                            <div>Selected: <span id="iu-selected">0</span></div>
                                        </div>
                                    </div>
                                    <div class="iu-main">
                                        <div class="iu-tabs">
                                            <button class="iu-tab active" data-tab="non_whitelisted">Non-Whitelisted</button>
                                            <button class="iu-tab" data-tab="whitelisted">Whitelisted</button>
                                        </div>
                                        <div class="iu-search">
                                            <input type="text" id="iu-search" placeholder="Search users...">
                                        </div>
                                        <div class="iu-progress">
                                            <div class="iu-progress-bar">
                                                <div class="iu-progress-fill" id="iu-progress"></div>
                                            </div>
                                            <div class="iu-progress-text" id="iu-progress-text">Ready to start...</div>
                                        </div>
                                        <div class="iu-results" id="iu-results">
                                            <!-- Results will be populated here -->
                                        </div>
                                        <div class="iu-pagination">
                                            <button id="iu-prev-page">❮</button>
                                            <span id="iu-page-info">1 / 1</span>
                                            <button id="iu-next-page">❯</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        \`;

                        const styles = \`
                            #iu-advanced-overlay {
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(0, 0, 0, 0.9);
                                z-index: 999999;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                color: #fff;
                            }
                            
                            .iu-modal {
                                width: 90%;
                                max-width: 1200px;
                                height: 90%;
                                background: #111;
                                margin: 5% auto;
                                border-radius: 16px;
                                display: flex;
                                flex-direction: column;
                                overflow: hidden;
                            }
                            
                            .iu-header {
                                background: #222;
                                padding: 20px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                            
                            .iu-header h2 {
                                margin: 0;
                                font-size: 24px;
                            }
                            
                            .iu-close {
                                background: none;
                                border: none;
                                color: #fff;
                                font-size: 24px;
                                cursor: pointer;
                                padding: 5px 10px;
                            }
                            
                            .iu-content {
                                display: flex;
                                flex: 1;
                                overflow: hidden;
                            }
                            
                            .iu-sidebar {
                                width: 250px;
                                background: #1a1a1a;
                                padding: 20px;
                                overflow-y: auto;
                            }
                            
                            .iu-main {
                                flex: 1;
                                padding: 20px;
                                display: flex;
                                flex-direction: column;
                                overflow: hidden;
                            }
                            
                            .iu-filters h3 {
                                margin-bottom: 10px;
                                font-size: 16px;
                            }
                            
                            .iu-filters label {
                                display: block;
                                margin-bottom: 8px;
                                cursor: pointer;
                            }
                            
                            .iu-filters input {
                                margin-right: 8px;
                            }
                            
                            .iu-controls {
                                margin: 20px 0;
                            }
                            
                            .iu-btn {
                                width: 100%;
                                padding: 10px;
                                margin-bottom: 10px;
                                border: none;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                            }
                            
                            .iu-btn.primary {
                                background: #ac2626;
                                color: white;
                            }
                            
                            .iu-btn.secondary {
                                background: #333;
                                color: white;
                            }
                            
                            .iu-btn:disabled {
                                opacity: 0.5;
                                cursor: not-allowed;
                            }
                            
                            .iu-stats div {
                                margin-bottom: 8px;
                                font-size: 14px;
                            }
                            
                            .iu-tabs {
                                display: flex;
                                margin-bottom: 15px;
                            }
                            
                            .iu-tab {
                                padding: 10px 20px;
                                background: #333;
                                color: #fff;
                                border: none;
                                cursor: pointer;
                                margin-right: 5px;
                                border-radius: 6px 6px 0 0;
                            }
                            
                            .iu-tab.active {
                                background: #222;
                            }
                            
                            .iu-search {
                                margin-bottom: 15px;
                            }
                            
                            .iu-search input {
                                width: 100%;
                                padding: 10px;
                                background: #222;
                                border: 1px solid #333;
                                border-radius: 6px;
                                color: #fff;
                            }
                            
                            .iu-progress {
                                margin-bottom: 15px;
                            }
                            
                            .iu-progress-bar {
                                width: 100%;
                                height: 8px;
                                background: #333;
                                border-radius: 4px;
                                overflow: hidden;
                            }
                            
                            .iu-progress-fill {
                                height: 100%;
                                background: linear-gradient(90deg, #00d4aa, #00b894);
                                width: 0%;
                                transition: width 0.3s ease;
                            }
                            
                            .iu-progress-text {
                                margin-top: 8px;
                                font-size: 14px;
                                text-align: center;
                            }
                            
                            .iu-results {
                                flex: 1;
                                overflow-y: auto;
                                background: #1a1a1a;
                                border-radius: 8px;
                                padding: 15px;
                            }
                            
                            .iu-user-item {
                                display: flex;
                                align-items: center;
                                padding: 10px;
                                margin-bottom: 8px;
                                background: #222;
                                border-radius: 6px;
                                cursor: pointer;
                            }
                            
                            .iu-user-item:hover {
                                background: #333;
                            }
                            
                            .iu-user-checkbox {
                                margin-right: 10px;
                            }
                            
                            .iu-user-avatar {
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                margin-right: 12px;
                            }
                            
                            .iu-user-info {
                                flex: 1;
                            }
                            
                            .iu-user-name {
                                font-weight: 600;
                                margin-bottom: 2px;
                            }
                            
                            .iu-user-username {
                                font-size: 14px;
                                color: #aaa;
                            }
                            
                            .iu-pagination {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                gap: 10px;
                                margin-top: 15px;
                            }
                            
                            .iu-pagination button {
                                background: #333;
                                border: none;
                                color: #fff;
                                padding: 8px 12px;
                                border-radius: 4px;
                                cursor: pointer;
                            }
                            
                            .iu-pagination button:hover {
                                background: #444;
                            }
                            
                            .iu-pagination button:disabled {
                                opacity: 0.5;
                                cursor: not-allowed;
                            }
                        \`;

                        const styleSheet = document.createElement('style');
                        styleSheet.textContent = styles;
                        document.head.appendChild(styleSheet);
                        document.body.appendChild(overlay);
                        
                        this.bindEvents();
                    }

                    bindEvents() {
                        document.getElementById('iu-close').addEventListener('click', () => this.closeUI());
                        document.getElementById('iu-start-scan').addEventListener('click', () => this.startAdvancedScan());
                        document.getElementById('iu-pause-scan').addEventListener('click', () => this.pauseScan());

                        // Tab switching
                        document.querySelectorAll('.iu-tab').forEach(tab => {
                            tab.addEventListener('click', (e) => {
                                document.querySelectorAll('.iu-tab').forEach(t => t.classList.remove('active'));
                                e.target.classList.add('active');
                                this.currentTab = e.target.dataset.tab;
                                this.updateResults();
                            });
                        });

                        // Search functionality
                        document.getElementById('iu-search').addEventListener('input', (e) => {
                            this.searchTerm = e.target.value;
                            this.updateResults();
                        });

                        // Filter checkboxes
                        document.getElementById('show-non-followers').addEventListener('change', (e) => {
                            this.filter.showNonFollowers = e.target.checked;
                            this.updateResults();
                        });

                        document.getElementById('show-followers').addEventListener('change', (e) => {
                            this.filter.showFollowers = e.target.checked;
                            this.updateResults();
                        });

                        document.getElementById('show-verified').addEventListener('change', (e) => {
                            this.filter.showVerified = e.target.checked;
                            this.updateResults();
                        });

                        document.getElementById('show-private').addEventListener('change', (e) => {
                            this.filter.showPrivate = e.target.checked;
                            this.updateResults();
                        });

                        // Pagination
                        document.getElementById('iu-prev-page').addEventListener('click', () => {
                            if (this.page > 1) {
                                this.page--;
                                this.updateResults();
                            }
                        });

                        document.getElementById('iu-next-page').addEventListener('click', () => {
                            const maxPage = this.getMaxPage();
                            if (this.page < maxPage) {
                                this.page++;
                                this.updateResults();
                            }
                        });
                    }

                    async startAdvancedScan() {
                        if (this.isRunning) return;
                        
                        this.isRunning = true;
                        this.status = 'scanning';
                        this.percentage = 0;
                        this.results = [];
                        
                        document.getElementById('iu-start-scan').disabled = true;
                        document.getElementById('iu-pause-scan').disabled = false;
                        
                        try {
                            this.updateProgress(10, 'Initializing scan...');
                            await this.sleep(1000);
                            
                            this.updateProgress(30, 'Fetching following data...');
                            await this.fetchFollowing();
                            
                            this.updateProgress(70, 'Fetching followers data...');
                            await this.fetchFollowers();
                            
                            this.updateProgress(90, 'Analyzing relationships...');
                            await this.analyzeRelationships();
                            
                            this.updateProgress(100, 'Scan completed!');
                            this.updateResults();
                            
                        } catch (error) {
                            console.error('Scan error:', error);
                            this.updateProgress(0, 'Scan failed: ' + error.message);
                        } finally {
                            this.isRunning = false;
                            document.getElementById('iu-start-scan').disabled = false;
                            document.getElementById('iu-pause-scan').disabled = true;
                        }
                    }

                    async fetchFollowing() {
                        // Mock implementation - replace with actual Instagram API calls
                        await this.sleep(2000);
                        
                        // Generate mock following data
                        for (let i = 1; i <= 20; i++) {
                            this.results.push({
                                id: 'user_' + i,
                                username: 'user' + i,
                                full_name: 'User ' + i,
                                profile_pic_url: 'https://via.placeholder.com/40',
                                is_verified: Math.random() > 0.8,
                                is_private: Math.random() > 0.7,
                                follows_viewer: Math.random() > 0.5
                            });
                        }
                    }

                    async fetchFollowers() {
                        // Mock implementation - replace with actual Instagram API calls
                        await this.sleep(2000);
                        // In real implementation, this would mark which users follow back
                    }

                    async analyzeRelationships() {
                        await this.sleep(1000);
                        // Analysis logic would go here
                    }

                    updateProgress(percentage, text) {
                        this.percentage = percentage;
                        const progressFill = document.getElementById('iu-progress');
                        const progressText = document.getElementById('iu-progress-text');
                        
                        if (progressFill) progressFill.style.width = percentage + '%';
                        if (progressText) progressText.textContent = text;
                        
                        // Send message to extension popup
                        window.postMessage({
                            type: 'DETECTIVE_UPDATE',
                            data: { type: 'progress', percentage, step: text }
                        }, '*');
                    }

                    updateResults() {
                        const resultsContainer = document.getElementById('iu-results');
                        const filteredResults = this.getFilteredResults();
                        const paginatedResults = this.getPaginatedResults(filteredResults);
                        
                        resultsContainer.innerHTML = '';
                        
                        paginatedResults.forEach(user => {
                            const userElement = document.createElement('div');
                            userElement.className = 'iu-user-item';
                            userElement.innerHTML = \`
                                <input type="checkbox" class="iu-user-checkbox" data-user-id="\${user.id}">
                                <img src="\${user.profile_pic_url}" alt="\${user.username}" class="iu-user-avatar">
                                <div class="iu-user-info">
                                    <div class="iu-user-name">\${user.full_name}</div>
                                    <div class="iu-user-username">@\${user.username}</div>
                                </div>
                                \${user.is_verified ? '<span style="color: #49adf4;">✓</span>' : ''}
                                \${user.is_private ? '<span style="color: #51bb42;">🔒</span>' : ''}
                            \`;
                            
                            resultsContainer.appendChild(userElement);
                        });
                        
                        // Update stats
                        document.getElementById('iu-displayed').textContent = paginatedResults.length;
                        document.getElementById('iu-total').textContent = this.results.length;
                        document.getElementById('iu-selected').textContent = this.selectedResults.length;
                        
                        // Update pagination
                        const maxPage = this.getMaxPage();
                        document.getElementById('iu-page-info').textContent = \`\${this.page} / \${maxPage}\`;
                        document.getElementById('iu-prev-page').disabled = this.page <= 1;
                        document.getElementById('iu-next-page').disabled = this.page >= maxPage;
                    }

                    getFilteredResults() {
                        return this.results.filter(user => {
                            if (!this.filter.showNonFollowers && !user.follows_viewer) return false;
                            if (!this.filter.showFollowers && user.follows_viewer) return false;
                            if (!this.filter.showVerified && user.is_verified) return false;
                            if (!this.filter.showPrivate && user.is_private) return false;
                            
                            if (this.searchTerm) {
                                const searchLower = this.searchTerm.toLowerCase();
                                if (!user.username.toLowerCase().includes(searchLower) && 
                                    !user.full_name.toLowerCase().includes(searchLower)) {
                                    return false;
                                }
                            }
                            
                            return true;
                        });
                    }

                    getPaginatedResults(results) {
                        const itemsPerPage = 10;
                        const startIndex = (this.page - 1) * itemsPerPage;
                        return results.slice(startIndex, startIndex + itemsPerPage);
                    }

                    getMaxPage() {
                        const filteredResults = this.getFilteredResults();
                        return Math.max(1, Math.ceil(filteredResults.length / 10));
                    }

                    pauseScan() {
                        // Pause functionality would go here
                    }

                    closeUI() {
                        const overlay = document.getElementById('iu-advanced-overlay');
                        if (overlay) {
                            overlay.remove();
                        }
                    }

                    sleep(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                    }
                }

                window.advancedDetective = new AdvancedInstagramDetective();
                
                // Send completion message
                window.postMessage({
                    type: 'DETECTIVE_UPDATE',
                    data: { type: 'ready', message: 'Advanced detective ready!' }
                }, '*');
            })();
        `;
        
        document.head.appendChild(script);
    }

    createDetectiveIndicator() {
        if (document.getElementById('detective-indicator')) return;

        const indicator = document.createElement('div');
        indicator.id = 'detective-indicator';
        indicator.innerHTML = `
            <div class="indicator-content">
                <span class="indicator-icon">🕵️</span>
                <span class="indicator-text">Advanced Detective Ready</span>
            </div>
        `;

        const styles = `
            #detective-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 16px;
                border-radius: 25px;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                cursor: pointer;
                transition: all 0.3s ease;
                animation: slideIn 0.5s ease;
            }
            
            #detective-indicator:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
            }
            
            .indicator-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .indicator-icon {
                font-size: 16px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        document.body.appendChild(indicator);

        indicator.addEventListener('click', () => {
            this.showQuickTip();
        });

        setTimeout(() => {
            indicator.classList.add('pulse');
        }, 2000);
    }

    showQuickTip() {
        if (document.getElementById('detective-tip')) return;

        const tip = document.createElement('div');
        tip.id = 'detective-tip';
        tip.innerHTML = `
            <div class="tip-content">
                <h3>🕵️ Detective Ready!</h3>
                <p>Click the extension icon in your browser toolbar to start investigating your Instagram unfollowers.</p>
                <button id="close-tip">Got it!</button>
            </div>
        `;

        const tipStyles = `
            #detective-tip {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                animation: fadeIn 0.3s ease;
            }
            
            .tip-content {
                background: white;
                padding: 30px;
                border-radius: 16px;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .tip-content h3 {
                margin: 0 0 15px 0;
                color: #333;
                font-size: 20px;
            }
            
            .tip-content p {
                margin: 0 0 20px 0;
                color: #666;
                line-height: 1.5;
            }
            
            #close-tip {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: transform 0.2s ease;
            }
            
            #close-tip:hover {
                transform: translateY(-2px);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;

        const tipStyleSheet = document.createElement('style');
        tipStyleSheet.textContent = tipStyles;
        document.head.appendChild(tipStyleSheet);
        document.body.appendChild(tip);

        document.getElementById('close-tip').addEventListener('click', () => {
            tip.remove();
        });
    }

    init() {
        if (window.location.hostname === 'www.instagram.com') {
            setTimeout(() => {
                this.createDetectiveIndicator();
            }, 2000);
        }
    }
}

const detectiveContent = new InstagramDetectiveContent();
detectiveContent.init();