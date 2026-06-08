import { agents, contracts, errors, metrics, navSections, skillsCatalog, users } from "./data.js";
import { actionDropdown, cardShell, errorTypeBadge, getMetricTone, modalTemplate, statusBadge, tableWrapper } from "./components.js";

function metricCard(metric) {
  return cardShell(`
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${metric.label}</p>
        <p class="mt-2 text-3xl font-bold tracking-tight">${metric.value}</p>
      </div>
      <div class="rounded-xl p-3 ring-1 ${getMetricTone(metric.tone)}">
        <i data-lucide="${metric.icon}" class="h-5 w-5"></i>
      </div>
    </div>
  `);
}

function renderDashboard() {
  const cards = metrics.map(metricCard).join("");

  return `
    <section class="space-y-6" data-view="dashboard">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">${cards}</div>
      <div class="flex min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Weekly Activity Chart
      </div>
    </section>
  `;
}

function renderUsers() {
  const rows = users
    .map(
      (user) => `
      <tr>
        <td class="px-4 py-3 text-sm font-medium">${user.name}</td>
        <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">${user.email}</td>
        <td class="px-4 py-3 text-sm">${user.plan}</td>
        <td class="px-4 py-3">${statusBadge(user.status)}</td>
        <td class="px-4 py-3 text-right">
          ${actionDropdown(`users-${user.id}`, [
            { action: "user-view", label: "Ver detalle", rowId: user.id },
            { action: "user-delete", label: "Eliminar", rowId: user.id },
          ])}
        </td>
      </tr>
    `,
    )
    .join("");

  return `
    <section class="space-y-4" data-view="users">
      ${tableWrapper(["Name", "Email", "Plan", "Status", "Actions"], rows)}
    </section>
  `;
}

function renderAgents(expandedIds) {
  const cards = agents
    .map((agent) => {
      const expanded = expandedIds.has(agent.id);
      const containerClasses = expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0";
      const icon = expanded ? "chevron-up" : "chevron-down";

      return `
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 class="text-lg font-semibold">${agent.name}</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">Owner: ${agent.owner}</p>
            </div>
            <div class="flex items-center gap-2">
              ${statusBadge(agent.status)}
              ${actionDropdown(`agents-${agent.id}`, [
                { action: "agent-configure", label: "Configurar", rowId: agent.id },
                { action: "agent-delete", label: "Eliminar", rowId: agent.id },
              ])}
            </div>
          </div>
          <button class="mt-4 inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800" data-agent-toggle="${agent.id}">
            <i data-lucide="${icon}" class="h-4 w-4"></i>
            ${expanded ? "Ocultar skills" : "Ver skills"}
          </button>
          <div class="overflow-hidden transition-all duration-300 ${containerClasses}">
            <ul class="mt-3 space-y-2 border-t border-slate-200 pt-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              ${agent.skills.map((skill) => `<li class="rounded-md bg-slate-100 px-3 py-2 dark:bg-slate-800">${skill}</li>`).join("")}
            </ul>
          </div>
        </article>
      `;
    })
    .join("");

  return `<section class="space-y-4" data-view="agents">${cards}</section>`;
}

function renderSkills() {
  const cards = skillsCatalog
    .map(
      (skill) => `
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h4 class="text-lg font-semibold">${skill.name}</h4>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">${skill.description}</p>
            <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Enabled by ${skill.enabledBy} agents</p>
          </div>
          ${actionDropdown(`skills-${skill.id}`, [
            { action: "skill-view", label: "Ver detalle", rowId: skill.id },
            { action: "skill-delete", label: "Eliminar", rowId: skill.id },
          ])}
        </div>
      </article>
    `,
    )
    .join("");

  return `
    <section class="space-y-4" data-view="skills">
      <div class="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900 dark:border-cyan-700/40 dark:bg-cyan-500/10 dark:text-cyan-200">
        Una skill representa una capacidad adicional que puede ser asignada a un agente para ampliar sus funcionalidades.
      </div>
      <div class="grid gap-4 lg:grid-cols-2">${cards}</div>
    </section>
  `;
}

