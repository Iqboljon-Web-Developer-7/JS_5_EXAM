import footer from "./footer.js";
import timer from "./timer.js";
import search from "./search.js";
import categories from "./categories.js";
import pagesChanging from "./pagesChanging.js";
import favouriteCounterFun from "./favouriteCounter.js";
import registerFun from "./register.js";
import supHeaderFun from "./supHeader.js";
import headerFun from "./header.js";
import favouritesFun from "./favourites.js";
import toggleMobileHeader from "./mobileHeader.js";
import productsNavFun from "./productsNav.js";
import changeProducts from "./changeProducts.js";
import fetchApi from "./fetchApi.js";

// API Fetcher Function
const API_URL = "https://dummyjson.com";

// API_PATH
let path = "products";
function updatePath(value) {
  path = value;
}

// Mobile Input
let mobileInput = document.querySelector("#mobile-input");

// Pages
const details = document.querySelector(".details"),
  home = document.querySelector(".home"),
  register = document.querySelector(".register");

// Header
const headerWrapper = document.querySelector(".header-wrapper"),
  header = document.querySelector(".header"),
  headerNav = document.querySelector(".header__nav"),
  headerLinks = document.querySelectorAll(".header__nav a"),
  headerMobileNav = document.querySelector(".mobile-header__nav");

// Mobile Header
const mobileHeader = document.querySelector(".mobile-header"),
  closeIcon = document.querySelector(".close-icon"),
  menuIcon = document.querySelector(".menu-icon"),
  mobileNav = document.querySelector(".mobile-header__nav");

menuIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);
closeIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);

// Favourites page
let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
  favouriteCounter = document.querySelector(".favourite-counter"),
  favouritesPageCounter = document.querySelector(".favourites__header--count"),
  favouritesIcon = document.querySelector(".heart-icon"),
  favouritesPage = document.querySelector(".favourites");

// Products

const loadMoreBtn = document.querySelector(".load-all"),
  loadLessBtn = document.querySelector(".load-less"),
  leftBtn = document.querySelector(".products__controls--left"),
  rightBtn = document.querySelector(".products__controls--right");

// how many products should be displayed

// Products left btn is disabled
leftBtn.disabled = true;

// Changing products
rightBtn.addEventListener("click", () => changeProducts("right"));
leftBtn.addEventListener("click", () => changeProducts("left"));
// First load of products
fetchApi(API_URL, "products", 0, 8, "", ".products__container");

productsNavFun();
favouritesFun(favouritesIcon, favouritesPage, favourites);
headerFun();
supHeaderFun();
registerFun(headerLinks);
favouriteCounterFun(favourites, favouriteCounter);
pagesChanging(headerLinks, headerNav, headerMobileNav);
categories(updatePath);
search();
timer();
footer();

// i tried to export less elements so it's good for performance
export {
  API_URL,
  fetchApi,
  path,
  leftBtn,
  rightBtn,
  loadLessBtn,
  loadMoreBtn,
  header,
  headerWrapper,
  mobileNav,
  mobileHeader,
  home,
  details,
  register,
  favourites,
  favouriteCounter,
  favouritesPage,
  favouritesPageCounter,
};
