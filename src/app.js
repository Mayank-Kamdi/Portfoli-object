import { setupLoader, setupNavigation, setupReveal } from "./interactions.js";
import { appTemplate, loadingTemplate } from "./templates.js";

const appRoot = document.querySelector("#app");
const loadingRoot = document.querySelector("#loading-screen");

if (loadingRoot) loadingRoot.innerHTML = loadingTemplate;
if (appRoot) appRoot.innerHTML = appTemplate;

setupLoader();
setupReveal();
setupNavigation();
