# 🚀 Sneat Dashboard



---

## 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI component library |
| Vite 5 | Build tool & dev server |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Recharts | Charts & data visualization |
| React Router v6 | Routing |
| Lucide React | Icons |
| Radix UI | Accessible primitives |
| ShadCN UI | UI components |
| React Hook Form | Form handling |
| Zod | Validation |

---

## 🎨 Design System

- Theme: Light (Sneat UI inspired)
- Primary Color: `#7C3AED`
- Font: Public Sans
- Rounded UI & soft shadows
- Clean enterprise dashboard layout

---

## 📄 Pages

### 🔐 Login / Signup (`/login`)
- Login + Signup toggle
- Zod validation
- Password visibility toggle
- Remember me
- Fake authentication (localStorage)

---

### 📊 Dashboard (`/dashboard`)
- Stat cards (Revenue, Users, Orders)
- Area, Bar & Pie charts
- Transactions table

---

### 📈 Analytics (`/dashboard/analytics`)
- Data insights with charts
- Clean analytics layout

---

### 👥 Users (`/dashboard/users`)
- User table with search & filter
- Status & role badges
- Avatar generation

#### ➕ Add User
- Modal form (ShadCN Dialog)
- Zod validation
- Dynamic table update

---

### ❌ Not Found
- Fallback route for invalid pages

---

## 🧩 Key Components

- `DashboardLayout` → Layout wrapper
- `DashboardSidebar` → Navigation
- `DashboardTopbar` → Header
- `Login` → Auth page
- `UsersPage` → User management
- `Analytics` → Analytics page

---

## 🔐 Authentication

- Fake auth using `localStorage`
- Any email/password works
- Redirects to dashboard after login

---

## 🧾 Forms & Validation

- React Hook Form + Zod
- Real-time validation
- Clean error messages

---

## 📊 Charts

Built using Recharts:

- Area Chart (Revenue)
- Bar Chart (Sales)
- Line Chart (Users)
- Pie Chart (Categories)

---

## 📱 Responsive Design

| Device | Behavior |
|------|--------|
| Desktop | Full sidebar |
| Tablet | Collapsible sidebar |
| Mobile | Drawer sidebar |

---

## 📂 Project Structure
src/
├── components/
│ ├── DashboardLayout.tsx
│ ├── DashboardSidebar.tsx
│ ├── DashboardTopbar.tsx
│ └── ui/
├── pages/
│ ├── Login.tsx
│ ├── Dashboard.tsx
│ ├── Analytics.tsx
│ ├── Users.tsx
│ └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css


---

## 🚀 Routes
/login
/dashboard
/dashboard/analytics
/dashboard/users



---

## ⚡ Features

- Sneat UI Design
- Fully Responsive
- Sidebar Navigation (Active State Fixed)
- Login + Signup (Zod)
- Fake Authentication
- Dashboard with Charts
- User Management
- Add User Modal

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build project
npm run build

# Preview build
npm run preview