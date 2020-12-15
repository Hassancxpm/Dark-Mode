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

    element.innerHTML =
      '<svg style="display: none;" id="darkmode" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="#757575"/><path d="m402.171875 45.828125c28.878906 41.445313 45.828125 91.824219 45.828125 146.171875 0 141.386719-114.613281 256-256 256-54.347656 0-104.726562-16.949219-146.171875-45.828125 46.253906 66.378906 123.132813 109.828125 210.171875 109.828125 141.386719 0 256-114.613281 256-256 0-87.039062-43.449219-163.917969-109.828125-210.171875zm0 0" fill="#595959"/><path d="m333.160156 82.820312c15.136719 26.699219 23.78125 57.5625 23.78125 90.445313 0 101.527344-82.148437 183.675781-183.675781 183.675781-32.882813 0-63.746094-8.644531-90.445313-23.78125-5.3125-3.011718-11.285156 2.613282-8.6875 8.140625 32.074219 68.269531 101.445313 115.542969 181.867188 115.542969 111.164062 0 200.847656-89.679688 200.84375-200.84375 0-80.425781-47.273438-149.792969-115.542969-181.867188-5.527343-2.597656-11.152343 3.375-8.140625 8.6875zm0 0" fill="#fff148"/><path d="m382.464844 99.980469c28.007812 34.519531 44.792968 78.511719 44.792968 126.429687 0 110.925782-89.921874 200.847656-200.847656 200.847656-47.917968 0-91.910156-16.785156-126.429687-44.792968 36.820312 45.378906 93.027343 74.382812 156.019531 74.382812 110.925781 0 200.847656-89.921875 200.847656-200.847656 0-62.992188-29.003906-119.199219-74.382812-156.019531zm0 0" fill="#ffe600"/><g fill="#fff148"><path d="m171.785156 231.253906 15.976563-5.808594c5.480469-1.992187 5.480469-9.742187 0-11.734374-4.863281-1.769532-10.398438-3.78125-15.976563-5.8125-11.570312-4.207032-20.683594-13.320313-24.894531-24.894532l-5.808594-15.972656c-1.992187-5.480469-9.742187-5.480469-11.734375-.003906-1.769531 4.863281-3.78125 10.398437-5.808594 15.976562-4.210937 11.574219-13.324218 20.6875-24.894531 24.894532-5.582031 2.03125-11.113281 4.042968-15.976562 5.8125-5.480469 1.992187-5.480469 9.742187 0 11.734374l15.976562 5.808594c11.570313 4.207032 20.683594 13.324219 24.894531 24.894532 2.027344 5.578124 4.039063 11.113281 5.808594 15.976562 1.992188 5.480469 9.742188 5.476562 11.734375-.003906l5.808594-15.972656c4.207031-11.570313 13.324219-20.6875 24.894531-24.894532zm0 0"/><path d="m266.230469 116.453125 3.8125-1.386719c5.480469-1.992187 5.480469-9.742187 0-11.738281-1.253907-.453125-2.53125-.917969-3.8125-1.382813-7.1875-2.617187-12.851563-8.277343-15.464844-15.464843l-1.386719-3.8125c-1.992187-5.480469-9.742187-5.480469-11.734375 0-.457031 1.253906-.921875 2.53125-1.386719 3.8125-2.613281 7.1875-8.277343 12.847656-15.464843 15.464843-1.28125.464844-2.558594.929688-3.8125 1.382813-5.480469 1.996094-5.476563 9.746094 0 11.738281l3.8125 1.386719c7.1875 2.613281 12.851562 8.277344 15.464843 15.464844.464844 1.28125.929688 2.558593 1.386719 3.8125 1.992188 5.480469 9.742188 5.476562 11.734375-.003907l1.386719-3.808593c2.613281-7.191407 8.277344-12.851563 15.464844-15.464844zm0 0"/></g></svg>';

    const darkModeWidget = document.querySelector("#darkmode");

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

    darkModeWidget.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleDarkmode();
    });

    if (options.EnableDarkMode === "true") {
      darkModeWidget.style.display = "block";
      localStorage.setItem("darkmode", true);
      setFetchMethod(window.fetch);
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10
      });
    } else {
      localStorage.setItem("darkmode", false);
      disableDarkMode();
      element.style.display = "none";
    }

    if (options.positionWidget === "cornerLeftBottom") {
      darkModeWidget.style.left = "1em";
    } else if (options.positionWidget === "cornerRightBottom") {
      darkModeWidget.style.right = "1em";
    } else if (options.positionWidget === "cornerLeftTop") {
      darkModeWidget.style.left = "1em";
      darkModeWidget.style.top = "2em";
    } else if (options.positionWidget === "cornerRightTop") {
      darkModeWidget.style.top = "2em";
      darkModeWidget.style.right = "1em";
    }

    darkModeWidget.style.transform = `scale(${options.scaleTransform})`;

    if (options.hideWidget) {
      darkModeWidget.style.display = "none";
    }
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
