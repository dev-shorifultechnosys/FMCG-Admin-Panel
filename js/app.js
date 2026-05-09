/* AgriFlow FMCG Admin Panel Prototype v2
   Full static HTML/CSS/JS package with login, settings, working inventory states,
   sector-wise navigation, live dashboard, reports and export actions. */

const SECTORS = [
  {
    title: "Dashboard",
    items: [
      { id: "overview", label: "Live Dashboard", icon: "LD" },
      { id: "reports", label: "All Sector Reports", icon: "AR" }
    ]
  },
  {
    title: "Farm Sourcing",
    items: [
      { id: "procurement", label: "Procurement & Farmers", icon: "PF" },
      { id: "logistics", label: "Logistics & Gate", icon: "LG" },
      { id: "qc", label: "QC Processing", icon: "QC" }
    ]
  },
  {
    title: "Factory Operations",
    items: [
      { id: "production", label: "Production Processing", icon: "PR" },
      { id: "inventory", label: "Inventory Tracking", icon: "IN" },
      { id: "warehouse", label: "Warehouse", icon: "WH" },
      { id: "maintenance", label: "Maintenance", icon: "MT" }
    ]
  },
  {
    title: "Commercial",
    items: [
      { id: "orders", label: "Sales & Orders", icon: "SO" }
    ]
  },
  {
    title: "Control Center",
    items: [
      { id: "users", label: "User Management", icon: "UM" },
      { id: "settings", label: "Settings Panel", icon: "ST" }
    ]
  },
  {
    title: "Prototype",
    items: [
      { id: "flows", label: "Flow Diagrams", icon: "FL" },
      { id: "handoff", label: "Dev Handoff", icon: "HD" }
    ]
  }
];

const demo = {
  farmers: [
    { id: "FARM-1042", name: "Nakuru Green Farms", group: "High-yield Hass", product: "Avocado Hass", qty: 18000, rate: 1980, delivery: "Tomorrow 08:00", score: 94, status: "Shortlisted" },
    { id: "FARM-0928", name: "Red Road Coop", group: "Red-soil route", product: "Avocado Fuerte", qty: 12500, rate: 1870, delivery: "Today 16:00", score: 89, status: "Review" },
    { id: "FARM-0771", name: "Kijani Village Group", group: "Village cluster", product: "Avocado Hass", qty: 22000, rate: 2060, delivery: "May 12 10:00", score: 91, status: "Shortlisted" },
    { id: "FARM-0614", name: "Amani Agro", group: "Mixed grade", product: "Avocado Mixed", qty: 8400, rate: 1760, delivery: "Late risk", score: 72, status: "Risk" }
  ],
  procurement: [
    { id: "REQ-2415", product: "Avocado Hass", qty: 24000, rate: 1950, timeline: "2026-05-10 08:00", channel: "App, SMS, WhatsApp", responses: 38, status: "Broadcasted" },
    { id: "REQ-2414", product: "Avocado Fuerte", qty: 9000, rate: 1850, timeline: "2026-05-11 10:00", channel: "WhatsApp", responses: 14, status: "Comparing" }
  ],
  inventory: [
    { id: "BCH-AVO-2408", item: "Hass Avocado Raw", category: "Raw Material", location: "Cold Zone A-02", qty: 18400, min: 12000, max: 30000, status: "Healthy", qc: "Passed", supplier: "Nakuru Green Farms", age: "1 day", fefo: "2026-05-13", reserved: 0 },
    { id: "BCH-AVO-2396", item: "Fuerte Avocado Raw", category: "Raw Material", location: "Cold Zone B-04", qty: 6200, min: 9000, max: 22000, status: "Low Stock", qc: "Passed", supplier: "Red Road Coop", age: "3 days", fefo: "2026-05-11", reserved: 0 },
    { id: "TANK-OIL-041", item: "Crude Avocado Oil", category: "Finished Product", location: "Tank T-04", qty: 12800, min: 10000, max: 26000, status: "Reserved", qc: "In Process", supplier: "Production Line 1", age: "12 hrs", fefo: "2026-05-28", reserved: 8000 },
    { id: "TANK-OIL-022", item: "Crude Avocado Oil", category: "Finished Product", location: "Tank T-02", qty: 7400, min: 6000, max: 18000, status: "Ready", qc: "Passed", supplier: "Production Line 2", age: "20 hrs", fefo: "2026-05-27", reserved: 5400 },
    { id: "SP-VALVE-09", item: "Steam Valve Spare", category: "Maintenance Spare", location: "Maintenance Cage", qty: 7, min: 10, max: 40, status: "Reorder", qc: "NA", supplier: "Parts Vendor", age: "22 days", fefo: "NA", reserved: 0 }
  ],
  orders: [
    { id: "ORD-8801", buyer: "Kampala Foods Ltd", product: "Crude Oil", qty: 8000, unit: "L", status: "Allocated", source: "T-04", delivery: "2026-05-10" },
    { id: "ORD-8802", buyer: "Lagos Natural Extracts", product: "Dry Waste", qty: 3200, unit: "kg", status: "Scheduling", source: "WH-D3", delivery: "2026-05-11" },
    { id: "ORD-8803", buyer: "Nairobi Retail Group", product: "Crude Oil", qty: 5400, unit: "L", status: "Docs Ready", source: "T-02", delivery: "2026-05-09" }
  ],
  production: [
    { id: "BCH-AVO-2408", line: "Line 1", input: 8400, output: 1562, progress: 62, stage: "Crushing", yield: 18.6, downtime: 14, tank: "T-04", status: "Running" },
    { id: "BCH-AVO-2394", line: "Line 2", input: 6200, output: 1095, progress: 100, stage: "Completed", yield: 17.7, downtime: 8, tank: "T-02", status: "Completed" }
  ],
  qc: [
    { id: "QC-7719", batch: "BCH-AVO-2408", dm: 24.8, ffa: 0.62, decision: "Approved", officer: "Amina", evidence: "3 photos" },
    { id: "QC-7718", batch: "BCH-AVO-2396", dm: 21.2, ffa: 0.71, decision: "Conditional", officer: "Kwame", evidence: "1 note" }
  ],
  gate: [
    { id: "GPN-29014", truck: "KAB-204Q", direction: "Inbound", ref: "PO-5214", supplier: "Nakuru Green Farms", status: "Verified", exception: "None", gross: 27800, tare: 9120 },
    { id: "GPN-29009", truck: "LSD-882A", direction: "Outbound", ref: "ORD-8801", supplier: "Kampala Foods Ltd", status: "Pending Exit", exception: "Docs check", gross: 19800, tare: 8800 },
    { id: "GPN-28988", truck: "ABJ-556K", direction: "Inbound", ref: "PO-5198", supplier: "Amani Agro", status: "Mismatch", exception: "Quantity variance", gross: 12040, tare: 6600 }
  ],
  maintenance: [
    { id: "INC-304", asset: "Crusher Line 1", severity: "Medium", status: "Open", issue: "Feed belt vibration increased", owner: "Musa" },
    { id: "PM-114", asset: "Separator", severity: "Low", status: "Scheduled", issue: "Preventive service", owner: "Amina" },
    { id: "SP-009", asset: "Steam Valve", severity: "High", status: "Reorder", issue: "Spare below min stock", owner: "Warehouse" }
  ],
  users: [
    { name: "Kajal Ahmed", email: "admin@agriflow.local", role: "Factory Admin", status: "Active" },
    { name: "Amina QC", email: "amina@agriflow.local", role: "QC Officer", status: "Active" },
    { name: "Kojo Gate", email: "kojo@agriflow.local", role: "Gatekeeper", status: "Active" },
    { name: "Musa Maintenance", email: "musa@agriflow.local", role: "Maintenance Supervisor", status: "Invited" }
  ]
};

const savedSettings = JSON.parse(localStorage.getItem("agriflowSettings") || "null");
const state = {
  authenticated: localStorage.getItem("agriflowLoggedIn") === "yes",
  screen: "overview",
  settingTab: "company",
  reportSector: "All",
  live: true,
  stockShift: 0,
  search: "",
  activeUser: JSON.parse(localStorage.getItem("agriflowUser") || "null") || { name: "Kajal Ahmed", role: "Factory Admin", email: "admin@agriflow.local" },
  settings: savedSettings || {
    companyName: "AgriFlow FMCG",
    factorySite: "Red Soil Processing Factory",
    currency: "₦",
    language: "English",
    lowStockBuffer: 15,
    liveRefresh: 3,
    whatsapp: true,
    sms: true,
    appPush: true,
    twoFactor: true,
    autoExport: false,
    theme: "earth"
  },
  data: JSON.parse(JSON.stringify(demo))
};

const $ = (id) => document.getElementById(id);
const fmt = (n) => new Intl.NumberFormat("en-US").format(Math.round(Number(n) || 0));
const money = (n) => `${state.settings.currency} ${fmt(n)}`;
const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0));
const avg = (arr) => arr.length ? arr.reduce((a, b) => a + Number(b), 0) / arr.length : 0;
const today = () => new Date().toISOString().slice(0, 10);

function init() {
  applyAuthState();
  renderNav();
  render();
  bindEvents();
  startClock();
}

function applyAuthState() {
  document.body.classList.toggle("is-authenticated", state.authenticated);
  if ($("brandName")) $("brandName").textContent = state.settings.companyName;
  if ($("avatar")) $("avatar").textContent = initials(state.activeUser.name || "KA");
}

function initials(name) {
  return String(name || "KA").split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();
}

function renderNav() {
  const userBlock = `<div class="user-panel"><div class="avatar">${initials(state.activeUser.name)}</div><div><strong>${state.activeUser.name}</strong><p class="card-desc" style="margin:3px 0 0;color:rgba(255,248,236,.68)">${state.activeUser.role}</p></div></div>`;
  $("mainNav").innerHTML = SECTORS.map(group => `
    <div class="nav-group">
      <div class="nav-group-title">${group.title}</div>
      ${group.items.map(item => `
        <button class="nav-item sub ${state.screen === item.id ? "active" : ""}" data-screen="${item.id}">
          <span>${item.icon}</span>${item.label}
        </button>
      `).join("")}
    </div>
  `).join("") + userBlock + `<button class="nav-item" data-action="logout"><span>LO</span>Logout</button>`;
}

