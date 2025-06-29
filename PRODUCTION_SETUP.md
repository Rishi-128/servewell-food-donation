# ServeWell Production Setup Guide

## Current Status
The app is currently using CDN versions of libraries for rapid development. For production deployment, follow these steps:

## 1. Replace Tailwind CSS CDN

### Option A: Tailwind CLI (Recommended)
```bash
# Install Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init

# Create input.css
echo '@tailwind base; @tailwind components; @tailwind utilities;' > input.css

# Build CSS
npx tailwindcss -i ./input.css -o ./static/css/tailwind.css --watch
```

### Option B: PostCSS Plugin
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Update HTML Templates
Replace the CDN link:
```html
<!-- Remove this -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Add this -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/tailwind.css') }}">
```

## 3. Environment-Specific Configuration

### Development
- Keep CDN for rapid prototyping
- Use debug mode in Flask

### Production
- Use compiled CSS
- Minify assets
- Set Flask debug=False
- Use proper secret key (not hardcoded)
- Implement proper error handling

## 4. Security Improvements

### Update app.py:
```python
import os
from dotenv import load_dotenv

load_dotenv()

app.secret_key = os.environ.get('SECRET_KEY', 'fallback-key-change-me')

# Add CSRF protection
from flask_wtf.csrf import CSRFProtect
csrf = CSRFProtect(app)
```

## 5. Database Migration
Consider moving from JSON files to a proper database:
- SQLite for small deployments
- PostgreSQL for production
- Add proper database migrations

## 6. Asset Optimization
- Minify CSS and JavaScript
- Optimize images
- Use CDN for static assets
- Implement caching headers

## 7. Deployment Checklist
- [ ] Replace Tailwind CDN
- [ ] Update secret key
- [ ] Add environment variables
- [ ] Set up proper database
- [ ] Add logging
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL certificates
- [ ] Add monitoring

## Current Libraries Used
- **Tailwind CSS**: v3.x (CDN) - Replace with compiled version
- **GSAP**: v3.12.2 (CDN) - Consider self-hosting for production
- **Font Awesome**: v6.0.0 (CDN) - Consider self-hosting
- **Flask**: Latest
- **Python**: 3.x required

## File Structure for Production
```
servewell/
├── app.py
├── requirements.txt
├── .env (add this)
├── package.json (add this)
├── tailwind.config.js (add this)
├── static/
│   ├── css/
│   │   ├── tailwind.css (compiled)
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── templates/
└── data/ (migrate to proper DB)
```

This setup ensures the app is production-ready with proper asset management and security practices.
