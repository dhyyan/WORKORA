# 💼 WORKORA - Freelance Marketplace & Escrow Platform


**Workora** is an enterprise-grade, full-stack freelancing marketplace platform that seamlessly connects **Clients** looking to post projects with **Freelancers** bidding on opportunities. Engineered with strict **Clean Architecture**, real-time **Socket.IO messaging**, automated **Stripe Escrow Payments**, milestone tracking, subscription tiers, and administrative dispute resolution.

---

## 📌 Table of Contents

- 
## 🚀 Platform Overview

Workora bridges the trust gap between hirers and remote freelancers. Unlike conventional gig platforms where financial risk is high, Workora utilizes a **Milestone-Based Escrow Model**: funds are locked safely in escrow before work begins and released to the freelancer's wallet only upon client verification and approval of deliverables. If disagreements arise, an integrated **Dispute Resolution Mechanism** allows administrators to evaluate proof of work and render fair financial arbitration.

---

## 🏗️ Architecture & Design Pattern

The backend is built adhering to **Uncle Bob's Clean Architecture (Domain-Driven Design)** principles to isolate core business rules from frameworks, databases, and external services.

```
                  ┌────────────────────────────────────────┐
                  │           Frameworks & Drivers         │
                  │   (Express, Mongoose, Socket.io, Stripe)│
                  │  ┌──────────────────────────────────┐  │
                  │  │       Interface Adapters        │  │
                  │  │  (Controllers, Repositories)   │  │
                  │  │  ┌────────────────────────────┐  │  │
                  │  │  │       Application          │  │  │
                  │  │  │       Use Cases            │  │  │
                  │  │  │  ┌──────────────────────┐  │  │  │
                  │  │  │  │   Domain Entities    │  │  │  │
                  │  │  │  └──────────────────────┘  │  │  │
                  │  │  └────────────────────────────┘  │  │
                  │  └──────────────────────────────────┘  │
                  └────────────────────────────────────────┘
```

### Benefits of this Architecture:
1. **Framework Independence**: Express or Mongoose can be swapped without touching core domain rules.
2. **Testability**: Use Cases contain pure business logic and can be unit-tested without DB connection.
3. **Separation of Concerns**: Controllers deal with HTTP, Repositories deal with DB data mapping, and Use Cases govern workflows.

---

## 🔥 Key Features

### 1. User Authentication & Profile Management
- **Multi-Role Authentication**: Dedicated portals and role access controls for **Clients**, **Freelancers**, and **Admins**.
- **Social Login**: One-click sign-in using Google OAuth 2.0 (`@react-oauth/google`).
- **OTP Verification & Password Recovery**: Automated email dispatch using `Nodemailer`.
- **JWT Session Security**: Access and refresh tokens with secure cookie/header storage.
- **Profile Customization**: Manage avatars, professional titles, skill tags, hourly rates, portfolio links, and bios.

### 2. Job Posting & Bidding System
- **Job Publishing**: Clients post jobs with budget parameters, categories, required skills, and project deadlines.
- **Advanced Discovery**: Freelancers search, filter, and paginate through open positions by category, budget, and posted date.
- **Proposal Submission**: Freelancers submit tailored cover letters, proposed budgets, and execution timelines.
- **Proposal Review & Hiring**: Clients review incoming proposals, compare applicant profiles, and select freelancers for hire.

### 3. Milestone Tracking & Stripe Escrow System
- **Milestone Decomposition**: Break projects into granular payment milestones (e.g., Design phase 30%, Development phase 70%).
- **Escrow Funding**: Client funds each milestone through Stripe Checkout. Payments are held in Escrow ledger.
- **Deliverable Submission**: Freelancers upload work progress and code links directly to specific milestones (`SubmitWorkModal`).
- **Approval & Instant Payout**: Upon client approval, Escrow funds are automatically released to the freelancer's Workora wallet (`PaymentSuccess`).

### 4. Real-Time Chat & Communication
- **Instant Messaging**: Built on `Socket.IO` for low-latency bidirectional communication between client and hired freelancer.
- **Read Receipts & Status**: Real-time read indicators, unread message badges, and room-based message broadcasting.
- **History Persistence**: Chat history saved seamlessly in MongoDB for audit and dispute referencing.