function render() {
  if (!state.authenticated) return;
  const screens = {
    overview,
    procurement,
    production,
    inventory: inventoryScreen,
    orders: ordersScreen,
    logistics,
    qc,
    warehouse,
    maintenance,
    users,
    reports,
    settings,
    flows,
    handoff
  };
  $("app").innerHTML = (screens[state.screen] || overview)();
  renderNav();
  applyAuthState();
}

function pageHead(eyebrow, title, subtitle, actions = "") {
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2 class="page-title">${title}</h2>
        <p class="page-subtitle">${subtitle}</p>
      </div>
      <div class="actions">${actions}</div>
    </div>`;
}

function card(title, desc, body, className = "") {
  return `
    <section class="card ${className}">
      <div class="card-head"><div><h3 class="card-title">${title}</h3>${desc ? `<p class="card-desc">${desc}</p>` : ""}</div></div>
      <div class="card-body">${body}</div>
    </section>`;
}

function kpi(label, value, desc, delta = "live") {
  return `<section class="card pad kpi"><p class="kpi-label">${label}</p><p class="kpi-value">${value}</p><p class="card-desc">${desc}</p><span class="kpi-delta">▲ ${delta}</span></section>`;
}

function badge(text, type = "green") {
  const map = { Healthy: "green", Ready: "green", Passed: "green", Approved: "green", Verified: "green", Active: "green", Completed: "green", Running: "orange", Reserved: "orange", Scheduling: "orange", Conditional: "orange", "Docs Ready": "blue", "Pending Exit": "orange", "Low Stock": "red", Reorder: "red", Mismatch: "red", Risk: "red", Open: "orange", Scheduled: "blue", Invited: "blue" };
  return `<span class="badge ${map[text] || type}">${text}</span>`;
}

function progress(value, type = "") {
  return `<div class="progress ${type}" style="--value:${clamp(value)}%"><i></i></div>`;
}

function workflow(steps) {
  return `<section class="card pad"><div class="workflow">${steps.map((step, index) => `
    <button class="flow-step ${index === 0 ? "active" : ""}" data-action="toast" data-msg="${step} screen selected.">
      <b>${String(index + 1).padStart(2, "0")} · ${step}</b><span>Clickable prototype state</span>
    </button>`).join("")}</div></section>`;
}

function overview() {
  const raw = state.data.inventory.filter(i => i.category === "Raw Material").reduce((s, i) => s + i.qty, 0) + state.stockShift;
  const low = state.data.inventory.filter(i => i.qty <= i.min).length;
  const yieldAvg = avg(state.data.production.map(p => p.yield));
  const orderReady = state.data.orders.filter(o => ["Allocated", "Docs Ready"].includes(o.status)).length;
  return `
    <section class="card hero">
      <p class="eyebrow">${state.settings.factorySite}</p>
      <h2 class="page-title">Live dashboard for farm sourcing, factory production, inventory and dispatch.</h2>
      <p class="page-subtitle">After login this is the default view. Every sector shows live-style operational metrics, alerts, quick actions and drill-down links for factory teams.</p>
      <div class="hero-strip">
        <div class="hero-stat"><span>Raw inventory</span><strong>${fmt(raw)} kg</strong></div>
        <div class="hero-stat"><span>Production yield</span><strong id="heroYield">${yieldAvg.toFixed(1)}%</strong></div>
        <div class="hero-stat"><span>Open gate passes</span><strong>${state.data.gate.length}</strong></div>
        <div class="hero-stat"><span>Inventory alerts</span><strong>${low}</strong></div>
      </div>
    </section>
    <div style="height:18px"></div>
    <div class="summary-grid">
      <button class="summary-card" data-screen="procurement"><span>Procurement</span><strong>${state.data.procurement.length} reqs</strong></button>
      <button class="summary-card" data-screen="logistics"><span>Gate Ops</span><strong>${state.data.gate.length} GPN</strong></button>
      <button class="summary-card" data-screen="qc"><span>QC Pass Rate</span><strong>${qcPassRate()}%</strong></button>
      <button class="summary-card" data-screen="production"><span>Active Production</span><strong>${state.data.production.filter(p => p.status === "Running").length}</strong></button>
      <button class="summary-card" data-screen="inventory"><span>Stock Alerts</span><strong>${low}</strong></button>
      <button class="summary-card" data-screen="orders"><span>Orders Ready</span><strong>${orderReady}</strong></button>
    </div>
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Sector-wise Quick Control", "Dashboard buttons are grouped by sector and fully clickable.", `
        <div class="grid two">
          ${quickSector("Farm Sourcing", "Procurement, farmer responses, gate entry and QC approval.", "procurement", "Open sourcing")}
          ${quickSector("Factory Operations", "Production, warehouse, stock movement and maintenance.", "production", "Open factory")}
          ${quickSector("Inventory Tracking", "Live stock levels, alerts, batch drill-down and supply chain journey.", "inventory", "Open inventory")}
          ${quickSector("Commercial Dispatch", "Buyer orders, tank reservation, documents and outbound gate pass.", "orders", "Open orders")}
        </div>`)}
      ${card("Live Activity Feed", "Auto-updating operational events and micro-interaction feedback.", `
        <div class="timeline">
          <div class="timeline-item"><strong>QC approved BCH-AVO-2408</strong><span>GRN generated and assigned to Cold Zone A-02.</span></div>
          <div class="timeline-item"><strong>Line 1 extraction at ${state.data.production[0].progress}%</strong><span>Yield trend is above baseline.</span></div>
          <div class="timeline-item"><strong>Low stock alert open</strong><span>Fuerte batch below configured minimum level.</span></div>
          <div class="timeline-item"><strong>Outbound GPN ready</strong><span>Order ORD-8801 documents prepared for gate release.</span></div>
        </div>`)}
    </div>`;
}

function quickSector(title, desc, screen, cta) {
  return `<button class="card pad" style="text-align:left;border-color:var(--border);" data-screen="${screen}"><span class="badge green">Sector</span><h3 style="margin:14px 0 8px">${title}</h3><p class="card-desc">${desc}</p><span class="btn btn-ghost btn-sm" style="margin-top:14px">${cta}</span></button>`;
}

function qcPassRate() {
  const approved = state.data.qc.filter(q => q.decision === "Approved").length;
  return Math.round((approved / Math.max(state.data.qc.length, 1)) * 100);
}

function procurement() {
  return `
    ${pageHead("Priority Module", "Procurement & Farmer Management", "Create requirements, broadcast by App/SMS/WhatsApp, compare farmer responses, shortlist, confirm orders and handle rescheduling.", `<button class="btn btn-primary" data-action="create-req">Create Requirement</button><button class="btn btn-ghost" data-action="bulk-req">Bulk Upload</button>`)}
    ${workflow(["Create requirement", "Broadcast", "Farmer response", "Compare", "Shortlist", "Confirm order", "Schedule / Reschedule"])}
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Requirement Command Center", "Working form for procurement request creation and broadcasting.", `
        <div class="form-grid">
          <div class="field"><label>Product Type</label><select id="reqProduct"><option>Avocado Hass</option><option>Avocado Fuerte</option><option>Avocado Mixed</option></select></div>
          <div class="field"><label>Quantity Needed</label><input id="reqQty" value="24000" /></div>
          <div class="field"><label>Expected Rate</label><input id="reqRate" value="1950" /></div>
          <div class="field"><label>Delivery Timeline</label><input id="reqTimeline" value="2026-05-10 08:00" /></div>
          <div class="field full"><label>Target Farmer Groups</label><select id="reqGroup"><option>High-yield Hass farmers, 100 km radius</option><option>All approved farmers</option><option>Cold-chain ready suppliers</option></select></div>
        </div>
        <div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-req">Save Requirement</button><button class="btn btn-soil" data-action="broadcast-req">Broadcast Now</button></div>`)}
      ${card("Broadcast Engine", "Targeted notification delivery status with fallback channels.", `
        <div class="summary-grid" style="grid-template-columns:repeat(3,1fr)"><div class="summary-card"><span>Farmers targeted</span><strong>146</strong></div><div class="summary-card"><span>Responses</span><strong>${state.data.farmers.length * 9 + 2}</strong></div><div class="summary-card"><span>Avg response time</span><strong>16m</strong></div></div>
        <div style="height:14px"></div>
        <div class="timeline"><div class="timeline-item"><strong>WhatsApp delivered</strong><span>132 of 146 contacts reached.</span></div><div class="timeline-item"><strong>SMS fallback active</strong><span>14 contacts with app inactive.</span></div><div class="timeline-item"><strong>Reminder scheduled</strong><span>Auto reminder in 2 hours.</span></div></div>`)}
    </div>
    <div style="height:16px"></div>
    ${card("Farmer Response Comparison Dashboard", "Auto-comparison scores price, availability and delivery timeline.", farmerTable())}`;
}

function farmerTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Farmer</th><th>Product</th><th>Available</th><th>Rate</th><th>Delivery</th><th>Score</th><th>Status</th><th>Action</th></tr></thead><tbody>
    ${state.data.farmers.map(f => `<tr><td><strong>${f.name}</strong><br><span class="card-desc">${f.id} · ${f.group}</span></td><td>${f.product}</td><td>${fmt(f.qty)} kg</td><td>${money(f.rate)}/kg</td><td>${f.delivery}</td><td>${progress(f.score, f.score < 80 ? "warning" : "")}<small>${f.score}%</small></td><td>${badge(f.status, f.status === "Risk" ? "red" : "green")}</td><td><div class="data-row-actions"><button class="btn btn-primary btn-sm" data-action="shortlist-farmer" data-id="${f.id}">Shortlist</button><button class="btn btn-ghost btn-sm" data-action="confirm-farmer" data-id="${f.id}">Confirm</button></div></td></tr>`).join("")}
  </tbody></table></div>`;
}

