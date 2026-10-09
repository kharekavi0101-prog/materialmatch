# MaterialMatch

### Turning Waste Streams into Resource Streams

---

## Problem Statement

Every year, millions of tons of reusable materials — wood offcuts, fabric scraps, cardboard, coffee grounds, packaging foam, construction materials — end up in landfills, not because they have no value, but because there is no efficient way to connect the organizations generating them with those that can use them. This represents both an economic loss and an avoidable environmental burden.

## Proposed Solution

**MaterialMatch** is a circular-economy platform that helps organizations transform surplus materials into reusable resources by connecting material providers with organizations that need them.

Organizations can list their surplus materials, browse what others have listed, send and receive material exchange requests, and track their collective sustainability impact — all in one platform.

## SDG Alignment

MaterialMatch directly supports **SDG 12: Responsible Consumption and Production**.

| SDG Target | Description |
|---|---|
| 12.2 | Sustainable management and efficient use of natural resources |
| 12.4 | Responsible management of chemicals and waste throughout their lifecycle |
| 12.5 | Substantially reduce waste generation through reduction, reuse and recycling |

## Main Features

| Feature | Description |
|---|---|
| **Material Marketplace** | Browse surplus materials from organizations. Filter by category, availability, search by name or city. |
| **Add Material** | List surplus materials with full details — category, quantity, condition, pickup info, suggested uses. |
| **Material Requests** | Organizations can post what materials they need. Others can see and respond. |
| **Exchange Workflow** | Full request → accept/reject → complete cycle with quantity deduction and history update. |
| **Sustainability Dashboard** | Track waste diverted, exchanges completed, top organizations, category breakdown. |
| **Organization Profile** | Manage your organization details and view your impact record. |
| **Exchange History** | Full timeline of all exchanges across the network. |
| **Dark Mode + Light Mode** | Both themes fully designed. Dark mode is default. Theme persists across sessions. |
| **Responsive Design** | Works on desktop, tablet, and mobile. |

## Technology Used

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + Vite 8 |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| State & Data | Context API + localStorage (no backend required) |
| Styling | Pure CSS custom properties (no CSS framework) |
| Build | Vite |

## How MaterialMatch Works

```
Organization Registers / Logs In
          ↓
Posts Surplus Material → Appears in Marketplace
          ↓
Another Organization Discovers It → Sends Exchange Request
          ↓
Material Owner Reviews Request → Accepts or Rejects
          ↓
Accepted → Exchange is Active
          ↓
Material Owner Marks Exchange Complete
          ↓
Quantity Deducted → Listing Updates → Impact Metrics Update
          ↓
Exchange Added to History → Sustainability Stats Refresh
```

**Circular flow example:**

> Furniture workshop generates 35 kg wood offcuts → Lists on MaterialMatch → NGO sends request for 12 kg → Workshop accepts → NGO collects material → Exchange marked complete → 12 kg waste diverted from landfill → Impact dashboard updates

## Sample Organizations (Pre-loaded)

| Organization | Type | City |
|---|---|---|
| UrbanCraft Furniture | Workshop | Ghaziabad |
| GreenMinds NGO | NGO | Delhi |
| EcoPrint Solutions | Business | Noida |
| ThreadCycle Studio | Workshop | Mumbai |
| BuildAgain Workshop | Repair Group | Pune |
| BeanRoute Café | Business | Bengaluru |
| RePack Industries | Business | Ahmedabad |
| Community Makers Hub | Makerspace | Chennai |

## How to Run the Application

### Prerequisites
- Node.js 18+ installed
- npm 8+ installed

### Steps

```bash
# 1. Navigate to the project folder
cd materialmatch

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5173
```

### Demo Login

Use these credentials to log in immediately:

```
Email:    arjun@urbancraft.in
Password: demo123
```

Or register a new organization account.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
materialmatch/
├── src/
│   ├── context/
│   │   └── AppContext.jsx       # Global state (auth, theme)
│   ├── data/
│   │   └── store.js             # Data layer (localStorage)
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   └── AppLayout.jsx        # Protected layout wrapper
│   ├── pages/
│   │   ├── LandingPage.jsx      # Public landing page
│   │   ├── LoginPage.jsx        # Login
│   │   ├── RegisterPage.jsx     # Registration
│   │   ├── Dashboard.jsx        # Organization dashboard
│   │   ├── Marketplace.jsx      # Material marketplace
│   │   ├── MaterialDetail.jsx   # Single material + request form
│   │   ├── AddMaterial.jsx      # Add new material listing
│   │   ├── MaterialRequests.jsx # Material requirements board
│   │   ├── Exchanges.jsx        # Exchange management
│   │   ├── ImpactPage.jsx       # Sustainability impact dashboard
│   │   ├── ProfilePage.jsx      # Organization profile
│   │   └── HistoryPage.jsx      # Exchange history timeline
│   ├── styles/
│   │   └── global.css           # All styles with CSS variables
│   ├── App.jsx                  # Route definitions
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Future Scope

- **Bookmarking** — Save materials for later review
- **Organization Ratings** — Trust score based on completed exchanges
- **Leaderboard** — Top organizations by waste diverted
- **Downloadable Impact Report** — PDF summary of sustainability metrics
- **Notifications** — Real-time alerts for new requests and status changes
- **Material Search API** — Full-text search with advanced filters
- **Multi-city Networks** — Regional hubs for localized material exchange
- **Integration with Waste Management Bodies** — Official government tie-ins
- **Mobile App** — Native iOS/Android application
- **Carbon Calculator** — Estimate CO2 saved per exchange
- **Verified Organization Badges** — Trust certification for active contributors

---

*MaterialMatch — Built for IBM SkillsBuild Internship Program*  
*Aligned with UN SDG 12: Responsible Consumption and Production*
