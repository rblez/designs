import type { FooterColumn, FooterLink } from "@rblez-ui/tokens";

export const columns: FooterColumn[] = [
  { title: "Product", links: [
    { label: "Intake", href: "#" }, { label: "Plan", href: "#" }, { label: "AI", href: "#" },
    { label: "Build", href: "#" }, { label: "Pricing", href: "#" }, { label: "Security", href: "#" } ] },
  { title: "Features", links: [
    { label: "Asks", href: "#" }, { label: "Agents", href: "#" }, { label: "Cloud Coding Agent", href: "#" },
    { label: "Customer Requests", href: "#" }, { label: "Insights", href: "#" }, { label: "Mobile", href: "#" },
    { label: "Integrations", href: "#" }, { label: "Changelog", href: "#" } ] },
  { title: "Company", links: [
    { label: "About", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" },
    { label: "Now", href: "#" }, { label: "Method", href: "#" }, { label: "Quality", href: "#" }, { label: "Brand", href: "#" } ] },
  { title: "Resources", links: [
    { label: "Switch", href: "#" }, { label: "Download", href: "#" }, { label: "Documentation", href: "#" },
    { label: "Developers", href: "#" }, { label: "Enterprise", href: "#" }, { label: "Startups", href: "#" },
    { label: "Status", href: "#" }, { label: "Legal", href: "#" } ] },
  { title: "Connect", links: [
    { label: "Contact us", href: "#" }, { label: "Community", href: "#" }, { label: "X (Twitter)", href: "#" },
    { label: "GitHub", href: "#" }, { label: "YouTube", href: "#" } ] },
];

export const legal: FooterLink[] = [
  { label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Other Policies", href: "#" },
  { label: "DPA", href: "#" }, { label: "AUP", href: "#" },
];
