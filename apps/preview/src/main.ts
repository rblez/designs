import "./style.css";
import "@designs/tokens/prompt-input.css";
import { mount } from "svelte";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import SvelteDemo from "./SvelteDemo.svelte";
import { ReactDemo } from "./ReactDemo";
import SveltePrompt from "./SveltePrompt.svelte";
import { ReactPrompt } from "./ReactPrompt";

mount(SvelteDemo, { target: document.getElementById("svelte-button")! });
createRoot(document.getElementById("react-button")!).render(createElement(ReactDemo));
mount(SveltePrompt, { target: document.getElementById("svelte-prompt")! });
createRoot(document.getElementById("react-prompt")!).render(createElement(ReactPrompt));
