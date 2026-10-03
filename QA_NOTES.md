# QA Notes

## What Was Verified

- The page is a static HTML/CSS/JavaScript prototype.
- The variant page order matches the experiment brief:
  - Header
  - Hero
  - Comparison
  - Dismissal statistics
  - Review strip
  - System gap
  - Disease monitor
  - What We Test
  - How It Works
  - Testimonials
  - What’s Included
  - Treatment options
  - Quiz
  - FAQ
  - Final CTA
  - Footer
- The quiz appears after the Personalized Care/product carousel section and before FAQ.
- The quiz no longer appears immediately after the hero.
- The quiz completes through the documented main path.
- Q2 prevents advancement without an answer.
- Q2 supports multi-select behavior.
- The “None of these” behavior is implemented to clear other selections and skip Interstitial 2.
- FAQ accordion behavior works with one open answer at a time.
- What We Test cards open a centered overlay and close correctly.
- Testimonial carousel controls and dots work.
- Treatment carousel controls and dots work.
- Review and disease ticker animations are present.
- In-page CTA links smooth-scroll to their anchor targets.
- External checkout links remain ordinary links.
- The newsletter form is prevented from submitting so the prototype does not collect user data.
- The page was checked at:
  - `360×800`
  - `390×844`
  - `430×932`
- No horizontal scrollbar appeared at the tested mobile widths.
- JavaScript syntax passes with `node --check script.js`.

## What Differs From The Original Hone Page

- The quiz is intentionally moved from immediately after the hero to after the Personalized Care/product carousel section and before FAQ.
- Because the quiz is relocated, the hero CTA still scrolls to `#quiz`, but that now moves the visitor later in the page.
- The implementation is a static recreation, not a production clone.
- Checkout, account creation, payment, analytics, Hone APIs, and backend behavior are not recreated.
- Newsletter submission is intentionally disabled.
- Some visual details are approximated rather than pixel-perfect.
- The prototype uses remote Hone image URLs rather than copied local image files.
- The supplied screenshots show the original quiz position; the prototype follows the experiment variant position from `PROJECT.md` and `ARCHITECTURE.md`.

## Assumptions Made

- The external checkout URL remains `https://deart.honehealth.com/product/metis/labtest_w_opt_6`, based on the supplied architecture notes.
- The provided copy was preserved, including typos or clipped wording from the inspection notes.
- All Q3 answer choices route to Interstitial 3 because only one Q3 path was explicitly verified.
- All Q4 answer choices route to the final result because only one Q4 path was explicitly verified.
- Arrow and dot carousel controls are sufficient for the prototype; touch-swipe parity was not required.
- Remote Google Fonts are acceptable for matching the documented typography.

## Remaining Follow-Up Items

- Confirm the exact external checkout URL before final submission.
- Add deployed Vercel URL, GitHub source URL, and supplementary notes link to the final submission document.
- If desired, copy remote image assets into `assets/` for a fully self-contained repository.
- If desired, compare the final prototype visually against screenshots in a browser recording before submission.

## Known Limitations

- The page is not production-ready engineering.
- The prototype does not include analytics instrumentation.
- The prototype does not include backend, checkout, account creation, payment, or Hone API integrations.
- The biomarker expanded-card visuals are based on inspection notes rather than dedicated expanded-card screenshots.
- FAQ open-state spacing is based on documented behavior and copy rather than open-state screenshots.
- Carousel touch-swipe behavior was not verified against the production page.
- The production page height is only a reference; the variant height differs because the quiz is moved lower in the funnel.
