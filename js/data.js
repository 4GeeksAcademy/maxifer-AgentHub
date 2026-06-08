export const navSections = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard", subtitle: "Overview operativo" },
  { id: "users", label: "Gestión de usuarios", icon: "users", subtitle: "Usuarios, planes y estado" },
  { id: "agents", label: "Gestión de agentes", icon: "bot", subtitle: "Configuración y skills" },
  { id: "skills", label: "Skills", icon: "sparkles", subtitle: "Capacidades disponibles" },
  { id: "rentals", label: "Contrataciones", icon: "file-text", subtitle: "Contratos activos e históricos" },
  { id: "errors", label: "Log de errores", icon: "triangle-alert", subtitle: "Incidencias y diagnóstico" },
];

export const metrics = [
  { id: "revenue", label: "Total Revenue", value: "$128,450", icon: "trending-up", tone: "emerald" },
  { id: "discountLoss", label: "Discount Losses", value: "$12,780", icon: "badge-dollar-sign", tone: "amber" },
  { id: "activeAgents", label: "Active Agents", value: "42", icon: "bot", tone: "cyan" },
  { id: "failingAgents", label: "Failing Agents", value: "5", icon: "siren", tone: "rose" },
];

export const users = [
  {
    id: "u1",
    name: "Ana Torres",
    email: "ana.torres@novacorp.com",
    plan: "Enterprise",
    status: "Active",
    registeredAt: "2025-11-02",
    lastAccess: "2026-06-08 09:22",
  },
  {
    id: "u2",
    name: "Luis Peña",
    email: "luis.pena@northfield.io",
    plan: "Pro",
    status: "Trial",
    registeredAt: "2026-04-15",
    lastAccess: "2026-06-07 18:11",
  },
  {
    id: "u3",
    name: "María Cedeño",
    email: "maria.cedeno@contoso.ai",
    plan: "Starter",
    status: "Suspended",
    registeredAt: "2025-08-20",
    lastAccess: "2026-05-28 12:40",
  },
  {
    id: "u4",
    name: "Jorge Salas",
    email: "jorge.salas@acme.dev",
    plan: "Pro",
    status: "Active",
    registeredAt: "2024-12-10",
    lastAccess: "2026-06-08 07:55",
  },
  {
    id: "u5",
    name: "Camila Ríos",
    email: "camila.rios@futura.mx",
    plan: "Enterprise",
    status: "Active",
    registeredAt: "2026-01-08",
    lastAccess: "2026-06-08 10:04",
  },
];

export const agents = [
  {
    id: "a1",
    name: "Sales Closer GPT",
    owner: "Ana Torres",
    status: "Active",
    skills: ["Lead Qualification", "CRM Updates", "Email Drafting"],
    prompt: "Act as a senior B2B closer. Qualify leads, summarize objections, and draft concise follow-up actions.",
  },
  {
    id: "a2",
    name: "Ops Coordinator",
    owner: "Jorge Salas",
    status: "Inactive",
    skills: ["Calendar Management", "Task Routing", "Slack Summaries"],
    prompt: "Coordinate operations by prioritizing tasks, aligning schedules, and escalating blockers quickly.",
  },
  {
    id: "a3",
    name: "Support Sentinel",
    owner: "Camila Ríos",
    status: "Failing",
    skills: ["Ticket Classification", "Knowledge Base Lookup", "Auto Replies"],
    prompt: "Respond with empathy, classify incident severity, and propose first-response troubleshooting steps.",
  },
  {
    id: "a4",
    name: "Compliance Reader",
    owner: "Luis Peña",
    status: "Active",
    skills: ["Document Parsing", "Policy Validation", "Risk Flags"],
    prompt: "Review policies, flag compliance risks, and provide concise clauses with references for legal review.",
  },
];

