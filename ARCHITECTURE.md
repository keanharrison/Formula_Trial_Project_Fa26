# Architecture

## Goal

Build a mobile-first HTML recreation of the Hone women’s clinical landing page with one primary experimental change: move the interactive quiz from immediately after the hero to after the Personalized Care/product carousel section and before FAQ.

This document is the implementation reference for the prototype. It is derived from ChatGPT's research using the Web Inspector tool and the screen control feature.

No website content or project files were changed during research; no personal information was entered.

The most consequential findings: **the hero image comes first on mobile; the quiz has branching educational screens; and the CTAs do not all lead to the same place.**

For your eventual quiz-relocation experiment, preserve these destinations. Moving every CTA to the quiz would introduce an additional behavioral change.

Plain HTML/CSS/JS is sufficient: use semantic sections, a small quiz state machine, a biomarker overlay, a single-open FAQ, two carousels, and CSS marquee animations. Preserve the original image assets, font families, anchor IDs, copy, and differing CTA destinations.

The remaining unverified details are the exact quiz transition delay, every possible Question 3/4 answer path, touch-swipe behavior, newsletter submission, and checkout steps beyond its initial cart.hese should not be presented as confirmed behavior in the recreation.

## Source Reference

Inspected the [Hone women’s clinical landing page](https://buy.honehealth.com/womens-opt/clinical/) at **390×844**, including its quiz, expandable cards, FAQ, carousels, and checkout destination.

The initial page was approximately **12,751px tall** in the inspection browser. Treat this as a reference, not a fixed height: quiz states, font rendering, and loaded content change it.

For further style reference, the page loads its [page-specific CSS](https://buy.honehealth.com/wp-content/themes/HoneLandingPages/static/css/pages/womens-opt-clinical.css?ver=7.1.2) alongside [shared CSS](https://buy.honehealth.com/wp-content/themes/HoneLandingPages/static/css/main.min.css?ver=1790371926).

The external deart.honehealth.com/product/metis/labtest_w_opt_6), opening in the same tab. I verified that its initial screen shows a **$65 cart**, reduced from $165, with the biomarker test, consultation, treatment plan, and a “Continue” button. I did not continue into personal-information or payment steps.

### Screenshots Reviewed

The local screenshot set in `images/` contains 16 mobile captures, all reviewed during Step 1:

| Screenshot | Primary reference content |
|---|---|
| `images/image_1.png` | Header, hero image, hero copy, hero CTA, start of quiz |
| `images/image_2.png` | Quiz question state, answer cards, transition into comparison section |
| `images/image_3.png` | Comparison intro continuation and two-column comparison table |
| `images/image_4.png` | Comparison CTA and dismissal statistics section |
| `images/image_5.png` | Dismissal CTA, Trustpilot strip, review ticker, gap section image |
| `images/image_6.png` | Gap section centered copy |
| `images/image_7.png` | Gap CTA, disease monitor panel, start of What We Test |
| `images/image_8.png` | What We Test two-column biomarker grid |
| `images/image_9.png` | How It Works heading, first image, first step, second image |
| `images/image_10.png` | How It Works second and third steps, testimonials intro |
| `images/image_11.png` | Testimonials carousel, arrows, dots |
| `images/image_12.png` | What’s Included pricing and checkout section |
| `images/image_13.png` | Trustpilot widget and treatment carousel first slide |
| `images/image_14.png` | Treatment carousel controls, FAQ heading, FAQ closed state |
| `images/image_15.png` | Final dark CTA and footer start |
| `images/image_16.png` | Footer newsletter, disclosures, citation, copyright, legal links |

## Page Order

| # | Section | Mobile layout |
|---|---|---|
| 1 | Hone header | Centered black logo, white background, thin bottom border; approximately 58px tall; not sticky |
| 2 | Hero | Image → headline → supporting copy → yellow CTA |
| 3 | “What’s your doctor missing?” quiz | Beige background, progress bar, one question/interstitial at a time |
| 4 | Traditional healthcare comparison | Centered introduction; two-column comparison table; yellow Hone column; CTA |
| 5 | Dismissal statistics and explanation | Beige background statistics with yellow highlights; left-aligned copy |
| 6 | Trustpilot/review strip | Rating strip and horizontally moving quotes |
| 7 | “The gap was never you…” | Image first, then centered explanatory copy and CTA |
| 8 | Disease monitoring | Rounded pale panel, heading, three benefits, chart, two moving rows of condition names |
| 9 | “What We Test” | Eight image tiles in a two-column grid; expandable overlay cards |
| 10 | “Stop guessing. Start knowing.” | Three stacked image-and-copy steps |
| 11 | “Finally heard” testimonials | Beige background; horizontally sliding review cards, arrows, nine dots |
| 12 | “What’s Included” | Promotional image, three included items, discount/shipping/total, checkout CTA, Trustpilot |
| 13 | Treatment options | Six-slide product carousel, arrows and dots |
| 14 | FAQ | Six accordion questions |
| 15 | Final CTA | Dark navy background; centered copy, yellow CTA, Trustpilot |
| 16 | Footer | Black background; logo, certification marks, newsletegal links |

For the variant build, the quiz should be moved from position 3 to after the Personalized Care/product carousel section and before FAQ.

Variant page order:

| # | Section |
|---|---|
| 1 | Hone header |
| 2 | Hero |
| 3 | Traditional healthcare comparison |
| 4 | Dismissal statistics and explanation |
| 5 | Trustpilot/review strip |
| 6 | “The gap was never you…” |
| 7 | Disease monitoring |
| 8 | “What We Test” |
| 9 | “Stop guessing. Start knowing.” |
| 10 | “Finally heard” testimonials |
| 11 | “What’s Included” |
| 12 | Treatment options |
| 13 | “What’s your doctor missing?” quiz |
| 14 | FAQ |
| 15 | Final CTA |
| 16 | Footer |

## Design Tokens

Exact color tokens:

```css
--hone-dark: #0E0B20;
--hone-text-mid: #605B52;
--hone-vital-yellow: #F8F93F;
--hone-cta-hover: #E9D225;
--hone-warm-beige: #D2CEC4;
--hone-page-bg: #F7F6F5;
--hone-off-white: #F1F0EF;
--hone-r-white: #FAFAFA;
--hone-white: #FFFFFF;
--hone-border: #E5E4E2;
--hone-border-subtle: rgba(96, 91, 82, 0.15);
--hone-trust-green: #20C475;
```

The footer is `#000000`; the final CTA section is `#0E0B20`. Selected quiz answers use `#F1F0EF` with a dark border.

## Typography

| Element | Observed styling |
|---|---|
| Main heading | **STIX Two Text**, 32px, weight 400, 38.4px line-height, −0.64px letter-spacing |
| Standard section heading | STIX Two Text, 28px/36.4px, weight 400, −0.56px tracking |
| “What We Test” heading | STIX Two Text, 34px/35.7px, weight 500 |
| Body | **DM Sans**, generally 16px/24px |
| Hero supporting text | DM Sans, 18px/28.8px |
| Eyebrows | **Azeret Mono**, uppercase, 11px/16.5px, 1.32px tracking |
| Quiz questions | STIX Two Text, 22px/28.6px, weight 400, −0.44px tracking |
| Quiz answers | DM Sans, 16px/24px |
| Interstitial body | DM Sans, 14px/21px |
| Primary buttons | DM Sans, 16px/24px, weight 500; 2px radius; thin dark translucent border |

## Assets

All paths below are relative to this observed asset base:

```text
https://buy.honehealth.com/wp-content/themes/HoneLandingPages/static/media/images/
```

| Use | Relative asset path |
|---|---|
| Header logo | `logo-full.png` |
| Hero, 1440×1080 source | `hero-wopt-graduation.webp` |
| Quiz interstitial 1 | `womens-opt-clinical/biomarker-q80.webp` |
| Quiz interstitial 2 | `womens-opt-clinical/dr-consult-q80.webp` |
| Quiz interstitial 3 | `womens-opt-clinical/treatment-q80.webp` |
| Gap section | `womens-opt-clinical/labs-1x1-q80.webp` |
| Disease chart | `opt-longevity/tracking.webp` |
| Green check | `icons/check-green.svg` |
| How-it-works image 1 | `woman-on-chair-w-words-in-background_943x572.webp` |
| How-it-works image 2 | `doctor-on-phone-w-chart-in-fg-50_943x572.webp` |
| How-it-works image 3 | `images/step_2_image.png` local replacement for the broken/missing third-step image |
| Review stars | `icons/rating-stars.webp` |
| Pricing promotional image | `woman-holding-product-w-text--mb.webp` |
| Test thumbnail | `included-1.webp` |
| Consultation thumbnail | `included-5.webp` |
| Plan thumbnail | `included-4.webp` |
| Discount icon | `icons/price-tag.webp` |
| Menopause product | `personalized-care-menopause.webp` |
| Weight product | `personalized-care-weight-loss.webp` |
| Thyroid product | `personalized-care-thyroid.webp` |
| Longevity product | `personalized-care-longevity.webp` |
| Sexual-function product | `personalized-care-sexual-function.webp` |
| Appearance product | `personalized-care-appearance.webp` |
| HIPAA mark | `hipaa-compliance.png` |

The eight biomarker backgrounds are:

```text
what-we-test/wwt1-hormones.webp
what-we-test/wwt1-weight-loss.webp
what-we-test/wwt1-longevity.webp
what-we-test/wwt1-vitality.webp
what-we-test/wwt1-sexual-health.webp
what-we-test/wwt1-cardiac-risk.webp
what-we-test/wwt1-strength.webp
what-we-test/wwt1-brain-health.webp
```

The external certification image is [LegitScript’s seal](https://static.legitscript.com/seals/10842626.png). Some logos/icons are inline SVG, so the image list alone does not capture every graphic.

## Copy Inventory

### Hero

> Finally, a doctor who listens.
>
> We test 50+ hormone markers to uncover the real answers your doctor never looked for.

CTA: **Get the Answers You Deserve**

### Comparison

Eyebrow: **THE TRADITIONAL HEALTHCARE MYTH**

> What your doctor's office looks like vs. what it should.
>
> The traditional healthcare system was designed for efficiency, not for you. Annual physicals check the basics. Insurance dictates what gets tested. And if your symptoms don't fit a standard checklist, you leave with a pamphlet and a "come back in six months." Hone is built differently.

| Hone | Traditional Care |
|---|---|
| Comprehensive biomarker testing — 50+ markers | 12-minute annual phycal |
| From test to treat in less than 10 days | Months on a waitlist |
| We test everything that matters | Insurance decides what gets tested |
| Proactive care with a personalized treatment plan | Told to "come back if it gets worse" |
| A plan built for your body, your symptoms, your goals | One-size-fits-all advice |
| Board-certified hormone specialists, on demand | Referral required to see a specialist |
| Your labs and how you feel both matter here | "Your labs look normal" |

CTA: **Get Started Now**

### Dismissal Section

Statistics:

- **4 IN 10 women** — feel dismissed by their doctors when discussing hormone symptoms.
- **80% of women** — don't know their hormones are off — because no one tested them.
- **1 IN 3 women** — deal with fatigue, weight gain, or mood swings from hormone imbalances that go undiagnosed.

> "Your results look fine." But you knew something was wrong.
>
> If you've heard any of these, you weren't being oversensitive. You were being dismissed.
>
> Women are signifmore likely than men to have their symptoms minimized, misattributed, or ignored by their doctors. And when the symptoms are hormonal — fatigue, brain fog, weight gain, low libido, mood swings — they're almost always blamed on lifestyle, anxiety, or age.
>
> Your body was telling you something real. It deserved a real answer.

CTA: **Get the Answers You Deserve**

### Review Strip

Static rating copy: **Excellent** / **10,000+ reviews on Trustpilot**

Moving quotes:

- “Finally a doctor that believes me!” — Soraya Farmer, Hone Member
- “Finally an MD who goes beyond the basics” — Lorrie, Hone Member
- “This was by far the absolute BEST 45 mins of conversation I've had about my health in 8 years.” — Mrs. S Thomas, Hone Member

The quote track uses a **40-second** animation.

### Gap Section

Eyebrow: **THE GAP WAS NEVER YOU. IT WAS THE SYSTEM.**

> Two things fail women in traditional healthcare simultaneously.
>
> What gets tested, and who gets to decide. Standard panels miss the markefree testosterone, estradiol, progesterone, and comprehensive thyroid function. And even when a woman pushes for more, insurance gatekeeping, referral loops, and 12-minute appointments make it nearly impossible to get a full picture.
>
> Hone closes both gaps.
>
> We test 50+ biomarkers — including the hormonal, metabolic, and thyroid markers most standard physicals skip. No insurance approval needed. No referral required. Just a board-certified hormone specialist, your full results, and a treatment plan built around what your body actually needs.
>
> FSA/HSA eligible. Because your health shouldn't cost more just because insurance won't cover it.

CTA: **Get Started Now**

### Disease Monitoring

> Monitor for early indicators of thousands of diseases.

Benefits:

- Establish your biomarker baselines
- Monitor Body Changes
- Physician-led care

The two condition rows move in opposite directions, with observed **114-second** animation durations.

Row 1: Low testosterone; Hormone Imbalance; Brain Fog; Low Ergy; Hot Flashes; Inflammation; Impaired Cognition; Leukocytosis; Night Sweats; Shortness of Breath; Unexplained Weight Loss; Leukopenia; Anemia; Vitamin deficiency; Thrombocytopenia; Thrombocytosis; Hyperglycemia; Hypoglycemia; Kidney Disease.

Row 2: Adrenal Disorders; Estrogen Dominance; Menopause; Perimenopause; Hypogonadism; PCOS; Hashimoto's; Hypothyroidism; Pancreatitis; Non Alcoholic Fatty Liver Disease; Type 2 Diabetes; Metabolic Syndrome; Coronary Artery Disease; Cardiovascular Disease; Liver Disease; Electrolyte Imbalance; High Blood Pressure; Hypertensive Nephrosclerosis; Diabetic Nephropathy.

### What We Test

> Every 3 months, we test 50+ biomarkers that reflect how your body is functioning—and where there's room to optimize.

Each card has its title, a plus control, explanatory copy, **BIOMARKERS TESTED**, a count, and moving biomarker labels.

| Card | Count | Exact explanatory copy |
|---|---:|---|
| Hormones | 6 | Your hormones are your body's messengers, controlling everything from mooand metabolism to sleep and sex drive. In women, hormone levels start to decline in their 30s — testosterone first, followed by progesterone and estrogen in their 40s and 50s. |
| Weight Loss | 15 | Maintaining a healthy weight isn't about aesthetics—it's about longevity. Body fat is one of the strongest predictors of chronic disease risk and quality of life. |
| Longevity | 3 | Aging is driven by 12 biological hallmarks, from cellular damage to hormonal decline. We test the markers tied to those processes so you can age on your terms. |
| Vitality | 14 | Vitality is cellular energy in action. As it declines, so does your energy, motivation, and mental clarity. Hone targets the root causes to help you feel vibrant again. |
| Sexual Health | 9 | Sexual wellness is a key indicator of overall health, and a major contributor to mental, emotional, and cardiovascular well-being. |
| Cardiac Risk | 11 | Heart attack and stroke remain the top causes of early death. The good news? You can detect and manage your  decades in advance. |
| Strength | 9 | Muscle mass is a better predictor of life expectancy than BMI. Even small declines in strength are tied to major increases in mortality risk. |
| Brain Health | 12 | Memory issues and mental fog aren't just “getting older”—they're symptoms tied to metabolic, hormonal, and inflammatory markers you can track and improve. |

Unique biomarker labels per card:

- **Hormones:** Testosterone (Total & Free), Estradiol, Progesterone, SHBG, FSH, TSH.
- **Weight Loss:** Fasting Glucose, Hemoglobin, Total Cholesterol, LDL, HDL, Triglycerides, ApoB, TSH, T4, Free T3, TPO Antibodies, Testosterone, SHBG, Estradiol, Progesterone.
- **Longevity:** Thyroid Panel, Hormone Panel, Cardiovascular Metabolic Panel.
- **Vitality:** TSH, T4, FT3, TPO Antibodies, Testosterone, Estradiol, Progesterone, Total Cholesterol, LDL, HDL, ApoB, Triglycerides, Kidney Function, Liver Function.
- **Sexual Health:** Testosterone (Total & Free), Estradiol, Progesterone, FSH, SHBG, TSH, T4, FT3, TPO Ants.
- **Cardiac Risk:** Total Cholesterol, LDL, HDL, Triglycerides, ApoB, Glucose, Complete Blood Count, TSH, T4, FT3, TPO Antibodies.
- **Strength:** Glucose, TSH, T4, FT3, TPO Antibodies, Testosterone (Total & Free), SHBG, Estradiol, Progesterone.
- **Brain Health:** TSH, T4, FT3, TPO Antibodies, Glucose, Total Cholesterol, HDL, LDL, ApoB, Testosterone, Estradiol, Progesterone.

Opening a tile animates it into a centered overlay, darkens/blurs its image for readable white copy, blurs the surrounding page, and changes the plus to an ×. The expansion transition is approximately **380ms**. Biomarker tracks use **28-second and 34-second** animations.

### How It Works

Heading: **Stop guessing. Start knowing.**

> **1. Test what they missed**
>
> We analyze 50+ hormone and health markers — including the ones your annual physical skipped — to uncover what's actually behind your symptoms. Visit one of 2,000+ lab locations near you.

> **2. Get a real diagnosis**
>
> Your results are reviewed by a board-cert hormone specialist — not a general practitioner working off a 10-minute appointment. You get a clear, plain-language breakdown of what's happening and why.

> **3. Follow a plan built for you**
>
> No generic advice. A treatment plan tailored to your body, your symptoms, and your goals — with ongoing support included. Retesting every 3 months so your plan evolves as you do.

### Testimonials

Eyebrow: **FINALLY HEARD**

> Thousands of women found the answers they deserved.
>
> Struggling with being dismissed can feel isolating — but you're not alone.

Nine reviews, in order:

1. **I felt heard** — “Wonderful talk. Labs and health concerns discussed in detail. I felt very "heard" in a field I do not often feel heard in.” — Melissa, Hone Member
2. **Finally a doctor that believes me!** — “So happy to finally have a doctor that is educated in menopause. I've been told there is no helping with menopause by my GP and OBGYN. We need to look outside our medical system to be treated as deserving  someday this is the norm!” — Soraya Farmer, Hone Member
3. **A "whole me" perspective** — “My provider took great care to understand my full background, my treatment preferences, my risk tolerance, and my lifestyle and truly came at my care recommendations from a "whole me" perspective. Absolutely amazing!” — Audra Kirkland, Hone Member
4. **Finally an MD who goes beyond the basics** — “The MD I saw was the first person ever (after many years) to address my thyroid issue beyond just managing TSH.” — Lorrie, Hone Member
5. **Finally an affordable way to get help** — “So excited to finally find an affordable way to get help with my hormones! I put it off for a year because I couldn't afford the $1000 lab work my primary doctor recommended — and they didn't even test as many levels as Hone. Overall the experience is 5 star.” — Dolores, Hone Member
6. **HIGHLY RECOMMEND** — “This was by far the absolute BEST 45 mins of conversation I've had about my health in 8 years. I've beeom health professionals. It was rewarding to learn I was on the right track AND now able to find viable alternatives.” — Mrs S Thomas, Hone Member
7. **Concierge-level care** — “When was the last time you felt heard and had your priorities honored in a healthcare setting? Prepare yourself to be happily surprised at the level of diligence in communication and quality of care. This is concierge-level care — and it's practical and affordable!” — Laura D C, Hone Member
8. **Finally feel like getting back to normal** — “Having a doctor that really understands what is going on with my body is a great feeling! I haven't had much hope in feeling like normal in close to a year. I finally feel like there's a good chance that I will be getting back to normal!” — Ann Marie Gunn, Hone Member
9. **Everyone over 45 should do this** — “I fully recommend Hone to everyone. From start to finish this was such a great experience. The functional medicine doctor I met with was so personable, knowledgeables are so important to your well being. Thank you Hone!!” — Carrie H, Hone Member

The track has a **16px gap** and moved **316px** on the tested Next action, corresponding to 300px cards plus spacing. The initial Previous control is visually disabled.

### What’s Included

- **Optimal Health Biomarker Test** — $165 struck through; **$65**
  - Includes 50+ key biomarkers
  - Test at 2,000+ lab locations
  - Trusted by 10,000+ women to optimize their health
- **Physician Consultation** — Included
  - Talk 1:1 with a board-certified doctor
  - Get your questions answered, fast
- **Personalized Treatment Plan** — Included
  - Comprehensive test results
  - Biomarker breakdown
  - Tailored prescriptions

Summary labels: **Limited time discount**, **Saving $100**, **Shipping**, **Free**, **Total**, **US $65**.

CTA: **Get Started Now**

The live Trustpilot widget displayed **Excellent**, **4.8 out of 5**, and **12,382 reviews** during inspection. This differs from the intentionally broader “10,000+nd can change over time.

### Treatment Carousel

Heading: **Personalized care, your preferred treatment method.**

| Slide | Exact body |
|---|---|
| Menopause Relief | Ignite your libido, boost your mood, sculpt your body, and enhance your brainpower and bone health. Available as a cream or injectable. |
| Weight Management | Along with a comprehensive weight loss plan, curb cravings, normalizing metabolism, improve body composition, break down stored fat, and avoid the loss of muscle mass to improve mood and increase energy levels. |
| Balance Thyroid Hormones | Get a hypothyroidism care plan to improve metabolism, mood, and general hormone levels. Hone offers synthetic and naturally-derived options. |
| Longevity | Explore the leading edge of longevity treatments to enhance both healthspan and lifespan with Hone's advanced treatments and supplements. |
| Improve Sexual Function | Ignite passion and make sex more comfortable. Whether you need a kickstart or need to address hypoactive sexual desire disorder, we've got you covered. |
| Enhance Appearance | Grow more than just confidence with FDA-approved regrowth treatments Finasteride & Minoxidil, which can help you stop hair loss and regrow thicker, fuller hair. |

Every slide uses **Learn More**. The source uses a Slick carousel with cloned slides; retain six unique cards in your data.

### FAQ

Heading: **Common questions.**

> Still on the fence? We get it. Here are the questions we hear most.

1. **Why didn't my regular doctor catch this?**

   Standard annual physicals test a limited panel — often just TSH for thyroid, or total testosterone rather than free testosterone. These snapshots miss a lot. Hone tests 50+ markers, including the hormonal and metabolic indicators most closely tied to how you feel day-to-day. It's not that something was wrong with your care — it's that the bar for "normal" was set too low.

2. **What if my previous labs came back normal?**

   "Normal" is relative to what was tested. Many of the biomarkers most connected to fue, mood, weight, and libido aren't included in standard panels. Hone's comprehensive testing often surfaces imbalances that basic bloodwork misses entirely.

3. **How is a Hone physician different from my GP?**

   Hone's board-certified physicians specialize in hormone health. They're not working off a 12-minute appointment or a checklist of insurance-approved tests. They review your full results, take your symptoms seriously, and build a treatment plan around your actual biology — not a one-size-fits-all protocol.

4. **Is this covered by insurance?**

   We do not accept insurance at this time. We keep our pricing transparent and accessible — FSA/HSA eligible, no surprise bills, no markup on medications.

5. **Already on hormone therapy?**

   Switching to Hone is easy. If you're currently on hormone therapy, you can switch to Hone seamlessly. Take our assessment and our physicians will customize a plan that works with your existing treatment.

6. **Is my personal information safe?**

   Absolutely.te-of-the-art encryption protects all your data. Blood samples are handled securely by our partner labs and disposed of in accordance with medical regulations. Your DNA will never be stored or sold.

Opening another FAQ closes the previous answer. These answers are page copy, not independently verified medical or privacy claims.

### Final CTA and Footer

Eyebrow: **YOUR NEXT STEP**

> You've been patient long enough.
>
> You deserve a doctor who takes your symptoms seriously, runs the right tests, and builds a plan around what your body actually needs — not what's easiest to explain away.

CTA: **I’m Ready to Start**

Footer signup:

> Not sure where to start?
>
> Get research-backed tools, tactics, and techniques to maximize your health, delivered to your inbox.

Field: **Your Email**  
Button: **Sign up**

The DOM also contains these form messages; submission behavior was not tested:

- “Please enter in format name@email.com”
- “You're in. Check your inbox for what's next.”

Disclosure copy:
liated medical practices are independently owned and operated by licensed physicians who provide services using the Hone telehealth platform. For more information about the relationship between Hone and the medical practices click here.

> Hone is an online clinic that helps men and women manage their health. As part of your subscription and as medically indicated, physicians prescribe medications, and recommend supplements that are delivered to you from the comfort of your home.
>
> Imagery features synthetic performers (or models)

The footer includes the [academic reference](https://academic.oup.com/jcem/article/92/1/196/2598434), followed by:

> *Saad F, Aversa A, Isidori AM, Zafalon L, Zitzmann M, Gooren L. Onset of effects of testosterone treatment and time span until maximum effects are achieved. Eur J Endocrinol. 2011 Nov;165(5):675-85. doi: 10.1530/EJE-11-0221. Epub 2011 Jul 13. PMID: 21753068; PMCID: PMC3188848.

Bottom copy: **Copyright © 2026 Hone**, [Privacy Policy](https://honehealth.com/priacy/), [Terms of Use](https://honehealth.com/terms/). The physician disclosure links to [Hone physicians](https://honehealth.com/physicians).

## Quiz Flow

The persistent eyebrow is:

> WHAT’S YOUR DOCTOR MISSING?

### Question 1

> Have you ever been told your labs are "normal" — but still felt something was off?

Choices:

- Yes, and I still don't have answers
- Yes, but I eventually figured it out on my own
- I've never had comprehensive testing done
- No, my labs and symptoms have always aligned

This is single-select and advances automatically after selection. The first three choices show Interstitial 1. The fourth skips directly to Question 2. I tested all four branches.

Intl 1:

> You're not imagining it.
>
> "Normal" is only as good as what was tested.
>
> Most standard panels skip the hormone and metabolic markers most closely tied to how you actually feel — free testosterone, estradiol, progesterone, comprehensive thyroid function.
>
> At Hone, we test 50+ biomarkers, including the ones your annual physical skipped. Because a real answer starts with a real test.

Button: **Next question →**

### Question 2

> Which of these have you been told? (Select all that apply)

Choices:

- "It's probably just stress"
- "This is part of getting older"
- "Come back if it gets worse"
- "Have you tried losing weight?"
- "Your results look fine"
- None of these

This is multi-select with a **Next →** button. Clicking Next without a selection did not advance. Selecting “None of these” clears previous selections and skips Interstitial 2, proceeding directly to Question 3.

Interstitial 2:

> That's not a diagnosis. That's a dismissal.
>
> Women are significantly more likely to haymptoms minimized.
>
> When the symptoms are hormonal — fatigue, brain fog, weight gain, mood swings — they're almost always blamed on lifestyle or age.
>
> Hone's board-certified physicians specialize in hormone health. They don't start with assumptions. They start with your labs, your symptoms, and your goals — and they build from there.

Button: **Next question →**

### Question 3

> How long have you been living with unresolved symptoms?

Choices:

- Less than 6 months
- 6 months to a year
- 1 to 3 years
- More than 3 years

Single-select with automatic advancement. The tested “Less than 6 months” path shows Interstitial 3.

Interstitial 3:

> The longer you wait, the wider the gap gets.
>
> Hormonal imbalances don't resolve on their own.
>
> The longer they go unaddressed, the greater the downstream risks — to your sleep, your metabolism, your mood, and your long-term health.
>
> Hone makes it fast and easy to get answers. Order your test, visit one of 2,000+ lab locations, and get a physf your full results — all without a referral, a waitlist, or an insurance approval.

Two actions:

- **Get started now →** — scrolls to pricing.
- **Next question →** — advances to Question 4.

### Question 4

> What are you most hoping Hone can give you?

Choices:

- A real explanation for what I've been feeling
- A doctor who actually listens
- A treatment plan that finally works
- All of the above

Single-select with automatic advancement. The tested “All of the above” path shows:

> You've been patient long enough.
>
> You deserve a doctor who takes your symptoms seriously, runs the right tests, and builds a plan around what your body actually needs — not what's easiest to explain away.
>
> That's exactly what Hone does. Hone your hormones and find relief.

Actions: **I’m Ready to Start** and **Still Thinking About It**, with the anchor destinations above.

Progress was **0% initially**, **25% at Interstitial 1**, **50% at Interstitial 2**, **75% at Interstitial 3**, and **100% at the Back or Restart control was present. Reloading resets the quiz. It does not request contact details within this landing-page flow.

## CTA Behavior

| Location / label | Destination |
|---|---|
| Hero: “Get the Answers You Deserve” | Scrolls to `#quiz` |
| Third quiz interstitial: “Get started now →” | `#whats-included` |
| Quiz result: “I’m Ready to Start” | `#whats-included` |
| Quiz result: “Still Thinking About It” | `#comparison` |
| Comparison: “Get Started Now” | `#whats-included` |
| Dismissal section: “Get the Answers You Deserve” | `#whats-included` |
| Gap section: “Get Started Now” | `#whats-included` |
| Pricing: “Get Started Now” | External checkout |
| All six treatment cards: “Learn More” | Same external checkout |
| Final dark section: “I’m Ready to Start” | Same external checkout |

## Interactive Components

### Quiz

The quiz should be fully interactive within the landing page. It should preserve the observed branching educational screens, auto-advance behavior for single-select questions, multi-select behavior for Question 2, progress bar states, and the result actions.

### Biomarker Grid

| Element | Observed styling |
|---|---|
| Biomarker grid | 16px outer gutters; 2px gaps; 178px-square tiles; 16px outer corner radius |
| Expanded biomarker card | 358×358px, centered over a blurred backdrop |

Opening a tile animates it into a centered overlay, darkens/blurs its image for readable white copy, blurs the surrounding page, and changes the plus to an ×. The expansion transition is approximately **380ms**. Biomarker tracks use **28-second and 34-second** animations.

### Testimonials Carousel

The “Finally heard” testimonials section uses horizontally sliding review cards, arrows, and nine dots. The track has a **16px gap** and moved **316px** on the tested Next action, corresponding to 300px cards plus spacing. The initial Previous control is visually disabled.

### Treatment Carousel

The source uses a Slick carousel with cloned slides; retain six unique cards in your data.

### FAQ Accordion

Opening another FAQ closes the previous answer.

### Marquees

The review quote track uses a **40-second** animation. The disease condition rows move in opposite directions, with observed **114-second** animation durations. Biomarker tracks use **28-second and 34-second** animations.

### Newsletter

The DOM also contains these form messages; submission behavior was not tested:

- “Please enter in format name@email.com”
- “You're in. Check your inbox for what's next.”

## Responsive Rules

Measured visual styles:

| Element | Observed styling |
|---|---|
| Hero CTA | 350×58px; padding 16px 36px |
| Standard section CTA | 50×62px; padding 18px 48px |
| Main gutters | Usually 20px, leaving 350px content width |
| Standard sections | Usually 48px top/bottom padding |
| Hero | 24px top/bottom padding; 40px grid gap |
| Hero image | 350×262.5px, preserving its 4:3 ratio |
| Quiz answer boxes | 16px 20px padding; 12px vertical gap; 4px radius |
| Quiz progress bar | 3px tall; 2px radius; 32px bottom margin |
| Quiz interstitial panel | 12px padding/gap; 8px radius |
| Biomarker grid | 16px outer gutters; 2px gaps; 178px-square tiles; 16px outer corner radius |
| Expanded biomarker card | 358×358px, centered over a blurred backdrop |
| Disease panel | Approximately 326px wide; 20px radius |
| FAQ questions | 16px DM Sans; 20px vertical padding; 16px icon gap |
| Footer | 64px top padding, 40px bottom padding |

Primary inspection viewport was **390×844**. The build should be responsive across common mobile widths.

## QA Checklist

- The full landing-page experience is recognizable as Hone Health.
- The hero image comes first on mobile.
- The interactive quiz no longer appears immediately after the hero.
- The quiz appears after the Personalized Care/product carousel section and before FAQ.
- The quiz is functional and preserves the observed branches.
- Internal CTA behavior preserves the observed destinations.
- External checkout CTAs share the same checkout destination.
- Biomarker cards open into centered overlays and close correctly.
- FAQ behavior allows one open answer at a time.
- Testimonial carousel arrows and dots work.
- Treatment carousel arrows and dots work.
- Review, disease, and biomarker marquees animate.
- Images load from the observed asset base or local copied assets.
- The page renders cleanly at 390×844 and common mobile widths.
- No unverified behavior is presented as confirmed.
- Checkout steps beyond the initial cart are not recreated.
- Newsletter submission is not presented as tested unless implemented and verified.

## Open Questions / Assumptions

- The external checkout destination appears malformed in the supplied notes as `deart.honehealth.com/product/metis/labtest_w_opt_6)`. Treat this as the same checkout destination for all external checkout CTAs, but verify the exact URL before final delivery.
- The quiz is intentionally moved after the Personalized Care/product carousel section and before FAQ. As a consequence, the hero CTA still scrolls to `#quiz`, but that scroll now moves the user later in the page. This preserves the observed CTA destination while demonstrating the experiment.
- The final dark CTA remains before the relocated quiz. Its button should continue to use the external checkout destination unless explicitly changed.
- The supplied screenshot set documents the main page states, but it does not include expanded biomarker overlays, opened FAQ answers, every carousel slide, or every quiz branch.
- Use the screenshot set as the visual reference for mobile structure and spacing, and use the inspection notes as the source of truth for full copy, quiz branching, and interactive behavior.
- Preserve the provided copy by default, including typos or clipped words from the research notes, unless Kean explicitly approves copy cleanup.
- Use remote Hone image URLs during the static build unless assets are copied locally later. If local assets are added, preserve the same relative usage and filenames where practical.
- Font loading can use Google Fonts or local fallbacks, but the target families are STIX Two Text, DM Sans, and Azeret Mono.
- Newsletter submission behavior was not verified. If implemented, keep it self-contained and avoid external form submission or data collection.
- Touch-swipe behavior for carousels was not verified. Arrow and dot controls are enough for the prototype unless touch behavior is explicitly requested.
- The production page height is a reference only. The variant page height will change because the quiz moves lower in the funnel.

## Section-by-section Implementation Checklist

- Header: centered Hone logo, white background, thin bottom border, approximately 58px tall, non-sticky.
- Hero: image first, then `Finally, a doctor who listens.`, supporting copy, and full-width yellow CTA to `#quiz`.
- Comparison: centered eyebrow, heading, body copy, true two-column table with yellow Hone column and gray Traditional Care column, then yellow CTA to `#whats-included`.
- Dismissal statistics: beige section, three highlighted yellow stats, large STIX quote-style heading, body copy, bold closing line, yellow CTA to `#whats-included`.
- Review strip: tight Trustpilot rating row and horizontally moving quote track with clipped overflow.
- Gap section: image first, centered eyebrow, centered heading and body copy, bold `Hone closes both gaps.`, FSA/HSA line, yellow CTA to `#whats-included`.
- Disease monitor: pale rounded panel, centered heading, three green-check benefits, chart image, two opposite-direction condition marquees.
- What We Test: centered heading and intro, two-column square image grid, white titles and plus controls, expandable overlay state using card data and biomarker tracks.
- How It Works: heading, three stacked steps, full-width images between text blocks as shown in screenshots.
- Testimonials: beige section, centered intro, horizontal cards with partial next-card visibility, arrow controls, nine dots, disabled previous state at the start.
- What’s Included: receipt-like pricing block with promotional image, three included items with thumbnails, discount/shipping/total summary, yellow checkout CTA, Trustpilot widget.
- Treatment carousel: six unique treatment cards, product image, title, body copy, yellow `Learn More` button, arrow controls, six dots, all buttons use the external checkout destination.
- FAQ: centered eyebrow, heading, intro, six closed accordion rows by default, plus icons, one-open-at-a-time behavior.
- Final CTA: dark navy band, centered eyebrow, heading, body copy, yellow external checkout CTA, Trustpilot widget.
- Quiz: place directly after the Personalized Care/product carousel section and before FAQ; preserve beige background, progress bar, branching logic, interstitial screens, result screen, and internal CTA destinations.
- Footer: black background, large white Hone logo, LegitScript and HIPAA marks, newsletter copy, email field, sign-up button, disclosures, academic reference, copyright, privacy and terms links.

## Missing Details Needed Before Build

- Exact external checkout URL should be confirmed before final delivery.
- Expanded biomarker overlay screenshots would improve visual fidelity, but the current notes are enough to implement the interaction.
- Open FAQ screenshots would improve spacing fidelity for answer states, but the provided answer copy and accordion behavior are enough.
- Additional quiz screenshots for interstitial and final result screens would improve visual fidelity, but the copy and branching rules are enough.
- Carousel slide screenshots beyond the first treatment slide would improve image crop fidelity, but the asset list and copy are enough.
- If local images are preferred over remote URLs, assets should be copied into `assets/` during Step 2.

## Build Plan

1. Create a plain HTML/CSS/JS structure with semantic sections and preserved anchor IDs.
2. Implement the source page order, then relocate the quiz after the Personalized Care/product carousel section and before FAQ for the variant.
3. Use the observed design tokens, typography, gutters, spacing, buttons, backgrounds, cards, and image treatments.
4. Use the observed image asset inventory and preserve Hone’s existing wording by default.
5. Implement a small quiz state machine with branching screens, progress states, selected answer styling, and the observed CTA destinations.
6. Implement the biomarker overlay, FAQ accordion, testimonial carousel, treatment carousel, and marquee animations.
7. Preserve differing CTA destinations rather than making every CTA jump to the quiz.
8. QA at **390×844** first, then check nearby mobile widths.
9. Document any visual or behavioral compromises in the final rationale.
