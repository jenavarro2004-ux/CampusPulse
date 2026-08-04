# CampusPulse — Product Brand Guidelines & UI Design System
**Institutional Brand Base:** Central Philippines State University (CPSU) Green & Academic Gold  
**Target Architecture:** School-Based / Institutional Management & Engagement System  
**Tech Stack:** Laravel 13, React 19, Inertia.js, TypeScript, PostgreSQL, Tailwind CSS  

---

## 1. Design Philosophy & Vision

CampusPulse is an official higher-education administrative and student organization management platform built around CPSU's institutional identity. The UI/UX prioritizes **authoritative clarity, structural hierarchy, high contrast, and accessibility** over generic consumer SaaS trends or dark-mode aesthetics.

### Core Principles
* **Institutional & Trustworthy:** Dense, well-organized administrative layouts with clear tabulations, breadcrumbs, and explicit status indicators.
* **Scannable & High-Contrast:** Built on light surfaces (`#F8FAF9`) to remain crisp and readable on mobile devices outdoors (e.g., student officers scanning dynamic QR codes during campus activities).
* **Role-Adaptive Identity:** Navigation and accent indicators visually reflect the active user's role across the RBAC matrix (Admin, OSSA, Council, Officer, Student) while staying anchored in CPSU Green and Gold.

---

## 2. CPSU Color Palette & Theme Tokens

### Institutional Palette
* **CPSU Green (`#006B3F`):** Main institutional brand color, headers, top navigation, primary actions.
* **Academic Gold (`#F4C430`):** Success badges, recognition, highlight states, dynamic accents.
* **Deep Forest Green (`#004D2C`):** High-authority admin elements, main sidebar backgrounds, primary text contrast on light areas.
* **Snow White (`#F8FAF9`):** Primary application backdrop.

### Tailwind CSS Extension Config (`tailwind.config.js` or CSS Theme Variables)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // CPSU Institutional Palette
        cpsu: {
          primary: '#006B3F',     // Main Institutional Green
          'primary-dark': '#004D2C', // Deep Forest Green (Sidebar / Admin)
          'primary-light': '#2E8B57',// Sea Green
          gold: '#F4C430',        // Academic Gold
          'gold-dark': '#C99700',   // Muted Gold
          'gold-light': '#FFE58A',  // Light Gold Tint
          surface: '#F8FAF9',     // Snow White App Background
          card: '#FFFFFF',        // Pure White Card Surface
          text: '#1F2937',        // Charcoal Primary Text
          muted: '#6B7280',       // Gray Subtext
          border: '#E5E7EB',      // Light Gray Borders
        },
        // Role-Based Color Identity (RBAC Matrix)
        role: {
          admin: '#004D2C',       // CPSU Dark Green (System / High Authority)
          ossa: '#7C3AED',        // Governance Purple (OSSA Administration)
          council: '#2563EB',     // Student Government Blue (Student Council)
          officer: '#0D9488',     // Club Executive Teal (Club Presidents)
          student: '#10B981',     // Community Emerald Green (General Student)
        }
      }
    }
  }
}