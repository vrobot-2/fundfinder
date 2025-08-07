# Fund Finder 🎯

A client-side web application designed to help individuals and small teams identify and connect with local businesses for fundraising and donation initiatives.

## Features

### Core Functionality
- **Interactive Map**: Visual display of potential business donors with clickable markers
- **Business Directory**: Detailed list view with comprehensive business information
- **Two-Pane Interface**: Synchronized map and list views for efficient navigation
- **Contact Management**: Track outreach status and manage communication

### Business Information
- Business name, category, and description
- Complete contact details (address, phone, email, website)
- Estimated donation ranges based on business size
- Past donation history and preferred contact times
- Status tracking (Not Contacted, Contacted, Interested, Donated, Declined)

### Filtering & Search
- Search by business name, description, or address
- Filter by business category (Restaurant, Technology, Healthcare, etc.)
- Filter by contact status
- Real-time statistics display

### User Actions
- Click-to-call and click-to-email functionality
- Status updates for tracking outreach progress
- Map marker synchronization with list selection

## Tech Stack

- **Frontend Framework**: Preact (React alternative)
- **Build Tool**: Vite with Rolldown
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Styling**: Modern CSS with responsive design
- **Package Manager**: Bun (fast JavaScript runtime and package manager)

## Installation & Setup

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Start development server**:
   ```bash
   bun run dev
   ```

3. **Build for production**:
   ```bash
   bun run build
   ```

4. **Preview production build**:
   ```bash
   bun run preview
   ```

## Project Structure

```
fundfinder/
├── src/
│   ├── components/
│   │   ├── InteractiveMap.jsx      # Leaflet map component
│   │   ├── BusinessList.jsx        # Business cards and list
│   │   └── FilterPanel.jsx         # Search and filter controls
│   ├── data/
│   │   └── mockBusinesses.js       # Sample business data
│   ├── app.jsx                     # Main application component
│   ├── app.css                     # Global styles
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Base CSS reset
├── public/
│   └── vite.svg                    # App icon
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
└── bun.lock                        # Dependency lock file
```

## Usage Guide

### Basic Navigation
1. **View Businesses**: Browse the list of local businesses in the left panel
2. **Explore Map**: Click map markers to view business details
3. **Select Business**: Click any business card to highlight it on the map
4. **Update Status**: Use dropdown menus to track your outreach progress

### Filtering Options
- **Search Bar**: Type business names, descriptions, or addresses
- **Category Filter**: Select specific business types
- **Status Filter**: Show businesses by contact status
- **Clear Filters**: Reset all filters to show all businesses

### Contact Actions
- **Email**: Click "Send Email" to open your default email client
- **Phone**: Click "Call" to initiate a phone call (mobile devices)
- **Website**: Click website links to visit business pages

## Potential Expansions

### Backend Integration
- User authentication and profile management
- Dynamic database with real business data
- Crowdsourced business information updates

### Advanced Features
- Campaign management dashboard
- Fundraising goal tracking and analytics
- Integration with CRM systems
- Email template management
- Automated follow-up reminders

### Enhanced Filtering
- Geographic radius filtering
- Business size and revenue filters
- Historical donation amount tracking
- Custom business categories

### Analytics & Reporting
- Response rate tracking
- Fundraising performance metrics
- Data visualization dashboards
- Export capabilities for reports

## Contributing

This is a demonstration project showcasing modern web development practices for nonprofit and fundraising applications. The codebase is designed to be easily extensible for real-world implementation.

## License

Open source demonstration project - feel free to adapt for your fundraising needs.

---

*Built with ❤️ for the fundraising community*