function renderRentals() {
  const rows = contracts
    .map(
      (contract) => `
      <tr>
        <td class="px-4 py-3 text-sm font-medium">${contract.client}</td>
        <td class="px-4 py-3 text-sm">${contract.agent}</td>
        <td class="px-4 py-3 text-sm">
          <div class="flex flex-wrap gap-1">
            ${contract.skills.map((skill) => `<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs dark:bg-slate-800">${skill}</span>`).join("")}
          </div>
        </td>
        <td class="px-4 py-3 text-sm">${contract.startDate}</td>
        <td class="px-4 py-3 text-sm">${contract.endDate}</td>
        <td class="px-4 py-3 text-sm font-semibold">${contract.totalPaid}</td>
        <td class="px-4 py-3 text-right">
          ${actionDropdown(`contracts-${contract.id}`, [{ action: "contract-view", label: "Ver detalle", rowId: contract.id }])}
        </td>
      </tr>
    `,
    )
    .join("");

  return `
    <section class="space-y-4" data-view="rentals">
      ${tableWrapper(["Client", "Agent", "Skills", "Start Date", "End Date", "Total Paid", "Actions"], rows)}
    </section>
  `;
}

function renderErrors() {
  const rows = errors
    .map(
      (entry) => `
      <tr>
        <td class="px-4 py-3 text-sm">${entry.timestamp}</td>
        <td class="px-4 py-3 text-sm font-medium">${entry.agentName}</td>
        <td class="px-4 py-3">${errorTypeBadge(entry.type)}</td>
        <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">${entry.description}</td>
        <td class="px-4 py-3 text-right">
          ${actionDropdown(`errors-${entry.id}`, [
            { action: "error-view", label: "Ver detalle", rowId: entry.id },
            { action: "error-resolve", label: "Marcar como resuelto", rowId: entry.id },
          ])}
        </td>
      </tr>
    `,
    )
    .join("");

  return `
    <section class="space-y-4" data-view="errors">
      ${tableWrapper(["Timestamp", "Agent", "Error Type", "Description", "Actions"], rows)}
    </section>
  `;
}

export function getSectionMeta(sectionId) {
  return navSections.find((section) => section.id === sectionId) || navSections[0];
}

export function renderSidebar(activeSection) {
  return navSections
    .map((section) => {
      const active = section.id === activeSection;
      const classes = active
        ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";
      return `
        <button class="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${classes}" data-nav-section="${section.id}">
          <i data-lucide="${section.icon}" class="h-4 w-4"></i>
          ${section.label}
        </button>
      `;
    })
    .join("");
}

export function renderSection(sectionId, expandedIds) {
  switch (sectionId) {
    case "users":
      return renderUsers();
    case "agents":
      return renderAgents(expandedIds);
    case "skills":
      return renderSkills();
    case "rentals":
      return renderRentals();
    case "errors":
      return renderErrors();
    case "dashboard":
    default:
      return renderDashboard();
  }
}

export function buildModal(modalData) {
  if (!modalData) {
    return "";
  }

  if (modalData.type === "user-view") {
    const user = users.find((item) => item.id === modalData.rowId);
    if (!user) return "";

    return modalTemplate(
      "Detalle de usuario",
      `
      <dl class="grid gap-3 text-sm sm:grid-cols-2">
        <div><dt class="font-semibold text-slate-500 dark:text-slate-400">Nombre</dt><dd>${user.name}</dd></div>
        <div><dt class="font-semibold text-slate-500 dark:text-slate-400">Email</dt><dd>${user.email}</dd></div>
        <div><dt class="font-semibold text-slate-500 dark:text-slate-400">Plan</dt><dd>${user.plan}</dd></div>
        <div><dt class="font-semibold text-slate-500 dark:text-slate-400">Estado</dt><dd>${statusBadge(user.status)}</dd></div>
        <div><dt class="font-semibold text-slate-500 dark:text-slate-400">Fecha de registro</dt><dd>${user.registeredAt}</dd></div>
        <div><dt class="font-semibold text-slate-500 dark:text-slate-400">Último acceso</dt><dd>${user.lastAccess}</dd></div>
      </dl>
    `,
    );
  }

  if (modalData.type === "agent-configure") {
    const agent = agents.find((item) => item.id === modalData.rowId);
    if (!agent) return "";

    return modalTemplate(
      `Configurar ${agent.name}`,
      `
      <div class="space-y-4">
        <div>
          <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Nombre del agente</p>
          <p class="mt-1 text-base">${agent.name}</p>
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-500 dark:text-slate-400" for="agentPrompt">System Prompt</label>
          <textarea id="agentPrompt" class="h-44 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900" spellcheck="false">${agent.prompt}</textarea>
        </div>
      </div>
    `,
    );
  }

  if (modalData.type === "skill-view") {
    const skill = skillsCatalog.find((item) => item.id === modalData.rowId);
    if (!skill) return "";

    return modalTemplate(
      `Detalle de skill: ${skill.name}`,
      `
      <div class="space-y-4 text-sm">
        <div>
          <p class="font-semibold text-slate-500 dark:text-slate-400">Descripción completa</p>
          <p class="mt-1">${skill.fullDescription}</p>
        </div>
        <div>
          <p class="font-semibold text-slate-500 dark:text-slate-400">Casos de uso</p>
          <p class="mt-1">${skill.useCases}</p>
        </div>
        <div>
          <p class="font-semibold text-slate-500 dark:text-slate-400">Agentes habilitados</p>
          <p class="mt-1">${skill.enabledBy}</p>
        </div>
      </div>
    `,
    );
  }

  if (modalData.type === "contract-view") {
    const contract = contracts.find((item) => item.id === modalData.rowId);
    if (!contract) return "";

    const breakdownRows = contract.breakdown
      .map(
        (item) => `
        <tr>
          <td class="px-3 py-2 text-sm">${item.skill}</td>
          <td class="px-3 py-2 text-right text-sm font-semibold">${item.price}</td>
        </tr>
      `,
      )
      .join("");

    return modalTemplate(
      `Contrato ${contract.client} - ${contract.agent}`,
      `
      <div class="space-y-4 text-sm">
        <div class="grid gap-3 sm:grid-cols-2">
          <div><p class="font-semibold text-slate-500 dark:text-slate-400">Cliente</p><p>${contract.client}</p></div>
          <div><p class="font-semibold text-slate-500 dark:text-slate-400">Agente</p><p>${contract.agent}</p></div>
          <div><p class="font-semibold text-slate-500 dark:text-slate-400">Inicio</p><p>${contract.startDate}</p></div>
          <div><p class="font-semibold text-slate-500 dark:text-slate-400">Fin</p><p>${contract.endDate}</p></div>
          <div><p class="font-semibold text-slate-500 dark:text-slate-400">Total Paid</p><p>${contract.totalPaid}</p></div>
        </div>
        <div>
          <p class="mb-2 font-semibold text-slate-500 dark:text-slate-400">Skill breakdown</p>
          <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <table class="min-w-full">
              <thead class="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th class="px-3 py-2 text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Skill</th>
                  <th class="px-3 py-2 text-right text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Price</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700">${breakdownRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    `,
    );
  }

  if (modalData.type === "error-view") {
    const entry = errors.find((item) => item.id === modalData.rowId);
    if (!entry) return "";

    return modalTemplate(
      `Error detail: ${entry.agentName}`,
      `
      <div class="space-y-4 text-sm">
        <div><p class="font-semibold text-slate-500 dark:text-slate-400">Timestamp</p><p>${entry.timestamp}</p></div>
        <div><p class="font-semibold text-slate-500 dark:text-slate-400">Agente</p><p>${entry.agentName}</p></div>
        <div><p class="font-semibold text-slate-500 dark:text-slate-400">Tipo</p><p>${errorTypeBadge(entry.type)}</p></div>
        <div><p class="font-semibold text-slate-500 dark:text-slate-400">Descripción</p><p>${entry.description}</p></div>
        <div>
          <p class="font-semibold text-slate-500 dark:text-slate-400">Stack trace</p>
          <pre class="mt-1 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">${entry.stackTrace}</pre>
        </div>
      </div>
    `,
    );
  }

  return "";
}
