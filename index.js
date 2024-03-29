window.addEventListener('load', () => {
  highlightCurrentSection();
});

// get nav link for section element user is currently viewing
function getCurrentSectionLink() {
  const navLinks = document.getElementsByClassName('nav-link');

  //get current section's index
  for (let link of navLinks) {
    let sectionId = link.getAttribute('href').slice(1);
    let section = document.getElementById(sectionId);
    if (elemInView(section)) return link;
  }
}

//check if element is in view
function elemInView(elem) {
  const offset = document.getElementById('site-nav').offsetHeight;
  let vh = window.innerHeight;
  let rect = elem.getBoundingClientRect();
  let top = rect.top - offset;
  let bottom = rect.bottom - offset;
  return ((top <= .5 * vh && bottom > vh * .5));
}

// highlight link for section user is currently viewing
function highlightCurrentSection() {
  let curLink = getCurrentSectionLink();

  // remove active-link class from previous section link
  const prevActiveLink = document.querySelector('.nav-link.active');
  if (prevActiveLink) prevActiveLink.classList.remove('active');

  //add active class to current section link
  curLink.classList.add('active');

  //set scrollThrottling to false so can call func on next scroll event
  scrollThrottling = false;
}

//function throttler based on https://chiamakaikeanyi.dev/event-debouncing-and-throttling-in-javascript/
function throttle(func, limit) {
  let lastCall;
  let lastRan;
  return () => {
    if (!lastRan) {
      func();
      lastRan = Date.now();
    } else {
      clearTimeout(lastCall);
      lastCall = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func();
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

window.addEventListener('scroll', throttle(highlightCurrentSection, 16));