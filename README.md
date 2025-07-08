<p align="center">
  <img src="/public/logo.png" alt="Company Logo" width="500"/>
</p>

# **Car Dealer Theme Display Site**

Welcome to Car Dealers Display Site! We are a team of innovators, creators, and problem-solvers committed to crafting meaningful digital experiences. Our mission is to empower businesses and individuals by delivering high-quality, reliable, and scalable solutions that drive success in an ever-evolving digital landscape.

---

## **Table of Contents**

1. [Our Mission](#our-mission)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Folder Structure](#folder-structure)
6. [Contributors](#contributors)
7. [License](#license)

---

## **Our Mission**

At our core, we aim to bridge the gap between technology and creativity. Our goal is to provide transformative solutions that inspire trust and confidence in our clients, enabling them to achieve their objectives and reach new heights. With years of experience and a team of skilled professionals, we deliver tailored solutions that cater to your unique needs. From cutting-edge designs to robust development, we ensure every project is a masterpiece of excellence and innovation.

---

## **Features**

- **Seamless Experience:** Users can easily sign up, log in, and manage their purchased themes and subscriptions through a user-friendly dashboard with real-time plan and usage tracking.
- **Flexible Plans (Basic, Standard, Premium):** Choose from tiered plans offering different levels of theme access, AI features, payment options, and support.
- **User & Admin Dashboards:** Users can manage purchases, theme licenses, and customization, while admins oversee users, plans, payments, and platform analytics from a central control panel
- **Subscription Management:** View details of the current subscription plan (e.g., features, pricing, limits). Allow users to switch between subscription plans (e.g., Basic, Premium, Enterprise)
- **Billing and Invoices:** User can view and download past invoices and payment receipts. Update billing information (e.g., company name, address, tax ID).
- **Support and Help:** Provide a dedicated channel for billing-related queries. Allow users to raise tickets or chat with support for billing issues.
- **Security and Account Settings:** Update contact information, email, and password. Enable additional security for account access like 2-Factor Authentication.
- **Refund Request:** Provide a form or process for requesting refunds (if applicable).

---

## **Tech Stack**

- **Programing Languages:** Javascript, Next.js
- **Framework:** Flowbite, Tailwind Css, Redux Toolkit
- **Database:** MongoDB, Firebase
- **Payment Methods:** Stripe, Paypal
- **Authentication:** JSON Web Tokens (JWT), bcrypt

---

## **Installation**

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/sysfoc/car-dealer-demo.git
   cd car-dealer-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `root` directory.
   - Add the following variables:
     ```env
     BASE_URL=your-domain-name
     MONGODB_URI=your-mongodb-url
     DB_NAME=mongodb-database-name
     SALT_ROUNDS=salt-rounds-int
     JWT_SECRET_KEY=your-jwt-key
     NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
     STRIPE_SECRET_KEY=your-stripe-secret
     PAYPAL_SANDBOX_CLIENT_ID=your-paypal-client-id
     PAYPAL_SANDBOX_CLIENT_SECRET=your-paypal-secret
     ```

4. Start the application:
   ```bash
   # Start the project
   npm run dev
   ```

---

## **Folder Structure**

```plaintext
car-dealer-demo/
├── .vscode/
├── app/
│   ├── page.jsx
│   └── (other routes)
├── components/
│   └── ui/
├── lib/
├── public/
│   └── (static assets)
├── middleware.ts
├── .env.local
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── .gitignore
├── .prettierrc
├── components.json
├── README.md
```

---

## **Contributors**

- **Sysfoc:** (https://github.com/sysfoc)
- **Hamza Ilyas:** (https://github.com/Hamza-fullstackdev)

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