function production() {
  const active = state.data.production[0];
  return `
    ${pageHead("Mission Critical", "Production Processing", "Batch selection, scheduling, crushing, extraction, yield calculation, resource use, downtime and tank allocation.", `<button class="btn btn-primary" data-action="start-production">Start Batch</button><button class="btn btn-ghost" data-action="log-downtime">Log Downtime</button>`)}
    ${workflow(["Plan batch", "Select warehouse stock", "Crushing", "Extraction", "Yield calculation", "Tank allocation", "Batch report"])}
    <div style="height:16px"></div>
    <div class="grid four">
      ${kpi("Active Batch", active.id, `${active.line} · ${active.stage}`, `${active.progress}% complete`)}
      ${kpi("Input Quantity", `${fmt(active.input)} kg`, "Warehouse batch validated", "ready")}
      ${kpi("Current Yield", `${active.yield.toFixed(1)}%`, "Expected baseline 17.8%", "+2.1%")}
      ${kpi("Tank Allocation", active.tank, "Finished oil reserved", "linked")}
    </div>
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Production Line Control", "Live stage monitor with operator actions.", `
        <div class="kanban">
          ${lineTask("Planning", `${active.id} selected`, "Warehouse stock verified", "green")}
          ${lineTask("Crushing", "Motor speed 1,420 RPM", `In progress · ${active.progress}%`, "orange")}
          ${lineTask("Extraction", "Oil temperature 46°C", "Parameter logging active", "blue")}
          ${lineTask("Tank Transfer", `${active.tank} reserved`, "Valve check pending", "dark")}
        </div>
        <div style="height:16px"></div><label>Batch progress</label>${progress(active.progress)}
        <div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="advance-production">Advance Process</button><button class="btn btn-warning" data-action="log-downtime">Downtime</button><button class="btn btn-ghost" data-action="open-batch-report">View Batch Report</button></div>`)}
      ${card("Resource Consumption", "Water, electricity and process time for efficiency benchmarking.", `
        <div class="summary-grid" style="grid-template-columns:repeat(3,1fr)"><div class="summary-card"><span>Water</span><strong>12.4 KL</strong></div><div class="summary-card"><span>Electricity</span><strong>428 kWh</strong></div><div class="summary-card"><span>Process Time</span><strong>4h 18m</strong></div></div>
        <div style="height:16px"></div><div class="timeline"><div class="timeline-item"><strong>Parameter logged</strong><span>DM 24.8%, temperature 46°C, line speed stable.</span></div><div class="timeline-item"><strong>Variance analysis</strong><span>Yield above baseline due to maturity score.</span></div><div class="timeline-item"><strong>Maintenance link</strong><span>Line vibration below escalation threshold.</span></div></div>`)}
    </div>
    <div style="height:16px"></div>
    ${card("Production Batch Register", "All batches are clickable and exportable.", productionTable())}`;
}

function lineTask(title, strong, span, color) {
  return `<div class="lane"><h4>${title}</h4><div class="task"><span class="badge ${color}">${title}</span><strong>${strong}</strong><span>${span}</span></div></div>`;
}

function productionTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Batch</th><th>Line</th><th>Input</th><th>Output</th><th>Yield</th><th>Downtime</th><th>Status</th><th>Action</th></tr></thead><tbody>${state.data.production.map(p => `<tr><td><strong>${p.id}</strong></td><td>${p.line}</td><td>${fmt(p.input)} kg</td><td>${fmt(p.output)} L</td><td>${p.yield}%</td><td>${p.downtime}m</td><td>${badge(p.status)}</td><td><button class="btn btn-ghost btn-sm" data-action="open-production" data-id="${p.id}">Open</button></td></tr>`).join("")}</tbody></table></div>`;
}

function inventoryScreen() {
  const total = state.data.inventory.reduce((s, i) => s + i.qty, 0) + state.stockShift;
  const low = state.data.inventory.filter(i => i.qty <= i.min).length;
  return `
    ${pageHead("Priority Module", "Inventory Tracking", "Working inventory with stock level monitoring, supply chain logic, alert states, drill-downs, receive, transfer, reserve, adjust, reorder and export.", `<button class="btn btn-primary" data-action="receive-stock">Receive Stock</button><button class="btn btn-ghost" data-action="export-inventory">Export Inventory</button>`)}
    <div class="grid four">
      ${kpi("Total Stock", `${fmt(total)} units`, "Raw, finished and spare inventory", "live")}
      ${kpi("Low Stock", low, "Below configured minimum", "action needed")}
      ${kpi("Reserved Stock", `${fmt(state.data.inventory.reduce((s, i) => s + (i.reserved || 0), 0))}`, "Linked to orders", "allocated")}
      ${kpi("Storage Utilization", "74%", "Cold and tank zones", "safe")}
    </div>
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Stock Level Monitoring", "Click any action to change demo inventory state.", inventoryTable())}
      ${card("Inventory Alerts & Actions", "Low stock and supply chain exceptions are routed to the right team.", `
        <div class="timeline">
          ${state.data.inventory.filter(i => i.qty <= i.min).map(i => `<div class="timeline-item alert-card danger"><strong>${i.item} below minimum</strong><span>${i.location} has ${fmt(i.qty)} against ${fmt(i.min)} minimum.</span></div>`).join("") || `<div class="timeline-item alert-card success"><strong>No low stock alerts</strong><span>All tracked stock is above configured threshold.</span></div>`}
          <div class="timeline-item alert-card"><strong>Reservation conflict monitor</strong><span>Tank reservations are checked against sales orders and production allocation.</span></div>
        </div>
        <div class="actions" style="margin-top:14px"><button class="btn btn-soil" data-action="raise-procurement-from-stock">Raise Procurement Request</button><button class="btn btn-ghost" data-action="assign-alert">Assign alert</button></div>`)}
    </div>
    <div style="height:16px"></div>
    ${card("Supply Chain Management Journey", "From farmer sourcing to gate, QC, warehouse, production, tank inventory and dispatch.", supplyChain())}`;
}

function inventoryTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Batch / SKU</th><th>Category</th><th>Location</th><th>On Hand</th><th>Reserved</th><th>Health</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${state.data.inventory.map(i => {
      const percent = clamp((i.qty / Math.max(i.max, 1)) * 100);
      const type = i.qty <= i.min ? "danger" : i.status === "Reserved" ? "warning" : "";
      return `<tr><td><strong>${i.id}</strong><br><span class="card-desc">${i.item}</span></td><td>${i.category}</td><td>${i.location}</td><td>${fmt(i.qty)}</td><td>${fmt(i.reserved || 0)}</td><td>${progress(percent, type)}<small>${Math.round(percent)}%</small></td><td>${badge(i.status)}</td><td><div class="data-row-actions"><button class="btn btn-ghost btn-sm" data-action="open-inventory" data-id="${i.id}">Open</button><button class="btn btn-primary btn-sm" data-action="transfer-stock" data-id="${i.id}">Transfer</button><button class="btn btn-ghost btn-sm" data-action="reserve-stock" data-id="${i.id}">Reserve</button><button class="btn btn-warning btn-sm" data-action="adjust-stock" data-id="${i.id}">Adjust</button></div></td></tr>`;
    }).join("")}
  </tbody></table></div>`;
}

function supplyChain() {
  return `
    <div class="supply-chain">
      ${chainNode("Farm Network", "Requirement broadcast, farmer response and delivery slot.", "green")}
      ${chainNode("Gate & Weighbridge", "GPN scan, entry timestamp and weight capture.", "blue")}
      ${chainNode("QC Approval", "Sampling, DM/FFA checks and approve/reject.", "orange")}
      ${chainNode("Warehouse", "GRN, batch ID, QR label and FEFO allocation.", "green")}
      ${chainNode("Production & Dispatch", "Batch issue, yield, tank allocation and outbound GPN.", "blue")}
    </div>
    <div style="height:16px"></div>
    <div class="map-panel">
      <svg viewBox="0 0 900 260" preserveAspectRatio="none"><path d="M30 190 C160 90 260 220 390 130 S610 40 850 170" fill="none" stroke="rgba(169,68,38,.45)" stroke-width="14" stroke-linecap="round"/><path d="M30 190 C160 90 260 220 390 130 S610 40 850 170" fill="none" stroke="rgba(255,250,241,.7)" stroke-width="3" stroke-dasharray="10 12" stroke-linecap="round"/></svg>
      <div class="pin green" style="left:8%;top:55%"><span>F</span></div><div class="pin blue" style="left:32%;top:42%"><span>G</span></div><div class="pin" style="left:53%;top:28%"><span>Q</span></div><div class="pin green" style="left:68%;top:37%"><span>W</span></div><div class="pin blue" style="left:86%;top:51%"><span>D</span></div>
    </div>`;
}

function chainNode(title, text, color) {
  return `<div class="chain-node"><span class="badge ${color}">${title}</span><b>${title}</b><span>${text}</span></div>`;
}

function ordersScreen() {
  return `
    ${pageHead("Priority Module", "Sales & Order Processing", "Create buyer orders, check stock, reserve tank quantity, schedule delivery, prepare documents and generate outbound gate pass.", `<button class="btn btn-primary" data-action="create-order">Create Buyer Order</button><button class="btn btn-ghost" data-action="delivery-calendar">Delivery Calendar</button>`)}
    ${workflow(["Create buyer order", "Check tank stock", "Reserve quantity", "Assign slot", "Prepare docs", "Outbound gate pass", "Dispatch complete"])}
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Buyer Order Creation", "Working order form with stock reservation.", orderForm())}
      ${card("Tank Allocation", "Reserve finished stock and prevent double booking.", tankTable())}
    </div>
    <div style="height:16px"></div>
    ${card("Order Fulfillment Board", "Advance orders through scheduling, documents and dispatch.", orderTable())}`;
}

function orderForm() {
  return `<div class="form-grid"><div class="field"><label>Buyer</label><input id="orderBuyer" value="Kampala Foods Ltd" /></div><div class="field"><label>Product Type</label><select id="orderProduct"><option>Crude Oil</option><option>Dry Waste</option></select></div><div class="field"><label>Quantity</label><input id="orderQty" value="8000" /></div><div class="field"><label>Delivery Date</label><input id="orderDate" type="date" value="2026-05-10" /></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-order">Create Order</button><button class="btn btn-ghost" data-action="save-order-draft">Save Draft</button></div>`;
}

function tankTable() {
  const tanks = state.data.inventory.filter(i => i.category === "Finished Product");
  return `<div class="table-wrap"><table><thead><tr><th>Tank</th><th>Product</th><th>Available</th><th>Reserved</th><th>Status</th><th>Action</th></tr></thead><tbody>${tanks.map(t => `<tr><td><strong>${t.location}</strong></td><td>${t.item}</td><td>${fmt(t.qty)} L</td><td>${fmt(t.reserved || 0)} L</td><td>${badge(t.status)}</td><td><button class="btn btn-primary btn-sm" data-action="reserve-stock" data-id="${t.id}">Reserve</button></td></tr>`).join("")}</tbody></table></div>`;
}

function orderTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Order</th><th>Buyer</th><th>Product</th><th>Quantity</th><th>Status</th><th>Source</th><th>Delivery</th><th>Action</th></tr></thead><tbody>${state.data.orders.map(o => `<tr><td><strong>${o.id}</strong></td><td>${o.buyer}</td><td>${o.product}</td><td>${fmt(o.qty)} ${o.unit}</td><td>${badge(o.status)}</td><td>${o.source}</td><td>${o.delivery}</td><td><div class="data-row-actions"><button class="btn btn-primary btn-sm" data-action="advance-order" data-id="${o.id}">Advance</button><button class="btn btn-ghost btn-sm" data-action="open-order" data-id="${o.id}">Open</button></div></td></tr>`).join("")}</tbody></table></div>`;
}

function logistics() {
  return `
    ${pageHead("Operations", "Logistics & Gate Management", "Digital gate pass, QR scan, truck entry, order verification, weighbridge capture, exit log and audit trail.", `<button class="btn btn-primary" data-action="generate-gpn">Generate GPN</button><button class="btn btn-ghost" data-action="scanner-mode">QR Scanner</button>`)}
    ${workflow(["Generate GPN", "Gate entry", "Verify order", "Gross weight", "QC/Warehouse link", "Tare weight", "Gate exit audit"])}
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Gate Pass Scanner", "QR-based scanning with manual override.", `<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><div class="qr"></div><div>${badge("Verified")}<h3 style="margin:10px 0 6px">Inbound · Nakuru Green Farms</h3><p class="card-desc">Truck KAB-204Q · Driver Daniel Okoro · Linked to PO-5214</p><div class="actions" style="margin-top:12px"><button class="btn btn-primary btn-sm" data-action="gate-entry">Accept Entry</button><button class="btn btn-warning btn-sm" data-action="manual-override">Manual Override</button></div></div></div>`)}
      ${card("Weighbridge Capture", "Gross/tare capture with slip upload.", `<div class="form-grid"><div class="field"><label>Gross Weight</label><input id="grossWeight" value="27800" /></div><div class="field"><label>Tare Weight</label><input id="tareWeight" value="9120" /></div><div class="field full"><label>Weight Slip</label><input type="file" /></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-weight">Save Weight</button></div>`)}
    </div>
    <div style="height:16px"></div>
    ${card("Movement Audit Trail", "Full movement log and exception reporting.", gateTable())}`;
}

function gateTable() {
  return `<div class="table-wrap"><table><thead><tr><th>GPN</th><th>Truck</th><th>Direction</th><th>Reference</th><th>Supplier/Buyer</th><th>Status</th><th>Exception</th><th>Action</th></tr></thead><tbody>${state.data.gate.map(g => `<tr><td><strong>${g.id}</strong></td><td>${g.truck}</td><td>${g.direction}</td><td>${g.ref}</td><td>${g.supplier}</td><td>${badge(g.status)}</td><td>${g.exception}</td><td><button class="btn btn-ghost btn-sm" data-action="open-gate" data-id="${g.id}">Open</button></td></tr>`).join("")}</tbody></table></div>`;
}

function qc() {
  return `
    ${pageHead("Quality", "QC Processing & Reporting", "Sampling rules, DM/FFA parameters, QC thresholds, evidence upload, approve/reject and QC analytics.", `<button class="btn btn-primary" data-action="new-qc">New Inspection</button><button class="btn btn-ghost" data-action="qc-matrix">QC Matrix</button>`)}
    ${workflow(["Create sample", "Record DM", "Record FFA", "Upload evidence", "Approve / reject", "Generate GRN", "QC report"])}
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("QC Inspection Entry", "Working QC entry form.", `<div class="form-grid"><div class="field"><label>Batch ID</label><input id="qcBatch" value="BCH-AVO-2408" /></div><div class="field"><label>Sampling Rule</label><select id="qcRule"><option>3-piece sampling</option><option>5-piece sampling</option></select></div><div class="field"><label>Dry Matter</label><input id="qcDm" value="24.8" /></div><div class="field"><label>FFA</label><input id="qcFfa" value="0.62" /></div><div class="field full"><label>Remarks</label><textarea id="qcRemarks">Good maturity. No visible spoilage.</textarea></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="approve-qc">Approve</button><button class="btn btn-danger" data-action="reject-qc">Reject</button></div>`)}
      ${card("QC Analytics", "Pass/fail trend and rejection overview.", `<div class="summary-grid" style="grid-template-columns:repeat(3,1fr)"><div class="summary-card"><span>Pass Rate</span><strong>${qcPassRate()}%</strong></div><div class="summary-card"><span>Records</span><strong>${state.data.qc.length}</strong></div><div class="summary-card"><span>Avg DM</span><strong>${avg(state.data.qc.map(q => q.dm)).toFixed(1)}%</strong></div></div><div style="height:16px"></div><label>Rejection trend</label>${progress(28, "warning")}`)}
    </div>
    <div style="height:16px"></div>
    ${card("QC Logs", "Traceable quality records.", qcTable())}`;
}

function qcTable() {
  return `<div class="table-wrap"><table><thead><tr><th>QC ID</th><th>Batch</th><th>DM</th><th>FFA</th><th>Decision</th><th>Officer</th><th>Evidence</th><th>Action</th></tr></thead><tbody>${state.data.qc.map(q => `<tr><td><strong>${q.id}</strong></td><td>${q.batch}</td><td>${q.dm}%</td><td>${q.ffa}%</td><td>${badge(q.decision)}</td><td>${q.officer}</td><td>${q.evidence}</td><td><button class="btn btn-ghost btn-sm" data-action="open-qc" data-id="${q.id}">Open</button></td></tr>`).join("")}</tbody></table></div>`;
}

function warehouse() {
  return `
    ${pageHead("Storage", "Warehouse Management", "GRN generation, batch ID, storage allocation, capacity tracking, QR labels, FIFO/FEFO and movement tracking.", `<button class="btn btn-primary" data-action="generate-grn">Generate GRN</button><button class="btn btn-ghost" data-action="print-labels">Print Labels</button>`)}
    ${workflow(["QC approval", "Auto GRN", "Batch ID", "Storage allocation", "QR label", "Internal transfer", "Issue to production"])}
    <div style="height:16px"></div>
    <div class="grid three">
      ${card("GRN Detail", "Auto-created after QC approval.", `<div class="summary-card"><span>GRN Number</span><strong>GRN-58421</strong></div><p class="card-desc">Supplier linked, net weight validated and batch ID ready.</p><button class="btn btn-primary btn-sm" data-action="post-grn">Post GRN</button>`, "pad")}
      ${card("Storage Capacity", "Location-based allocation.", `<div class="summary-card"><span>Cold Zone A</span><strong>82%</strong></div>${progress(82, "warning")}<p class="card-desc">Suggest Zone C for next Hass batch.</p>`, "pad")}
      ${card("Labeling System", "Barcode and QR sticker printing.", `<div style="display:flex;gap:14px;align-items:center"><div class="qr" style="width:90px;height:90px"></div><div><strong>BCH-AVO-2408</strong><p class="card-desc">Supplier, QC status, weight and FEFO encoded.</p></div></div><button class="btn btn-ghost btn-sm" data-action="print-labels">Print Sticker</button>`, "pad")}
    </div>
    <div style="height:16px"></div>
    ${card("Internal Movement Tracking", "Transfers and production dispatches stay batch-linked.", `<div class="table-wrap"><table><thead><tr><th>Move ID</th><th>Batch</th><th>From</th><th>To</th><th>Quantity</th><th>Status</th></tr></thead><tbody><tr><td>MOV-2048</td><td>BCH-AVO-2408</td><td>Cold A-02</td><td>Production Line 1</td><td>8,400 kg</td><td>${badge("Ready")}</td></tr><tr><td>MOV-2049</td><td>BCH-AVO-2396</td><td>Cold B-04</td><td>Hold Bay</td><td>2,200 kg</td><td>${badge("Conditional")}</td></tr></tbody></table></div>`)}`;
}

function maintenance() {
  return `
    ${pageHead("Facilities", "Maintenance & Facility Management", "Incident logging, severity, preventive calendar, task assignment, spare parts and closure approvals.", `<button class="btn btn-primary" data-action="log-incident">Log Incident</button><button class="btn btn-ghost" data-action="maintenance-calendar">Open Calendar</button>`)}
    ${workflow(["Incident log", "Severity classify", "Assign task", "Parts consume", "Repair evidence", "Supervisor approval", "Closure report"])}
    <div style="height:16px"></div>
    <div class="grid sidebar-layout">
      ${card("Incident Management", "Create and assign maintenance tickets.", `<div class="form-grid"><div class="field"><label>Asset</label><select id="incAsset"><option>Crusher Line 1</option><option>Separator</option><option>Cold Room A</option></select></div><div class="field"><label>Severity</label><select id="incSeverity"><option>Medium</option><option>High</option><option>Critical</option></select></div><div class="field full"><label>Description</label><textarea id="incIssue">Feed belt vibration increased during active batch run.</textarea></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-incident">Create Ticket</button></div>`)}
      ${card("Spare Parts & Calendar", "Parts inventory links to maintenance tasks.", `<div class="timeline"><div class="timeline-item"><strong>Preventive service · Separator</strong><span>Tomorrow 09:30 · Assigned to Musa</span></div><div class="timeline-item"><strong>Steam valve reorder</strong><span>Current stock 7, minimum 10. Procurement alert raised.</span></div><div class="timeline-item"><strong>Closure approval pending</strong><span>Crusher feed jam report needs supervisor sign-off.</span></div></div>`)}
    </div><div style="height:16px"></div>${card("Maintenance Register", "Open, schedule and close maintenance tasks.", maintenanceTable())}`;
}

function maintenanceTable() {
  return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Asset</th><th>Severity</th><th>Issue</th><th>Owner</th><th>Status</th><th>Action</th></tr></thead><tbody>${state.data.maintenance.map(m => `<tr><td><strong>${m.id}</strong></td><td>${m.asset}</td><td>${m.severity}</td><td>${m.issue}</td><td>${m.owner}</td><td>${badge(m.status)}</td><td><button class="btn btn-primary btn-sm" data-action="close-incident" data-id="${m.id}">Close</button></td></tr>`).join("")}</tbody></table></div>`;
}

