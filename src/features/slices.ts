import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createIncident, getDashboard, getOperations } from '../services/mockApi';
import type { Alert, DashboardData, Filters, Operation } from '../types';

export const defaultFilters: Filters = { startDate: '2026-09-01', endDate: '2026-09-17', region: 'All regions', department: 'All departments', status: 'All statuses' };
type Request<T> = { data: T; loading: boolean; error: string | null };
export const fetchDashboard = createAsyncThunk('dashboard/fetch', getDashboard);
export const fetchOperations = createAsyncThunk('operations/fetch', getOperations);
export const submitIncident = createAsyncThunk('incidents/create', createIncident);
const dashboard = createSlice({ name: 'dashboard', initialState: { data: null, loading: true, error: null } as Request<DashboardData | null>, reducers: {}, extraReducers: (b) => b.addCase(fetchDashboard.pending, (s) => { s.loading = true; s.error = null; }).addCase(fetchDashboard.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; }).addCase(fetchDashboard.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Request failed'; }) });
const operations = createSlice({ name: 'operations', initialState: { data: [] as Operation[], loading: true, error: null } as Request<Operation[]>, reducers: {}, extraReducers: (b) => b.addCase(fetchOperations.pending, (s) => { s.loading = true; s.error = null; }).addCase(fetchOperations.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; }).addCase(fetchOperations.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Request failed'; }) });
const filters = createSlice({ name: 'filters', initialState: defaultFilters, reducers: { setFilters: (_, a: PayloadAction<Filters>) => a.payload } });
const alerts = createSlice({ name: 'alerts', initialState: [] as Alert[], reducers: { hydrateAlerts: (_, a: PayloadAction<Alert[]>) => a.payload, resolveAlert: (s, a: PayloadAction<string>) => { const alert = s.find((item) => item.id === a.payload); if (alert) alert.resolved = true; } } });
const incidents = createSlice({ name: 'incidents', initialState: { loading: false, message: '', error: '' }, reducers: { clearIncidentState: (s) => { s.message = ''; s.error = ''; } }, extraReducers: (b) => b.addCase(submitIncident.pending, (s) => { s.loading = true; s.message = ''; s.error = ''; }).addCase(submitIncident.fulfilled, (s, a) => { s.loading = false; s.message = a.payload.message; }).addCase(submitIncident.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Submission failed'; }) });
export const { setFilters } = filters.actions; export const { hydrateAlerts, resolveAlert } = alerts.actions; export const { clearIncidentState } = incidents.actions;
export const reducer = { dashboard: dashboard.reducer, operations: operations.reducer, filters: filters.reducer, alerts: alerts.reducer, incidents: incidents.reducer };
