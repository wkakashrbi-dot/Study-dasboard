# GA-DASHBOARD-UI ENGINE v1.0

This is a production-grade, exam-focused user interface for the Daily News Scraper (RBI Grade B GK/ESI/Finance T-1 news extraction engine).

## Purpose
- Visualizes backend outputs: accepted/rejected news, batch summary, EFI scores, and keyword intelligence.
- No crawling or classification is performed in the UI. It only displays backend results.
- Designed for RBI Grade B aspirants and analysts.

## How to Connect Backend Outputs
1. Place backend-generated files (`accepted.xlsx`, `rejected.xlsx`, `summary.json`, etc.) in the `/backend-outputs` folder.
2. The UI will fetch and display these files using its API interfaces.
3. No backend crawling or news extraction logic is implemented in the UI.

## Folder Structure
- `/components` — All React components (cards, tables, filters, modals, charts, etc.)
- `/pages` — Main screens (Dashboard, Accepted, Rejected, Keywords, Summary)
- `/api` — API interfaces for reading backend outputs (Excel/JSON)
- `/utils` — Highlighting engine, Excel/CSV export, theme utilities
- `/assets` — Logos, icons, color palettes
- `/mock-data` — Sample data for development

## Developer Notes
- Theme: Professional, minimal, navy/charcoal/amber, dashboard-grade.
- Fully responsive, dark/light mode supported.
- All keyword/EFI highlighting is amber/yellow.
- UI is strictly a visualization layer for the Python backend.

## Final Notes
- The UI must not modify, crawl, or classify news; it only displays backend results.
- The UI must highlight matched keywords and EFI scores with clarity.
- The UI’s purpose is to help RBI Grade B aspirants quickly identify high-value exam-relevant news.
