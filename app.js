// sliders

const slideTrips = document.querySelectorAll(".trip-img");

slideTrips.forEach(function (slideTrip) {
  slideTrip.addEventListener("mouseover", function () {
    const tripInfo = slideTrip.nextElementSibling;
    if (tripInfo) {
      tripInfo.classList.add("trip-info-active");
    }
  });

  slideTrip.addEventListener("mouseout", function () {
    const tripInfo = slideTrip.nextElementSibling;
    if (tripInfo) {
      tripInfo.classList.remove("trip-info-active");
    }
  });
});

const swiperHead = new Swiper(".swiper-head", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  speed: 4000,
  autoplay: {
    delay: 3000,
  },
  effect: "fade",
  breakpoints: {
    550: {
      enabled: true,
    },
    0: {
      enabled: false,
    },
  },
});

const swiperDestination = new Swiper(".swiper-destination", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 32,
  breakpoints: {
    1441: {
      slidesPerView: 3.5,
    },
    1153: {
      slidesPerView: 2.5,
    },
    1050: {
      slidesPerView: 2.2,
    },
    0: {
      slidesPerView: 1,
    },
  },

  navigation: {
    nextEl: ".next-destination",
    prevEl: ".prev-destination",
  },
});

const swiperOffer = new Swiper(".swiper-offer", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 32,
  breakpoints: {
    1050: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 1,
    },
  },

  navigation: {
    nextEl: ".next-offer",
    prevEl: ".prev-offer",
  },
});

const swiperTrip = new Swiper(".swiper-trip", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 32,
  breakpoints: {
    1500: {
      slidesPerView: 3.9,
    },
    1153: {
      slidesPerView: 2.8,
    },
    1050: {
      slidesPerView: 2.2,
    },
    0: {
      slidesPerView: 1.2,
    },
  },
});

const swiperGallery = new Swiper(".swiper-gallery", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 32,

  breakpoints: {
    1050: {
      slidesPerView: 4,
    },

    0: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: ".next-gallery",
    prevEl: ".prev-gallery",
  },
});

const swiperExperience = new Swiper(".swiper-experience", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 2.5,
  spaceBetween: 52,
  breakpoints: {
    1153: {
      slidesPerView: 2.5,
    },
    1050: {
      slidesPerView: 2.2,
    },
    530: {
      slidesPerView: 1.5,
    },
    0: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: ".next-experience",
    prevEl: ".prev-experience",
  },
});

// burger

const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const middleString = document.querySelector(".middle-string");
const topString = document.querySelector(".top-string");
const bottomString = document.querySelector(".bottom-string");
const headerBtns = document.querySelector(".header__buttons");

burger.addEventListener("click", function () {
  header.classList.toggle("header-active");
  if (header.classList.contains("header-active")) {
    middleString.style.opacity = "0";
    topString.style.rotate = "-45deg";
    bottomString.style.rotate = "45deg";
    headerBtns.style.cssText = `border: 1px solid var(--orange);
    border-radius: 16px`;
  } else {
    middleString.style.opacity = "1";
    topString.style.rotate = "0deg";
    bottomString.style.rotate = "0deg";
    headerBtns.style.border = "none";
  }
});

// dinamic search

let data = [];

fetch("city.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
  })
  .catch((error) => {
    console.error("Ошибка загрузки JSON-данных", error);
  });

function searchDestination() {
  const input = document.getElementById("destination");
  const userInput = input.value.toLowerCase();
  const resultsElement = document.getElementById("results");

  if (userInput.length < 1) {
    resultsElement.innerHTML = "";
    return;
  }

  const filteredData = data.filter((item) => {
    const city = item.city.toLowerCase();
    return city.includes(userInput);
  });

  let MAX_RESULTS = 4;
  if (document.documentElement.clientWidth < 591) {
    MAX_RESULTS = 2;
  }
  const limitedResults = filteredData.slice(0, MAX_RESULTS);
  if (filteredData.length < 0) {
    resultsElement.innerHTML = "No results found.";
    resultsElement.style.display = "block";
    return;
  }

  const resultsHTML = limitedResults
    .map(
      (item, index) =>
        `<div class="result" data-index="${index}">
    <p class = "result-text">${item.city}</p>
    </div>`
    )
    .join("");
  resultsElement.innerHTML = resultsHTML;
  resultsElement.style.display = "block";

  const resultElements = document.querySelectorAll(".result");
  resultElements.forEach((result) => {
    const index = result.getAttribute("data-index");
    result.addEventListener("mouseover", () => {
      result.classList.add("result-active");
    });
    result.addEventListener("mouseout", () => {
      result.classList.remove("result-active");
    });
    result.addEventListener("click", (event) => {
      event.preventDefault();
      input.value = limitedResults[index].city;
      resultsElement.innerHTML = "";
      resultsElement.style.display = "none";
    });
    document.addEventListener("click", (event) => {
      const target = event.target;
      const resultsElement = document.getElementById("results");
      const input = document.getElementById("destination");
      const isInput = target === input || input.contains(target);
      const isResults =
        target === resultsElement || resultsElement.contains(target);

      if (!isInput && !isResults) {
        resultsElement.style.display = "none";
      }
    });
  });
}

// modal

const modal = document.querySelector(".modal");
const destinationImgs = document.querySelectorAll(".destination-img");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

function disableBodyScroll() {
  document.body.style.overflow = "hidden";
}
function enableBodyScroll() {
  document.body.style.overflow = "";
}
function openModal() {
  modal.classList.add("visible");
  disableBodyScroll();
}

function closeModal() {
  modal.classList.remove("visible");
  enableBodyScroll();
}
destinationImgs.forEach(function (destinationImg) {
  destinationImg.addEventListener("click", function () {
    openModal();
  });
  modal.addEventListener("click", function (e) {
    if (!e.target.closest(".modal-content")) {
      closeModal();
    }
  });
});

closeBtn.addEventListener("click", function () {
  closeModal();
});
