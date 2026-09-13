---
name: Das Software Consultancy
description: A premium independent engineering partnership with clear commitments.
colors:
  agency-blue: "#064fe8"
  agency-ink: "#191a1c"
  agency-paper: "#f1f2f3"
  agency-muted: "#626367"
  white: "#fff"
  divider: "#d8d9dc"
  dark-body: "#b9bac0"
  blue-body: "#d8e4ff"
  input: "oklch(0.922 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  success-text: "#124438"
  success-surface: "#edf6f1"
  error-text: "#8c2424"
  error-surface: "#fff0ee"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(58px, 6.35vw, 96px)"
    fontWeight: 450
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 4vw, 58px)"
    fontWeight: 450
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  service-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(25px, 2.6vw, 38px)"
    fontWeight: 450
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    lineHeight: 1.6
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
rounded:
  panel: "28px"
  panel-mobile: "22px"
  section: "32px"
  section-mobile: "24px"
  pill: "999px"
  field: "0.625rem"
spacing:
  compact: "12px"
  standard: "24px"
  roomy: "32px"
  section-mobile: "64px"
components:
  button-dark:
    backgroundColor: "{colors.agency-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    typography: "{typography.action}"
    padding: "15px 24px"
  button-dark-hover:
    backgroundColor: "{colors.agency-blue}"
  button-outline:
    textColor: "{colors.agency-ink}"
    rounded: "{rounded.pill}"
    typography: "{typography.action}"
    padding: "11px 19px"
  founder-panel:
    backgroundColor: "{colors.agency-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "36px"
  input:
    textColor: "{colors.agency-ink}"
    rounded: "{rounded.field}"
    padding: "4px 10px"
---

# Design System: Das Software Consultancy

## Overview

**Creative North Star: "Considered engineering"**

A premium independent engineering partnership expressed through cobalt, charcoal, generous Manrope typography, and rounded compositions. The original chrome-and-blue sculpture brings material depth; clear service descriptions and concrete delivery commitments establish trust.

**Key Characteristics:**
- Large, lightly weighted type with compact headline tracking.
- Flat, spacious surfaces punctuated by cobalt and charcoal sections.
- Rounded panels, pill actions, circular SVG arrow controls, and fine list dividers.

## Colors

Cobalt is the single brand accent, supported by quiet neutral surfaces.

- **Primary — Cobalt:** actions, highlighted words, founder panel, footer, and focus feedback.
- **Neutral — Charcoal:** principal text, dark actions, and the process section.
- **Neutral — Light paper / White:** hero copy and surrounding page canvas.
- **Neutral — Muted gray / Divider:** supporting copy and horizontal separation.
- **Inverse text — Dark body / Blue body:** lighter supporting text on charcoal and cobalt respectively.
- **Functional — Input / Destructive:** field boundaries and validation feedback, inherited from the existing UI primitives.

**The Single Accent Rule.** Use cobalt for brand emphasis; preserve the neutral reading surfaces and contextual inverse text.

## Typography

Self-hosted variable Manrope serves headings, body text, navigation, and the wordmark. The display and headline tokens describe desktop; responsive overrides belong to Layout. Large headings use medium-light weight and tight tracking. Body copy uses normal tracking and comfortable leading; supporting text is generally 14–17px. Small navigation and factual labels use 11–14px without uppercase styling.

Headlines pair charcoal with cobalt or muted gray; inverse sections pair white with a softer contextual tone. Service names sit between body and section-heading scale. The footer invitation returns to display scale.

## Layout

The main container caps at 1440px with 40px desktop side gutters. At 1000px and below, gutters become 24px; at 760px and below, 16px. Desktop hero, founder, and FAQ compositions use two columns; process steps use three. Sections generally have 70–110px vertical breathing room on desktop and 48–64px on mobile.

At 760px, content stacks into one column, service descriptions sit beneath titles, and their arrow remains in the right column. Navigation remains visible as a second header row. Hero display type becomes `clamp(49px, 10.4vw, 78px)` and reaches 41px at 360px and below. At 1000px the hero uses `clamp(50px, 6.5vw, 65px)`. Large hero panels grow from a 670px minimum to 740px at 1600px; mobile panels use a 510px minimum.

