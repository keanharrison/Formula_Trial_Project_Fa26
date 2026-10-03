(function initQuizModule() {
  const quizRoot = document.querySelector("[data-quiz-root]");

  if (!quizRoot) {
    return;
  }

  const stage = quizRoot.querySelector("[data-quiz-stage]");
  const progress = quizRoot.querySelector("[data-quiz-progress]");
  const selected = new Set();

  const screens = {
    q1: {
      type: "single",
      progress: 0,
      question: 'Have you ever been told your labs are "normal" — but still felt something was off?',
      choices: [
        { label: "Yes, and I still don't have answers", next: "interstitial1" },
        { label: "Yes, but I eventually figured it out on my own", next: "interstitial1" },
        { label: "I've never had comprehensive testing done", next: "interstitial1" },
        { label: "No, my labs and symptoms have always aligned", next: "q2" },
      ],
    },
    interstitial1: {
      type: "interstitial",
      progress: 25,
      title: "You're not imagining it.",
      body: [
        '"Normal" is only as good as what was tested.',
        "Most standard panels skip the hormone and metabolic markers most closely tied to how you actually feel — free testosterone, estradiol, progesterone, comprehensive thyroid function.",
        "At Hone, we test 50+ biomarkers, including the ones your annual physical skipped. Because a real answer starts with a real test.",
      ],
      actions: [{ label: "Next question →", next: "q2", variant: "button" }],
    },
    q2: {
      type: "multi",
      progress: 25,
      question: "Which of these have you been told? (Select all that apply)",
      choices: [
        '"It\'s probably just stress"',
        '"This is part of getting older"',
        '"Come back if it gets worse"',
        '"Have you tried losing weight?"',
        '"Your results look fine"',
        "None of these",
      ],
    },
    interstitial2: {
      type: "interstitial",
      progress: 50,
      title: "That's not a diagnosis. That's a dismissal.",
      body: [
        "Women are significantly more likely to haymptoms minimized.",
        "When the symptoms are hormonal — fatigue, brain fog, weight gain, mood swings — they're almost always blamed on lifestyle or age.",
        "Hone's board-certified physicians specialize in hormone health. They don't start with assumptions. They start with your labs, your symptoms, and your goals — and they build from there.",
      ],
      actions: [{ label: "Next question →", next: "q3", variant: "button" }],
    },
    q3: {
      type: "single",
      progress: 50,
      question: "How long have you been living with unresolved symptoms?",
      choices: [
        { label: "Less than 6 months", next: "interstitial3" },
        { label: "6 months to a year", next: "interstitial3" },
        { label: "1 to 3 years", next: "interstitial3" },
        { label: "More than 3 years", next: "interstitial3" },
      ],
    },
    interstitial3: {
      type: "interstitial",
      progress: 75,
      title: "The longer you wait, the wider the gap gets.",
      body: [
        "Hormonal imbalances don't resolve on their own.",
        "The longer they go unaddressed, the greater the downstream risks — to your sleep, your metabolism, your mood, and your long-term health.",
        "Hone makes it fast and easy to get answers. Order your test, visit one of 2,000+ lab locations, and get a physf your full results — all without a referral, a waitlist, or an insurance approval.",
      ],
      actions: [
        { label: "Get started now →", href: "#whats-included", variant: "button" },
        { label: "Next question →", next: "q4", variant: "link" },
      ],
    },
    q4: {
      type: "single",
      progress: 75,
      question: "What are you most hoping Hone can give you?",
      choices: [
        { label: "A real explanation for what I've been feeling", next: "result" },
        { label: "A doctor who actually listens", next: "result" },
        { label: "A treatment plan that finally works", next: "result" },
        { label: "All of the above", next: "result" },
      ],
    },
    result: {
      type: "result",
      progress: 100,
      title: "You've been patient long enough.",
      body: [
        "You deserve a doctor who takes your symptoms seriously, runs the right tests, and builds a plan around what your body actually needs — not what's easiest to explain away.",
        "That's exactly what Hone does. Hone your hormones and find relief.",
      ],
      actions: [
        { label: "I’m Ready to Start", href: "#whats-included", variant: "button" },
        { label: "Still Thinking About It", href: "#comparison", variant: "link" },
      ],
    },
  };

  function setProgress(value) {
    progress.style.width = `${value}%`;
  }

  function goTo(screenId) {
    selected.clear();
    render(screenId);
  }

  function createButton(label, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className || "";
    button.textContent = label;
    return button;
  }

  function createAnchor(action) {
    const anchor = document.createElement("a");
    anchor.textContent = action.label;
    anchor.href = action.href;
    anchor.className = action.variant === "button" ? "button" : "quiz-link-secondary";
    return anchor;
  }

  function renderQuestion(screen) {
    const fragment = document.createDocumentFragment();
    const question = document.createElement("h2");
    question.className = "heading-md";
    question.textContent = screen.question;
    fragment.append(question);

    const options = document.createElement("div");
    options.className = "quiz-options";
    options.setAttribute("aria-label", screen.question);

    screen.choices.forEach((choice) => {
      const option = createButton(typeof choice === "string" ? choice : choice.label);
      option.addEventListener("click", () => {
        if (screen.type === "single") {
          goTo(choice.next);
          return;
        }

        handleMultiChoice(option, choice);
      });
      options.append(option);
    });

    fragment.append(options);

    if (screen.type === "multi") {
      const error = document.createElement("p");
      error.className = "quiz-error";
      error.hidden = true;
      error.textContent = "Please select an answer before continuing.";

      const next = createButton("Next →", "button");
      next.addEventListener("click", () => {
        if (!selected.size) {
          error.hidden = false;
          return;
        }

        goTo(selected.has("None of these") ? "q3" : "interstitial2");
      });

      fragment.append(error, next);
    }

    return fragment;
  }

  function handleMultiChoice(option, choice) {
    const value = choice;
    const allButtons = Array.from(option.parentElement.querySelectorAll("button"));

    if (value === "None of these") {
      selected.clear();
      selected.add(value);
      allButtons.forEach((button) => button.classList.remove("is-selected"));
      option.classList.add("is-selected");
      window.setTimeout(() => goTo("q3"), 120);
      return;
    }

    if (selected.has("None of these")) {
      selected.delete("None of these");
      allButtons.forEach((button) => {
        if (button.textContent === "None of these") {
          button.classList.remove("is-selected");
        }
      });
    }

    if (selected.has(value)) {
      selected.delete(value);
      option.classList.remove("is-selected");
    } else {
      selected.add(value);
      option.classList.add("is-selected");
    }
  }

  function renderTextScreen(screen) {
    const article = document.createElement("article");
    article.className = screen.type === "result" ? "quiz-result" : "quiz-interstitial";

    const title = document.createElement("h2");
    title.textContent = screen.title;
    article.append(title);

    screen.body.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      article.append(p);
    });

    const actions = document.createElement("div");
    actions.className = "quiz-actions";

    screen.actions.forEach((action) => {
      if (action.href) {
        actions.append(createAnchor(action));
        return;
      }

      const button = createButton(action.label, action.variant === "button" ? "button" : "quiz-link-secondary");
      button.addEventListener("click", () => goTo(action.next));
      actions.append(button);
    });

    article.append(actions);
    return article;
  }

  function render(screenId) {
    const screen = screens[screenId];
    setProgress(screen.progress);
    stage.replaceChildren(screen.type === "single" || screen.type === "multi" ? renderQuestion(screen) : renderTextScreen(screen));
  }

  render("q1");
})();

