// Project page script
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const hamburgerMenu = document.getElementById("hamburger-menu")
    const navLinks = document.getElementById("nav-links")
  
    if (hamburgerMenu && navLinks) {
      hamburgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active")
      })
  
      // Close menu when clicking on a link
      const links = navLinks.querySelectorAll("a")
      links.forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active")
        })
      })
    }
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Scroll reveal animation
    const revealElements = document.querySelectorAll(".project-section, .project-image, .tech-stack, .project-cta")
  
    function checkReveal() {
      const windowHeight = window.innerHeight
      const revealPoint = 150
  
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
  
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("revealed")
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Initialize elements as hidden
    revealElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(50px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  
    window.addEventListener("scroll", checkReveal)
    window.addEventListener("resize", checkReveal)
  
    // Check on page load
    setTimeout(checkReveal, 500)
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  