### 5. Dispute Resolution & Admin Governance
- **Dispute Escalation**: Either party can raise a formal dispute (`RaiseDisputeModal`) if contract terms are violated or deliverables are rejected.
- **Proof of Work Inspection**: Admins inspect project chat logs, submitted milestone files, and initial contract terms.
- **Admin Arbitration**: Admins can execute partial or full refunds to clients or release disputed funds to freelancers (`ConcernList`).

### 6. Tiered Subscriptions & Limits
- **Pro Subscriptions**: Stripe-powered recurring monthly subscriptions for Clients and Freelancers (`SubscriptionPage`).
- **Limit Enforcement**: Subscriptions unlock higher proposal submission caps, reduced platform commission fees, and priority job listings.

### 7. Integrated Digital Wallet
- **Ledger Tracking**: Built-in wallet for tracking pending escrow balances, available balances, deposit history, and payout logs.
- **Financial History**: Transparent breakdown of platform commission, milestone payouts, and refunds.

### 8. Administrative Dashboard
- **Platform Analytics**: Dashboard reporting key platform metrics, total active contracts, revenue, and active users.
- **User Management**: Block/Unblock suspicious user accounts and manage freelancer verification badges.
- **Taxonomy Management**: Create, edit, and reorganize job categories and platform skill tags.
- **Escrow Oversight**: Monitor active escrow funds across all running contracts.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI Component Framework (Vite powered) |
| **TypeScript** | Type-safe development across UI and state |
| **Redux Toolkit & Redux Persist** | Global state management & session persistence |
| **Tailwind CSS v4** | Utility-first responsive styling system |
| **Framer Motion** | Micro-animations and page transitions |
| **Socket.io-client** | Real-time WebSocket communication client |
| **React Hook Form** | High-performance form state & validation |
| **Lucide React** | Modern iconography library |
| **React Hot Toast & Confetti** | Toast notifications & celebratory confetti feedback |

### Backend
| Technology | Description |
| :--- | :--- |
| **Node.js & Express v5** | Server environment & HTTP framework |
| **TypeScript** | Strict static typing for clean architecture entities |
| **MongoDB & Mongoose** | Document database & Object Data Modeling (ODM) |
| **Socket.IO** | Bidirectional real-time event web server |
| **Stripe Node SDK** | Checkout sessions, Escrow payment handling & Webhook parsing |
| **Google Auth Library** | Server-side Google OAuth token verification |
| **Bcrypt & JWT** | Password hashing & JSON Web Token generation |
| **Nodemailer** | Email dispatch for OTP verification and notifications |
| **Node Cache** | In-memory cache for fast lookup performance |

### Infrastructure & Tooling
| Technology | Description |
| :--- | :--- |
| **Docker & Docker Compose** | Multi-container containerized deployment setup |
| **ESLint & Prettier** | Static code analysis and code formatting rules |
| **Husky & Lint-Staged** | Git pre-commit hooks enforcing linting before code commits |

---

## 📁 Directory Structure

```
Workora/
├── Backend/
│   ├── src/
│   │   ├── domain/               # Core entities & repository interfaces
│   │   ├── useCase/              # Business logic (Client, Freelancer, Admin, Chat)
│   │   │   ├── admin/            # Admin workflows (auth, client, concern, dashboard)
│   │   │   ├── client/           # Client workflows (auth, bid, escrow, jobs, milestone, payment)
│   │   │   ├── freelancer/       # Freelancer workflows (auth, bid, dashboard, jobs, milestone)
│   │   │   └── chat/             # Real-time chat use cases
│   │   ├── adapters/             # Controllers, Repositories, Middlewares, Presenters
│   │   ├── frameWork/            # Express routes, Mongoose models, Socket server, Stripe SDK
│   │   └── shared/               # Constants, utility helpers, error handlers
│   ├── Dockerfile
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/               # Visual assets and images
│   │   ├── components/           # UI Components (admin, client, freelancer, common, chat, layout)
│   │   ├── hooks/                # Custom React hooks
│   │   ├── pages/                # Page components divided by role (Admin, Client, Freelancer)
│   │   ├── routes/               # Role-based protected routes & app router
│   │   ├── service/              # API services & Socket connections
│   │   └── store/                # Redux slices & store configuration
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml            # Container orchestration for DB, Backend, and Frontend
└── README.md
```

---

## ⚡ Technical Challenges & Architectural Solutions

