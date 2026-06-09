import {
  clearOpenDropdown,
  clearOpenModal,
  initializeTheme,
  setActiveSection,
  setOpenDropdown,
  setOpenModal,
  state,
  toggleAgentExpansion,
  toggleTheme,
} from "./state.js";
import { runIconRender } from "./components.js";
import { getSectionMeta, renderSection, renderSidebar, buildModal } from "./views.js";

const sidebarNav = document.getElementById("sidebarNav");
const mobileNavToggle = document.getElementById("mobileNavToggle");
const appContent = document.getElementById("appContent");
const modalRoot = document.getElementById("modalRoot");
const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = document.getElementById("themeToggleText");

function refreshLayout() {
  sidebarNav.innerHTML = renderSidebar(state.activeSection);
  appContent.innerHTML = renderSection(state.activeSection, state.expandedAgentIds);

  const meta = getSectionMeta(state.activeSection);
  sectionTitle.textContent = meta.label;
  sectionSubtitle.textContent = meta.subtitle;

  updateDropdownVisibility();
  refreshModal();
  updateThemeLabel();
  runIconRender();
}

function updateThemeLabel() {
  themeToggleText.textContent = state.theme === "dark" ? "Light" : "Dark";
  const iconHolder = themeToggle.querySelector("i");
  if (iconHolder) {
    iconHolder.setAttribute("data-lucide", state.theme === "dark" ? "sun" : "moon");
  }
}

function refreshModal() {
  modalRoot.innerHTML = buildModal(state.openModal);
  runIconRender();
}

function updateDropdownVisibility() {
  document.querySelectorAll("[data-dropdown-menu]").forEach((menu) => {
    const id = menu.getAttribute("data-dropdown-menu");
    const isOpen = id === state.openDropdownId;
    menu.classList.toggle("hidden", !isOpen);
    menu.classList.toggle("pointer-events-none", !isOpen);

    const trigger = document.querySelector(`[data-dropdown-trigger="${id}"]`);
    if (trigger) {
      trigger.setAttribute("aria-expanded", String(isOpen));
    }
  });
}

function setThemeFromToggle() {
  toggleTheme();
  updateThemeLabel();
  runIconRender();
}

function handleDocumentClick(event) {
  const navButton = event.target.closest("[data-nav-section]");
  if (navButton) {
    const sectionId = navButton.getAttribute("data-nav-section");
    if (sectionId) {
      setActiveSection(sectionId);
      clearOpenDropdown();
      refreshLayout();
      sidebarNav.classList.add("hidden");
      sidebarNav.classList.remove("block");
    }
    return;
  }

  const dropdownTrigger = event.target.closest("[data-dropdown-trigger]");
  if (dropdownTrigger) {
    const dropdownId = dropdownTrigger.getAttribute("data-dropdown-trigger");
    setOpenDropdown(state.openDropdownId === dropdownId ? null : dropdownId);
    updateDropdownVisibility();
    return;
  }

  const dropdownMenu = event.target.closest("[data-dropdown-menu]");
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.getAttribute("data-action");
    const rowId = actionButton.getAttribute("data-row-id");

    if (action) {
      const inertVisualActions = new Set(["settings-view", "logout-confirm"]);
      const tableModalActions = new Set(["user-view", "agent-configure", "skill-view", "contract-view", "error-view"]);
      const accountModalActions = new Set(["profile-view"]);

      if (inertVisualActions.has(action)) {
        return;
      }

      if (tableModalActions.has(action) && rowId) {
        setOpenModal({ type: action, rowId });
      } else if (accountModalActions.has(action)) {
        setOpenModal({ type: action });
      } else if (action === "logout-prototype") {
        // Keep logout as visual-only prototype: close the modal without side effects.
        clearOpenModal();
      }
    }

    clearOpenDropdown();
    updateDropdownVisibility();
    refreshModal();
    return;
  }

  if (!dropdownMenu && !dropdownTrigger && state.openDropdownId) {
    clearOpenDropdown();
    updateDropdownVisibility();
  }

  const agentToggle = event.target.closest("[data-agent-toggle]");
  if (agentToggle) {
    const agentId = agentToggle.getAttribute("data-agent-toggle");
    if (agentId) {
      toggleAgentExpansion(agentId);
      appContent.innerHTML = renderSection(state.activeSection, state.expandedAgentIds);
      updateDropdownVisibility();
      runIconRender();
    }
  }

  const modalClose = event.target.closest("[data-modal-close]");
  if (modalClose) {
    clearOpenModal();
    refreshModal();
    return;
  }

  const modalBackdrop = event.target.closest("[data-modal-backdrop]");
  if (modalBackdrop && event.target === modalBackdrop) {
    clearOpenModal();
    refreshModal();
  }
}

function bootstrap() {
  initializeTheme();
  refreshLayout();

  themeToggle.addEventListener("click", setThemeFromToggle);
  mobileNavToggle.addEventListener("click", () => {
    sidebarNav.classList.toggle("hidden");
    sidebarNav.classList.toggle("block");
  });

  document.addEventListener("click", handleDocumentClick);
}

bootstrap();