(function initFaqAccordion() {
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));

  if (!items.length) {
    return;
  }

  const answers = [
    "Standard annual physicals test a limited panel — often just TSH for thyroid, or total testosterone rather than free testosterone. These snapshots miss a lot. Hone tests 50+ markers, including the hormonal and metabolic indicators most closely tied to how you feel day-to-day. It's not that something was wrong with your care — it's that the bar for \"normal\" was set too low.",
    "\"Normal\" is relative to what was tested. Many of the biomarkers most connected to fue, mood, weight, and libido aren't included in standard panels. Hone's comprehensive testing often surfaces imbalances that basic bloodwork misses entirely.",
    "Hone's board-certified physicians specialize in hormone health. They're not working off a 12-minute appointment or a checklist of insurance-approved tests. They review your full results, take your symptoms seriously, and build a treatment plan around your actual biology — not a one-size-fits-all protocol.",
    "We do not accept insurance at this time. We keep our pricing transparent and accessible — FSA/HSA eligible, no surprise bills, no markup on medications.",
    "Switching to Hone is easy. If you're currently on hormone therapy, you can switch to Hone seamlessly. Take our assessment and our physicians will customize a plan that works with your existing treatment.",
    "Absolutely.te-of-the-art encryption protects all your data. Blood samples are handled securely by our partner labs and disposed of in accordance with medical regulations. Your DNA will never be stored or sold.",
  ];

  function closeItem(item) {
    const button = item.querySelector("button");
    const icon = button.querySelector("span:last-child");
    const answer = item.querySelector(".faq-answer");
    button.setAttribute("aria-expanded", "false");
    icon.textContent = "+";
    answer.hidden = true;
  }

  function openItem(item) {
    items.forEach((candidate) => {
      if (candidate !== item) {
        closeItem(candidate);
      }
    });

    const button = item.querySelector("button");
    const icon = button.querySelector("span:last-child");
    const answer = item.querySelector(".faq-answer");
    button.setAttribute("aria-expanded", "true");
    icon.textContent = "×";
    answer.hidden = false;
  }

  items.forEach((item, index) => {
    const answer = item.querySelector(".faq-answer");
    const paragraph = document.createElement("p");
    paragraph.textContent = answers[index];
    answer.append(paragraph);

    item.querySelector("button").addEventListener("click", () => {
      const isOpen = item.querySelector("button").getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
})();

(function initBiomarkerCards() {
  const cards = Array.from(document.querySelectorAll("[data-biomarker]"));

  if (!cards.length) {
    return;
  }

  const biomarkerData = {
    hormones: {
      title: "Hormones",
      count: 6,
      copy: "Your hormones are your body's messengers, controlling everything from mooand metabolism to sleep and sex drive. In women, hormone levels start to decline in their 30s — testosterone first, followed by progesterone and estrogen in their 40s and 50s.",
      labels: ["Testosterone (Total & Free)", "Estradiol", "Progesterone", "SHBG", "FSH", "TSH"],
    },
    weightLoss: {
      title: "Weight Loss",
      count: 15,
      copy: "Maintaining a healthy weight isn't about aesthetics—it's about longevity. Body fat is one of the strongest predictors of chronic disease risk and quality of life.",
      labels: ["Fasting Glucose", "Hemoglobin", "Total Cholesterol", "LDL", "HDL", "Triglycerides", "ApoB", "TSH", "T4", "Free T3", "TPO Antibodies", "Testosterone", "SHBG", "Estradiol", "Progesterone"],
    },
    longevity: {
      title: "Longevity",
      count: 3,
      copy: "Aging is driven by 12 biological hallmarks, from cellular damage to hormonal decline. We test the markers tied to those processes so you can age on your terms.",
      labels: ["Thyroid Panel", "Hormone Panel", "Cardiovascular Metabolic Panel"],
    },
    vitality: {
      title: "Vitality",
      count: 14,
      copy: "Vitality is cellular energy in action. As it declines, so does your energy, motivation, and mental clarity. Hone targets the root causes to help you feel vibrant again.",
      labels: ["TSH", "T4", "FT3", "TPO Antibodies", "Testosterone", "Estradiol", "Progesterone", "Total Cholesterol", "LDL", "HDL", "ApoB", "Triglycerides", "Kidney Function", "Liver Function"],
    },
    sexualHealth: {
      title: "Sexual Health",
      count: 9,
      copy: "Sexual wellness is a key indicator of overall health, and a major contributor to mental, emotional, and cardiovascular well-being.",
      labels: ["Testosterone (Total & Free)", "Estradiol", "Progesterone", "FSH", "SHBG", "TSH", "T4", "FT3", "TPO Ants"],
    },
    cardiacRisk: {
      title: "Cardiac Risk",
      count: 11,
      copy: "Heart attack and stroke remain the top causes of early death. The good news? You can detect and manage your  decades in advance.",
      labels: ["Total Cholesterol", "LDL", "HDL", "Triglycerides", "ApoB", "Glucose", "Complete Blood Count", "TSH", "T4", "FT3", "TPO Antibodies"],
    },
    strength: {
      title: "Strength",
      count: 9,
      copy: "Muscle mass is a better predictor of life expectancy than BMI. Even small declines in strength are tied to major increases in mortality risk.",
      labels: ["Glucose", "TSH", "T4", "FT3", "TPO Antibodies", "Testosterone (Total & Free)", "SHBG", "Estradiol", "Progesterone"],
    },
    brainHealth: {
      title: "Brain Health",
      count: 12,
      copy: "Memory issues and mental fog aren't just “getting older”—they're symptoms tied to metabolic, hormonal, and inflammatory markers you can track and improve.",
      labels: ["TSH", "T4", "FT3", "TPO Antibodies", "Glucose", "Total Cholesterol", "HDL", "LDL", "ApoB", "Testosterone", "Estradiol", "Progesterone"],
    },
  };

  let activeOverlay = null;

  function closeOverlay() {
    if (activeOverlay) {
      activeOverlay.remove();
      activeOverlay = null;
    }
  }

  function openOverlay(card) {
    const data = biomarkerData[card.dataset.biomarker];
    closeOverlay();

    const overlay = document.createElement("div");
    overlay.className = "biomarker-overlay";

    const modal = document.createElement("article");
    modal.className = "biomarker-modal";
    modal.style.setProperty("--tile-image", card.style.getPropertyValue("--tile-image"));
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", data.title);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "biomarker-modal__close";
    close.setAttribute("aria-label", "Close biomarker card");
    close.textContent = "×";
    close.addEventListener("click", closeOverlay);

    const title = document.createElement("h3");
    title.textContent = data.title;

    const copy = document.createElement("p");
    copy.textContent = data.copy;

    const count = document.createElement("p");
    count.className = "biomarker-count";
    count.textContent = `BIOMARKERS TESTED · ${data.count}`;

    const labels = document.createElement("div");
    labels.className = "biomarker-labels";
    data.labels.forEach((label) => {
      const pill = document.createElement("span");
      pill.textContent = label;
      labels.append(pill);
    });

    modal.append(close, title, copy, count, labels);
    overlay.append(modal);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });

    document.body.append(overlay);
    activeOverlay = overlay;
    close.focus();
  }

  cards.forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => openOverlay(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openOverlay(card);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
    }
  });
})();