### 1. Escrow Financial Integrity & Webhook Race Conditions
- **Challenge**: Standard payment flows rely on client-side redirects to confirm payments. If a user closes their browser before returning to the app, funds remain in limbo, leading to race conditions where milestone statuses become out-of-sync.
- **Solution**: Engineered a robust **Stripe Webhook Handler** (`/client/stripe/webhook`). Escrow funding state updates are triggered asynchronously by Stripe’s cryptographically signed webhook events, ensuring ledger consistency regardless of client network drops.

### 2. Express Webhook Raw Body Signature Validation
- **Challenge**: Express applications usually apply `express.json()` globally. Parsing incoming Stripe webhook payloads into JSON corrupts the raw signature buffer required by Stripe to verify webhook authenticity.
- **Solution**: Configured conditional middleware execution in `app.ts` to skip standard JSON parsing for the Stripe webhook route:
  ```typescript
  this._app.use((req, res, next) => {
      if (req.originalUrl.startsWith('/client/stripe/webhook')) {
          next();
      } else {
          express.json()(req, res, next);
      }
  });
  ```

### 3. Real-Time Chat State Synchronization Across Socket & Database
- **Challenge**: Guaranteeing zero message loss, real-time UI updates, and atomic read-receipt updates across active WebSockets while maintaining message persistence in MongoDB.
- **Solution**: Implemented room-isolated Socket handlers (`join_chat`, `send_message`, `mark_as_read`). When a message is sent, it is first processed through `ChatUsecase` to generate a database record with a timestamp and ID, then immediately broadcasted to room participants.

### 4. Strict Layer Decoupling via Clean Architecture
- **Challenge**: Preventing database schemas or Express HTTP objects (`req`, `res`) from leaking into core business logic (Use Cases), which often makes code unmaintainable.
- **Solution**: Enforced strict dependency inversion. Controllers extract HTTP parameters and pass plain data transfer objects (DTOs) into Use Cases. Use Cases interact exclusively with Repository Interfaces (abstractions), while concrete Mongoose repositories implement these interfaces.

### 5. Multi-Step Milestone & Dispute State Machine
- **Challenge**: Managing non-linear state transitions (`Pending` ➔ `Funded` ➔ `In Progress` ➔ `Submitted` ➔ `Approved / Disputed` ➔ `Completed / Refunded`).
- **Solution**: Created state-machine validation logic inside use cases (`escrowFundUseCase`, `hireFreelancerUseCase`) that validates prerequisites before allowing state changes, preventing unauthorized milestone releases or invalid dispute entries.

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or later
- **npm**: `v9.x` or later
- **MongoDB**: Local instance or MongoDB Atlas URI
- **Stripe Account**: API Keys for test/production integration

---

### Environment Variables

Create a `.env` file in the `Backend` directory:

```env
PORT=3560
MONGODB_URL=your_mongodb_connection_string
EMAIL=your_email@gmail.com
PASS=your_email_app_password

ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret

GOOGLE_CLIENT_ID=your_google_client_id

STRIPE_SECRET_KEY=your_stripe_secret_key
PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173

STRIPE_CLIENT_PRICE_ID=your_stripe_client_price_id
STRIPE_FREELANCER_PRICE_ID=your_stripe_freelancer_price_id
```

Create a `.env` file in the `Frontend` directory (if required by your Vite setup):

```env
VITE_API_BASE_URL=http://localhost:3560
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

### Local Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dhyyan/WORKORA.git
   cd WORKORA
   ```

2. **Install Root & Sub-package Dependencies**:
   ```bash
   npm install
   cd Backend && npm install
   cd ../Frontend && npm install
   cd ..
   ```

3. **Run the Backend Server**:
   ```bash
   cd Backend
   npm run dev
   ```
   *Backend will run on http://localhost:3560*

4. **Run the Frontend App**:
   ```bash
   cd Frontend
   npm run dev
   ```
   *Frontend will run on http://localhost:5173*

---

### Docker Setup

You can run the entire Workora stack (MongoDB, Backend, Frontend) with a single command using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3560
- **MongoDB**: localhost:27017

---

## 🧹 Code Quality & Linting

Workora uses **Husky** and **Lint-Staged** to maintain strict code quality standards on every git commit.

- **Lint Backend**:
  ```bash
  cd Backend
  npm run lint
  ```

- **Lint Frontend**:
  ```bash
  cd Frontend
  npm run lint
  ```

---

<p center>
  Developed with ❤️ by <a href="https://github.com/dhyyan">Dhyan</a>
</p>
