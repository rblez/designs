<script lang="ts">
  import { Sidebar } from "@rblez-ui/svelte";
  let active = $state("#inbox");
  const sections = [
    { title: "Workspace", items: [
      { label: "Inbox", href: "#inbox", badge: "12" },
      { label: "Proyectos", href: "#projects" },
      { label: "Deployments", href: "#deployments" },
    ] },
    { title: "Cuenta", items: [
      { label: "Ajustes", href: "#settings" },
      { label: "Facturación", href: "#billing" },
    ] },
  ];
</script>

<div class="demo-sidebar">
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div onclick={(e) => e.preventDefault()}><Sidebar {sections} {active} label="Demo" onnavigate={(h) => (active = h)} /></div>
</div>
