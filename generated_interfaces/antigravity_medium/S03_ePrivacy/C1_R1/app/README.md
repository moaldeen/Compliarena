# Android E-Commerce Onboarding Personalization Screen

A modern, high-fidelity mobile app screen built with **React and Vite**, designed for an Android e-commerce retail application. 

This screen is situated at the critical transition in the first-time user experience: **after** initial onboarding steps (welcome, language selection, and basic category preferences) and **before** entering the main shopping home page. It prepares the user to enter the shopping experience with full control and transparency over smart shopping features, data practices, and measurement signals.

---

## 🚀 Running Locally with npm

1. Extract the downloaded ZIP file into a folder of your choice.
2. In your terminal, navigate into the directory:
   ```bash
   cd retail-onboarding-screen
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Vite local development server:
   ```bash
   npm run dev
   ```
5. Open your browser at the URL shown in terminal (usually `http://localhost:3000` or `http://localhost:5173`).

---

## 📱 Architectural & Design Highlights

### 1. Fixed Mobile Device Frame Simulation
- Rendered inside an authentic Android hardware simulation complete with:
  - Central punch-hole front camera cutout.
  - Realistic status bar with live clock, 5G cellular signal, Wi-Fi status, and battery gauge.
  - Hardware power button simulation.
  - Android gesture navigation pill bar at the bottom.
  - Device finishes: Midnight Black, Titanium Gray, and Deep Violet.
  - Responsive scale controls (100%, 92%, 85%) to ensure comfortable viewing on any laptop or monitor.

### 2. Strict Zero-Overflow Layout
- The entire screen layout is meticulously proportioned to fit **100% inside the visible mobile screen box without any clipping, no overflow outside the frame, and zero cut-off content**.
- All interactive modules, preset selectors, preference cards, transparency notices, and CTA buttons are visible at a glance without vertical scrolling.

### 3. Comprehensive Functionality on Every Option
Every interactive component on screen has active functionality:
- **Interactive Preset Selector Pills**:
  - `Recommended`: Activates all personalization perks and partner rewards.
  - `Balanced`: Enables personalized deals and search analytics while disabling 3rd-party advertising tokens.
  - `Essential Only`: Restricts data practices to basic catalog browsing.
- **Three Core Preference Cards**:
  1. *Tailored Deals & Re-orders*: Toggles on-device caching of viewed items and search intent for flash sale notifications.
  2. *Smart Shopping Analytics*: Toggles interaction signal measurement to refine catalog search and cross-session cart sync.
  3. *Partner Rewards & Ad Signals*: Toggles sharing of Android Advertising ID (GAID) with audited partner networks.
- **Granular Info Buttons (`?`)**:
  - Every card features an info icon that opens an in-frame bottom sheet explaining the exact technologies used (e.g., Local Storage, Android Ad ID, interaction signals) with inline toggles.
- **3rd-Party Measurement Partner Transparency Drawer**:
  - Clicking `Partners (X) >` opens a detailed modal listing audited partners:
    - *Google Ads & Firebase* (Attribution & fraud prevention)
    - *Adjust Attribution SDK* (Campaign install attribution & launch signals)
    - *Meta Commerce Partner* (Abandoned cart retargeting)
    - *Criteo Brand Deals* (Sponsored catalog promotions)
  - Users can enable/disable individual partners or toggle all at once.
- **Primary CTA ("Enter Store") & Secondary CTA ("Continue with Essential Only")**:
  - Tapping transitions seamlessly to a simulated post-onboarding store home feed, demonstrating how the home experience adapts directly to the user's selected preferences.
  - Features an instant "Back to Setup Screen" button to allow testing multiple configurations.
- **Theme Switcher**:
  - Seamless Light mode and Dark mode toggles for the Android mobile UI.

---

## 🛠️ Tech Stack
- **Framework**: React 18 (Hooks, functional components)
- **Bundler & Dev Server**: Vite 5
- **Styling**: Pure CSS3 with CSS custom properties (variables), hardware-accelerated animations, and responsive flexbox layouts.
- **Icons**: Handcrafted, self-contained SVG icons (zero external icon dependency risk).
