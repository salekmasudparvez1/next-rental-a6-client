# 🏠 Property Rental Management System

A comprehensive full-stack property rental platform built with Next.js 14, featuring role-based dashboards for Admins, Landlords, and Tenants. This system streamlines property listings, rental requests, payments, and user management with an intuitive interface and robust authentication.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [User Roles](#-user-roles)
- [Key Functionalities](#-key-functionalities)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user authentication with JWT
- Role-based access control (Admin, Landlord, Tenant)
- Protected routes with middleware
- User profile management

### 🏢 Property Management
- Create, edit, and delete property listings
- Upload property images and details
- Location-based property search using Bangladesh administrative data
- Advanced property filtering and search

### 👥 User Management
- Three distinct user roles with different permissions
- User dashboard for each role
- Profile customization with avatar and background
- User status management

### 💰 Payment Integration
- Stripe payment gateway integration
- Invoice generation and management
- Transaction history tracking
- PDF invoice downloads

### 📊 Dashboard Features
- **Admin Dashboard**: Manage all users, properties, and transactions
- **Landlord Dashboard**: Manage property listings, view requests, track payments
- **Tenant Dashboard**: Browse properties, submit requests, manage payments

### 🎨 UI/UX
- Modern, responsive design with Tailwind CSS
- Dark/Light mode support
- Multiple layout options (vertical/horizontal)
- Custom components with Radix UI
- Interactive data tables with sorting and filtering
- Toast notifications with Sonner

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - shadcn/ui
  - Lucide React Icons
  - Iconify
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Data Tables**: TanStack Table (React Table)
- **PDF Generation**: jsPDF, @react-pdf/renderer
- **Maps**: Leaflet
- **Date Handling**: date-fns
- **Carousel**: Embla Carousel

### Payment Processing
- Stripe React Stripe.js
- Stripe.js

### Development Tools
- ESLint
- TypeScript
- PostCSS
- Next.js Dev Tools

## 📁 Project Structure

```
frontend/
├── public/                  # Static assets
│   └── bdinfo.json         # Bangladesh administrative data
├── src/
│   ├── app/                # Next.js 14 App Router
│   │   ├── (authLayout)/  # Authentication pages
│   │   ├── (commonLayout)/# Public pages (home, profile, listings)
│   │   └── (dashboardLayout)/
│   │       ├── admin/     # Admin dashboard pages
│   │       ├── landlord/  # Landlord dashboard pages
│   │       └── tenant/    # Tenant dashboard pages
│   ├── assets/            # Images and media files
│   ├── components/        # React components
│   │   ├── core/          # Core reusable components
│   │   ├── layout/        # Layout components
│   │   ├── module/        # Feature-specific modules
│   │   └── ui/            # UI components (shadcn/ui)
│   ├── contexts/          # React Context providers
│   ├── data/              # Static data and configurations
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── providers/         # Global providers
│   ├── service/           # API service functions
│   │   ├── auth/          # Authentication services
│   │   ├── dashbord/      # Dashboard services
│   │   ├── payment/       # Payment services
│   │   ├── post/          # Property post services
│   │   ├── profile/       # Profile services
│   │   └── user/          # User services
│   ├── types/             # TypeScript type definitions
│   └── middleware.ts      # Next.js middleware for auth
├── components.json        # shadcn/ui configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager
- Stripe account (for payment features)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory and add your environment variables (see [Environment Variables](#-environment-variables) section).

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm run start
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_backend_api_url

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Authentication
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 👤 User Roles

### 🔴 Admin
- View and manage all users
- View and manage all properties
- Access system-wide analytics
- Manage user roles and permissions
- Monitor all transactions

### 🟢 Landlord
- Create and manage property listings
- Upload property photos and details
- View rental requests from tenants
- Approve or reject rental applications
- Track payment transactions
- Manage multiple properties

### 🔵 Tenant
- Browse available properties
- Filter properties by location, price, etc.
- Submit rental requests
- Make payments via Stripe
- View transaction history
- Manage profile and preferences

## 🎯 Key Functionalities

### Property Listing System
- Rich property details with multiple images
- Location integration with Bangladesh administrative divisions
- Property availability status
- Price and amenities information

### Request Management
- Tenants can request properties
- Landlords receive and manage requests
- Status tracking (Pending, Approved, Rejected)
- Notification system

### Payment Processing
- Secure Stripe integration
- Multiple payment methods support
- Automated invoice generation
- PDF invoice downloads
- Transaction history

### Search & Filter
- Advanced property search
- Location-based filtering (Division, District, Upazila)
- Price range filtering
- Property type filtering
- Sort by date, price, etc.

## 📚 API Documentation

For detailed API documentation, please refer to [README_API.md](README_API.md) which includes:
- Bangladesh Administrative API endpoints
- Custom React hooks for data fetching
- API integration examples
- Type definitions

## 📸 Screenshots

*Add screenshots of your application here*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

**Salek Masud Parvez**
- Email: salekmasudparvez@gmail.com
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Stripe](https://stripe.com/) - Payment processing
- [Vercel](https://vercel.com/) - Deployment platform

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with TypeScript support.

---

**Built with ❤️ by Salek Masud Parvez**
