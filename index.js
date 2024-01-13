window.addEventListener('load', () => {
  highlightCurrentSection();
});

// get index for section user is currently viewing
function detectSection() {
  const curScrollPos = this.scrollY;
  const viewHt = this.innerHeight;
  const navHt = document.getElementById('site-nav').offsetHeight;

  //get current section's index
  const sectionIdx = Math.floor((curScrollPos - navHt) / viewHt) + 1;
  return sectionIdx;

}

// highlight link for section user is currently viewing
function highlightCurrentSection() {
  const navLinks = document.getElementsByClassName('nav-link');
  const sectionIdx = detectSection();

  // remove active-link class from previous section
  const prevActiveLink = document.querySelector('.nav-link.active');
  if (prevActiveLink) prevActiveLink.classList.remove('active');

  //add active class to current section
  navLinks[sectionIdx].classList.add('active');
}

window.addEventListener('scroll', highlightCurrentSection);