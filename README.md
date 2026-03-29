# Sneat Dashboard — Project Report


## 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI component library |
| Vite 5 | Build tool & dev server |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling (Sneat theme) |
| Recharts | Data visualization (charts & graphs) |
| React Router v6 | Client-side routing |
| Lucide React | Icon system |
| Radix UI | Accessible UI primitives |

## 🎨 Design System

- **Theme**: Light mode only, Sneat UI–inspired
- **Primary Color**: Indigo / Purple (`#7C3AED`)
- **Font**: Public Sans (Google Fonts)
- **Shadows**: Sneat-style soft card shadows
- **Border Radius**: Rounded corners throughout

## 📄 Pages

### 1. Login Page (`/login`)
- Email & password form with validation
- Password visibility toggle
- "Remember Me" checkbox
- Social login buttons (Google, GitHub)
- Redirect to dashboard on submit

### 2. Dashboard (`/dashboard`)
- **Stat Cards**: Total Revenue, Active Users, New Orders, Growth Rate
- **Revenue Overview**: Area chart showing monthly revenue trends
- **Weekly Sales**: Bar chart with weekly sales breakdown
- **Category Distribution**: Pie chart for product categories
- **Recent Transactions**: Table with status badges and amounts

## 🧩 Key Components

| Component | Description |
|---|---|
| `DashboardLayout` | Main layout wrapper with sidebar + topbar |
| `DashboardSidebar` | Collapsible navigation sidebar with menu badges |
| `DashboardTopbar` | Sticky top bar with search, notifications, profile |
| `Login` | Authentication page with form & social logins |
| `Dashboard` | Main dashboard with charts, stats & transactions |

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Desktop (≥1024px) | Full sidebar visible, multi-column grid |
| Tablet (768–1023px) | Collapsible sidebar, adjusted grid |
| Mobile (<768px) | Hidden sidebar with hamburger menu, single column |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── DashboardLayout.tsx
│   ├── DashboardSidebar.tsx
│   ├── DashboardTopbar.tsx
│   └── ui/              # Reusable UI primitives
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── hooks/
├── lib/
├── App.tsx
├── main.tsx
└── index.css
```

## 📊 Charts & Visualizations

All charts are built with **Recharts** and include:
- Smooth gradient area charts
- Rounded bar charts
- Interactive pie charts with custom tooltips
- Responsive containers that adapt to screen size


