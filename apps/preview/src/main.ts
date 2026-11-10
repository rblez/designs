import "@designs/tokens/css";
import "@designs/tokens/components.css";
import "@designs/tokens/prompt-input.css";
import "./style.css";
import { mount } from "svelte";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });
