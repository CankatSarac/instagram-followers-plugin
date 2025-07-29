// Script to inject the advanced Instagram detective functionality
function injectAdvancedDetective() {
    // Check if we're on Instagram
    if (location.hostname !== 'www.instagram.com') {
        alert('❌ This extension can only be used on Instagram.com\n\nPlease navigate to www.instagram.com and try again.');
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

        async initialize() {
            if (this.isRunning) return;
            this.isRunning = true;

            try {
                this.showDetectiveUI();
                await this.getCurrentUser();
                await this.fetchFollowingData();
                await this.fetchFollowersData();
                this.analyzeData();
            } catch (error) {
                console.error('Detective error:', error);
                this.sendMessage({ type: 'error', message: error.message });
            } finally {
                this.isRunning = false;
            }
        }

        showDetectiveUI() {
            if (document.getElementById('detective-overlay')) return;

            const overlay = document.createElement('div');
            overlay.id = 'detective-overlay';
            overlay.innerHTML = `
                <div class="detective-modal">
                    <div class="detective-header">
                        <h2>🕵️ Investigation in Progress</h2>
                        <div class="detective-status">Gathering intelligence...</div>
                    </div>
                    <div class="detective-progress">
                        <div class="detective-progress-bar">
                            <div class="detective-progress-fill" id="detective-progress"></div>
                        </div>
                        <div class="detective-step" id="detective-step">Initializing...</div>
                    </div>
                </div>
            `;

            const styles = `
                #detective-overlay {
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
                }
                
                .detective-modal {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 400px;
                    text-align: center;
                    color: white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                
                .detective-header h2 {
                    margin: 0 0 10px 0;
                    font-size: 24px;
                    font-weight: 700;
                }
                
                .detective-status {
                    opacity: 0.9;
                    margin-bottom: 30px;
                    font-size: 16px;
                }
                
                .detective-progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 15px;
                }
                
                .detective-progress-fill {
                    width: 0%;
                    height: 100%;
                    background: linear-gradient(90deg, #00d4aa, #00b894);
                    transition: width 0.5s ease;
                }
                
                .detective-step {
                    font-size: 14px;
                    opacity: 0.8;
                }
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
            document.body.appendChild(overlay);
        }

        updateProgress(percentage, step) {
            const progressFill = document.getElementById('detective-progress');
            const stepElement = document.getElementById('detective-step');
            
            if (progressFill) progressFill.style.width = percentage + '%';
            if (stepElement) stepElement.textContent = step;

            this.sendMessage({
                type: 'progress',
                percentage: percentage,
                step: step
            });
        }

        async getCurrentUser() {
            this.updateProgress(10, 'Identifying current user...');
            
            try {
                const userDataScript = document.querySelector('script[type="application/ld+json"]');
                if (userDataScript) {
                    const userData = JSON.parse(userDataScript.textContent);
                    this.currentUser = userData.author || userData;
                }
                
                if (!this.currentUser) {
                    const pathMatch = window.location.pathname.match(/^\/([^\/]+)/);
                    if (pathMatch) {
                        this.currentUser = { alternateName: pathMatch[1] };
                    }
                }
            } catch (error) {
                console.error('Error getting current user:', error);
            }
        }

        async fetchFollowingData() {
            this.updateProgress(20, 'Scanning following list...');
            
            const username = this.getCurrentUsername();
            if (!username) throw new Error('Could not determine username');

            let hasNextPage = true;
            let afterCursor = '';
            let followingCount = 0;

            while (hasNextPage) {
                const url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=${encodeURIComponent(JSON.stringify({
                    id: await this.getUserId(username),
                    include_reel: true,
                    fetch_mutual: true,
                    first: 50,
                    after: afterCursor
                }))}`;

                try {
                    const response = await fetch(url, {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                        }
                    });

                    if (!response.ok) {
                        await this.sleep(2000);
                        continue;
                    }

                    const data = await response.json();
                    const edges = data.data?.user?.edge_follow?.edges || [];
                    
                    edges.forEach(edge => {
                        this.followingData.push({
                            id: edge.node.id,
                            username: edge.node.username,
                            full_name: edge.node.full_name,
                            profile_pic_url: edge.node.profile_pic_url,
                            is_verified: edge.node.is_verified,
                            is_private: edge.node.is_private
                        });
                    });

                    followingCount += edges.length;
                    this.updateProgress(20 + (followingCount / 1000) * 30, `Found ${followingCount} following...`);

                    const pageInfo = data.data?.user?.edge_follow?.page_info;
                    hasNextPage = pageInfo?.has_next_page || false;
                    afterCursor = pageInfo?.end_cursor || '';

                    await this.sleep(1000 + Math.random() * 1000);

                } catch (error) {
                    console.error('Error fetching following:', error);
                    await this.sleep(3000);
                }
            }
        }

        async fetchFollowersData() {
            this.updateProgress(60, 'Scanning followers list...');
            
            const username = this.getCurrentUsername();
            if (!username) throw new Error('Could not determine username');

            let hasNextPage = true;
            let afterCursor = '';
            let followersCount = 0;

            while (hasNextPage) {
                const url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=${encodeURIComponent(JSON.stringify({
                    id: await this.getUserId(username),
                    include_reel: true,
                    fetch_mutual: true,
                    first: 50,
                    after: afterCursor
                }))}`;

                try {
                    const response = await fetch(url, {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                        }
                    });

                    if (!response.ok) {
                        await this.sleep(2000);
                        continue;
                    }

                    const data = await response.json();
                    const edges = data.data?.user?.edge_followed_by?.edges || [];
                    
                    edges.forEach(edge => {
                        this.followersData.push({
                            id: edge.node.id,
                            username: edge.node.username,
                            full_name: edge.node.full_name,
                            profile_pic_url: edge.node.profile_pic_url,
                            is_verified: edge.node.is_verified,
                            is_private: edge.node.is_private
                        });
                    });

                    followersCount += edges.length;
                    this.updateProgress(60 + (followersCount / 1000) * 30, `Found ${followersCount} followers...`);

                    const pageInfo = data.data?.user?.edge_followed_by?.page_info;
                    hasNextPage = pageInfo?.has_next_page || false;
                    afterCursor = pageInfo?.end_cursor || '';

                    await this.sleep(1000 + Math.random() * 1000);

                } catch (error) {
                    console.error('Error fetching followers:', error);
                    await this.sleep(3000);
                }
            }
        }

        analyzeData() {
            this.updateProgress(95, 'Analyzing relationships...');

            const followersSet = new Set(this.followersData.map(f => f.username));
            const unfollowers = this.followingData.filter(f => !followersSet.has(f.username));

            const results = {
                totalFollowing: this.followingData.length,
                totalFollowers: this.followersData.length,
                mutualFollows: this.followingData.length - unfollowers.length,
                unfollowers: unfollowers,
                unfollowersCount: unfollowers.length
            };

            this.updateProgress(100, 'Investigation complete!');
            
            setTimeout(() => {
                this.hideDetectiveUI();
                this.sendMessage({ type: 'complete', results: results });
            }, 1500);
        }

        hideDetectiveUI() {
            const overlay = document.getElementById('detective-overlay');
            if (overlay) {
                overlay.remove();
            }
        }

        getCurrentUsername() {
            const pathMatch = window.location.pathname.match(/^\/([^\/]+)/);
            return pathMatch ? pathMatch[1] : null;
        }

        async getUserId(username) {
            try {
                const response = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`);
                const data = await response.json();
                return data.graphql?.user?.id || data.user?.id;
            } catch (error) {
                console.error('Error getting user ID:', error);
                return null;
            }
        }

        sendMessage(data) {
            window.postMessage({ type: 'DETECTIVE_UPDATE', data: data }, '*');
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    const detective = new InstagramUnfollowerDetective();
    detective.initialize();
}

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
            if (!chrome.tabs) {
                console.error('Chrome tabs API not available');
                return;
            }

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
            console.log('🕵️ [DETECTIVE] Starting investigation...');
            
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab) {
                throw new Error('No active tab found');
            }
            
            if (!tab.url || !tab.url.includes('instagram.com')) {
                throw new Error('Please navigate to Instagram.com first');
            }

            console.log('🕵️ [DETECTIVE] Sending message to content script on tab:', tab.id);
            
            // Use content script messaging only (no Chrome scripting API dependency)
            await chrome.tabs.sendMessage(tab.id, { 
                type: 'START_INVESTIGATION',
                timestamp: Date.now()
            });

            console.log('🕵️ [DETECTIVE] Message sent successfully, listening for results...');
            this.listenForResults();
            
        } catch (error) {
            console.error('🚨 [DETECTIVE] Investigation error:', error);
            this.handleError(error.message || 'An unexpected error occurred');
        }
    }

    listenForResults() {
        const messageListener = (event) => {
            if (event.data?.type === 'DETECTIVE_UPDATE') {
                const { data } = event.data;
                
                switch (data.type) {
                    case 'progress':
                        this.updateProgress(data.percentage, data.step);
                        break;
                    case 'complete':
                        this.showResults(data.results);
                        break;
                    case 'error':
                        this.handleError(data.message);
                        break;
                }
            }
        };

        window.addEventListener('message', messageListener);
        
        setTimeout(() => {
            window.removeEventListener('message', messageListener);
            if (this.isRunning) {
                this.handleError('Investigation timed out');
            }
        }, 300000);
    }

    updateProgress(percentage, step) {
        this.progressFill.style.width = percentage + '%';
        this.progressText.textContent = step;
    }

    showProgress() {
        this.progressContainer.style.display = 'block';
        this.resultsSection.style.display = 'none';
    }

    showResults(results) {
        this.isRunning = false;
        this.runButton.disabled = false;
        this.runButton.textContent = 'Run Again';
        this.statusText.textContent = 'Investigation complete!';
        
        this.progressContainer.style.display = 'none';
        this.resultsSection.style.display = 'block';
        
        this.totalFollowing.textContent = results.totalFollowing.toLocaleString();
        this.followingBack.textContent = results.mutualFollows.toLocaleString();
        this.notFollowingBack.textContent = results.unfollowersCount.toLocaleString();
        
        chrome.storage.local.set({ lastResults: results });
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

    async startAdvancedScan() {
        if (this.isRunning) return;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url || !tab.url.includes('instagram.com')) {
                throw new Error('Please navigate to Instagram.com first');
            }

            // Send message to activate advanced detective
            await chrome.tabs.sendMessage(tab.id, { 
                type: 'START_ADVANCED_INVESTIGATION',
                timestamp: Date.now()
            });

        } catch (error) {
            console.error('Advanced scan error:', error);
            this.handleError(error.message || 'Advanced scan failed');
        }
    }

    selectAllUsers() {
        const checkboxes = this.userList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = true);
    }

    async copyUserList() {
        // This would copy the current user list to clipboard
        // Implementation depends on having user data
        try {
            await navigator.clipboard.writeText('User list copied!');
            this.statusText.textContent = 'User list copied to clipboard!';
            setTimeout(() => {
                this.statusText.textContent = 'Ready to investigate your Instagram followers';
            }, 2000);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    }

    openSettings() {
        // This would open a settings dialog
        this.statusText.textContent = 'Settings feature coming soon...';
        setTimeout(() => {
            this.statusText.textContent = 'Ready to investigate your Instagram followers';
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UnfollowerDetective();
});