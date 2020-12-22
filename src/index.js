// this import statement tells webpack to include styles.css in the build
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  setFetchMethod
} from "darkreader";
import css from "./styles.css";

function init() {
  if (!window.addEventListener) return; // Check for IE9+

  let options = INSTALL_OPTIONS;
  let element;

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement() {
    const location = { method: "prepend", selector: "body" };

    function getMaxZIndex() {
      let max = 0;
      const elements = document.getElementsByTagName("*");

      Array.prototype.slice.call(elements).forEach(el => {
        const zIndex = parseInt(
          document.defaultView.getComputedStyle(el).zIndex,
          10
        );

        max = zIndex ? Math.max(max, zIndex) : max;
      });

      return max;
    }

    element = INSTALL.createElement(location, element);

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute("app", "DarkMode");
    element.style.zIndex = getMaxZIndex() + 1;

    element.innerHTML = `<div class="toggler"></div><button class="circle"></button>`;

    const toggler = document.querySelector(
      "cloudflare-app[app='DarkMode'] .toggler"
    );

    const circle = document.querySelector(
      "cloudflare-app[app='DarkMode'] .circle"
    );

    function toggleDarkmode() {
      if (
        localStorage.getItem("darkmode") === null ||
        localStorage.getItem("darkmode") === "false"
      ) {
        localStorage.setItem("darkmode", true);
        setFetchMethod(window.fetch);
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 10
        });
      } else if (localStorage.getItem("darkmode") === "true") {
        localStorage.setItem("darkmode", false);
        disableDarkMode();
      }
    }

    function hideDarkLayout() {
      circle.classList.add("removedarklayout");
      circle.removeEventListener("transitionend", hideDarkLayout);
    }

    toggler.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.target.classList.contains("dark")) {
        circle.classList.remove("removedarklayout");
        document.querySelector(
          "cloudflare-app[app='DarkMode'] .circle.clicked"
        ).style.visibility = "visible";
      } else {
        circle.addEventListener("transitionend", hideDarkLayout);
      }
      circle.classList.toggle("clicked");
      toggler.classList.toggle("dark");
      toggleDarkmode();
    });

    if (options.EnableDarkMode === "true") {
      circle.classList.toggle("clicked");
      toggler.classList.toggle("dark");
      setFetchMethod(window.fetch);
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10
      });
      toggler.style.display = "block";
      localStorage.setItem("darkmode", true);
    } else {
      localStorage.setItem("darkmode", false);
      disableDarkMode();
      element.style.display = "none";
    }

    if (options.positionWidget === "cornerLeftBottom") {
      toggler.style.left = "1em";
      toggler.style.top = "unset";
      circle.style.top = "unset";
      circle.style.left = "1em";
    } else if (options.positionWidget === "cornerRightBottom") {
      toggler.style.right = "1em";
      toggler.style.top = "unset";
      circle.style.top = "unset";
      circle.style.right = "1em";
    } else if (options.positionWidget === "cornerLeftTop") {
      toggler.style.left = "1em";
      toggler.style.top = ".1em";
      circle.style.left = "1em";
      circle.style.top = ".1em";
    } else if (options.positionWidget === "cornerRightTop") {
      toggler.style.top = ".1em";
      toggler.style.right = "1em";
      circle.style.top = ".1em";
      circle.style.right = "1em";
    }

    toggler.style.transform = `scale(${options.scaleTransform})`;

    if (options.hideWidget) {
      toggler.style.display = "none";
      circle.style.display = "none";
      setFetchMethod(window.fetch);
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10
      });
      localStorage.setItem("darkmode", true);
    }

    function activatedDark() {
      if (localStorage.getItem("darkmode") === "true") {
        setFetchMethod(window.fetch);
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 10
        });
      }
    }
    activatedDark();
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions;

      updateElement();
    }
  };

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement);
  } else {
    updateElement();
  }
}

init();
