document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Footer year
  const year = document.getElementById("year")
  if (year) year.textContent = new Date().getFullYear()

  // Mobile menu
  const hamburgerMenu = document.getElementById("hamburger-menu")
  const navLinks = document.getElementById("nav-links")

  if (hamburgerMenu && navLinks) {
    const setOpen = (open) => {
      navLinks.classList.toggle("active", open)
      hamburgerMenu.setAttribute("aria-expanded", String(open))
      hamburgerMenu.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu")
    }

    hamburgerMenu.addEventListener("click", () => {
      setOpen(!navLinks.classList.contains("active"))
    })

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false))
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        setOpen(false)
        hamburgerMenu.focus()
      }
    })
  }

  // Navbar shadow on scroll
  const navbar = document.querySelector(".navbar")
  const backToTop = document.querySelector(".back-to-top")

  const onScroll = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50)
    if (backToTop) backToTop.classList.toggle("active", window.scrollY > 500)
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()

  // Project filtering
  const filterButtons = document.querySelectorAll(".project-tabs button")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")))

    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
        btn.setAttribute("aria-pressed", "false")
      })
      button.classList.add("active")
      button.setAttribute("aria-pressed", "true")

      const filter = button.getAttribute("data-category")
      projectCards.forEach((card) => {
        const show = filter === "all" || card.getAttribute("data-category") === filter
        card.hidden = !show
      })
    })
  })

  // Clicking anywhere on a card follows its "Learn More" link
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return
      const link = card.querySelector(".learn-more")
      if (link) window.location.href = link.getAttribute("href")
    })
  })

  // Certification slider
  const sliderContainer = document.querySelector(".slider-container")
  const prevButton = document.querySelector(".slider-arrow.prev")
  const nextButton = document.querySelector(".slider-arrow.next")

  if (sliderContainer) {
    const step = 320
    const behavior = reduceMotion ? "auto" : "smooth"

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (sliderContainer.scrollLeft <= 0) {
          sliderContainer.scrollTo({ left: sliderContainer.scrollWidth, behavior })
        } else {
          sliderContainer.scrollBy({ left: -step, behavior })
        }
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const atEnd = sliderContainer.scrollLeft + sliderContainer.offsetWidth >= sliderContainer.scrollWidth - 1
        if (atEnd) {
          sliderContainer.scrollTo({ left: 0, behavior })
        } else {
          sliderContainer.scrollBy({ left: step, behavior })
        }
      })
    }
  }

  // Scroll reveal. The hidden state lives in CSS behind .js, so content stays
  // visible if this script never runs.
  const revealElements = document.querySelectorAll(".reveal")

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"))
  } else {
    let observerDelivered = false

    const observer = new IntersectionObserver(
      (entries) => {
        observerDelivered = true
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("revealed")
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: "0px 0px -100px 0px" },
    )
    revealElements.forEach((el) => observer.observe(el))

    // Safety net: the observer normally delivers its first batch within a frame.
    // If it never does, show everything rather than leave the page blank.
    setTimeout(() => {
      if (observerDelivered) return
      observer.disconnect()
      revealElements.forEach((el) => el.classList.add("revealed"))
    }, 2000)
  }

  // Decorative hero particles
  const heroParticles = document.querySelector(".hero-particles")
  if (heroParticles && !reduceMotion) {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("span")
      particle.className = "particle"
      particle.style.cssText =
        `top:${Math.random() * 100}%;left:${Math.random() * 100}%;` +
        `width:${Math.random() * 10 + 5}px;height:${Math.random() * 10 + 5}px;` +
        `opacity:${Math.random() * 0.5 + 0.1};animation-duration:${Math.random() * 20 + 10}s`
      fragment.appendChild(particle)
    }
    heroParticles.appendChild(fragment)
  }
})
