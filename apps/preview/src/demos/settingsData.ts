import type { SettingsProfile, SettingsSection, SettingsTab } from "@rblez-ui/tokens";

export const profile: SettingsProfile = { name: "Ray", phone: "+1 555 010 0199", username: "rblez", avatar: "/ui/isotipo-avatar.svg" };

export const sections: SettingsSection[] = [
  { title: "Cuentas", items: [{ id: "tiendly", label: "Tiendly", icon: "storefront", color: "green", badge: 2, chevron: true }] },
  { items: [
    { id: "account", label: "Cuenta", description: "Número, nombre de usuario, biografía", icon: "userCircle", color: "blue" },
    { id: "chats", label: "Ajustes de chats", description: "Fondo, modo nocturno, animaciones", icon: "chatBubble", color: "orange" },
    { id: "privacy", label: "Privacidad y seguridad", description: "Últ. vez, dispositivos, llaves de acceso", icon: "key", color: "green" },
    { id: "notifications", label: "Notificaciones", description: "Sonidos, llamadas, distintivos", icon: "speakerWave", color: "red" },
    { id: "data", label: "Datos y almacenamiento", description: "Ajustes de la descarga de la multimedia", icon: "chartPie", color: "indigo" },
    { id: "folders", label: "Carpetas de chats", description: "Ordena los chats en carpetas", icon: "folder", color: "sky" },
    { id: "devices", label: "Dispositivos", description: "Gestiona los dispositivos conectados", icon: "computer", color: "cyan" },
    { id: "power", label: "Ahorro de energía", description: "Reduce el consumo con carga baja", icon: "battery", color: "orange" },
    { id: "language", label: "Idioma", description: "Español", icon: "globe", color: "violet" },
  ] },
  { items: [
    { id: "premium", label: "Premium", icon: "star", color: "purple" },
    { id: "stars", label: "Estrellas", icon: "star", color: "amber" },
    { id: "business", label: "Business", icon: "storefront", color: "rose" },
    { id: "gift", label: "Enviar un regalo", icon: "gift", color: "orange" },
  ] },
  { title: "Ayuda", items: [
    { id: "ask", label: "Hacer una pregunta", icon: "chatEllipsis", color: "amber" },
    { id: "faq", label: "Preguntas frecuentes", icon: "question", color: "sky" },
    { id: "features", label: "Funciones", icon: "lightbulb", color: "violet" },
    { id: "policy", label: "Política de privacidad", icon: "shieldCheck", color: "green" },
  ] },
];

export const tabs: SettingsTab[] = [
  { id: "chats", label: "Chats", icon: "chats", badge: 11 },
  { id: "contacts", label: "Contactos", icon: "userCircle" },
  { id: "settings", label: "Ajustes", icon: "cog" },
  { id: "profile", label: "Perfil", image: "/ui/isotipo-avatar.svg" },
];

export const footer = "rblez-ui v0.1 · ProfileSettings";
