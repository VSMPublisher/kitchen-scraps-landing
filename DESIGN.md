---
name: Kitchen Scraps
description: Turn your kitchen scraps into garden gold
colors:
  primary: "#2d4a22"
  neutral-bg: "#f4faeb"
  header: "#0d7a14"
  cta: "#e9b15d"
  cta-text: "#b27512"
  border: "#e2eada"
typography:
  display:
    fontFamily: "var(--font-montserrat), sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-inter), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  xl: "12px"
  xxl: "16px"
  xxxl: "24px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.header}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#38761d"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: "10px 24px"
---

# Design System: Kitchen Scraps

## 1. Overview

**Creative North Star: "The Composter's Field Guide"**

The Composter's Field Guide visual system is designed to look clean, highly readable, structured, and informative. It draws visual inspiration from traditional organic field guides, using deep forest greens and soft sprout whites as the foundation, contrasted with high-visibility leafy green and harvest gold action elements. The design prioritizes readability, typographic hierarchy, and clean grid layouts to establish immediate trust for our zero-permission Android application.

Key Characteristics:
- Earthy, natural tones contrasted with vibrant, accessible CTA actions.
- Tactile container cards with light borders (1px) and subtle depth.
- Clean typographic pairing of Montserrat (Display) and Inter (Sans-serif).
- Smooth responsive transitions and hover-lifts that provide micro-interactive feedback.

## 2. Colors

A structured palette of earthy tones and high-contrast action colors that mimic natural plant growth.

### Primary
- **Forest Ink** (#2D4A22): The main body text color and deep branding element. Used for high contrast against light backgrounds.

### Secondary
- **Vibrant Leaf Green** (#0D7A14): Primary brand accent. Used for interactive buttons, primary CTAs, and active headers.
- **Harvest Gold** (#E9B15D): Highlights conversion opportunities, badges, promo codes, and special interactive states.

### Neutral
- **Sprout White** (#F4FAEB): The primary background color. Provides a warm, natural backdrop that avoids clinical starkness.
- **Eco Border** (#E2EADA): Used for subtle structure, cards, and divider lines.

### Named Rules
**The Forest Contrast Rule.** Body text must always use Forest Ink against Sprout White or Eco Border to ensure contrast meets or exceeds 4.5:1. Never use muted grays for prose.

## 3. Typography

**Display Font:** Montserrat (with sans-serif fallbacks)
**Body Font:** Inter (with sans-serif fallbacks)

**Character:** Montserrat is bold, clean, and energetic, ideal for displays. Inter provides highly legible, standard body styling for optimal comprehension of quiz items and troubleshooting guides.

### Hierarchy
- **Display** (800, clamp(2.5rem, 5vw, 4rem), 1.1): Used for main page headers, section titles, and marketing callouts.
- **Headline** (700, 1.875rem, 1.25): Section headings and dialog titles.
- **Title** (600, 1.25rem, 1.3): Quiz question titles, card headings, and menu headers.
- **Body** (400, 1rem, 1.6): Paragraph text, quiz answer options, and description guides. Max line length capped at 75ch.
- **Label** (800, 0.75rem, uppercase): Badges, mini eyebrows, and small tags.

### Named Rules
**The Letter-Spacing Floor Rule.** Display H1s must never have a letter-spacing tighter than -0.04em, preventing cramped layout issues on mobile screens.

## 4. Elevation

The system is flat by default with tactile, organic depth. Depth is established through subtle 1px border frames and soft, micro-interactive lift transitions upon user focus or hover.

### Shadow Vocabulary
- **Premium Rest** (`box-shadow: 0 10px 30px -10px rgba(45, 74, 34, 0.12)`): Ambient, soft depth used for key section containers and inactive device mockups.
- **Premium Lift** (`box-shadow: 0 20px 40px -15px rgba(45, 74, 34, 0.18)`): Dynamic hover elevation that responds to cursor interaction.

### Named Rules
**The No-Ghost Rule.** Avoid pairing a 1px border with a soft, wide drop shadow (M >= 16px) on the same element at rest. Pick either a clean border or a subtle rest shadow, never both.

## 5. Components

### Buttons
- **Shape:** Rounded corners (12px / 16px).
- **Primary:** Background (#0D7A14), text (#FFFFFF), padding (12px 24px).
- **Secondary:** Transparent background, border (2px solid #2D4A22), text (#2D4A22), padding (10px 24px).
- **Hover / Focus:** Translates upward smoothly (-4px translateY) using a custom cubic-bezier (0.34, 1.56, 0.64, 1) and swaps background color to deep green (#38761D).

### Cards / Containers
- **Corner Style:** Rounded corners (16px / 24px).
- **Background:** Soft Eco Background (#E8F5E4) or Light Sprout (#E8F5E4 / opacity 40%).
- **Border:** Subtle 1px solid (#E2EADA).
- **Internal Padding:** Spaced between 16px and 48px depending on layout density.

### Navigation
- **Style:** Compact sticky header using Forest Ink text. Active states highlight with Leaf Green. Desktop uses right-aligned flex rows; mobile wraps to a menu tray.

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 4.5:1 contrast ratio for all descriptive text.
- **Do** wrap long headers with `text-wrap: balance` to prevent awkward line wraps.
- **Do** respect the user's `prefers-reduced-motion` settings by transitioning with a soft crossfade.

### Don't:
- **Don't** use border-left or border-right accent stripes on card containers.
- **Don't** apply gradient backgrounds or text clipping.
- **Don't** use amateurish hand-drawn/sketchy SVG doodles.
- **Don't** use card radii exceeding 24px.
