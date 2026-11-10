import { ProfileSettings } from "@rblez-ui/react";
import { profile, sections, tabs, footer } from "../settingsData";

export default function ProfileSettingsDemo() {
  return <ProfileSettings profile={profile} sections={sections} tabs={tabs} footer={footer}
    defaultTab="settings" onSelect={(item) => console.log(item.id)} />;
}