Reading text stays bounded: introductory paragraphs approximately 340–440px; FAQ answers up to 65ch. Interior pages reuse the same container, typography, dividers, and generous reading space.

## Elevation & Depth

The marketing composition is flat: surface color, spacing, fine borders, and the sculpture provide depth. Panels do not use drop shadows. Existing form primitives use a soft focus ring as interaction feedback; this is not ambient elevation.

**The Material Depth Rule.** Keep surrounding layout surfaces flat so the sculptural image supplies the material contrast.

## Shapes

Large hero and founder panels use the panel radius; section-scale charcoal and cobalt surfaces use the section radius. Both tighten on mobile. Actions use pill silhouettes, and standalone arrow controls are circular. Service and FAQ rows remain open, separated by fine rules. Decorative artwork is clipped to its rounded panel.

## Components

- **Buttons:** dark filled hero action and outlined header action, with inline SVG arrows and generous horizontal gaps. Hover changes fill to cobalt or light paper respectively. Global links, buttons, and summaries receive a visible 2px outline with 6px offset. Existing UI buttons use a cobalt primary variant and inherit pill corners.
- **Navigation:** sticky white header, fine bottom border, wordmark at left, three visible links, outlined enquiry action. Link hover uses cobalt; mobile navigation wraps below the wordmark and action.
- **Service rows:** large title, supporting sentence, circular bordered arrow. Hover colors both title and arrow with cobalt. The complete row is a link.
- **Process:** numbered steps on charcoal with top dividers, white titles, lighter body copy, and small deliverable lines. Three columns become a vertical sequence on mobile.
- **Founder panel:** cobalt surface, oversized white statement, divider, circular initials, and a factual founder signoff. It uses the same panel geometry as the hero.
- **FAQ:** native `details` and `summary`, fine horizontal dividers, a plus SVG that rotates 45 degrees when open, and comfortably spaced answer text.
- **Fields:** transparent inputs with rounded corners and fine borders; minimum input height is 46px and textarea height 155px. Focus changes the border to cobalt with a 3px soft ring; invalid and disabled styles come from the existing UI primitives. Retain explicit labels and validation feedback.
- **Service details:** shared split introduction with a cobalt engagement panel, fit list, charcoal process, deliverables, and related services. All four service routes reuse one template.
- **Legal reading:** restrained heading, desktop sticky table of contents, bounded reading column, and inline contact links. Mobile contents flow above the document.
- **Form feedback:** green success surface and red error surface are semantic feedback only. Pending fields are disabled; failed submissions retain input. Success clears fields and draws a check.
- **Motion:** 150ms quick and 250ms standard transitions use a smooth ease-out. Arrows move slightly, navigation underlines grow, buttons compress on press, and FAQ text enters over 4px. The success check draws over 500ms with an 80ms delay. Section entrances use native Web Animations and Intersection Observer: a 1200ms headline and sculpture settle, 1000ms rises, and 800ms quiet fades on reading content. A separate gentle entrance curve, `cubic-bezier(0.25, 0.1, 0.25, 1)`, spreads movement through the duration rather than front-loading it like button feedback. Travel stays small: 12px for rises, 16px for the headline, and 1.5% scale for panels. List items stagger by 120ms, capped at 360ms. Entrances play once per route visit and release their styles on completion. Keyboard focus reveals its containing block immediately. Reduced-motion preference cancels pending and active entrances, removes CSS animation and transitions, and restores automatic scrolling. Content remains visible without JavaScript or animation API support.

## Do's and Don'ts

- **Do** use the same Manrope family and established responsive hierarchy.
- **Do** balance oversized headlines with generous whitespace and readable supporting text.
- **Do** preserve keyboard focus, visible navigation, native disclosure behavior, and reduced-motion support.
- **Do** establish trust through factual commitments and named responsibility.
- **Don't** invent client logos, testimonials, project results, or agency scale.
- **Don't** add drop shadows to the flat marketing panels.
- **Don't** promote one-off artwork annotations into a reusable heading or badge system.
