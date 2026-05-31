document.addEventListener("DOMContentLoaded", function () {

  const track = document.getElementById("bannerTrack");
  const slides = track.children;

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let index = 0;
  const totalSlides = slides.length;
  let slideTimer = null;
  const SLIDE_DELAY = 4000; // 4 seconds

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % totalSlides;
    updateSlide();
    resetTimer();
  }

  function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
    resetTimer();
  }

  function startTimer() {
    slideTimer = setInterval(() => {
      index = (index + 1) % totalSlides;
      updateSlide();
    }, SLIDE_DELAY);
  }

  function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
  }

  // Button clicks
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Start auto sliding
  startTimer();

});

document.addEventListener("DOMContentLoaded", () => {

  const videoTrack = document.getElementById("videoTrack");
  const videoCards = document.querySelectorAll(".video-card");
  const nextBtn = document.getElementById("videoNext");
  const prevBtn = document.getElementById("videoPrev");

  let index = 0;

  function getVisibleCount() {
    return window.innerWidth > 768 ? 2 : 1;
  }

  function getSlideWidth() {
    return videoCards[0].offsetWidth + 24; // 24 = gap
  }

  function updateSlide() {
    videoTrack.style.transform =
      `translateX(-${index * getSlideWidth()}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = videoCards.length - getVisibleCount();
    index = (index + 1) > maxIndex ? 0 : index + 1;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    const maxIndex = videoCards.length - getVisibleCount();
    index = (index - 1) < 0 ? maxIndex : index - 1;
    updateSlide();
  });

  // Pause other videos when one plays
  const videos = document.querySelectorAll(".video-card video");
  videos.forEach(video => {
    video.addEventListener("play", () => {
      videos.forEach(v => {
        if (v !== video) v.pause();
      });
    });
  });

  window.addEventListener("resize", () => {
    index = 0;          // reset on resize
    updateSlide();
  });

});
