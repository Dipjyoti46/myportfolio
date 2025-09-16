// Clipboard copy functionality
document.getElementById('copyBtn1').addEventListener('click', function() {
  var emailText = document.getElementById('gmail').innerText;
  navigator.clipboard.writeText(emailText).then(function() {
    alert('Email copied to clipboard!');
  }, function(err) {
    alert('Failed to copy email');
    console.error('Error copying text: ', err);
  });
});

document.getElementById('copyBtn2').addEventListener('click', function() {
  var emailText = document.getElementById('phn').innerText;
  navigator.clipboard.writeText(emailText).then(function() {
    alert('Email copied to clipboard!');
  }, function(err) {
    alert('Failed to copy email');
    console.error('Error copying text: ', err);
  });
});


// Modern Project Slider
class Slider {
  constructor(container) {
    this.container = container;
    this.sliderTrack = container.querySelector('.slider-track');
    this.slides = container.querySelectorAll('.slider-card');
    this.prevButton = container.querySelector('.slider-prev');
    this.nextButton = container.querySelector('.slider-next');
    this.indicators = container.querySelectorAll('.indicator');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    // Set initial state
    this.updateSlider();
    
    // Add event listeners
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
    
    // Add indicator click events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, false);

    // Auto play
    this.startAutoPlay();
  }

  handleSwipe(startX, endX) {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  updateSlider() {
    if (this.isAnimating) return;
    
    // Update transform
    this.sliderTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    
    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });

    // Add animation class
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 500); // Match this with your CSS transition time
  }

  next() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlider();
  }

  prev() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    this.currentIndex = index;
    this.updateSlider();
  }

  startAutoPlay() {
    setInterval(() => {
      this.next();
    }, 5000); // Change slide every 5 seconds
  }
}
// Work Experience Slider
class WorkSlider {
  constructor(container) {
    this.container = container;
    this.sliderTrack = container.querySelector('.wrk_slider-track');
    this.slides = container.querySelectorAll('.wrk_slider');
    this.prevButton = container.querySelector('.wrk_left');
    this.nextButton = container.querySelector('.wrk_right');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    this.updateSlider();
    
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, false);
  }

  handleSwipe(startX, endX) {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  updateSlider() {
    if (this.isAnimating) return;
    
    this.sliderTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  next() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlider();
  }

  prev() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize project slider
  const projectSlider = new Slider(document.querySelector('.slider-container'));
  
  // Initialize work experience slider
  const workSlider = new WorkSlider(document.querySelector('.wrk_slider-container'));

  // Initialize CSS variables for smooth transitions
  document.documentElement.style.setProperty('--slider-transition', 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)');
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  emailjs.sendForm("service_k72vv9s", "template_dbinjtk", this)
    .then(function() {
      alert("Message sent successfully!");
      // Optionally, clear the form here
      document.getElementById("contact-form").reset();
    }, function(error) {
      alert("Failed to send message. Please try again later.");
      console.error("EmailJS Error:", error);
    });
});
