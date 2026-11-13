// ===== MOBILE MENU =====
var menuBtn = document.getElementById("menu-btn");
var menu = document.getElementById("menu");

menuBtn.onclick = function () {
  menu.classList.toggle("show");
};

// close the menu after clicking a link
var menuLinks = menu.getElementsByTagName("a");
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].onclick = function () {
    menu.classList.remove("show");
  };
}


// ===== RECOMMENDATIONS SLIDER =====
var slider = document.getElementById("slider");
var track = document.getElementById("track");
var cards = track.children;
var dots = document.getElementsByClassName("dot");

var current = 2; // start from the 3rd card (same as the design)

// show the card number n in the center
function showSlide(n) {
  current = n;

  // distance from one card to the next (card width + gap)
  var step = cards[1].offsetLeft - cards[0].offsetLeft;
  var cardWidth = cards[0].offsetWidth;
  var sliderWidth = slider.offsetWidth;

  // move the track so that the selected card sits in the middle
  var move = sliderWidth / 2 - (n * step + cardWidth / 2);
  track.style.transform = "translateX(" + move + "px)";

  // highlight the active dot
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[n].classList.add("active");
}

// click on a dot
for (var i = 0; i < dots.length; i++) {
  dots[i].onclick = (function (num) {
    return function () {
      showSlide(num);
    };
  })(i);
}

// go to next slide automatically every 3 seconds
function nextSlide() {
  if (current >= cards.length - 1) {
    showSlide(0);
  } else {
    showSlide(current + 1);
  }
}
var timer = setInterval(nextSlide, 3000);

// swipe on phone
var startX = 0;

slider.ontouchstart = function (e) {
  startX = e.touches[0].clientX;
  clearInterval(timer);
};

slider.ontouchend = function (e) {
  var endX = e.changedTouches[0].clientX;

  if (startX - endX > 50 && current < cards.length - 1) {
    showSlide(current + 1);
  } else if (endX - startX > 50 && current > 0) {
    showSlide(current - 1);
  }
  timer = setInterval(nextSlide, 3000);
};

// fix the position when the screen size changes
window.onresize = function () {
  showSlide(current);
};

// run once when the page loads
window.onload = function () {
  showSlide(current);
};


// ===== CONTACT FORM =====
// nothing is saved anywhere, we only show a message and clear the form
var form = document.getElementById("contact-form");

form.onsubmit = function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  form.reset();
};
