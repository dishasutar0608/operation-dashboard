export type Status = 'Completed' | 'Delayed' | 'In transit' | 'At risk';
export type Severity = 'Critical' | 'High' | 'Medium';
export interface Filters { startDate: string; endDate: string; region: string; department: string; status: string }
export interface Kpi { label: string; value: string; change: number; comparison: string; tone: 'blue' | 'teal' | 'orange' | 'red' }
export interface TrendPoint { label: string; revenue: number; orders: number; productivity: number }
export interface RegionPoint { name: string; score: number; target: number }
export interface Alert { id: string; title: string; severity: Severity; timestamp: string; owner: string; resolved: boolean }
export interface Operation { id: string; order: string; region: string; department: string; owner: string; status: Status; completion: number; updated: string; value: string }
export interface DashboardData { kpis: Kpi[]; trends: TrendPoint[]; regions: RegionPoint[]; statuses: { name: string; value: number; color: string }[]; alerts: Alert[] }
export interface Incident { title: string; assignee: string; severity: string; description: string }