export const skillsCatalog = [
  {
    id: "s1",
    name: "Web Navigation",
    description: "Permite navegar sitios web, extraer información y completar formularios.",
    fullDescription: "La skill de Web Navigation habilita al agente para interactuar con páginas web, analizar su contenido y ejecutar flujos guiados.",
    useCases: "Monitoreo de precios, extracción de leads, verificación de datos públicos.",
    enabledBy: 18,
  },
  {
    id: "s2",
    name: "Document Reader",
    description: "Lee PDFs y documentos de texto para sintetizar hallazgos clave.",
    fullDescription: "Document Reader convierte contenido estructurado y no estructurado en resúmenes accionables manteniendo trazabilidad.",
    useCases: "Análisis de contratos, due diligence documental, resúmenes ejecutivos.",
    enabledBy: 26,
  },
  {
    id: "s3",
    name: "Calendar Ops",
    description: "Gestiona agenda, disponibilidad y reprogramaciones con contexto.",
    fullDescription: "Calendar Ops permite al agente orquestar reuniones, validar conflictos y priorizar slots según reglas de negocio.",
    useCases: "Scheduling comercial, coordinación inter-equipos, recordatorios automáticos.",
    enabledBy: 14,
  },
  {
    id: "s4",
    name: "CRM Sync",
    description: "Actualiza registros de clientes y oportunidades en tiempo real.",
    fullDescription: "CRM Sync mantiene consistencia de datos comerciales y dispara eventos automáticos según cambios de estado.",
    useCases: "Actualización de pipeline, handoff ventas-soporte, reporting confiable.",
    enabledBy: 21,
  },
];

export const contracts = [
  {
    id: "c1",
    client: "NovaCorp",
    agent: "Sales Closer GPT",
    skills: ["CRM Sync", "Calendar Ops"],
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    totalPaid: "$18,000",
    breakdown: [
      { skill: "CRM Sync", price: "$10,000" },
      { skill: "Calendar Ops", price: "$8,000" },
    ],
  },
  {
    id: "c2",
    client: "Contoso AI",
    agent: "Compliance Reader",
    skills: ["Document Reader", "Web Navigation"],
    startDate: "2026-02-15",
    endDate: "2026-08-15",
    totalPaid: "$22,500",
    breakdown: [
      { skill: "Document Reader", price: "$14,000" },
      { skill: "Web Navigation", price: "$8,500" },
    ],
  },
  {
    id: "c3",
    client: "Futura MX",
    agent: "Support Sentinel",
    skills: ["Document Reader", "CRM Sync"],
    startDate: "2026-03-10",
    endDate: "2026-09-10",
    totalPaid: "$15,200",
    breakdown: [
      { skill: "Document Reader", price: "$8,200" },
      { skill: "CRM Sync", price: "$7,000" },
    ],
  },
  {
    id: "c4",
    client: "Northfield",
    agent: "Ops Coordinator",
    skills: ["Calendar Ops", "Web Navigation"],
    startDate: "2026-04-01",
    endDate: "2026-12-31",
    totalPaid: "$19,400",
    breakdown: [
      { skill: "Calendar Ops", price: "$9,400" },
      { skill: "Web Navigation", price: "$10,000" },
    ],
  },
];

export const errors = [
  {
    id: "e1",
    timestamp: "2026-06-08 09:12:44",
    agentName: "Support Sentinel",
    type: "Critical",
    description: "Timeout connecting to CRM provider after 3 retries.",
    stackTrace: "Error: ETIMEDOUT at syncContact (/core/crm.js:88) at runPipeline (/core/runner.js:120)",
  },
  {
    id: "e2",
    timestamp: "2026-06-08 08:57:10",
    agentName: "Ops Coordinator",
    type: "Warning",
    description: "Calendar API quota near limit for tenant northfield.",
    stackTrace: "Warning: quotaThresholdReached at calendarSync (/services/calendar.js:56)",
  },
  {
    id: "e3",
    timestamp: "2026-06-08 08:20:03",
    agentName: "Compliance Reader",
    type: "Info",
    description: "Policy cache refreshed successfully after invalidation.",
    stackTrace: "Info: cacheRefresh completed in 214ms",
  },
  {
    id: "e4",
    timestamp: "2026-06-07 22:41:19",
    agentName: "Sales Closer GPT",
    type: "Warning",
    description: "Incomplete lead profile detected, fallback script used.",
    stackTrace: "Warning: missingField(company_size) at qualificationFlow (/flows/sales.js:44)",
  },
  {
    id: "e5",
    timestamp: "2026-06-07 21:06:38",
    agentName: "Support Sentinel",
    type: "Critical",
    description: "Prompt injection pattern flagged in incoming message.",
    stackTrace: "Error: securityPolicyViolation at sanitizeInput (/security/promptGuard.js:31)",
  },
  {
    id: "e6",
    timestamp: "2026-06-07 19:33:05",
    agentName: "Compliance Reader",
    type: "Info",
    description: "Nightly audit report generated and archived.",
    stackTrace: "Info: auditJob archive completed for tenant contoso",
  },
];
