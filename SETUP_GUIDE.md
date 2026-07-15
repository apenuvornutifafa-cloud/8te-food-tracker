# 8te Implementation Guide

This guide provides additional setup instructions and usage examples.

## 🎯 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/8te
JWT_SECRET=your_dev_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
EOF

# Start MongoDB (if running locally)
# Then start the server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## 🗄️ Database Setup

### MongoDB Seed Data (Optional)

```javascript
// Sample charities for donation finder
db.charities.insertMany([
  {
    name: "City Food Bank",
    type: "food_bank",
    address: "123 Main St, Your City",
    phone: "555-0100",
    email: "contact@cityfoodbank.org",
    website: "https://cityfoodbank.org",
    location: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    operatingHours: {
      monday: "9AM-5PM",
      tuesday: "9AM-5PM",
      wednesday: "9AM-5PM",
      thursday: "9AM-5PM",
      friday: "9AM-5PM",
      saturday: "10AM-2PM",
      sunday: "Closed"
    },
    description: "Community food bank serving families in need",
    acceptedItems: ["fruits", "vegetables", "canned_goods", "dairy"],
    rating: 4.5,
    donationsReceived: 0
  }
])
```

## 🔐 Authentication Flow

1. User signs up with email and password
2. Backend hashes password with bcryptjs
3. JWT token generated and returned
4. Token stored in localStorage
5. Sent in Authorization header for protected routes

## 📲 Notification Setup

### Email Notifications (Gmail)
1. Enable 2FA on Gmail
2. Generate App Password
3. Add to .env as `GMAIL_PASSWORD`

### SMS Notifications (Twilio)
1. Create Twilio account
2. Get Account SID and Auth Token
3. Add to .env

### Push Notifications
1. Generate VAPID keys using `web-push`:
```bash
npx web-push generate-vapid-keys
```
2. Add to .env

## 🔍 Testing Endpoints

### Using cURL or Postman

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Add food (use token from login response)
curl -X POST http://localhost:5000/api/foods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name":"Bananas",
    "category":"fruits",
    "quantity":5,
    "unit":"pieces",
    "expiryDate":"2024-12-25",
    "location":"counter"
  }'
```

## 🛠️ Troubleshooting

### Frontend not connecting to backend
- Check CORS settings in backend
- Ensure backend is running on port 5000
- Check proxy settings in vite.config.js

### Notifications not working
- Verify email credentials
- Check Twilio/Firebase configuration
- Review server logs for errors

### OCR not working
- Ensure Tesseract.js is properly installed
- Check image quality and format
- Verify backend has necessary dependencies

## 📊 Monitoring & Logs

### Backend Logs
```bash
cd backend
npm run dev # Shows console logs
```

### Database Monitoring
```bash
# Connect to MongoDB
mongosh
# List databases
show dbs
# Use 8te database
use 8te
# Show collections
show collections
# Query data
db.users.find()
```

## 🚀 Deployment

### Heroku Deployment

```bash
# Create Heroku app
heroku create 8te-app

# Set environment variables
heroku config:set MONGODB_URI=your_atlas_url
heroku config:set JWT_SECRET=your_secret

# Deploy backend
git subtree push --prefix backend heroku main

# Deploy frontend separately or use subdomain
```

### Environment Variables for Production

```env
NODE_ENV=production
JWT_SECRET=generate_a_strong_secret
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/8te
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
```

## 📈 Performance Optimization

### Frontend
- Lazy load pages
- Code splitting with Vite
- Image optimization
- CSS purging with Tailwind

### Backend
- Database indexing
- Connection pooling
- Caching layer (Redis)
- API rate limiting

## 🧪 Testing

### Unit Tests (Backend)
```bash
cd backend
npm test
```

### Integration Tests
```bash
npm test -- --coverage
```

## 📚 API Documentation

See API endpoints in README.md main documentation.

---

For more help, check the main README.md or create an issue.
