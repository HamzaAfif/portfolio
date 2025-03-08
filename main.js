// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const loader = document.querySelector(".loader")
    const loaderProgress = document.querySelector(".loader-progress")
  
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 90
      if (progress > 100) progress = 100
      loaderProgress.style.width = `${progress}%`
  
      if (progress === 100) {
        clearInterval(interval)
        setTimeout(() => {
          loader.style.opacity = "0"
          setTimeout(() => {
            loader.style.display = "none"
            // Animate hero content
            animateHero()
          }, 500)
        }, 500)
      }
    }, 200)
  
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
  
    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.width = "12px"
      cursor.style.height = "12px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.width = "8px"
      cursor.style.height = "8px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })
  
    // Add hover effect to links and buttons
    const links = document.querySelectorAll("a, button, .project-card, .certification-card, .achievement-card")
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.width = "0"
        cursor.style.height = "0"
        cursorFollower.style.width = "60px"
        cursorFollower.style.height = "60px"
        cursorFollower.style.borderColor = "var(--primary)"
        cursorFollower.style.backgroundColor = "rgba(255, 87, 51, 0.1)"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.width = "8px"
        cursor.style.height = "8px"
        cursorFollower.style.width = "40px"
        cursorFollower.style.height = "40px"
        cursorFollower.style.borderColor = "var(--primary)"
        cursorFollower.style.backgroundColor = "transparent"
      })
    })
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Menu toggle
    const navToggle = document.querySelector(".nav-toggle")
    const menuClose = document.querySelector(".menu-close")
    const fullscreenMenu = document.querySelector(".fullscreen-menu")
    const menuLinks = document.querySelectorAll(".menu-link")
  
    if (navToggle && menuClose && fullscreenMenu && menuLinks) {
      navToggle.addEventListener("click", () => {
        fullscreenMenu.classList.add("active")
        document.body.style.overflow = "hidden"
  
        // Add delay to each menu link
        menuLinks.forEach((link, index) => {
          link.style.setProperty("--i", index)
        })
      })
  
      menuClose.addEventListener("click", () => {
        fullscreenMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      })
  
      menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          fullscreenMenu.classList.remove("active")
          document.body.style.overflow = "auto"
        })
      })
    }
  
    // Animate hero content
    function animateHero() {
      const heroContent = document.querySelector(".hero-content")
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
    }
  
    // Typewriter effect
    const typewriterElement = document.getElementById("typewriter")
    if (typewriterElement) {
      const texts = ["Building Solutions.", "Creating Value.", "Exploring Tech."]
      let textIndex = 0
      let charIndex = 0
      let isDeleting = false
      let typingSpeed = 100
  
      function typeWriter() {
        const currentText = texts[textIndex]
  
        if (isDeleting) {
          typewriterElement.textContent = currentText.substring(0, charIndex - 1)
          charIndex--
          typingSpeed = 50
        } else {
          typewriterElement.textContent = currentText.substring(0, charIndex + 1)
          charIndex++
          typingSpeed = 100
        }
  
        if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true
          typingSpeed = 1000 // Pause at end
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
          typingSpeed = 500 // Pause before typing next
        }
  
        setTimeout(typeWriter, typingSpeed)
      }
  
      typeWriter()
    }
  
    // Project filtering - Fixed
    const filterButtons = document.querySelectorAll(".project-tabs button")
    const projectCards = document.querySelectorAll(".project-card")
  
    // Show all projects by default
    projectCards.forEach((card) => {
      card.style.display = "block"
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, 10)
    })
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        const filter = button.getAttribute("data-category")
  
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 10)
          } else {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        })
      })
    })
  
    // Make project cards clickable
    projectCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        // Only navigate if the click wasn't on a link
        if (!e.target.closest("a")) {
          const projectLink = card.querySelector(".learn-more")
          if (projectLink) {
            window.location.href = projectLink.getAttribute("href")
          }
        }
      })
    })
  
    // Certification slider - Fixed
    const sliderContainer = document.querySelector(".slider-container")
    const prevButton = document.querySelector(".slider-arrow.prev")
    const nextButton = document.querySelector(".slider-arrow.next")
    const sliderDots = document.querySelector(".slider-dots");
    if (sliderDots) sliderDots.style.display = "none";

    const certificationCards = document.querySelectorAll(".certification-card")
  
    if (sliderContainer && certificationCards.length > 0) {
      // Create dots
      certificationCards.forEach((_, index) => {
        const dot = document.createElement("div")
        dot.classList.add("slider-dot")
        if (index === 0) dot.classList.add("active")
        sliderDots.appendChild(dot)
  
        dot.addEventListener("click", () => {
          scrollToCard(index)
        })
      })
  
      const dots = document.querySelectorAll(".slider-dot")
  
      if (prevButton) {
        prevButton.addEventListener("click", () => {
          if (sliderContainer.scrollLeft <= 0) {
            sliderContainer.scrollTo({
              left: sliderContainer.scrollWidth - sliderContainer.offsetWidth,
              behavior: "smooth",
            });
          } else {
            sliderContainer.scrollBy({
              left: -320,
              behavior: "smooth",
            });
          }
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener("click", () => {
          if (sliderContainer.scrollLeft + sliderContainer.offsetWidth >= sliderContainer.scrollWidth) {
            sliderContainer.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          } else {
            sliderContainer.scrollBy({
              left: 320,
              behavior: "smooth",
            });
          }
        });
      }
      
  
      function scrollToCard(index) {
        const card = certificationCards[index]
        sliderContainer.scrollTo({
          left: card.offsetLeft - sliderContainer.offsetLeft,
          behavior: "smooth",
        })
  
        // Update active dot
        dots.forEach((dot) => dot.classList.remove("active"))
        dots[index].classList.add("active")
      }
  
      // Update dots on scroll
      sliderContainer.addEventListener("scroll", () => {
        const scrollPosition = sliderContainer.scrollLeft
  
        certificationCards.forEach((card, index) => {
          const cardPosition = card.offsetLeft - sliderContainer.offsetLeft
  
          if (scrollPosition >= cardPosition - 100 && scrollPosition < cardPosition + card.offsetWidth - 100) {
            dots.forEach((dot) => dot.classList.remove("active"))
            dots[index].classList.add("active")
          }
        })
      })
    }
  
    // Scroll reveal animation
    const revealElements = document.querySelectorAll(
      ".section-header, .about-content, .timeline-item, .achievement-card, .certification-card, .project-card, .story-content, .contact-content",
    )
  
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
  
    // Check on page load (after preloader)
    setTimeout(checkReveal, 1000)
  
    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
  
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
  
    // Contact form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]')
        submitButton.disabled = true
        submitButton.textContent = "Sending..."
  
        setTimeout(() => {
          alert("Thank you for your message! This is a demo form, so no actual message was sent.")
          contactForm.reset()
          submitButton.disabled = false
          submitButton.textContent = "Send Message"
        }, 2000)
      })
    }
  
    // View all projects button
    const viewAllButton = document.querySelector(".view-all-projects")
  
    if (viewAllButton) {
      viewAllButton.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Show all projects
        projectCards.forEach((card) => {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 10)
        })
  
        // Reset filter buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        filterButtons[0].classList.add("active")
  
        // Hide view all button
        this.style.display = "none"
      })
    }
  
    // Particles background
    const heroParticles = document.querySelector(".hero-particles")
  
    function createParticles() {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")
  
        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100
  
        // Random size
        const size = Math.random() * 10 + 5
  
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1
  
        // Random animation duration
        const duration = Math.random() * 20 + 10
  
        // Set styles
        particle.style.cssText = `
                  position: absolute;
                  top: ${posY}%;
                  left: ${posX}%;
                  width: ${size}px;
                  height: ${size}px;
                  background-color: var(--primary);
                  opacity: ${opacity};
                  border-radius: 50%;
                  animation: float ${duration}s infinite ease-in-out;
              `
  
        heroParticles.appendChild(particle)
      }
    }
  
    createParticles()
  })
  
  // Add CSS animation for particles
  const style = document.createElement("style")
  style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(0) translateX(20px);
        }
        75% {
            transform: translateY(20px) translateX(10px);
        }
    }
  `
  document.head.appendChild(style)
  
  