function users() {
  return `
    ${pageHead("Security", "User Management & RBAC", "Role-based access control, multi-user hierarchy, audit logs and secure cross-module permissions.", `<button class="btn btn-primary" data-action="invite-user">Invite User</button><button class="btn btn-ghost" data-action="permission-matrix">Permission Matrix</button>`)}
    <div class="grid two">
      ${card("User Directory", "Manage demo users and roles.", userTable())}
      ${card("Role Permission Matrix", "Production-floor teams only see actions they are allowed to take.", `<div class="table-wrap"><table><thead><tr><th>Role</th><th>Procure</th><th>QC</th><th>Warehouse</th><th>Production</th><th>Reports</th></tr></thead><tbody><tr><td>Factory Admin</td><td>Full</td><td>Full</td><td>Full</td><td>Full</td><td>Full</td></tr><tr><td>Gatekeeper</td><td>Read</td><td>No</td><td>Read</td><td>No</td><td>No</td></tr><tr><td>Production Manager</td><td>Read</td><td>Read</td><td>Issue</td><td>Full</td><td>Export</td></tr><tr><td>QC Officer</td><td>Read</td><td>Full</td><td>Approve GRN</td><td>Read</td><td>QC only</td></tr></tbody></table></div>`)}
    </div>`;
}

function userTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>${state.data.users.map((u, idx) => `<tr><td><strong>${u.name}</strong></td><td>${u.email}</td><td><span class="role-pill">${u.role}</span></td><td>${badge(u.status)}</td><td><button class="btn btn-ghost btn-sm" data-action="change-role" data-index="${idx}">Edit Role</button></td></tr>`).join("")}</tbody></table></div>`;
}

function reports() {
  const sectors = ["All", "Procurement", "Production", "Inventory", "Orders", "QC", "Logistics", "Warehouse", "Maintenance", "Users"];
  const rows = reportRows().filter(r => state.reportSector === "All" || r.sector === state.reportSector);
  return `
    ${pageHead("Analytics", "All Sector Reports & Exports", "View every sector report from one place. Filter by module, inspect metrics, export CSV or print/save as PDF.", `<button class="btn btn-primary" data-action="export-current-report">Export CSV</button><button class="btn btn-ghost" data-action="print-report">Print / Save PDF</button>`)}
    <div class="report-toolbar">
      <div class="report-tabs">${sectors.map(s => `<button class="report-tab ${state.reportSector === s ? "active" : ""}" data-action="set-report-sector" data-sector="${s}">${s}</button>`).join("")}</div>
      <div class="actions"><button class="btn btn-ghost btn-sm" data-action="refresh-reports">Refresh</button><button class="btn btn-ghost btn-sm" data-action="email-report">Email Report</button></div>
    </div>
    <div class="grid four">
      ${kpi("Procurement Efficiency", "91%", "price, quantity, timeline score", "+4.2%")}
      ${kpi("QC Pass Rate", `${qcPassRate()}%`, "approved vs total records", "live")}
      ${kpi("Yield Performance", `${avg(state.data.production.map(p => p.yield)).toFixed(1)}%`, "average production yield", "+2.1%")}
      ${kpi("Order Fulfillment", "86%", "on-time dispatch rate", "+5.5%")}
    </div>
    <div style="height:16px"></div>
    ${card(`${state.reportSector} Report Table`, "Each row can be opened and exported.", reportTable(rows))}`;
}

function reportRows() {
  return [
    ...state.data.procurement.map(r => ({ sector: "Procurement", ref: r.id, metric: r.product, value: `${fmt(r.qty)} kg`, status: r.status, owner: "Procurement Team" })),
    ...state.data.production.map(p => ({ sector: "Production", ref: p.id, metric: `${p.line} yield`, value: `${p.yield}%`, status: p.status, owner: "Production Manager" })),
    ...state.data.inventory.map(i => ({ sector: "Inventory", ref: i.id, metric: i.item, value: `${fmt(i.qty)} on hand`, status: i.status, owner: "Warehouse" })),
    ...state.data.orders.map(o => ({ sector: "Orders", ref: o.id, metric: o.buyer, value: `${fmt(o.qty)} ${o.unit}`, status: o.status, owner: "Sales Admin" })),
    ...state.data.qc.map(q => ({ sector: "QC", ref: q.id, metric: q.batch, value: `DM ${q.dm}% / FFA ${q.ffa}%`, status: q.decision, owner: q.officer })),
    ...state.data.gate.map(g => ({ sector: "Logistics", ref: g.id, metric: g.truck, value: `${g.direction} · ${g.ref}`, status: g.status, owner: "Gatekeeper" })),
    { sector: "Warehouse", ref: "GRN-58421", metric: "Auto GRN", value: "BCH-AVO-2408", status: "Ready", owner: "Warehouse" },
    ...state.data.maintenance.map(m => ({ sector: "Maintenance", ref: m.id, metric: m.asset, value: m.issue, status: m.status, owner: m.owner })),
    ...state.data.users.map(u => ({ sector: "Users", ref: u.email, metric: u.name, value: u.role, status: u.status, owner: "Admin" }))
  ];
}

function reportTable(rows) {
  return `<div class="table-wrap"><table id="reportTable"><thead><tr><th>Sector</th><th>Reference</th><th>Metric</th><th>Value</th><th>Status</th><th>Owner</th><th>Action</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.sector}</td><td><strong>${r.ref}</strong></td><td>${r.metric}</td><td>${r.value}</td><td>${badge(r.status)}</td><td>${r.owner}</td><td><button class="btn btn-ghost btn-sm" data-action="open-report-row" data-ref="${r.ref}">Open</button></td></tr>`).join("")}</tbody></table></div>`;
}

function settings() {
  const tabs = [
    ["company", "Company & Factory"],
    ["inventory", "Inventory Rules"],
    ["notifications", "Notifications"],
    ["security", "Security & Roles"],
    ["data", "Data, Export & Reset"]
  ];
  return `
    ${pageHead("Control Center", "Settings Panel", "From here you can change company information, role preview, inventory thresholds, notification channels, live refresh, security options and data reset/export behavior.", `<button class="btn btn-primary" data-action="save-settings">Save Settings</button><button class="btn btn-ghost" data-action="reset-settings">Reset Settings</button>`)}
    <div class="settings-layout">
      <section class="card pad"><div class="settings-menu">${tabs.map(t => `<button class="${state.settingTab === t[0] ? "active" : ""}" data-action="setting-tab" data-tab="${t[0]}">${t[1]}</button>`).join("")}</div></section>
      <section class="card"><div class="card-head"><div><h3 class="card-title">${tabs.find(t => t[0] === state.settingTab)?.[1] || "Settings"}</h3><p class="card-desc">All controls are clickable and update this demo prototype.</p></div></div><div class="card-body">${settingsBody()}</div></section>
    </div>`;
}

function settingsBody() {
  const s = state.settings;
  if (state.settingTab === "company") return `<div class="form-grid"><div class="field"><label>Company Name</label><input id="setCompany" value="${s.companyName}" /></div><div class="field"><label>Factory Site</label><input id="setSite" value="${s.factorySite}" /></div><div class="field"><label>Currency</label><select id="setCurrency"><option ${s.currency === "₦" ? "selected" : ""}>₦</option><option ${s.currency === "$" ? "selected" : ""}>$</option><option ${s.currency === "KES" ? "selected" : ""}>KES</option><option ${s.currency === "GHS" ? "selected" : ""}>GHS</option></select></div><div class="field"><label>Language</label><select id="setLanguage"><option>English</option><option>Bangla</option><option>French</option></select></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-settings">Apply Company Settings</button></div>`;
  if (state.settingTab === "inventory") return `<div class="form-grid"><div class="field"><label>Low Stock Buffer %</label><input id="setLowStock" type="number" value="${s.lowStockBuffer}" /></div><div class="field"><label>Live Refresh Seconds</label><input id="setRefresh" type="number" value="${s.liveRefresh}" /></div><div class="field full"><label>Stock Rule Preview</label><textarea readonly>Low Stock = Qty <= Minimum + ${s.lowStockBuffer}% buffer. Reorder action creates procurement requirement automatically.</textarea></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-settings">Save Inventory Rules</button><button class="btn btn-ghost" data-action="simulate-stock">Test Stock Alert</button></div>`;
  if (state.settingTab === "notifications") return `<div class="grid two"><label class="switch"><input id="setWhatsapp" type="checkbox" ${s.whatsapp ? "checked" : ""}> WhatsApp Broadcast</label><label class="switch"><input id="setSms" type="checkbox" ${s.sms ? "checked" : ""}> SMS Fallback</label><label class="switch"><input id="setPush" type="checkbox" ${s.appPush ? "checked" : ""}> App Push Notification</label><label class="switch"><input id="setAutoExport" type="checkbox" ${s.autoExport ? "checked" : ""}> Auto daily report export</label></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-settings">Save Notification Settings</button><button class="btn btn-ghost" data-action="test-notification">Send Test Alert</button></div>`;
  if (state.settingTab === "security") return `<div class="form-grid"><div class="field"><label>Current Role Preview</label><select id="setRole"><option>Factory Admin</option><option>Procurement Manager</option><option>Production Manager</option><option>Warehouse Supervisor</option><option>QC Officer</option><option>Gatekeeper</option><option>Executive Viewer</option></select></div><div class="field"><label>Two Factor Authentication</label><select id="set2fa"><option ${s.twoFactor ? "selected" : ""}>Enabled</option><option ${!s.twoFactor ? "selected" : ""}>Disabled</option></select></div><div class="field full"><label>Security Notes</label><textarea readonly>RBAC controls module visibility, approvals, export access, gate override and QC release permission.</textarea></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-settings">Save Security</button><button class="btn btn-ghost" data-screen="users">Manage Users</button></div>`;
  return `<div class="grid two"><button class="btn btn-primary" data-action="export-current-report">Export Current Reports CSV</button><button class="btn btn-ghost" data-action="export-inventory">Export Inventory CSV</button><button class="btn btn-warning" data-action="reset-demo-data">Reset Demo Data</button><button class="btn btn-ghost" data-action="print-report">Print Dashboard</button></div><p class="card-desc" style="margin-top:14px">Reset returns all data to the original demo state. Export creates downloadable CSV files from browser data.</p>`;
}

