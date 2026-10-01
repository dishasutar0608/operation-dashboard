import { useState, type ReactNode } from 'react';
import { AlertCircle, ArrowDownRight, ArrowUpRight, Inbox, RefreshCw } from 'lucide-react';
import type { Kpi, Status } from '../types';

export function LoadingSkeleton({ rows = 3 }: { rows?: number }) { return <div className="skeleton-wrap" aria-label="Loading content">{Array.from({ length: rows }, (_, i) => <div className="skeleton" key={i} />)}</div>; }
export function EmptyState({ title = 'No results found', detail = 'Try changing your filters or date range.' }: { title?: string; detail?: string }) { return <div className="state empty"><Inbox size={28} /><strong>{title}</strong><span>{detail}</span></div>; }
export function ErrorState({ message, retry }: { message: string; retry: () => void }) { return <div className="state error" role="alert"><AlertCircle size={25} /><strong>Unable to load this panel</strong><span>{message}</span><button className="button secondary" onClick={retry}><RefreshCw size={15} /> Retry</button></div>; }
export function StatusBadge({ status }: { status: Status }) { return <span className={`badge ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>; }
export function KpiCard({ item }: { item: Kpi }) { const positive = item.change >= 0; return <article className={`kpi-card ${item.tone}`}><span className="kpi-label">{item.label}</span><strong>{item.value}</strong><div><span className={positive ? 'up' : 'down'}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{Math.abs(item.change)}%</span><span className="comparison">{item.comparison}</span></div></article>; }
export function ChartPanel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <section className="panel chart-panel"><div className="panel-head"><div><h2>{title}</h2><p>{subtitle}</p></div><div className="chart-actions"><button className="more" aria-label={`More options for ${title}`} aria-expanded={open} onClick={() => setOpen(!open)}>•••</button>{open && <div className="chart-menu"><button onClick={() => setOpen(false)}>View full report</button><button onClick={() => setOpen(false)}>Download data</button></div>}</div></div>{children}</section>;
}
