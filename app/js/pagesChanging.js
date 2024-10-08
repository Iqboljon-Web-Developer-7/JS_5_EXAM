import {
  home,
  details,
  register,
  favouritesPage,
  cartPage,
  contact,
  about,
  fetchApi,
  API_URL,
  searchWrapper,
} from "./script.js";

function pagesChanging(headerLinks, headerNav, headerMobileNav) {
  // Pages changing

  headerLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
      headerLinks[idx].classList.add("active");

      searchWrapper.classList.remove("active");
      headerLinks.forEach((link2, idx2) => {
        if (idx != idx2) {
          headerLinks[idx2].classList.remove("active");
        }
      });

      setTimeout(() => {
        window.scroll({ top: 0, left: 0 }); // Smooth scroll to the top
      }, 10);
    });
  });
  headerNav.addEventListener("click", (e) => changePages(e));
  headerMobileNav.addEventListener("click", (e) => {
    headerMobileNav.parentElement.classList.remove("active");
    changePages(e);
  });
  function hideAllSections() {
    about.classList.add("hidden");
    home.classList.add("hidden");
    details.classList.add("hidden");
    register.classList.add("hidden");
    favouritesPage.classList.add("hidden");
    cartPage.classList.add("hidden");
    contact.classList.add("hidden");
  }
  function changePages(e) {
    document.body.style.overflow = "scroll";

    hideAllSections();
    e = e.target;
    switch (e.textContent) {
      case "Home":
        home.classList.remove("hidden");
        fetchApi(API_URL, "products", 0, 8, "", ".products__container", true);
        break;
      case "Login":
        register.classList.remove("hidden");
        break;
      case "Contact":
        contact.classList.remove("hidden");
        break;
      case "About":
        about.classList.remove("hidden");
        break;
      default:
        home.classList.remove("hidden");
    }
  }

  // Pages changing end - - - |
}
export default pagesChanging;
