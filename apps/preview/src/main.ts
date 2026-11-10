import "./style.css";
import { mount } from "svelte";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import SvelteDemo from "./SvelteDemo.svelte";
import { ReactDemo } from "./ReactDemo";

mount(SvelteDemo, { target: document.getElementById("svelte-button")! });
createRoot(document.getElementById("react-button")!).render(createElement(ReactDemo));
