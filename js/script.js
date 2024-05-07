/*
    SLIDE
*/
const heroSliderItems = document.querySelectorAll(".slider-item");
const heroSliderPrevBtn = document.querySelector(".slider-prev");
const heroSliderNextBtn = document.querySelector(".slider-next");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSlider = function () {
  lastActiveSliderItem.classList.remove("slider-item--active");
  heroSliderItems[currentSlidePos].classList.add("slider-item--active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSlider();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSlider();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/* Autoslide */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 8000);
};

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

/*
    ASIDE
*/
const aside = document.querySelector("aside");
const asideOverlay = document.querySelector(".aside-overlay");
const asideClose = document.querySelector(".aside-close");
const asideOpen = document.querySelector(".aside-open");
const navItems = document.querySelector("aside .nav__items");

asideOpen.addEventListener("click", () => {
  aside.classList.add("aside--show");
  asideOverlay.classList.add("aside--show");
});

asideClose.addEventListener("click", () => {
  aside.classList.remove("aside--show");
  asideOverlay.classList.remove("aside--show");
});

navItems.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    aside.classList.remove("aside--show");
    asideOverlay.classList.remove("aside--show");
  }
});

/*
    LOADED
*/
const preload = document.querySelector(".preload");

addEventListener("load", () => {
  setTimeout(() => {
    preload.classList.add("loaded");
    document.body.classList.add("loaded");
    // scroll(0, 0);
  }, 100);

  setTimeout(() => {
    heroSliderItems[0].classList.add("slider-item--active");
    autoSlide();
  }, 200);
});

/*
    HEADER & BACK TOP
*/
const nav = document.querySelector("nav");
const backTop = document.querySelector(".back-top");

let lastScrollPos = 0;

const hideNav = function () {
  lastScrollPos < scrollY
    ? nav.classList.add("hide")
    : nav.classList.remove("hide");
  lastScrollPos = scrollY;
};

addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    nav.classList.add("scrolled");
    backTop.classList.add("scrolled");
    hideNav();
  } else {
    nav.classList.remove("scrolled");
    backTop.classList.remove("scrolled");
  }
});

backTop.addEventListener("click", () => {
  scroll(0, 0);
});

/*
    MENU
*/
let menu = [
  {
    dish: "Shahi Paneer",
    tag: "Hero",
    price: "500",
    description:
      "Savor the richness of Shahi Paneer: tender paneer cubes bathed in a creamy, aromatic sauce of cashews and spices. Fit for royalty, it's a regal delight for your palate.",
  },
  {
    dish: "Paneer Makhni",
    tag: "",
    price: "450",
    description:
      " A creamy delight of tender paneer cubes in a luscious tomato-based gravy, kissed with spices and finished with a touch of cream. Pure indulgence in every bite.",
  },
  {
    dish: "Kadhai Paneer",
    tag: "",
    price: "500",
    description:
      " A flavorful medley of paneer and colorful bell peppers, cooked to perfection in a fragrant blend of spices. A tantalizing taste of India's vibrant culinary heritage.",
  },
  {
    dish: "Veg Chaap",
    tag: "New",
    price: "400",
    description:
      " A succulent vegetarian delight, marinated in a tantalizing blend of spices and grilled to perfection. A flavorful twist on a classic favorite.",
  },
  {
    dish: "Naan",
    tag: "",
    price: "99",
    description:
      "Soft, pillowy flatbread freshly baked in the traditional tandoor oven, perfect for scooping up your favorite curries or enjoying on its own. A staple of Indian cuisine, loved for its irresistible texture and flavor.",
  },
  {
    dish: "Laccha Paratha",
    tag: "",
    price: "89",
    description:
      "A flaky, multi-layered Indian bread, expertly crafted and cooked to golden perfection. Its delicate layers melt in your mouth, adding a delightful crunch to any meal.",
  },
  {
    dish: "Chocolate Mousse",
    tag: "",
    price: "150",
    description:
      "A decadent delight featuring layers of velvety chocolate goodness. Indulge in the smooth, creamy texture and rich flavor of this classic dessert.",
  },
  {
    dish: "Choco Lava Cake",
    tag: "New",
    price: "150",
    description:
      "A divine indulgence of warm, gooey chocolate bliss enclosed in a moist, fluffy cake exterior. Experience the ultimate dessert sensation with each irresistible bite.",
  },
];

menu.forEach((item, index) => {
  let div = document.createElement("div");
  div.classList.add("menu-item");
  div.setAttribute("title", item.dish);
  document.querySelector(".menu-box").appendChild(div);

  div.innerHTML = `
        <img src="./img/menu-${index + 1}.jpg" alt="Dish">
        <div class="menu__info">
            <div class="menu__info-top">
                <h2>${item.dish}</h2>
                <span></span>
                <h3>₹${item.price}</h3>
            </div>
            <p>${item.description}</p>
        </div>
    `;

  if (item.tag != "") {
    let tag = document.createElement("div");
    tag.textContent = item.tag;
    tag.classList.add("tag");
    div.children[1].children[0].children[0].insertAdjacentElement(
      "afterend",
      tag
    );
  }
});

/*
    ONLINE RESERVATION
*/
const inputDate = document.getElementById("reservation-date");

addEventListener("load", () => {
  let now = new Date();
  let currentTime = now.toISOString().substring(0, 10);
  inputDate.value = currentTime;
  inputDate.setAttribute("min", currentTime);
});
