# Operations Command Center

An executive operations dashboard for the **Operations Executive**. It enables rapid decisions on underperforming regions, delayed orders, workforce productivity, and critical service risks.

## Run

```bash
npm install
npm run dev
```

## Success criteria

- Fast, legible at-a-glance executive view with functional filters and charts.
- Invalid date ranges and incomplete incident submissions are blocked inline.
- Keyboard users can navigate controls, open records, resolve alerts, and submit an incident.
- Redux owns filters, dashboard/operations request lifecycle, alert resolution, and incident state.

## Scope & edge cases

This is mock data only: no authentication, persistence, or production API. Services simulate delayed responses, errors (select **West / All statuses**), and empty data (select **North**). The UI handles empty selection results, request failures with retry, loading skeletons, invalid ranges, missing form fields, and narrow screens with a mobile menu and scrollable table.

## Validation evidence

Acceptance checklist: filter validation ✓; sortable/paginated/selectable table ✓; request loading/error/empty/success states ✓; responsive desktop/tablet/mobile CSS ✓; visible focus and semantic labels ✓. Run `npm run lint` and `npm run build` after installing dependencies.

## Limitations & next steps

Connect real APIs; add auth/permissions and persistence; provide exports/reporting; stream realtime alerts; and add automated unit/e2e tests.
