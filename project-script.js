// Shared behaviour for the individual project pages.
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
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
  }

  // Scroll reveal. The hidden state lives in CSS behind .js, so content stays
  // visible if this script never runs.
  const revealElements = document.querySelectorAll(".reveal")

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"))
    return
  }

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
})
