// Filter Projects by Category
document.querySelectorAll('.project-tabs button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.project-tabs button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Get the selected category
        const category = this.getAttribute('data-category');
        
        // Filter projects
        document.querySelectorAll('.project-card').forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
window.addEventListener("load", function() {
    if (window.location.hash) {
      window.scrollTo(0, 0);
      setTimeout(function() {
        window.location.hash = '';  // Clear the hash
      }, 1);
    }
  });

  // Hamburger Menu Toggle
document.getElementById("hamburger-menu").addEventListener("click", function () {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
});