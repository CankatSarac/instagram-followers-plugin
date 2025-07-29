# 🔐 GitHub Personal Access Token Setup Guide

## Step 1: Create Personal Access Token

### 1. Go to GitHub Settings
- Visit: https://github.com/settings/tokens
- Or: GitHub → Profile Picture → Settings → Developer settings → Personal access tokens → Tokens (classic)

### 2. Generate New Token
1. Click **"Generate new token"** → **"Generate new token (classic)"**
2. Fill in the details:

**Token Name:** `All Projects Access Token`
**Expiration:** `No expiration` (or choose your preferred duration)

### 3. Select Scopes (Permissions)
✅ **Essential for all projects:**
- [x] `repo` - Full control of private repositories
- [x] `workflow` - Update GitHub Action workflows
- [x] `write:packages` - Upload packages to GitHub Package Registry
- [x] `delete:packages` - Delete packages from GitHub Package Registry
- [x] `admin:org` - Full control of orgs and teams (if you have organizations)
- [x] `admin:public_key` - Full control of user public keys
- [x] `admin:repo_hook` - Full control of repository hooks
- [x] `admin:org_hook` - Full control of organization hooks
- [x] `gist` - Create gists
- [x] `notifications` - Access notifications
- [x] `user` - Update ALL user data
- [x] `delete_repo` - Delete repositories
- [x] `admin:gpg_key` - Full control of user gpg keys

### 4. Generate Token
1. Click **"Generate token"**
2. **⚠️ COPY THE TOKEN IMMEDIATELY** - You won't be able to see it again!

## Step 2: Configure Git to Use Token

### Option A: Global Configuration (Recommended)
```bash
# Set up credential helper
git config --global credential.helper store

# First time push will ask for credentials
git push origin main
# Username: CankatSarac
# Password: ghp_your_token_here
```

### Option B: Use Token Directly in URLs
```bash
git remote set-url origin https://ghp_YOUR_TOKEN@github.com/CankatSarac/instagram-followers-plugin.git
git push origin dev
```

### Option C: GitHub CLI (Best Experience)
```bash
# Install GitHub CLI: https://cli.github.com/
gh auth login
# Choose: GitHub.com → HTTPS → Paste your token
```

## Step 3: Store Token Securely

### Windows (Credential Manager)
```bash
# Windows will automatically store credentials after first use
git config --global credential.helper manager-core
```

### Store in Environment Variable
```bash
# Add to your .bashrc or .zshrc
export GITHUB_TOKEN=ghp_your_token_here

# Use in git commands
git clone https://$GITHUB_TOKEN@github.com/CankatSarac/repo-name.git
```

## Step 4: Test Token

```bash
# Test with any repository
git clone https://ghp_YOUR_TOKEN@github.com/CankatSarac/instagram-followers-plugin.git
cd instagram-followers-plugin
echo "# Test" >> README.md
git add README.md
git commit -m "Test commit"
git push origin main
```

## 🔒 Security Best Practices

### ✅ DO:
- Store token in credential manager or environment variables
- Use tokens with minimum required permissions for specific tasks
- Regularly rotate tokens (every 6-12 months)
- Use different tokens for different purposes if needed

### ❌ DON'T:
- Commit tokens to repositories
- Share tokens in plain text
- Use tokens in URLs that might be logged
- Give tokens more permissions than needed

## Token Permissions Explained

| Permission | What it allows |
|------------|----------------|
| `repo` | Full access to repositories (clone, push, pull, create, delete) |
| `workflow` | Manage GitHub Actions |
| `write:packages` | Publish packages |
| `admin:org` | Manage organizations |
| `user` | Access user profile information |
| `gist` | Create and manage gists |
| `notifications` | Access notifications |

## Quick Commands for Your Projects

### Push to Instagram Plugin:
```bash
git push https://ghp_YOUR_TOKEN@github.com/CankatSarac/instagram-followers-plugin.git dev
```

### Clone any repository:
```bash
git clone https://ghp_YOUR_TOKEN@github.com/CankatSarac/REPO_NAME.git
```

### Set up new repository:
```bash
git remote add origin https://ghp_YOUR_TOKEN@github.com/CankatSarac/NEW_REPO.git
git push -u origin main
```

## 🚀 Ready to Use!

Once you have your token:

1. **Copy your token** (starts with `ghp_`)
2. **Replace `YOUR_TOKEN`** in the commands above
3. **Test with your Instagram plugin:**
   ```bash
   git push https://ghp_YOUR_TOKEN@github.com/CankatSarac/instagram-followers-plugin.git dev
   ```

Your token will work for ALL your GitHub repositories! 🎉