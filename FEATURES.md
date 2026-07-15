# 8te Feature Documentation

## Features Overview

### 1. User Authentication ✅

**Sign Up**
- Email validation
- Password hashing with bcryptjs
- Phone number (optional)
- Location setup

**Login**
- Email and password authentication
- JWT token generation
- Token stored in localStorage
- Automatic token refresh on expiry

**Features**
- Session persistence
- Logout functionality
- Profile management
- Password reset (extensible)

### 2. Food Inventory Management ✅

**Add Food Items**
- Manual entry with form
- Receipt scanning (OCR-powered)
- Auto-detection of food items from images
- Categories: fruits, vegetables, dairy, meat, bakery, pantry, frozen, beverages, other
- Quantities with flexible units (pieces, kg, lb, liters, ml, cups, oz)
- Location tracking (fridge, freezer, pantry, counter)
- Custom notes

**View Food Items**
- Dashboard with all items
- Sortable/filterable by status, category, expiry date
- Freshness indicators (green, yellow, red)
- Quick actions: edit, delete, donate

**Food Status Tracking**
- Fresh (expires in 8+ days)
- Expiring Soon (expires in 1-7 days)
- Expired (already past expiry)
- Donated (marked as donated)
- Used/Discarded

### 3. Smart Reminder System ✅

**Customizable Reminders**
- Default: 30 days, 2 weeks, 1 week, 3 days before expiry
- User-configurable timing
- Multiple delivery channels
- Skip/mute options

**Delivery Methods**
- Email notifications (Gmail integration)
- SMS notifications (Twilio integration)
- Push notifications (Web Push API)
- In-app notifications (real-time)

**Reminder Content**
- Friendly, specific messages
- Item details (quantity, location)
- Direct links to item page
- Action prompts (donate, use now)

### 4. AI-Powered Features ✅

**Recipe Suggestions**
- OpenAI integration
- Generates 2-3 recipes for expiring items
- Includes ingredients and instructions
- Practical, easy-to-follow recipes

**Image Recognition**
- Tesseract.js OCR for receipt scanning
- Extract text from food labels
- Estimate expiry dates
- Auto-populate item fields

### 5. Donation System ✅

**Charity/Food Bank Finder**
- Location-based search
- Nearby charities within specified radius
- Charity information:
  - Name and type
  - Address and phone
  - Operating hours
  - Accepted items
  - Ratings and review count

**Donation Process**
1. Select food item
2. Choose nearby charity
3. Schedule donation
4. Confirm and track

**Donation Tracking**
- Donation history
- Items donated counter
- Impact statistics
- Scheduled vs. delivered

### 6. Dashboard & Analytics ✅

**Dashboard Stats**
- Total items: fresh, expiring soon, expired
- Items donated this month
- Estimated waste saved
- User impact metrics

**Empty State**
- Clear CTA for new users
- "Add Your First Item" prompt
- Guidance for getting started

**Visual Indicators**
- Color-coded status badges
- Progress charts (extensible)
- Impact summary cards

### 7. Settings & Preferences ✅

**Notification Preferences**
- Enable/disable all notifications
- Channel selection (email, SMS, push)
- Custom reminder timing
- Mute specific types

**Location Settings**
- Address input
- GPS coordinates (manual or auto)
- Used for donation finder

**Account Management**
- View profile
- Update name, phone
- Change email (extensible)
- Sign out

## Technical Implementation

### Backend Architecture

```
Backend (Node.js + Express)
├── Models (MongoDB)
│   ├── User
│   ├── FoodItem
│   ├── Notification
│   ├── Donation
│   └── Charity
├── Routes (API endpoints)
│   ├── Auth
│   ├── Foods
│   ├── Notifications
│   ├── Donations
│   ├── Settings
│   └── Dashboard
├── Middleware
│   └── Authentication
├── Services
│   ├── Reminder Service (cron jobs)
│   ├── AI Service (OpenAI)
│   ├── Email Service (Nodemailer)
│   └── SMS Service (Twilio)
└── Utilities
    └── Helpers
```

### Frontend Architecture

```
Frontend (React + Vite)
├── Pages
│   ├── Login / Signup
│   ├── Dashboard
│   ├── AddFood
│   ├── FoodDetail
│   ├── Donations
│   ├── Settings
│   └── Notifications
├── Components
│   └── Layout (Navigation)
├── Store (Zustand)
│   ├── authStore
│   └── foodStore
├── Utils
│   ├── apiClient
│   ├── helpers
│   ├── notifications
│   └── validators
└── Config
    └── app.config
```

### Database Schema

**User Collection**
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  location: { address, latitude, longitude },
  preferences: { notificationsEnabled, emailNotifications, ... },
  stats: { totalItemsAdded, totalItemsDonated, ... },
  pushSubscription: { ... },
  createdAt: Date
}
```

**FoodItem Collection**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  category: String,
  quantity: Number,
  unit: String,
  expiryDate: Date,
  addedDate: Date,
  location: String,
  status: String (fresh, expiring_soon, expired, donated, used, discarded),
  notes: String,
  remindersSent: [Date],
  aiSuggestions: Array,
  updatedAt: Date
}
```

## API Endpoints Reference

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Foods
- `GET /api/foods` - List all items
- `POST /api/foods` - Add item
- `GET /api/foods/:id` - Get item
- `PUT /api/foods/:id` - Update item
- `DELETE /api/foods/:id` - Delete item
- `POST /api/foods/scan/image` - Scan receipt

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark read
- `POST /api/notifications/subscribe` - Subscribe to push

### Donations
- `GET /api/donations` - Get donations
- `POST /api/donations` - Create donation
- `GET /api/donations/charities/nearby` - Find charities
- `PUT /api/donations/:id` - Update donation

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings/notifications` - Update preferences
- `PUT /api/settings/location` - Update location

### Dashboard
- `GET /api/dashboard/stats` - Get stats
- `GET /api/dashboard/summary` - Get summary

## Color Theme (Yellow & Black)

```
Primary: #FFD700 (Gold/Yellow)
Dark: #1a1a1a (Black)
Light: #f5f5f5 (Off-white)

Success: #10b981 (Green)
Warning: #f59e0b (Amber)
Danger: #ef4444 (Red)
```

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and inputs
- Mobile navigation with hamburger menu
- Desktop sidebar navigation

## Security Features

- Password hashing (bcryptjs)
- JWT authentication
- Protected routes
- CORS configuration
- Input validation
- Error handling
- Rate limiting (extensible)

## Performance Optimizations

- Database indexing on frequently queried fields
- Lazy loading of pages
- Code splitting with Vite
- Caching strategies
- Image optimization
- Request batching

## Testing

- Unit tests (Jest)
- Integration tests
- API endpoint tests
- Component tests
- End-to-end tests (Cypress - extensible)

## Deployment

- Docker containerization
- Docker Compose for local development
- Heroku/Vercel deployment ready
- Environment-based configuration
- Database migrations (MongoDB)

## Future Enhancements

- Mobile app (React Native)
- Barcode scanning
- Meal planning
- Community food sharing
- Carbon footprint tracking
- Recipe API integration
- ML-based expiry prediction
- Dark mode
- Multiple languages
- Voice commands
- Social features (leaderboards)
- Integration with grocery APIs
- Smart shopping list
- Inventory export/import

---

For API details, see README.md
For setup instructions, see SETUP_GUIDE.md
