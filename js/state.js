export const state = {
  activeSection: "dashboard",
  theme: "light",
  openDropdownId: null,
  openModal: null,
  expandedAgentIds: new Set(),
};

const THEME_KEY = "agenthub-theme";

export function initializeTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  state.theme = saved === "dark" ? "dark" : "light";
  applyThemeClass();
  return state.theme;
}

export function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, state.theme);
  applyThemeClass();
  return state.theme;
}

export function setActiveSection(sectionId) {
  state.activeSection = sectionId;
}

export function setOpenDropdown(dropdownId) {
  state.openDropdownId = dropdownId;
}

export function clearOpenDropdown() {
  state.openDropdownId = null;
}

export function setOpenModal(modalPayload) {
  state.openModal = modalPayload;
}

export function clearOpenModal() {
  state.openModal = null;
}

export function toggleAgentExpansion(agentId) {
  if (state.expandedAgentIds.has(agentId)) {
    state.expandedAgentIds.delete(agentId);
    return false;
  }

  state.expandedAgentIds.add(agentId);
  return true;
}

function applyThemeClass() {
  const root = document.documentElement;
  if (state.theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}
