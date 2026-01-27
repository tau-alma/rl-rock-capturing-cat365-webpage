window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function () { return false; };
  image.oncontextmenu = function () { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

$(document).ready(function () {
  // Navbar burger (mobile menu)
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // -----------------------------
  // Carousels (init ONCE each)
  // -----------------------------

  // Evaluation Scenarios carousel (3 visible, no loop)
  if (document.querySelector('#results-carousel')) {
    bulmaCarousel.attach('#results-carousel', {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: false,
      infinite: false,
      autoplay: false
    });
  }

  // Figures carousel (1 visible, looping)
  if (document.querySelector('#figures-carousel')) {
    bulmaCarousel.attach('#figures-carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000
    });
  }

  // -----------------------------
  // Interpolation slider logic
  // -----------------------------
  preloadInterpolationImages();

  $('#interpolation-slider').on('input', function () {
    setInterpolationImage(this.value);
  });

  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  // Initialize Bulma sliders (range inputs)
  bulmaSlider.attach();
});
