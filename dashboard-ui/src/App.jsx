import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import DashboardOverview from './pages/DashboardOverview';
import AcceptedNews from './pages/AcceptedNews';
import RejectedNews from './pages/RejectedNews';
import KeywordIntelligence from './pages/KeywordIntelligence';
import EFIAnalytics from './pages/EFIAnalytics';
import SourceCoverage from './pages/SourceCoverage';
import BatchSummary from './pages/BatchSummary';
import ErrorLogs from './pages/ErrorLogs';
import Settings from './pages/Settings';

const sectionMap = {
  dashboard: <DashboardOverview />,
  accepted: <AcceptedNews />,
  rejected: <RejectedNews />,
  keywords: <KeywordIntelligence />,
  efi: <EFIAnalytics />,
  sources: <SourceCoverage />,
  summary: <BatchSummary />,
  errors: <ErrorLogs />,
  settings: <Settings />,
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('2025-12-10');

  React.useEffect(() => {
    document.body.style.background = 'var(--color-bg)';
    document.body.style.color = 'var(--color-text-primary)';
  }, [theme]);

  // Format batchId and t1Date for Navbar
  const batchId = `2025-12-11-01`;
  const t1Date = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Pass date and setDate to BatchSummary
  const sectionMap = {
    dashboard: <DashboardOverview />,
    accepted: <AcceptedNews />,
    rejected: <RejectedNews />,
    keywords: <KeywordIntelligence />,
    efi: <EFIAnalytics />,
    sources: <SourceCoverage />,
    summary: <BatchSummary date={date} setDate={setDate} />,
    errors: <ErrorLogs />,
    settings: <Settings />,
  };

  return (
    <div className="min-h-screen flex" style={{background: 'var(--color-bg)', color: 'var(--color-text-primary)'}}>
      <Sidebar
        active={active}
        onNavigate={setActive}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <Navbar
          theme={theme}
          setTheme={setTheme}
          batchId={batchId}
          t1Date={t1Date}
          date={date}
          setDate={setDate}
          onSearch={setSearch}
        />
        <MainContent collapsed={sidebarCollapsed}>
          {sectionMap[active]}
        </MainContent>
      </div>
    </div>
  );
}
