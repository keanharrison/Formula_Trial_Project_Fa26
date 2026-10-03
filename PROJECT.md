# Formula Trial Project - Hone Health Mobile CRO Experiment

## Build Process

Follow `WORKFLOW.md` one step at a time. Complete only the requested step, then stop and report results. Do not proceed to the next workflow step unless explicitly asked.

## Assignment Summary

Formula asked me to evaluate Hone Health’s women’s mobile landing-page funnel and identify the single most meaningful conversion opportunity.

The project is intended to evaluate:

- Growth judgment
- Prioritization
- Experimentation
- Design/content thinking
- Execution
- Measurement
- AI fluency
- Ownership
- Communication

The required deliverables are:

- Mobile funnel/CRO assessment
- Prioritized conversion opportunity
- Experiment hypothesis
- Working mobile-first HTML variant
- Concise written rationale and measurement approach
- Brief AI/tool usage notes

Formula explicitly does not expect production-ready engineering or an exhaustive redesign. The goal is to show how I translate product/growth reasoning into a tangible experiment. :chatgpt-content-reference{index="0"} :chatgpt-content-reference{index="1"}

---

## Work Completed So Far

### 1. Funnel Analysis

I reviewed Hone Health’s mobile landing pageon by section and documented potential conversion opportunities.

My analysis focused on:

- Messaging and value proposition
- Content hierarchy
- Calls to action
- Trust and credibility
- User experience
- Friction within the conversion flow

This matches the areas Formula specifically recommends evaluating. :chatgpt-content-reference{index="2"}

### 2. Key Observations

#### Hero

The headline, “Finally, a doctor who listens,” appears strong.

It communicates an emotional pain point around feeling unheard by traditional healthcare while remaining short, human, and immediately understandable.

Because the hero already appears effective, I decided not to prioritize changing it simply because headlines are generally high-leverage.

#### Interactive Quiz

The interactive quiz appears immediately after the hero.

This stood out as the largest potential source of early friction because:

- It asks the user to actively engage very early in the funnel.
- Completing the quiz requires more effort than passivelyolling.
- Much of Hone’s strongest credibility, differentiation, education, social proof, and explanation appears later.
- A user may therefore be asked to invest effort before enough value or trust has been established.

I do not know whether this actually harms conversion. That is the assumption the experiment is intended to test.

#### Credibility and Differentiation

Several later sections clearly communicate why Hone differs from traditional healthcare.

Notable strengths include:

- Comparison between traditional care and Hone
- Statistics contextualizing women’s healthcare problems
- Explanation of testing and biomarkers
- Visual explanation of what Hone tests
- Testimonials and social proof
- Repeated CTAs throughout the funnel

These sections may provide the value and credibility necessary for a user to become more willing to engage with the quiz.

#### Page Length and Repetition

The page repeats several themes and claims throughout the experience.

Examples include repeated messaging around:
0+ hormone and health markers
- Feeling unheard by traditional healthcare
- Getting answers rather than guessing
- Comprehensive testing

There may be an opportunity to reduce repetition, but changing page length and messaging broadly would introduce many variables simultaneously and make the experiment harder to interpret.

#### Imagery / Human Trust

Some visuals appear highly polished or AI-like.

I considered testing more human imagery, testimonials, or authentic patient-oriented content, but this would represent a different trust experiment and is less directly tied to the friction I observed in the conversion flow.

---

## Prioritization

After reviewing the funnel, I considered several possible experiment areas:

1. Hero/headline
2. Interactive quiz placement
3. Page length and repeated messaging
4. Social proof / human trust
5. Content hierarchy

I prioritized the interactive quiz.

The main reason is that it combines:

- High funnel visibility
- Required user effort
- Early placement
- A clear behavioral hypothesis
- A relatively isolated variable that can be tested through an A/B experiment

Formula specifically asks for one meaningful opportunity rather than an exhaustive redesign, and for a clear explanation of why that opportunity was prioritized over alternatives. :chatgpt-content-reference{index="3"}

---

