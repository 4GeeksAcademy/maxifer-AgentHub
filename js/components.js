const toneClasses = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
  amber: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-500/30",
  rose: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30",
  slate: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700/30 dark:text-slate-300 dark:ring-slate-700",
};

const statusBadgeClasses = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  Suspended: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  Trial: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  Inactive: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  Failing: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
};

const errorBadgeClasses = {
  Critical: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  Warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  Info: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
};

export function getMetricTone(tone) {
  return toneClasses[tone] || toneClasses.slate;
}

export function statusBadge(text) {
  const classes = statusBadgeClasses[text] || statusBadgeClasses.Inactive;
  return `<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${classes}">${text}</span>`;
}

export function errorTypeBadge(text) {
  const classes = errorBadgeClasses[text] || errorBadgeClasses.Info;
  return `<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${classes}">${text}</span>`;
}

export function actionDropdown(dropdownId, items) {
  const options = items
    .map(
      (item) =>
        `<button class="block w-full px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" data-action="${item.action}" data-row-id="${item.rowId}">${item.label}</button>`,
    )
    .join("");

  return `
    <div class="relative" data-dropdown="${dropdownId}">
      <button class="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" data-dropdown-trigger="${dropdownId}" aria-expanded="false" aria-label="Open actions">
        <i data-lucide="ellipsis" class="h-4 w-4"></i>
      </button>
      <div class="pointer-events-none absolute right-0 z-20 mt-2 hidden min-w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900" data-dropdown-menu="${dropdownId}">
        ${options}
      </div>
    </div>
  `;
}

export function cardShell(content) {
  return `<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">${content}</div>`;
}

export function modalTemplate(title, content) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" data-modal-backdrop>
      <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <h3 class="text-lg font-semibold">${title}</h3>
          <button class="rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" data-modal-close aria-label="Close modal">
            <i data-lucide="x" class="h-4 w-4"></i>
          </button>
        </div>
        <div class="px-5 py-4">${content}</div>
      </div>
    </div>
  `;
}

export function tableWrapper(headers, rowsHtml) {
  const head = headers
    .map((header) => `<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">${header}</th>`)
    .join("");

  return `
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead class="bg-slate-50 dark:bg-slate-900/60">
            <tr>${head}</tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function runIconRender() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}