function flows() {
  const cards = [
    ["Procurement Flow", ["Requirement list", "Create requirement", "Broadcast", "Responses", "Compare", "Shortlist", "Confirm PO", "Delivery slot"]],
    ["Production Flow", ["Dashboard", "Batch selection", "Schedule", "Run process", "Log parameters", "Downtime", "Allocate tank", "Batch report"]],
    ["Inventory Flow", ["Stock overview", "Alert center", "Batch drawer", "Transfer", "Reserve", "Adjust", "Reorder", "Export"]],
    ["Order Flow", ["Buyer order", "Stock check", "Tank reserve", "Delivery slot", "Docs", "Outbound GPN", "Dispatch audit"]],
    ["Gate + QC + Warehouse", ["Inbound GPN", "Gate scan", "Weighbridge", "Sampling", "Approve", "Auto GRN", "Storage", "Sticker"]],
    ["Settings + Reports", ["Login", "Role preview", "Settings", "Report filter", "CSV export", "Print/PDF"]]
  ];
  return `${pageHead("Prototype Blueprint", "Screen-by-Screen User Flow Diagrams", "Clickable flow cards for Figma prototype linking and developer handoff.", `<button class="btn btn-primary" data-action="toast" data-msg="All flow nodes are clickable in this HTML prototype.">Validate Flows</button>`)}<div class="grid two">${cards.map(c => card(c[0], "Use as Figma screen nodes and connector labels.", `<div class="workflow">${c[1].map((s, i) => `<button class="flow-step ${i === 0 ? "active" : ""}" data-action="toast" data-msg="Open screen node: ${s}"><b>${i + 1}. ${s}</b><span>Clickable node</span></button>`).join("")}</div>`)).join("")}</div>`;
}

function handoff() {
  return `
    ${pageHead("Developer Handoff", "Design Tokens & Interaction Patterns", "Use this HTML as a working blueprint for React, shadcn/ui and API integration.", `<button class="btn btn-primary" data-action="toast" data-msg="Handoff note copied conceptually.">Copy Handoff</button>`)}
    <div class="grid sidebar-layout">
      ${card("Design Tokens", "Recommended Tailwind/shadcn theme mapping.", `<div class="grid two">${token("Background", "#fbf7ef", "Warm neutral")}${token("Primary Green", "#5d7c2d", "Avocado leaf")}${token("Red Soil", "#a94426", "African soil accent")}${token("Factory Dark", "#1f2419", "Sidebar and text")}${token("Radius", "18px", "Cards and dialogs")}${token("Border", "rgba(95,74,42,.16)", "Tables and fields")}</div>`)}
      ${card("Interaction Patterns", "Convert to shadcn components.", `<div class="timeline"><div class="timeline-item"><strong>Login and RBAC</strong><span>Use auth guard, role middleware and module permissions.</span></div><div class="timeline-item"><strong>Settings panel</strong><span>Save company, notification, inventory and security settings from one page.</span></div><div class="timeline-item"><strong>Inventory actions</strong><span>Sheet for drill-down, Dialog for receive/transfer/reserve/adjust.</span></div><div class="timeline-item"><strong>Reports</strong><span>Filter, CSV export and print/PDF from report data.</span></div></div>`)}
    </div>`;
}

function token(name, value, note) {
  return `<div class="token"><span class="swatch" style="background:${value.startsWith("#") ? value : "#e7dccb"}"></span><div><strong>${name}</strong><p class="card-desc" style="margin:3px 0 0">${value} · ${note}</p></div></div>`;
}

