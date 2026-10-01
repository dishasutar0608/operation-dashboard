import type { DashboardData, Filters, Incident, Operation } from '../types';

const pause = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));
const allOps: Operation[] = [
  { id: 'op-1048', order: 'ORD-1048', region: 'East', department: 'Fulfilment', owner: 'Maya Chen', status: 'Delayed', completion: 72, updated: '12 min ago', value: '$12,450' },
  { id: 'op-1047', order: 'ORD-1047', region: 'Central', department: 'Logistics', owner: 'David Lee', status: 'In transit', completion: 85, updated: '25 min ago', value: '$8,200' },
  { id: 'op-1046', order: 'ORD-1046', region: 'South', department: 'Support', owner: 'Priya Shah', status: 'Completed', completion: 100, updated: '41 min ago', value: '$6,740' },
  { id: 'op-1045', order: 'ORD-1045', region: 'West', department: 'Fulfilment', owner: 'Sam Ortiz', status: 'At risk', completion: 48, updated: '1 hr ago', value: '$16,890' },
  { id: 'op-1044', order: 'ORD-1044', region: 'East', department: 'Logistics', owner: 'Maya Chen', status: 'Completed', completion: 100, updated: '1 hr ago', value: '$4,320' },
  { id: 'op-1043', order: 'ORD-1043', region: 'Central', department: 'Support', owner: 'Noah Kim', status: 'Delayed', completion: 66, updated: '2 hrs ago', value: '$9,115' },
  { id: 'op-1042', order: 'ORD-1042', region: 'South', department: 'Fulfilment', owner: 'Priya Shah', status: 'In transit', completion: 91, updated: '2 hrs ago', value: '$11,270' },
];
const alerts = [
  { id: 'a1', title: 'East hub on-time delivery below threshold', severity: 'Critical' as const, timestamp: '8 min ago', owner: 'Maya Chen', resolved: false },
  { id: 'a2', title: 'West backlog exceeds daily capacity', severity: 'High' as const, timestamp: '32 min ago', owner: 'Sam Ortiz', resolved: false },
  { id: 'a3', title: 'Support response time trending up', severity: 'Medium' as const, timestamp: '1 hr ago', owner: 'Priya Shah', resolved: false },
];
function isEmpty(f: Filters) { return f.region === 'North'; }
function isFailure(f: Filters) { return f.region === 'West' && f.status === 'All statuses'; }
export async function getDashboard(filters: Filters): Promise<DashboardData> {
  await pause(900); if (isFailure(filters)) throw new Error('We could not refresh dashboard data. Please retry.');
  if (isEmpty(filters)) return { kpis: [], trends: [], regions: [], statuses: [], alerts: [] };
  return { kpis: [
    { label: 'Revenue', value: '$1.24M', change: 12.4, comparison: 'vs. prior period', tone: 'blue' },
    { label: 'Orders completed', value: '8,426', change: 8.2, comparison: 'vs. prior period', tone: 'teal' },
    { label: 'On-time delivery', value: '94.8%', change: 1.6, comparison: 'vs. target', tone: 'teal' },
    { label: 'Customer satisfaction', value: '4.7/5', change: 3.1, comparison: 'vs. prior period', tone: 'blue' },
    { label: 'Active alerts', value: '12', change: -18.0, comparison: 'vs. last week', tone: 'red' },
    { label: 'Productivity', value: '87.3%', change: 4.8, comparison: 'vs. target', tone: 'orange' },
  ], trends: [
    { label: 'Mon', revenue: 142, orders: 1080, productivity: 78 }, { label: 'Tue', revenue: 166, orders: 1210, productivity: 82 }, { label: 'Wed', revenue: 153, orders: 1170, productivity: 80 }, { label: 'Thu', revenue: 189, orders: 1390, productivity: 88 }, { label: 'Fri', revenue: 205, orders: 1530, productivity: 91 }, { label: 'Sat', revenue: 176, orders: 1290, productivity: 85 }, { label: 'Sun', revenue: 214, orders: 1570, productivity: 92 },
  ], regions: [{ name: 'East', score: 92, target: 90 }, { name: 'Central', score: 87, target: 90 }, { name: 'South', score: 95, target: 90 }, { name: 'West', score: 76, target: 90 }], statuses: [{ name: 'Completed', value: 62, color: '#0f9f8f' }, { name: 'In transit', value: 22, color: '#2d7ff9' }, { name: 'Delayed', value: 10, color: '#f59e0b' }, { name: 'At risk', value: 6, color: '#e55353' }], alerts };
}
export async function getOperations(filters: Filters): Promise<Operation[]> { await pause(700); if (isFailure(filters)) throw new Error('Operations feed is temporarily unavailable.'); if (isEmpty(filters)) return []; return allOps.filter((o) => (filters.region === 'All regions' || o.region === filters.region) && (filters.department === 'All departments' || o.department === filters.department) && (filters.status === 'All statuses' || o.status === filters.status)); }
export async function createIncident(incident: Incident): Promise<{ id: string; message: string }> { await pause(850); if (incident.title.toLowerCase().includes('fail')) throw new Error('Incident could not be created. Try again.'); return { id: `inc-${Date.now()}`, message: 'Incident created and assigned successfully.' }; }
