# ==================================

# Book Inventory Builder - Environment Variables

# ==================================

# Instructions:

# 1. Copy this file to .env.local

# 2. Fill in your actual values

# 3. Never commit .env.local to version control

# ==================================

# Google AI API Configuration

# ==================================

# Get your API key from: https://makersuite.google.com/app/apikey

# Required for AI book detail extraction

GOOGLE_AI_API_KEY=your_gemini_api_key_here

# Alternative variable names (if using different AI providers)

# OPENAI_API_KEY=your_openai_key_here

# ANTHROPIC_API_KEY=your_anthropic_key_here

# ==================================

# Database Configuration

# ==================================

# SQLite database file path (relative to project root)

DATABASE_URL=file:./books.db

# Alternative database configurations:

# PostgreSQL: postgresql://username:password@localhost:5432/book_inventory

# MongoDB: mongodb://localhost:27017/book_inventory

# MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/book_inventory

# ==================================

# Next.js Configuration

# ==================================

# NextAuth secret (generate a random string)

# You can generate one with: openssl rand -base64 32

NEXTAUTH_SECRET=your-super-secret-jwt-secret-min-32-characters

# Application URL (change for production)

NEXTAUTH_URL=http://localhost:3000

# For Vercel deployment, this will be automatically set

# NEXTAUTH_URL=https://your-app-name.vercel.app

# ==================================

# Application Configuration

# ==================================

# Maximum file upload size (in bytes)

# 10MB = 10485760 bytes

MAX_FILE_SIZE=10485760

# Allowed image file types (comma-separated)

ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/webp

# AI Processing timeout (in milliseconds)

AI_TIMEOUT=30000

# ==================================

# Development Configuration

# ==================================

# Enable debug logging

DEBUG=false

# Database logging

DATABASE_LOGGING=false

# AI API logging (be careful with sensitive data)

AI_API_LOGGING=false

# ==================================

# Vercel Deployment Configuration

# ==================================

# These are automatically set by Vercel, but can be overridden

# VERCEL_URL=your-app-name.vercel.app

# VERCEL_ENV=production

# ==================================

# Optional: Third-party Integrations

# ==================================

# Analytics (if you add Google Analytics)

# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Error tracking (if you add Sentry)

# SENTRY_DSN=your_sentry_dsn_here

# Image optimization service (if using external service)

# CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# ==================================

# Security Configuration

# ==================================

# CORS origins (comma-separated)

CORS_ORIGINS=http://localhost:3000,https://your-domain.com

# API rate limiting

RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# ==================================

# Performance Configuration

# ==================================

# Image compression quality (0-100)

IMAGE_QUALITY=80

# Database connection pool size

DATABASE_POOL_SIZE=10

# Cache TTL in seconds

CACHE_TTL=3600

# ==================================

# Feature Flags (if implementing)

# ==================================

# Enable/disable features for A/B testing

FEATURE_BULK_UPLOAD=true
FEATURE_EXPORT_CSV=true
FEATURE_BARCODE_SCANNING=false

# ==================================

# IMPORTANT NOTES:

# ==================================

# 1. This file contains sensitive information - never commit to git

# 2. Use different values for development/staging/production

# 3. Rotate secrets regularly in production

# 4. Use Vercel environment variables for production deployment

# 5. Test all configurations in development before deploying

# ==================================

# Quick Setup Checklist:

# ==================================

# ✅ 1. Get Gemini API key from Google AI Studio

# ✅ 2. Copy this file to .env.local

# ✅ 3. Replace placeholder values with real ones

# ✅ 4. Test API connection with npm run dev

# ✅ 5. Add environment variables to Vercel dashboard

# ✅ 6. Deploy and test production build
