# Workflow

## Execution Rule

Complete only the requested step. Do not continue into the next step unless explicitly asked. At the end of each step, report files changed, what was completed, how it was verified, and any blockers or assumptions.

## Step 1: Create The Reference Architecture

Create `ARCHITECTURE.md` before implementing the page.

Use the supplied inspection notes and screenshots to document:

- Page goal and experiment goal
- Exact section order
- Mobile-first layout rules
- Design tokens: colors, typography, spacing, radii, buttons
- Asset inventory and intended usage
- Exact copy inventory
- Quiz questions, choices, branching, progress, and result states
- CTA destinations and scroll/link behavior
- Interactive components
- Responsive rules
- QA checklist

Do not begin implementation until `ARCHITECTURE.md` exists and is internally consistent.

## Step 2: Scaffold The Static Project

Create the base static site structure:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `ARCHITECTURE.md`
- `WORKFLOW.md`

Set up:

- Mobile-first HTML structure
- Global CSS tokens
- Font definitions and fallbacks
- Shared section wrappers
- Shared buttons
- Shared image behavior
- Basic responsive breakpoints

Do not implement all page sections yet. This step should establish the foundation.

## Step 3: Implement Static Page Sections

Using `ARCHITECTURE.md`, implement the page sections in the documented order.

Build static HTML/CSS for:

- Header
- Hero
- Comparison section
- Dismissal statistics section
- Review strip
- System gap section
- Disease monitor section
- What We Test grid
- How It Works section
- Testimonials
- Pricing / What’s Included section
- Product carousel markup
- FAQ markup
- Final CTA
- Footer

At this stage, focus on faithful structure, copy, spacing, typography, colors, image crops, and mobile layout.

Do not implement quiz logic or interactive behavior yet.

## Step 4: Implement The Quiz Module

Build the quiz as a self-contained JavaScript module.

Include:

- Starting quiz state
- Progress bar
- Single-choice questions
- Multi-select question
- Required-answer behavior
- Branching interstitial screens
- Final result screen
- CTA scroll behavior
- State reset on page reload

The quiz should usthe exact questions, choices, interstitial copy, result copy, and CTA behavior from `ARCHITECTURE.md`.

Keep the quiz implementation isolated from unrelated page behavior.

## Step 5: Implement Interactive Components

Add the remaining interactions:

- FAQ accordion
- What We Test expandable cards
- Product carousel
- Review ticker
- Disease ticker
- CTA smooth scrolling
- External checkout links

Match the observed behavior from the reference page as closely as possible.

Keep each interaction modular and easy to adjust.

## Step 6: Visual QA And Responsive Polish

Compare the implementation against the supplied screenshots at approximately `390×844`.

Verify:

- Section order
- Text content
- Image crops
- Typography scale
- Spacing
- Colors
- Border radii
- Button sizes
- CTA behavior
- Quiz flow
- Accordion behavior
- Carousel behavior
- Expanded card behavior
- Horizontal overflow
- Mobile usability

Also sanity-check nearby mobile widths:

- `360×800`
- `390×844`
- `430×932`

Fix visual and behavi mismatches before moving on.

## Step 7: Final Review And Delivery

Perform a final pass against `ARCHITECTURE.md` and the screenshots.

Confirm:

- The quiz has been moved to the intended experiment location if required by the project brief
- All CTAs go to the correct destinations
- The page works as a static HTML/CSS/JS recreation
- No external form submission or user data collection is introduced
- Assets are organized clearly
- The code is understandable and maintainable
- Known limitations are documented

Update `ARCHITECTURE.md` or add a short `QA_NOTES.md` with:

- What was verified
- What differs from the original page, if anything
- Any assumptions made
- Any remaining follow-up items