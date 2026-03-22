# 🔥 BurgerRush – Fast Food Restaurant Landing Page

**A production-ready, high-end fast food restaurant website built with pure HTML, CSS & JavaScript.**  
Designed to feel like a real commercial brand — not an AI template.

---

## 🌐 Live Preview

Open `index.html` directly in your browser — no server needed.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌗 Dark / Light Mode | Smooth toggle, proper color system, persists via `localStorage` |
| 🌍 Bilingual (EN / AR) | Full English ↔ Arabic switch, correct RTL layout for Arabic |
| 📱 Responsive Design | Mobile-first, tablet-optimized, desktop-polished |
| 🍔 Menu Filter | Filter by All / Burgers / Sides / Combos / Drinks |
| 🛒 Shopping Cart | Full panel with quantity controls, total calculation, and persistent storage |
| 📧 Order System | AJAX-based order submission via FormSubmit.co integration |
| 🎞️ Scroll Animations | Intersection Observer-powered fade-in effects |
| ♿ Accessibility | ARIA labels, `focus-visible` styles, reduced-motion support |

---

## 📄 Required Sections

1. **Hero** – Cinematic full-screen food image, headline, Order Now + View Menu CTAs, quick stats  
2. **Menu** – 12 items (burgers, sides, combos, drinks) with filter tabs and hover effects  
3. **About** – Brand story with floating stat card  
4. **Why Choose Us** – 4 differentiator cards with icon micro-animations  
5. **Customer Reviews** – 4 realistic testimonials, featured card highlight  
6. **Location** – Text-based: Working hours table, delivery info, and direct contact (phone/email)
7. **Footer** – Social links, quick nav, menu highlights, copyright  

> ⚠️ **No map embed** — replaced with a clean text-based location block as required.  
> ⚠️ **No WhatsApp floating icon** or any other floating buttons.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | CSS3 – Custom Properties, Flexbox, Grid |
| Logic | Vanilla JavaScript (ES6+, IIFE) |
| Backend | FormSubmit.co (AJAX Order Processing) |
| Fonts | Google Fonts – Outfit (EN) + Cairo (AR) |
| Images | AI-generated premium food photography |

**No frameworks. No dependencies. No build step.**

---

## 🎨 UI/UX Decisions

### Color System
- **Accent**: `#FF4500` (OrangeRed) – bold, energetic, appetite-stimulating
- **Dark mode**: True black `#0D0D0D` bg with layered card surfaces `#141414`
- **Light mode**: Warm off-white `#FAFAF8` for a print-magazine feel — not blindingly white
- Both modes have independent shadow, border, and glow values — not simply inverted

### Typography
- **English**: Outfit – geometric, modern, high x-height, excellent legibility
- **Arabic**: Cairo – designed specifically for Arabic web, harmonizes with Latin fonts
- Font is swapped automatically per language via CSS `var(--font)`

### Component Design
- Cards use a **border + background token system** — no fixed colors, everything inherits theme
- **Why cards** have a top-border accent line that sweeps from left to right on hover (RTL-aware)
- **Menu cards** have a subtle image zoom + card lift on hover
- **Hero image** has a slow Ken Burns effect on hover

---

## 🌍 Language System

Toggle in the navbar switches between English and Arabic:
- All `[data-en]` / `[data-ar]` attributes across every element are swapped by JS
- `html[lang]`, `html[dir]`, and `html[data-lang]` all update together
- CSS handles font swap and RTL layout automatically via `[data-lang="ar"]` selectors
- RTL flexbox directions, text alignment, and icon positions are fully corrected
- Language preference saved in `localStorage`

---

## 🌗 Dark / Light Mode

- Toggle button in navbar (☀️ → 🌙)
- `data-theme` attribute on `<html>` drives all colors via CSS custom properties
- Smooth `0.4s` transition on background and color so it doesn't jarr
- Theme preference saved in `localStorage`
- Does **not** simply invert — each mode has a curated token set

---

## 📱 Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Full desktop layout, all columns visible |
| `768–1024px` | Footer 2-column, about section stacks if needed |
| `< 768px` | Hamburger menu, all grids go 1-column, hero centers |
| `< 480px` | Font scales down, floating stat becomes inline |

---

## 📁 File Structure

```
burgerrush/
├── index.html          # Full HTML structure (7 sections)
├── styles.css          # Design system + all component styles
├── script.js           # All JS interactivity
├── hero_burger.png     # Hero background food image
├── menu_burger.png     # Menu card – Double Smash Burger
├── menu_fries.png      # Menu card – Crispy Fries
├── menu_chicken.png    # Menu card – Crispy Chicken Sandwich
├── menu_combo.png      # Menu card – Combo Meal / Family Feast
├── menu_drink.png      # Menu card – Drinks & Shakes
└── README.md           # This file
```

---

## 🚀 How to Run Locally

```bash
# Option 1: Open directly (works for static HTML)
open index.html        # macOS
start index.html       # Windows

# Option 2: Use a local server (recommended for full feature support)
npx serve .
# or
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## 🔧 Customization

### Change Brand Name
Search and replace `BurgerRush` / `برغر راش` in `index.html`.

### Change Contact Info
Update the phone number and email address in the `contact` section of `index.html` and the FormSubmit endpoint in `script.js`.

### Change Colors
Edit `--accent`, `--accent-light`, `--accent-dark` in `:root` inside `styles.css`.

### Add Menu Items
Copy any `.menu-card` block in `index.html`, set the `data-category` attribute, and update all `data-en` / `data-ar` text attributes.

### Add a Language
Extend the `applyLanguage()` function in `script.js` and add corresponding `data-xx` attributes in the HTML.

---

## 🏆 Design Improvements Beyond Requirements

- **Hero stats bar** — quick social proof (50K+ orders, 4.9★, ≤30 min) visible above the fold
- **Scroll-reveal animations** — Intersection Observer gives a premium editorial feel
- **Menu filter** — category tabs with animated card filtering improve usability
- **Toast feedback** — instant visual confirmation when "Add +" is clicked
- **Floating stat card** — "9+ Years" overlapping the about image creates depth and energy
- **Featured review** — center review highlighted with accent border to draw the eye

---

*© 2026 BurgerRush. Built for portfolio & real deployment.*
