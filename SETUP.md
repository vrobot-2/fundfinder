# Fund Finder Setup Instructions (Bootstrap Version)

## Prerequisites
You need to have Bun installed on your system. If you don't have Bun, you can also use npm or yarn.

## Setup Commands (Copy and run these in order)

### 1. Install Dependencies
```bash
bun install
```

### 2. Start Development Server
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

## Alternative Setup (if you prefer npm)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server  
```bash
npm run dev
```

## Production Build Commands

### Build for Production
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

## What's New in Bootstrap Version

### 🎨 Modern Bootstrap 5 Styling
- **Professional UI**: Clean, modern design using Bootstrap 5.3.7
- **Bootstrap Icons**: Comprehensive icon set for better visual communication
- **Responsive Grid**: Enhanced mobile-first responsive design
- **Component Library**: Consistent buttons, cards, forms, and badges

### 🎯 Enhanced Features
- **Improved Cards**: Beautiful business cards with hover animations
- **Better Badges**: Color-coded status indicators
- **Professional Buttons**: Grouped action buttons with icons
- **Enhanced Typography**: Better font hierarchy and spacing
- **Smooth Animations**: Card hover effects and pulse animations for selected items

### 📱 Better Mobile Experience
- **Mobile-First Design**: Optimized layout for all screen sizes
- **Touch-Friendly**: Larger buttons and better touch targets
- **Responsive Navigation**: Adaptive sidebar layout

## What You'll See

After running the application, you'll have:
- 🗺️ Interactive Leaflet map with Bootstrap-styled popups
- 📋 Professional business cards with Bootstrap styling
- 🔍 Clean search and filter interface
- 📊 Beautiful statistics display
- 📱 Fully responsive design
- 🎨 Modern color scheme and typography

## Sample Data

The application comes with 8 sample businesses including:
- Green Valley Coffee Roasters (Restaurant/Cafe)
- TechStart Solutions (Technology)
- Bella's Italian Bistro (Restaurant)
- Downtown Auto Repair (Automotive)
- Sunshine Pharmacy (Healthcare)
- Creative Design Studio (Creative Services)
- Metro Hardware Store (Retail)
- Fresh Market Grocers (Grocery)

Each business includes contact information, estimated donation ranges, and past donation history to help with your fundraising strategy.

## Features to Try

1. **Search**: Use the search bar with new Bootstrap styling
2. **Filter**: Enhanced dropdown filters with Bootstrap select styling
3. **Map Interaction**: Click markers with improved Bootstrap popups
4. **Status Updates**: Beautiful badge system for contact status
5. **Contact Actions**: Professional button groups for email/call actions
6. **Responsive Design**: Try the app on different screen sizes
7. **Hover Effects**: Experience smooth card animations

## Troubleshooting

If you encounter issues with the Leaflet map component:

1. The application includes a fallback SimpleMap component with Bootstrap styling
2. You can switch to the simple map by modifying `src/app.jsx`:
   - Change `import { InteractiveMap }` to `import { SimpleMap }`
   - Replace `<InteractiveMap` with `<SimpleMap`

## Bootstrap Components Used

- **Cards**: For business listings
- **Badges**: For status indicators
- **Buttons & Button Groups**: For actions
- **Forms**: For search and filters
- **Grid System**: For responsive layout
- **Icons**: Bootstrap Icons for visual elements
- **Utilities**: For spacing, colors, and positioning
