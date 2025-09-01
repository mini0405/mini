# Modern React Portfolio

A beautiful, responsive portfolio website built with React and modern web technologies.

## 🚀 Installation Guide

### Prerequisites
1. **Install Node.js** (v16 or higher)
   - Go to [nodejs.org](https://nodejs.org/)
   - Download and install the LTS version
   - Verify installation: `node --version` and `npm --version`

### Setup Instructions

1. **Clone and Navigate**
   ```bash
   cd "g:\My Drive\minentle.co.za\minentle-portfolio"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   - Opens automatically at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Customization Guide

### Update Personal Information
Replace all placeholder content marked with `<>`:

1. **Hero Section** (`src/components/Hero.js`):
   - Replace `<Your Name>` with your actual name
   - Update subtitle and description

2. **Contact Section** (`src/components/Contact.js`):
   - Replace `<your-email@example.com>` with your email
   - Replace `<+1-234-567-8900>` with your phone
   - Replace `<Your City, Country>` with your location

3. **Projects** (`src/components/Projects.js`):
   - Update project details, descriptions, and links
   - Replace `#` with actual GitHub and live demo URLs

4. **About Section** (`src/components/About.js`):
   - Customize your story and statistics

### Add Your Projects
1. Edit the `projects` array in `src/components/Projects.js`
2. Update project titles, descriptions, tech stacks, and links
3. Replace emoji icons with actual project images if desired

## 🌐 AWS Deployment Guide

### Step 1: Build Your Project
```bash
npm run build
```

### Step 2: Create S3 Bucket
1. Go to AWS S3 Console
2. Create bucket named `minentle.co.za`
3. Enable static website hosting
4. Set index document to `index.html`
5. Set error document to `index.html`

### Step 3: Upload Files
1. Upload all files from `build/` folder to S3 bucket
2. Make bucket publicly readable:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::minentle.co.za/*"
       }
     ]
   }
   ```

### Step 4: Setup CloudFront
1. Create CloudFront distribution
2. Set origin to your S3 bucket
3. Set default root object to `index.html`
4. Configure custom error pages (404 → /index.html)

### Step 5: Configure Custom Domain
1. In CloudFront, add alternate domain name: `minentle.co.za`
2. Request SSL certificate via AWS Certificate Manager
3. In GoDaddy DNS settings:
   - Add CNAME record: `www` → `your-cloudfront-domain.cloudfront.net`
   - Add A record: `@` → CloudFront IP (or use ALIAS if available)

## 📁 Project Structure
```
minentle-portfolio/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Hero.js        # Landing section
│   │   ├── About.js       # About section
│   │   ├── Skills.js      # Skills section
│   │   ├── Projects.js    # Projects showcase
│   │   └── Contact.js     # Contact form
│   ├── App.js             # Main app component
│   ├── App.css            # Global styles
│   ├── index.js           # React entry point
│   └── index.css          # Base styles
├── package.json           # Dependencies
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🔧 Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/mini0405/mini.git
git push -u origin main
```

### Regular Updates
```bash
git add .
git commit -m "Update portfolio content"
git push
```

## 🛡️ Security Best Practices

- ✅ No sensitive data in code
- ✅ Environment variables for API keys
- ✅ Proper .gitignore configuration
- ✅ PII protection with placeholders
- ✅ HTTPS enabled via CloudFront

## 🎯 Features

- ✨ Modern React with Hooks
- 🎨 Framer Motion animations
- 📱 Fully responsive design
- 🌙 Dark theme with gradients
- ⚡ Optimized performance
- 🔍 SEO-friendly structure

## 📞 Support

Need help customizing your portfolio? Update the placeholder content and deploy to see your professional portfolio live!