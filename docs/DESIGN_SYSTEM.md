# Design System Strategy: Plug Sustentável
 
## 1. Overview & Creative North Star: "The Architectural Greenhouse"
The design system for Plug Sustentável is rooted in a philosophy we call **The Architectural Greenhouse**. It is a visual manifesto that balances the structural rigidity of engineering with the organic fluidity of sustainable life. 
 
To escape the "template" look common in solar energy sites, this system rejects the flat grid. We utilize **Intentional Asymmetry**—where large-scale typography and imagery bleed off-canvas—and **Tonal Layering** to create a sense of physical space. The goal is to make the user feel they are moving through a high-end, eco-conscious architectural pavilion rather than a digital interface.
 
---
 
## 2. Color Palette & Atmospheric Depth
Our palette is a dialogue between deep forest tones and warm, sun-bleached neutrals. 
 
*   **Primary (#1e2c1e / #344233):** Used for structural grounding. It represents the "Verde Colegial" authority.
*   **Secondary (#236c1c / #6db85e):** The "Pitão Verde." Used sparingly for "growth" moments, CTAs, and energy indicators.
*   **Surface Foundation (#fbfaee / #e5e4d9):** The "Manteiga de Carité." This is our primary canvas, offering a warmer, more human alternative to sterile white.
 
### The "No-Line" Rule
To maintain an elegant, premium feel, **1px solid borders are strictly prohibited** for sectioning. Boundaries must be defined by:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
2.  **Negative Space:** Using the spacing scale to create invisible boundaries.
3.  **The "Ghost Border":** If a container requires definition for accessibility, use `outline-variant` at **15% opacity**.
 
### Glass & Gradient Soul
For hero sections and primary CTAs, use a subtle linear gradient from `primary` to `primary_container`. For floating navigation or modal overlays, apply **Glassmorphism**: 
*   `surface` color at 70% opacity.
*   `backdrop-blur: 20px`.
This allows the "Architectural Greenhouse" background imagery to bleed through, softening the interface.
 
---
 
## 3. Typography: The Editorial Voice
We contrast the heavy, grounded nature of **Rokkit** (Titles) with the clean, rhythmic clarity of **Manrope** (Body).
 
*   **Display (Newsreader - Substitution for editorial flair):** Used for high-impact sustainable manifestos. It adds a "Modernist Magazine" feel.
*   **Headline (Newsreader/Rokkit):** Bold and authoritative. Always use a tight letter-spacing (-2%) for headlines to evoke professional engineering precision.
*   **Body (Manrope):** The workhorse. `body-lg` (1rem) is the standard for readability, ensuring the "welcoming" aspect of the brand personality is met through legible, airy text blocks.
 
---
 
## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-heavy" for a firm focused on architecture. Instead, we use **Tonal Stacking**.
 
*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a natural "lift" based on color value rather than artificial shadows.
*   **Ambient Shadows:** If a card must float (e.g., a pricing calculator or solar lead form), use an extra-diffused shadow:
    *   `box-shadow: 0 20px 40px rgba(52, 66, 51, 0.06);` (Tinted with our Primary Green).
*   **The Symbol as Texture:** The recurring logo symbol (assets/simbolo-verde.png) should be used as a large-scale, low-opacity (4%) watermark in the background of `surface_container` sections to reinforce brand heritage without clutter.
 
---
 
## 5. Component Logic
 
### Buttons (The "Actuation" Points)
*   **Primary:** `primary` background with `on_primary` text. Use `xl` (0.75rem) roundedness. No border.
*   **Secondary:** `surface_variant` background with `on_surface_variant` text.
*   **Interaction:** On hover, primary buttons should shift to `secondary` (the brighter green), symbolizing "energy activation."
 
### Cards & Information Architecture
*   **Rule:** No dividers. Separate content using `title-md` headers and `surface_container_high` backgrounds. 
*   **Image Integration:** Architecture imagery should always have a `md` (0.375rem) corner radius to feel "constructed" yet soft.
 
### Input Fields
*   **State:** Default inputs use the `surface_container_highest` background.
*   **Focus:** Instead of a heavy border, use a 2px `secondary` bottom-bar highlight to signify the "active current."
 
### Sustainable Progress Indicators
Custom component for solar projects: Use a thick, 8px stroke weight for progress bars using `secondary_fixed` for the track and `secondary` for the fill, mimicking heavy-duty electrical conduits.
 
---
 
## 6. Do's and Don'ts
 
### Do:
*   **Do** embrace asymmetry. Align text to the left while keeping imagery off-center to the right.
*   **Do** use `surface_dim` for footer backgrounds to create a "grounded" architectural foundation.
*   **Do** use the logo symbol as a mask for architectural photography in "About Us" sections.
 
### Don't:
*   **Don't** use 100% black (#000000). Use `tertiary` (#333333) or `primary` (#1e2c1e) to keep the palette sophisticated.
*   **Don't** use standard shadows. If it looks like a generic SaaS app, it has failed the "Engineering & Architecture" test.
*   **Don't** crowd the layout. If in doubt, add 32px of extra vertical whitespace between sections to let the design "breathe" like an open-plan building.
 
---
**Director's Closing Note:** This design system is not a set of constraints, but a toolkit for building digital environments. Every pixel should feel as intentional as a structural beam and as warm as a sunlit atrium.