(function initProductCarousel() {
  const section = document.querySelector("#treatment-options");

  if (!section) {
    return;
  }

  const track = section.querySelector(".product-track");
  const cards = Array.from(section.querySelectorAll(".product-card"));
  const dots = Array.from(section.querySelectorAll("[data-carousel-dot]"));
  const previous = section.querySelector("[data-carousel-prev]");
  const next = section.querySelector("[data-carousel-next]");
  let index = 0;

  function update(newIndex) {
    index = Math.max(0, Math.min(cards.length - 1, newIndex));
    const target = cards[index];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  }

  previous.addEventListener("click", () => update(index - 1));
  next.addEventListener("click", () => update(index + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => update(Number(dot.dataset.carouselDot)));
  });

  update(0);
})();

(function initTestimonialCarousel() {
  const section = document.querySelector("#testimonials");

  if (!section) {
    return;
  }

  const track = section.querySelector(".testimonial-track");
  const cards = Array.from(section.querySelectorAll(".review-card"));
  const dots = Array.from(section.querySelectorAll("[data-testimonial-dot]"));
  const previous = section.querySelector("[data-testimonial-prev]");
  const next = section.querySelector("[data-testimonial-next]");
  let index = 0;

  function update(newIndex) {
    index = Math.max(0, Math.min(cards.length - 1, newIndex));
    const target = cards[index];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  }

  previous.addEventListener("click", () => update(index - 1));
  next.addEventListener("click", () => update(index + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => update(Number(dot.dataset.testimonialDot)));
  });

  update(0);
})();

(function initTickers() {
  const quoteStrip = document.querySelector(".quote-strip");

  if (quoteStrip && !quoteStrip.dataset.prepared) {
    Array.from(quoteStrip.children).forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      quoteStrip.append(clone);
    });
    quoteStrip.dataset.prepared = "true";
  }

  document.querySelectorAll(".condition-rows p").forEach((row) => {
    if (!row.dataset.prepared) {
      row.textContent = `${row.textContent} · ${row.textContent}`;
      row.dataset.prepared = "true";
    }
  });
})();

(function initSmoothScrolling() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");

    if (!link) {
      return;
    }

    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", link.getAttribute("href"));
  });
})();

(function initStaticNewsletterForm() {
  const form = document.querySelector(".newsletter form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
})();