## Proposed Experiment

### Experiment Type

A/B test

### Observation

The interactive quiz appears immediately after the hero, before Hone presents much of the information that establishes credibility, differentiation, and value.

The quiz requires active engagement and time from the visitor rather than passive consumption.

### Assumption

Some users may not yet perceive enough value or trust to justify completing the quiz at that point in the funnel.

This is an assumption rather than an observed fact and needs to be validated experimentally.

### Goal

Test the effect of changing the placement of the interactive quiz within the landing-page funnel.

### Hypothesis

Moving the interactive quiz later in the funnel, after Hone has established greater value and credibility, will increase the percentage of visitors who begin and complete the conversion process.

### Control

The current Hone landing page, where the interactive quiz appears immediately after the hero.

### Variant

The same overall landing-page experience, but with the interactive quiz moved later in the funnel.

The final placement will be selected intentionally based on the point at which Hone has established enough value and credibility to justify asking the user for active engagement.

### What Should Remain Constant

The experiment should preserve as much of the existing page as possible so that quiz placement remains the primary variable.

---

## Measurement Plan

### Primary Metric

Overall landing-page conversion rate.

The exact production conversion event is not available to me, but I currently assume this would correspond to purchasing or beginning Hone’s paid service/testing process.

### Secondary Metrics

- Quistart rate
- Quiz-completion rate
- CTA click-through rate
- Funnel drop-off by section

### Guardrail

Ensure that changing quiz placement does not create meaningful negative effects elsewhere in the conversion funnel.

### Primary Learning Goal

Determine whether visitors are more willing to engage with Hone’s interactive conversion experience after first receiving additional evidence of the product’s value and credibility.

Formula specifically asks for the experiment hypothesis, primary metric, secondary/guardrail metrics, assumptions, and what the experiment is intended to teach us. :chatgpt-content-reference{index="4"}

---

## Build Plan

The prototype will be a mobile-first HTML implementation of the proposed variant.

The build should demonstrate the parts of the experience relevant to the experiment, including:

- Messaging/content
- Layout and hierarchy
- CTA structure
- Quiz interaction
- Mobile UX
- New quiz placement

It does not need to recreate every production detail of Hone’s websitemula explicitly states that the goal is not pixel-perfect or production-ready engineering, but rather demonstrating how the growth hypothesis translates into a tangible experience. :chatgpt-content-reference{index="5"}

---

## Technical Approach

### Repository

GitHub repository dedicated to the Formula Trial Project.

### Development

- Cursor as the IDE
- Codex CLI for repository-level coding
- GPT-6 Astra as the primary build model
- Lower reasoning effort during setup/documentation
- Higher reasoning effort during implementation and QA

### Deployment

Vercel

### Final Links

- Mobile-first HTML version:
- Source code:
- Supplementary analysis / working notes:

---

## AI Usage

AI is being used as an implementation and reasoning-support tool, not as the source of the core product decision.

My responsibilities include:

- Reviewing the original funnel
- Documenting opportunities
- Selecting the conversion opportunity
- Prioritizing it against alternatives
- Defining the experiment
- Forming the hypothesis
- Determining the intended UX change
- Reviewing and validating AI-generated implementation

AI tools will primarily assist with:

- Organizing documentation
- Translating the experiment into frontend code
- Iterating on HTML/CSS/JavaScript
- Debugging
- Mobile QA

Formula explicitly allows AI usage and evaluates whether AI is used effectively while the candidate maintains their own judgment and validates the output. :chatgpt-content-reference{index="6"}

---

## Remaining Work Tonight

1. Finalize the exact placement of the quiz in the variant.
2. Draft the PRD describing the desired mobile experience.
3. Collect/reference the necessary visual material from the existing Hone page.
4. Build the mobile-first HTML variant.
5. Test the experience at mobile viewport sizes.
6. Deploy the prototype to Vercel.
7. Complete the written measurement rationale.
8. Add final links to the submission document.
9. Review the submission against Formula’s evaluation criteria.
10. Submit.