function openModal(title, body, footer = "") {
  $("modal").innerHTML = `<div class="card-head"><div><h3 class="card-title">${title}</h3><p class="card-desc">Working prototype modal.</p></div><button class="btn btn-ghost btn-sm" data-action="close-modal">Close</button></div><div class="card-body">${body}${footer}</div>`;
  $("modalOverlay").classList.add("open");
}
function closeModal() { $("modalOverlay").classList.remove("open"); }
function openDrawer(title, body) {
  $("drawer").innerHTML = `<div class="card-head"><div><h3 class="card-title">${title}</h3><p class="card-desc">Traceability and linked actions.</p></div><button class="btn btn-ghost btn-sm" data-action="close-drawer">Close</button></div><div class="card-body">${body}</div>`;
  $("drawerOverlay").classList.add("open");
}
function closeDrawer() { $("drawerOverlay").classList.remove("open"); }
function toast(message) {
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<strong>Action completed</strong><p class="card-desc" style="margin:5px 0 0">${message}</p>`;
  $("toastArea").appendChild(item);
  setTimeout(() => item.remove(), 3600);
}

function inventoryDrawer(id) {
  const i = state.data.inventory.find(x => x.id === id);
  if (!i) return `<p>Item not found.</p>`;
  const percent = clamp((i.qty / Math.max(i.max, 1)) * 100);
  return `<div class="grid">
    <div class="summary-grid" style="grid-template-columns:repeat(3,1fr)"><div class="summary-card"><span>On Hand</span><strong>${fmt(i.qty)}</strong></div><div class="summary-card"><span>Reserved</span><strong>${fmt(i.reserved || 0)}</strong></div><div class="summary-card"><span>Minimum</span><strong>${fmt(i.min)}</strong></div></div>
    <div><label>Stock threshold</label>${progress(percent, i.qty <= i.min ? "danger" : "")}</div>
    <div class="table-wrap"><table style="min-width:420px"><tbody><tr><th>Batch/SKU</th><td>${i.id}</td></tr><tr><th>Item</th><td>${i.item}</td></tr><tr><th>Supplier</th><td>${i.supplier}</td></tr><tr><th>Location</th><td>${i.location}</td></tr><tr><th>QC Status</th><td>${i.qc}</td></tr><tr><th>FEFO</th><td>${i.fefo}</td></tr><tr><th>Status</th><td>${badge(i.status)}</td></tr></tbody></table></div>
    <div class="actions"><button class="btn btn-primary" data-action="transfer-stock" data-id="${i.id}">Transfer</button><button class="btn btn-ghost" data-action="reserve-stock" data-id="${i.id}">Reserve</button><button class="btn btn-warning" data-action="adjust-stock" data-id="${i.id}">Adjust</button><button class="btn btn-soil" data-action="reorder-stock" data-id="${i.id}">Reorder</button></div>
    <div class="timeline"><div class="timeline-item"><strong>Received at gate</strong><span>Linked to procurement order and GPN.</span></div><div class="timeline-item"><strong>QC decision</strong><span>${i.qc} and traceable.</span></div><div class="timeline-item"><strong>Current stock state</strong><span>${i.status} at ${i.location}.</span></div></div>
  </div>`;
}

function genericDrawer(title, rows) {
  return `<div class="table-wrap"><table style="min-width:420px"><tbody>${rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table></div>`;
}

function bindEvents() {
  $("loginForm").addEventListener("submit", (e) => { e.preventDefault(); login(); });
  document.body.addEventListener("click", e => {
    const screenBtn = e.target.closest("[data-screen]");
    if (screenBtn) { state.screen = screenBtn.dataset.screen; document.body.classList.remove("sidebar-open"); render(); window.scrollTo(0, 0); return; }

    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "demo-login") login(true);
    if (action === "logout") logout();
    if (action === "toggle-sidebar") document.body.classList.toggle("sidebar-open");
    if (action === "toggle-live") { state.live = !state.live; btn.textContent = state.live ? "Pause Live" : "Resume Live"; toast(state.live ? "Live operations resumed." : "Live operations paused."); }
    if (action === "toast") toast(btn.dataset.msg || "Prototype click registered.");
    if (action === "close-modal") closeModal();
    if (action === "close-drawer") closeDrawer();
    if (action === "quick-action") quickActionModal();

    // Procurement actions
    if (action === "create-req") state.screen = "procurement", render(), setTimeout(() => $("reqProduct")?.focus(), 0);
    if (action === "save-req") saveReq(false);
    if (action === "broadcast-req") saveReq(true);
    if (action === "bulk-req") openModal("Bulk Requirement Upload", `<p class="card-desc">Upload CSV template for multiple procurement requirements.</p><input type="file"><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="toast" data-msg="Bulk upload validated and 8 requirements added.">Validate Upload</button></div>`);
    if (action === "shortlist-farmer") updateFarmer(id, "Shortlisted");
    if (action === "confirm-farmer") confirmFarmer(id);

    // Inventory actions
    if (action === "open-inventory") openDrawer(id, inventoryDrawer(id));
    if (action === "receive-stock") receiveStockModal();
    if (action === "transfer-stock") transferStockModal(id);
    if (action === "reserve-stock") reserveStockModal(id);
    if (action === "adjust-stock") adjustStockModal(id);
    if (action === "reorder-stock") reorderStock(id);
    if (action === "save-receive") saveReceive();
    if (action === "save-transfer") saveTransfer(btn.dataset.id);
    if (action === "save-reserve") saveReserve(btn.dataset.id);
    if (action === "save-adjust") saveAdjust(btn.dataset.id);
    if (action === "simulate-stock") simulateStock();
    if (action === "raise-procurement-from-stock") raiseProcurementFromStock();
    if (action === "assign-alert") toast("Inventory alert assigned to warehouse supervisor.");
    if (action === "export-inventory") exportCsv("inventory-report.csv", state.data.inventory);

    // Production actions
    if (action === "start-production") startProduction();
    if (action === "advance-production") advanceProduction();
    if (action === "log-downtime") downtimeModal();
    if (action === "save-downtime") saveDowntime();
    if (action === "open-batch-report") openBatchReport();
    if (action === "open-production") {
      const p = state.data.production.find(x => x.id === id);
      openDrawer(id, genericDrawer("Production", [["Line", p.line], ["Input", fmt(p.input)], ["Output", fmt(p.output)], ["Yield", `${p.yield}%`], ["Status", p.status]]));
    }

    // Orders
    if (action === "create-order") state.screen = "orders", render();
    if (action === "save-order") saveOrder("Scheduling");
    if (action === "save-order-draft") saveOrder("Draft");
    if (action === "advance-order") advanceOrder(id);
    if (action === "open-order") {
      const o = state.data.orders.find(x => x.id === id);
      openDrawer(id, genericDrawer("Order", [["Buyer", o.buyer], ["Product", o.product], ["Quantity", `${fmt(o.qty)} ${o.unit}`], ["Status", o.status], ["Delivery", o.delivery]]));
    }
    if (action === "delivery-calendar") toast("Delivery calendar opened with slot allocation states.");

    // Gate/QC/Warehouse/Maintenance
    if (action === "generate-gpn") generateGpn();
    if (action === "scanner-mode") toast("QR scanner mode opened.");
    if (action === "gate-entry") toast("Gate entry timestamp logged and truck moved to weighbridge.");
    if (action === "manual-override") toast("Manual override requested. Supervisor approval required.");
    if (action === "save-weight") toast(`Net weight saved: ${fmt(Number($("grossWeight")?.value || 0) - Number($("tareWeight")?.value || 0))} kg.`);
    if (action === "open-gate") {
      const g = state.data.gate.find(x => x.id === id);
      openDrawer(id, genericDrawer("Gate Pass", [["Truck", g.truck], ["Direction", g.direction], ["Reference", g.ref], ["Status", g.status], ["Exception", g.exception]]));
    }
    if (action === "new-qc") state.screen = "qc", render();
    if (action === "approve-qc") saveQc("Approved");
    if (action === "reject-qc") saveQc("Rejected");
    if (action === "qc-matrix") toast("QC matrix configuration opened.");
    if (action === "open-qc") {
      const q = state.data.qc.find(x => x.id === id);
      openDrawer(id, genericDrawer("QC", [["Batch", q.batch], ["DM", `${q.dm}%`], ["FFA", `${q.ffa}%`], ["Decision", q.decision], ["Officer", q.officer]]));
    }
    if (action === "generate-grn") toast("GRN generated from approved QC batch.");
    if (action === "post-grn") toast("GRN posted to inventory and batch ID confirmed.");
    if (action === "print-labels") toast("QR labels sent to printer queue.");
    if (action === "log-incident") state.screen = "maintenance", render();
    if (action === "save-incident") saveIncident();
    if (action === "close-incident") closeIncident(id);
    if (action === "maintenance-calendar") toast("Preventive maintenance calendar opened.");

    // Users/settings/reports
    if (action === "invite-user") inviteUserModal();
    if (action === "save-user") saveUser();
    if (action === "change-role") changeRoleModal(btn.dataset.index);
    if (action === "save-role") saveRole(btn.dataset.index);
    if (action === "permission-matrix") toast("Permission matrix ready for role update.");
    if (action === "setting-tab") { state.settingTab = btn.dataset.tab; render(); }
    if (action === "save-settings") saveSettings();
    if (action === "reset-settings") resetSettings();
    if (action === "test-notification") toast("Test alert sent through active channels.");
    if (action === "reset-demo-data") resetDemoData();
    if (action === "set-report-sector") { state.reportSector = btn.dataset.sector; render(); }
    if (action === "export-current-report") exportCsv(`agriflow-${state.reportSector.toLowerCase()}-report.csv`, reportRows().filter(r => state.reportSector === "All" || r.sector === state.reportSector));
    if (action === "print-report") window.print();
    if (action === "refresh-reports") toast("Reports refreshed from live demo data.");
    if (action === "email-report") toast("Report email action prepared for configured recipients.");
    if (action === "open-report-row") toast(`Opened report reference ${btn.dataset.ref}.`);
  });

  $("modalOverlay").addEventListener("click", e => { if (e.target.id === "modalOverlay") closeModal(); });
  $("drawerOverlay").addEventListener("click", e => { if (e.target.id === "drawerOverlay") closeDrawer(); });
  $("globalSearch").addEventListener("input", e => runSearch(e.target.value));
}

function login(quick = false) {
  const email = quick ? "admin@agriflow.local" : $("loginEmail").value;
  const role = quick ? "Factory Admin" : $("loginRole").value;
  state.activeUser = { name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()), email, role };
  state.authenticated = true;
  state.screen = "overview";
  localStorage.setItem("agriflowLoggedIn", "yes");
  localStorage.setItem("agriflowUser", JSON.stringify(state.activeUser));
  applyAuthState();
  render();
  toast("Login successful. Live dashboard opened.");
}
function logout() {
  state.authenticated = false;
  localStorage.removeItem("agriflowLoggedIn");
  applyAuthState();
}

function quickActionModal() {
  openModal("Quick Action Center", `<div class="grid two"><button class="btn btn-primary" data-screen="procurement">New procurement</button><button class="btn btn-soil" data-screen="production">Start production</button><button class="btn btn-ghost" data-screen="inventory">Manage inventory</button><button class="btn btn-ghost" data-screen="orders">Create order</button><button class="btn btn-ghost" data-screen="reports">Export report</button><button class="btn btn-ghost" data-screen="settings">Settings panel</button></div>`);
}

function saveReq(broadcast) {
  const req = { id: `REQ-${2400 + state.data.procurement.length + 1}`, product: $("reqProduct")?.value || "Avocado Hass", qty: Number($("reqQty")?.value || 0), rate: Number($("reqRate")?.value || 0), timeline: $("reqTimeline")?.value || today(), channel: state.settings.whatsapp ? "App, SMS, WhatsApp" : "App", responses: 0, status: broadcast ? "Broadcasted" : "Draft" };
  state.data.procurement.unshift(req);
  toast(broadcast ? `${req.id} broadcasted to farmer groups.` : `${req.id} saved as draft.`);
  render();
}
function updateFarmer(id, status) {
  const f = state.data.farmers.find(x => x.id === id);
  if (f) f.status = status;
  toast(`${f?.name || id} moved to ${status}.`);
  render();
}
function confirmFarmer(id) {
  const f = state.data.farmers.find(x => x.id === id);
  if (f) f.status = "Confirmed";
  state.data.procurement.unshift({ id: `PO-${5200 + state.data.procurement.length}`, product: f?.product || "Avocado", qty: f?.qty || 0, rate: f?.rate || 0, timeline: f?.delivery || today(), channel: "Agreement", responses: 1, status: "Confirmed Order" });
  toast(`Confirmed order generated for ${f?.name || id}.`);
  render();
}

function receiveStockModal() {
  openModal("Receive Stock", `<div class="form-grid"><div class="field"><label>Batch/SKU ID</label><input id="receiveId" value="BCH-AVO-${Math.floor(2500 + Math.random()*400)}" /></div><div class="field"><label>Item</label><input id="receiveItem" value="Hass Avocado Raw" /></div><div class="field"><label>Quantity</label><input id="receiveQty" type="number" value="5000" /></div><div class="field"><label>Location</label><input id="receiveLocation" value="Cold Zone C-01" /></div><div class="field"><label>Supplier</label><input id="receiveSupplier" value="Village Farmer Group" /></div><div class="field"><label>Minimum Level</label><input id="receiveMin" type="number" value="7000" /></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-receive">Receive & Create Batch</button></div>`);
}
function saveReceive() {
  state.data.inventory.unshift({ id: $("receiveId").value, item: $("receiveItem").value, category: "Raw Material", location: $("receiveLocation").value, qty: Number($("receiveQty").value || 0), min: Number($("receiveMin").value || 0), max: Number($("receiveQty").value || 0) * 2, status: "Healthy", qc: "Pending", supplier: $("receiveSupplier").value, age: "0 day", fefo: "2026-05-18", reserved: 0 });
  closeModal();
  toast("New batch received and added to inventory.");
  render();
}
function transferStockModal(id) {
  const i = state.data.inventory.find(x => x.id === id);
  openModal("Transfer Stock", `<div class="form-grid"><div class="field"><label>Batch/SKU</label><input value="${id}" readonly /></div><div class="field"><label>Current Location</label><input value="${i?.location || ""}" readonly /></div><div class="field"><label>New Location</label><select id="transferLocation"><option>Cold Zone A-02</option><option>Cold Zone B-04</option><option>Cold Zone C-01</option><option>Production Line 1</option><option>Tank T-04</option><option>Maintenance Cage</option></select></div><div class="field"><label>Quantity</label><input id="transferQty" type="number" value="${Math.min(i?.qty || 0, 1000)}" /></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-transfer" data-id="${id}">Confirm Transfer</button></div>`);
}
function saveTransfer(id) {
  const i = state.data.inventory.find(x => x.id === id);
  if (i) i.location = $("transferLocation").value;
  closeModal(); closeDrawer();
  toast(`${id} transferred to ${i?.location}.`);
  render();
}
function reserveStockModal(id) {
  const i = state.data.inventory.find(x => x.id === id);
  openModal("Reserve Stock", `<div class="form-grid"><div class="field"><label>Batch/SKU</label><input value="${id}" readonly /></div><div class="field"><label>Available</label><input value="${fmt(Math.max((i?.qty || 0) - (i?.reserved || 0), 0))}" readonly /></div><div class="field"><label>Reserve Quantity</label><input id="reserveQty" type="number" value="1000" /></div><div class="field"><label>Order Reference</label><input id="reserveRef" value="ORD-8801" /></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-reserve" data-id="${id}">Reserve Quantity</button></div>`);
}
function saveReserve(id) {
  const i = state.data.inventory.find(x => x.id === id);
  const q = Number($("reserveQty").value || 0);
  if (i) { i.reserved = (i.reserved || 0) + q; i.status = "Reserved"; }
  closeModal(); closeDrawer();
  toast(`${fmt(q)} reserved from ${id}.`);
  render();
}
function adjustStockModal(id) {
  const i = state.data.inventory.find(x => x.id === id);
  openModal("Adjust Stock", `<div class="form-grid"><div class="field"><label>Batch/SKU</label><input value="${id}" readonly /></div><div class="field"><label>Current Qty</label><input value="${fmt(i?.qty || 0)}" readonly /></div><div class="field"><label>New Qty</label><input id="adjustQty" type="number" value="${i?.qty || 0}" /></div><div class="field"><label>Reason</label><select id="adjustReason"><option>Cycle count correction</option><option>Damage</option><option>Production issue</option><option>Manual correction</option></select></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-warning" data-action="save-adjust" data-id="${id}">Apply Adjustment</button></div>`);
}
function saveAdjust(id) {
  const i = state.data.inventory.find(x => x.id === id);
  if (i) { i.qty = Number($("adjustQty").value || 0); i.status = i.qty <= i.min ? "Low Stock" : "Healthy"; }
  closeModal(); closeDrawer();
  toast(`${id} adjusted and stock health recalculated.`);
  render();
}
function reorderStock(id) {
  const i = state.data.inventory.find(x => x.id === id);
  if (!i) return;
  state.data.procurement.unshift({ id: `REQ-${2500 + state.data.procurement.length}`, product: i.item, qty: Math.max(i.max - i.qty, i.min), rate: 0, timeline: today(), channel: "Auto Reorder", responses: 0, status: "Draft" });
  closeDrawer();
  toast(`Auto procurement draft created for ${i.item}.`);
  render();
}
function simulateStock() {
  const i = state.data.inventory[Math.floor(Math.random() * state.data.inventory.length)];
  i.qty = Math.max(0, i.qty + Math.floor(Math.random() * 1600) - 900);
  i.status = i.qty <= i.min ? "Low Stock" : i.status === "Reserved" ? "Reserved" : "Healthy";
  toast(`${i.item} stock moved. Alert rules recalculated.`);
  render();
}
function raiseProcurementFromStock() {
  const low = state.data.inventory.find(i => i.qty <= i.min) || state.data.inventory[0];
  reorderStock(low.id);
  state.screen = "procurement";
  render();
}

function startProduction() {
  const id = `BCH-AVO-${2500 + state.data.production.length}`;
  state.data.production.unshift({ id, line: "Line 1", input: 5000, output: 0, progress: 5, stage: "Planning", yield: 0, downtime: 0, tank: "T-04", status: "Running" });
  toast(`${id} started on Line 1.`);
  render();
}
function advanceProduction() {
  const p = state.data.production[0];
  p.progress = clamp(p.progress + 12);
  p.output = Math.round(p.input * (p.progress / 100) * 0.186);
  p.yield = p.output ? Number(((p.output / p.input) * 100).toFixed(1)) : p.yield;
  p.stage = p.progress >= 100 ? "Completed" : p.progress > 65 ? "Tank Transfer" : p.progress > 35 ? "Extraction" : "Crushing";
  p.status = p.progress >= 100 ? "Completed" : "Running";
  toast(`${p.id} advanced to ${p.progress}%.`);
  render();
}
function downtimeModal() {
  openModal("Log Production Downtime", `<div class="form-grid"><div class="field"><label>Machine</label><select id="dtMachine"><option>Crusher Line 1</option><option>Extractor Line 2</option></select></div><div class="field"><label>Reason</label><select id="dtReason"><option>Feed jam</option><option>Electrical issue</option><option>Cleaning hold</option></select></div><div class="field"><label>Minutes</label><input id="dtMinutes" type="number" value="14"></div><div class="field"><label>Severity</label><select id="dtSeverity"><option>Medium</option><option>High</option></select></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-downtime">Save Downtime</button></div>`);
}
function saveDowntime() {
  state.data.production[0].downtime += Number($("dtMinutes").value || 0);
  closeModal();
  toast("Downtime logged and linked to maintenance.");
  render();
}
function openBatchReport() {
  const p = state.data.production[0];
  openDrawer("Batch Productivity Report", `<div class="summary-grid" style="grid-template-columns:repeat(3,1fr)"><div class="summary-card"><span>Input</span><strong>${fmt(p.input)} kg</strong></div><div class="summary-card"><span>Output</span><strong>${fmt(p.output)} L</strong></div><div class="summary-card"><span>Yield</span><strong>${p.yield}%</strong></div></div><div style="height:14px"></div><div class="timeline"><div class="timeline-item"><strong>Progress</strong><span>${p.progress}% complete at ${p.stage}.</span></div><div class="timeline-item"><strong>Downtime</strong><span>${p.downtime} minutes logged.</span></div><div class="timeline-item"><strong>Tank</strong><span>${p.tank} allocation confirmed.</span></div></div>`);
}

function saveOrder(status) {
  const o = { id: `ORD-${8800 + state.data.orders.length + 1}`, buyer: $("orderBuyer").value, product: $("orderProduct").value, qty: Number($("orderQty").value || 0), unit: $("orderProduct").value === "Crude Oil" ? "L" : "kg", status, source: "Pending", delivery: $("orderDate").value };
  state.data.orders.unshift(o);
  toast(`${o.id} created with status ${status}.`);
  render();
}
function advanceOrder(id) {
  const flow = ["Draft", "Scheduling", "Allocated", "Docs Ready", "Dispatched", "Completed"];
  const o = state.data.orders.find(x => x.id === id);
  if (!o) return;
  const next = flow[Math.min(flow.indexOf(o.status) + 1, flow.length - 1)] || "Allocated";
  o.status = next;
  if (next === "Allocated") o.source = "T-04";
  toast(`${id} advanced to ${next}.`);
  render();
}

function generateGpn() {
  const g = { id: `GPN-${29020 + state.data.gate.length}`, truck: "NEW-" + Math.floor(Math.random()*900), direction: "Inbound", ref: "PO-New", supplier: "New Supplier", status: "Pending Entry", exception: "None", gross: 0, tare: 0 };
  state.data.gate.unshift(g);
  toast(`${g.id} generated with QR code.`);
  render();
}
function saveQc(decision) {
  const q = { id: `QC-${7720 + state.data.qc.length}`, batch: $("qcBatch").value, dm: Number($("qcDm").value || 0), ffa: Number($("qcFfa").value || 0), decision, officer: state.activeUser.name.split(" ")[0], evidence: "Manual entry" };
  state.data.qc.unshift(q);
  toast(`${q.batch} ${decision.toLowerCase()} and QC log updated.`);
  render();
}
function saveIncident() {
  const m = { id: `INC-${305 + state.data.maintenance.length}`, asset: $("incAsset").value, severity: $("incSeverity").value, status: "Open", issue: $("incIssue").value, owner: state.activeUser.name.split(" ")[0] };
  state.data.maintenance.unshift(m);
  toast(`${m.id} created and assigned.`);
  render();
}
function closeIncident(id) {
  const m = state.data.maintenance.find(x => x.id === id);
  if (m) m.status = "Completed";
  toast(`${id} closed with approval note.`);
  render();
}

function inviteUserModal() {
  openModal("Invite User", `<div class="form-grid"><div class="field"><label>Name</label><input id="newUserName" value="New Team Member"></div><div class="field"><label>Email</label><input id="newUserEmail" value="user@agriflow.local"></div><div class="field full"><label>Role</label><select id="newUserRole"><option>Factory Admin</option><option>Procurement Manager</option><option>Production Manager</option><option>Warehouse Supervisor</option><option>QC Officer</option><option>Gatekeeper</option><option>Executive Viewer</option></select></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-user">Send Invite</button></div>`);
}
function saveUser() {
  state.data.users.unshift({ name: $("newUserName").value, email: $("newUserEmail").value, role: $("newUserRole").value, status: "Invited" });
  closeModal();
  toast("User invited and added to RBAC table.");
  render();
}
function changeRoleModal(index) {
  const u = state.data.users[index];
  openModal("Change User Role", `<div class="form-grid"><div class="field"><label>User</label><input value="${u.name}" readonly></div><div class="field"><label>Role</label><select id="editRole"><option>Factory Admin</option><option>Procurement Manager</option><option>Production Manager</option><option>Warehouse Supervisor</option><option>QC Officer</option><option>Gatekeeper</option><option>Executive Viewer</option></select></div></div><div class="actions" style="margin-top:14px"><button class="btn btn-primary" data-action="save-role" data-index="${index}">Save Role</button></div>`);
}
function saveRole(index) {
  state.data.users[index].role = $("editRole").value;
  closeModal();
  toast("User role updated.");
  render();
}

function saveSettings() {
  const s = state.settings;
  if ($("setCompany")) s.companyName = $("setCompany").value;
  if ($("setSite")) s.factorySite = $("setSite").value;
  if ($("setCurrency")) s.currency = $("setCurrency").value;
  if ($("setLanguage")) s.language = $("setLanguage").value;
  if ($("setLowStock")) s.lowStockBuffer = Number($("setLowStock").value || 15);
  if ($("setRefresh")) s.liveRefresh = Number($("setRefresh").value || 3);
  if ($("setWhatsapp")) s.whatsapp = $("setWhatsapp").checked;
  if ($("setSms")) s.sms = $("setSms").checked;
  if ($("setPush")) s.appPush = $("setPush").checked;
  if ($("setAutoExport")) s.autoExport = $("setAutoExport").checked;
  if ($("set2fa")) s.twoFactor = $("set2fa").value === "Enabled";
  if ($("setRole")) state.activeUser.role = $("setRole").value;
  localStorage.setItem("agriflowSettings", JSON.stringify(s));
  localStorage.setItem("agriflowUser", JSON.stringify(state.activeUser));
  toast("Settings saved and applied across dashboard.");
  render();
}
function resetSettings() {
  localStorage.removeItem("agriflowSettings");
  toast("Settings reset. Reloading defaults in this view.");
  state.settings = { companyName: "AgriFlow FMCG", factorySite: "Red Soil Processing Factory", currency: "₦", language: "English", lowStockBuffer: 15, liveRefresh: 3, whatsapp: true, sms: true, appPush: true, twoFactor: true, autoExport: false, theme: "earth" };
  render();
}
function resetDemoData() {
  state.data = JSON.parse(JSON.stringify(demo));
  toast("Demo data reset successfully.");
  render();
}

function exportCsv(filename, rows) {
  const arr = Array.isArray(rows) ? rows : [];
  if (!arr.length) { toast("No data available to export."); return; }
  const keys = Object.keys(arr[0]);
  const csv = [keys.join(","), ...arr.map(row => keys.map(k => `"${String(row[k] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast(`${filename} exported.`);
}

function runSearch(q) {
  state.search = q.trim().toLowerCase();
  if (state.search.length < 3) return;
  const sources = [
    ...state.data.inventory.map(x => ({ type: "Inventory", label: `${x.id} · ${x.item}`, screen: "inventory" })),
    ...state.data.orders.map(x => ({ type: "Order", label: `${x.id} · ${x.buyer}`, screen: "orders" })),
    ...state.data.farmers.map(x => ({ type: "Farmer", label: `${x.id} · ${x.name}`, screen: "procurement" })),
    ...state.data.gate.map(x => ({ type: "Gate", label: `${x.id} · ${x.truck}`, screen: "logistics" }))
  ];
  const hits = sources.filter(x => x.label.toLowerCase().includes(state.search)).slice(0, 8);
  if (hits.length) {
    openModal("Search Results", `<div class="grid">${hits.map(h => `<button class="summary-card" data-screen="${h.screen}" style="text-align:left"><span>${h.type}</span><strong>${h.label}</strong></button>`).join("")}</div>`);
  }
}

function startClock() {
  setInterval(() => {
    const d = new Date();
    if ($("clock")) $("clock").textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (state.live && state.authenticated) {
      state.stockShift += Math.random() > 0.5 ? 3 : -2;
      const p = state.data.production.find(x => x.status === "Running");
      if (p) p.progress = clamp(p.progress + (Math.random() > 0.65 ? 1 : 0));
      const hero = $("heroYield");
      if (hero) hero.textContent = `${(avg(state.data.production.map(x => x.yield)) + Math.random() * 0.2).toFixed(1)}%`;
    }
  }, Math.max(2, Number(state.settings.liveRefresh || 3)) * 1000);
}

init();
