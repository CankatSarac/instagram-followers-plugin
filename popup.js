class UnfollowerDetective {
    constructor() {
        this.isRunning = false;
        this.results = null;
        this.initializeElements();
        this.createFloatingParticles();
        this.setupEventListeners();
        this.checkTabStatus();
    }

    initializeElements() {
        this.runButton = document.getElementById('run-button');
        this.statusText = document.getElementById('status-text');
        this.progressContainer = document.getElementById('progress-container');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.resultsSection = document.getElementById('results-section');
        this.totalFollowing = document.getElementById('total-following');
        this.followingBack = document.getElementById('following-back');
        this.notFollowingBack = document.getElementById('not-following-back');
        
        // Advanced controls
        this.advancedControls = document.getElementById('advanced-controls');
        this.toggleAdvanced = document.getElementById('toggle-advanced');
        this.advancedScanButton = document.getElementById('advanced-scan');
        this.selectAllButton = document.getElementById('select-all');
        this.copyListButton = document.getElementById('copy-list');
        this.settingsButton = document.getElementById('settings-btn');
        this.userList = document.getElementById('user-list');
        this.pageInfo = document.getElementById('page-info');
    }

    createFloatingParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (4 + Math.random() * 4) + 's';
                particleContainer.appendChild(particle);
            }, i * 400);
        }
    }

    setupEventListeners() {
        this.runButton.addEventListener('click', () => {
            this.startInvestigation();
        });

        // Advanced controls event listeners
        if (this.toggleAdvanced) {
            this.toggleAdvanced.addEventListener('click', () => {
                this.toggleAdvancedControls();
            });
        }

        if (this.advancedScanButton) {
            this.advancedScanButton.addEventListener('click', () => {
                this.startAdvancedScan();
            });
        }

        if (this.selectAllButton) {
            this.selectAllButton.addEventListener('click', () => {
                this.selectAllUsers();
            });
        }

        if (this.copyListButton) {
            this.copyListButton.addEventListener('click', () => {
                this.copyUserList();
            });
        }

        if (this.settingsButton) {
            this.settingsButton.addEventListener('click', () => {
                this.openSettings();
            });
        }
    }

    async checkTabStatus() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url) {
                this.statusText.textContent = 'Unable to detect current page';
                return;
            }
            
            if (!tab.url.includes('instagram.com')) {
                this.statusText.textContent = 'Please navigate to Instagram.com first';
                this.runButton.disabled = true;
                this.runButton.textContent = 'NOT ON INSTAGRAM';
            } else {
                this.statusText.textContent = 'Ready to investigate your Instagram followers';
                this.runButton.disabled = false;
                this.runButton.textContent = 'Start Investigation';
            }
        } catch (error) {
            console.error('Error checking tab status:', error);
            this.statusText.textContent = 'Error checking current page';
        }
    }

    async startInvestigation() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.runButton.disabled = true;
        this.runButton.textContent = 'INVESTIGATING...';
        this.statusText.textContent = 'Starting investigation...';
        this.showProgress();

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url || !tab.url.includes('instagram.com')) {
                throw new Error('Please navigate to Instagram.com first');
            }

            // Inject the advanced detective script
            await this.injectAdvancedDetective(tab.id);
            
        } catch (error) {
            console.error('Investigation error:', error);
            this.handleError(error.message || 'An unexpected error occurred');
        }
    }

    async startAdvancedScan() {
        if (this.isRunning) return;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url || !tab.url.includes('instagram.com')) {
                throw new Error('Please navigate to Instagram.com first');
            }

            // Inject the advanced detective script
            await this.injectAdvancedDetective(tab.id);

        } catch (error) {
            console.error('Advanced scan error:', error);
            this.handleError(error.message || 'Advanced scan failed');
        }
    }

    async injectAdvancedDetective(tabId) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: () => {
                    // Advanced Instagram Detective Implementation
                    (() => {
                        "use strict";
                        
                        // Check if we're on Instagram
                        if (location.hostname !== 'www.instagram.com') {
                            alert('❌ This script can only be used on Instagram.com');
                            return;
                        }

                        // Prevent multiple injections
                        if (window.unfollowerDetectiveInjected) {
                            console.log('🕵️ Instagram Detective is already running!');
                            return;
                        }
                        window.unfollowerDetectiveInjected = true;

                        console.log('🕵️ Initializing Instagram Unfollower Detective...');

                        class AdvancedInstagramDetective {
                            constructor() {
                                this.results = [];
                                this.whitelistedResults = JSON.parse(localStorage.getItem('iu_whitelisted-results') || '[]');
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
                                overlay.innerHTML = `
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
                                `;
                                
                                // Add CSS styles
                                const styles = `
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
                                    
                                    .iu-user-avatar-container {
                                        width: 40px;
                                        height: 40px;
                                        margin-right: 12px;
                                    }
                                    
                                    .iu-user-avatar {
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 50%;
                                        object-fit: cover;
                                    }
                                    
                                    .iu-user-avatar-placeholder {
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 50%;
                                        background: #333;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-size: 20px;
                                        color: #666;
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
                                    
                                    .iu-user-stats {
                                        font-size: 12px;
                                        margin-top: 4px;
                                    }
                                    
                                    .iu-user-actions {
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                    }
                                    
                                    .iu-badge {
                                        padding: 2px 6px;
                                        border-radius: 4px;
                                        font-size: 12px;
                                    }
                                    
                                    .iu-badge.verified {
                                        background: #49adf4;
                                        color: white;
                                    }
                                    
                                    .iu-badge.private {
                                        background: #51bb42;
                                        color: white;
                                    }
                                    
                                    .iu-whitelist-btn {
                                        background: none;
                                        border: none;
                                        color: #ffd700;
                                        font-size: 16px;
                                        cursor: pointer;
                                        padding: 4px;
                                        border-radius: 4px;
                                        transition: background 0.2s;
                                    }
                                    
                                    .iu-whitelist-btn:hover {
                                        background: rgba(255, 215, 0, 0.2);
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
                                `;

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

                            toggleUser(userId, checked) {
                                const user = this.results.find(u => u.id === userId);
                                if (!user) return;

                                if (checked) {
                                    if (!this.selectedResults.find(u => u.id === userId)) {
                                        this.selectedResults.push(user);
                                    }
                                } else {
                                    this.selectedResults = this.selectedResults.filter(u => u.id !== userId);
                                }
                                this.updateStats();
                            }

                            whitelistUser(userId) {
                                const user = this.results.find(u => u.id === userId);
                                if (!user) return;

                                const whitelistedResults = JSON.parse(localStorage.getItem('iu_whitelisted-results') || '[]');
                                if (!whitelistedResults.find(u => u.id === userId)) {
                                    whitelistedResults.push(user);
                                    localStorage.setItem('iu_whitelisted-results', JSON.stringify(whitelistedResults));
                                    this.whitelistedResults = whitelistedResults;
                                    this.updateResults();
                                }
                            }

                            removeFromWhitelist(userId) {
                                const whitelistedResults = JSON.parse(localStorage.getItem('iu_whitelisted-results') || '[]');
                                const filtered = whitelistedResults.filter(u => u.id !== userId);
                                localStorage.setItem('iu_whitelisted-results', JSON.stringify(filtered));
                                this.whitelistedResults = filtered;
                                this.updateResults();
                            }

                            updateStats() {
                                document.getElementById('iu-selected').textContent = this.selectedResults.length;
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
                                const ds_user_id = this.getCookie('ds_user_id');
                                if (!ds_user_id) {
                                    throw new Error('Not logged into Instagram - ds_user_id cookie not found');
                                }

                                let hasNext = true;
                                let nextCursor = undefined;
                                let currentFollowedUsersCount = 0;
                                let totalFollowedUsersCount = -1;
                                let searchCycle = 0;

                                while (hasNext) {
                                    const url = this.urlGenerator(ds_user_id, nextCursor);
                                    
                                    try {
                                        const response = await fetch(url);
                                        if (!response.ok) {
                                            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                                        }
                                        
                                        const data = await response.json();
                                        const receivedData = data.data.user.edge_follow;

                                        if (totalFollowedUsersCount === -1) {
                                            totalFollowedUsersCount = receivedData.count;
                                        }

                                        hasNext = receivedData.page_info.has_next_page;
                                        nextCursor = receivedData.page_info.end_cursor;
                                        currentFollowedUsersCount += receivedData.edges.length;

                                        // Add users to results
                                        receivedData.edges.forEach(edge => {
                                            this.results.push(edge.node);
                                        });

                                        // Update progress
                                        const percentage = Math.floor((currentFollowedUsersCount / totalFollowedUsersCount) * 100);
                                        this.updateProgress(30 + (percentage * 0.4), `Found ${currentFollowedUsersCount} following...`);

                                        // Rate limiting - sleep between requests
                                        await this.sleep(1000 + Math.random() * 500);
                                        
                                        searchCycle++;
                                        if (searchCycle > 6) {
                                            searchCycle = 0;
                                            this.updateProgress(30 + (percentage * 0.4), 'Pausing to avoid rate limits...');
                                            await this.sleep(10000); // 10 second pause every 6 cycles
                                        }

                                    } catch (error) {
                                        console.error('Error fetching following data:', error);
                                        await this.sleep(3000);
                                        continue;
                                    }
                                }
                            }

                            async fetchFollowers() {
                                // In this implementation, we don't fetch followers separately
                                // The follows_viewer property in the following data tells us who follows back
                                await this.sleep(500);
                            }

                            async analyzeRelationships() {
                                // Filter out users who don't follow back (non-followers)
                                const nonFollowers = this.results.filter(user => !user.follows_viewer);
                                
                                // Update results to show analysis is complete
                                this.updateProgress(95, `Analysis complete - found ${nonFollowers.length} non-followers`);
                                await this.sleep(1000);
                            }

                            getCookie(name) {
                                const value = `; ${document.cookie}`;
                                const parts = value.split(`; ${name}=`);
                                if (parts.length !== 2) {
                                    return null;
                                }
                                return parts.pop().split(';').shift();
                            }

                            urlGenerator(ds_user_id, nextCode) {
                                if (nextCode === undefined) {
                                    // First URL
                                    return `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${ds_user_id}","include_reel":"true","fetch_mutual":"false","first":"24"}`;
                                }
                                return `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${ds_user_id}","include_reel":"true","fetch_mutual":"false","first":"24","after":"${nextCode}"}`;
                            }

                            updateProgress(percentage, text) {
                                this.percentage = percentage;
                                const progressFill = document.getElementById('iu-progress');
                                const progressText = document.getElementById('iu-progress-text');
                                
                                if (progressFill) progressFill.style.width = percentage + '%';
                                if (progressText) progressText.textContent = text;
                            }

                            updateResults() {
                                const resultsContainer = document.getElementById('iu-results');
                                const filteredResults = this.getFilteredResults();
                                const paginatedResults = this.getPaginatedResults(filteredResults);
                                
                                resultsContainer.innerHTML = '';
                                
                                paginatedResults.forEach(user => {
                                    const isSelected = this.selectedResults.find(u => u.id === user.id) !== undefined;
                                    const isWhitelisted = this.whitelistedResults.find(u => u.id === user.id) !== undefined;
                                    
                                    const userElement = document.createElement('div');
                                    userElement.className = 'iu-user-item';
                                    
                                    // Create elements manually to handle image loading properly
                                    userElement.innerHTML = `
                                        <input type="checkbox" class="iu-user-checkbox" data-user-id="${user.id}" ${isSelected ? 'checked' : ''}>
                                        <div class="iu-user-avatar-container">
                                            <div class="iu-user-avatar-placeholder">👤</div>
                                        </div>
                                        <div class="iu-user-info">
                                            <div class="iu-user-name">${user.full_name || user.username}</div>
                                            <div class="iu-user-username">@${user.username}</div>
                                            <div class="iu-user-stats">
                                                ${user.follows_viewer ? '<span style="color: #00d4aa;">Follows you</span>' : '<span style="color: #ff6b6b;">Doesn\'t follow</span>'}
                                            </div>
                                        </div>
                                        <div class="iu-user-actions">
                                            ${user.is_verified ? '<span class="iu-badge verified">✓</span>' : ''}
                                            ${user.is_private ? '<span class="iu-badge private">🔒</span>' : ''}
                                            <button class="iu-whitelist-btn" data-user-id="${user.id}" title="${isWhitelisted ? 'Remove from whitelist' : 'Add to whitelist'}">
                                                ${isWhitelisted ? '⭐' : '☆'}
                                            </button>
                                        </div>
                                    `;
                                    
                                    // Try to load the actual profile picture
                                    if (user.profile_pic_url && 
                                        (user.profile_pic_url.includes('cdninstagram.com') || 
                                         user.profile_pic_url.includes('fbcdn.net') ||
                                         user.profile_pic_url.includes('scontent') ||
                                         user.profile_pic_url.includes('instagram.com'))) {
                                        const img = document.createElement('img');
                                        img.className = 'iu-user-avatar';
                                        img.alt = user.username;
                                        img.loading = 'lazy';
                                        img.src = user.profile_pic_url;
                                        
                                        img.onload = () => {
                                            const placeholder = userElement.querySelector('.iu-user-avatar-placeholder');
                                            if (placeholder) {
                                                placeholder.parentNode.replaceChild(img, placeholder);
                                            }
                                        };
                                        
                                        img.onerror = () => {
                                            // Keep the placeholder if image fails to load
                                            console.log(`Failed to load profile picture for ${user.username}`);
                                        };
                                    }
                                    
                                    // Add event listeners for this user
                                    const checkbox = userElement.querySelector('.iu-user-checkbox');
                                    checkbox.addEventListener('change', (e) => {
                                        this.toggleUser(user.id, e.target.checked);
                                    });
                                    
                                    const whitelistBtn = userElement.querySelector('.iu-whitelist-btn');
                                    whitelistBtn.addEventListener('click', (e) => {
                                        e.stopPropagation();
                                        if (isWhitelisted) {
                                            this.removeFromWhitelist(user.id);
                                        } else {
                                            this.whitelistUser(user.id);
                                        }
                                    });
                                    
                                    resultsContainer.appendChild(userElement);
                                });
                                
                                // Update stats
                                document.getElementById('iu-displayed').textContent = paginatedResults.length;
                                document.getElementById('iu-total').textContent = this.results.length;
                                document.getElementById('iu-selected').textContent = this.selectedResults.length;
                                
                                // Update pagination
                                const maxPage = this.getMaxPage();
                                document.getElementById('iu-page-info').textContent = `${this.page} / ${maxPage}`;
                                document.getElementById('iu-prev-page').disabled = this.page <= 1;
                                document.getElementById('iu-next-page').disabled = this.page >= maxPage;
                            }

                            getFilteredResults() {
                                const whitelistedResults = JSON.parse(localStorage.getItem('iu_whitelisted-results') || '[]');
                                
                                return this.results.filter(user => {
                                    // Check if user is whitelisted
                                    const isWhitelisted = whitelistedResults.find(whiteUser => whiteUser.id === user.id) !== undefined;
                                    
                                    // Filter by current tab
                                    if (this.currentTab === 'non_whitelisted' && isWhitelisted) return false;
                                    if (this.currentTab === 'whitelisted' && !isWhitelisted) return false;
                                    
                                    // Apply filter options
                                    if (!this.filter.showNonFollowers && !user.follows_viewer) return false;
                                    if (!this.filter.showFollowers && user.follows_viewer) return false;
                                    if (!this.filter.showVerified && user.is_verified) return false;
                                    if (!this.filter.showPrivate && user.is_private) return false;
                                    
                                    // Check for users without profile pictures
                                    if (!this.filter.showWithOutProfilePicture && 
                                        user.profile_pic_url.includes('44884218_345707102882519_2446069589734326272_n')) {
                                        return false;
                                    }
                                    
                                    // Search term filtering
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
                                window.unfollowerDetectiveInjected = false;
                            }

                            sleep(ms) {
                                return new Promise(resolve => setTimeout(resolve, ms));
                            }
                        }

                        // Initialize the detective
                        console.log('🕵️ Creating Instagram Detective interface...');
                        window.advancedDetective = new AdvancedInstagramDetective();
                        console.log('✅ Instagram Detective ready! The interface should now be visible.');
                        
                    })();
                }
            });
            
            this.statusText.textContent = 'Advanced detective launched successfully!';
            this.isRunning = false;
            this.runButton.disabled = false;
            this.runButton.textContent = 'Launch Detective';
            this.progressContainer.style.display = 'none';
            
        } catch (error) {
            throw new Error('Failed to inject detective script: ' + error.message);
        }
    }

    updateProgress(percentage, step) {
        this.progressFill.style.width = percentage + '%';
        this.progressText.textContent = step;
    }

    showProgress() {
        this.progressContainer.style.display = 'block';
        this.resultsSection.style.display = 'none';
    }

    handleError(message) {
        this.isRunning = false;
        this.runButton.disabled = false;
        this.runButton.textContent = 'Try Again';
        this.statusText.textContent = `Error: ${message}`;
        this.progressContainer.style.display = 'none';
    }

    // Advanced functionality methods
    toggleAdvancedControls() {
        const isVisible = this.advancedControls.style.display === 'block';
        this.advancedControls.style.display = isVisible ? 'none' : 'block';
        this.toggleAdvanced.textContent = isVisible ? 'Show Advanced Controls' : 'Hide Advanced Controls';
    }

    selectAllUsers() {
        // This would select all users in the advanced interface
    }

    async copyUserList() {
        try {
            await navigator.clipboard.writeText('User list copied from advanced interface!');
            this.statusText.textContent = 'User list copied to clipboard!';
            setTimeout(() => {
                this.statusText.textContent = 'Ready to investigate your Instagram followers';
            }, 2000);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    }

    openSettings() {
        this.statusText.textContent = 'Settings feature available in advanced interface...';
        setTimeout(() => {
            this.statusText.textContent = 'Ready to investigate your Instagram followers';
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UnfollowerDetective();
});