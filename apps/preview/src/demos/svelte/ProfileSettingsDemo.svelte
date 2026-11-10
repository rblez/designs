<script lang="ts">
  import { ProfileSettings } from "@rblez-ui/svelte";
  import { profile, sections, tabs, footer } from "../settingsData";
  let active = $state("settings");
</script>

<ProfileSettings {profile} {sections} {tabs} {footer} bind:activeTab={active}
  onselect={(item) => console.log(item.id)} />
