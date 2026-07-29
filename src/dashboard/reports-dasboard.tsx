import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ClickableTile, Layer, Search, Tag } from '@carbon/react';
import { ArrowRight, Calendar, Location, Report } from '@carbon/react/icons';
import { formatDate, useSession } from '@openmrs/esm-framework';

import { filterCategories, reportCategories, totalReportCount, type ReportDefinition } from './report-catalog';
import styles from './reports-dashboard.module.scss';

interface ReportsDashboardProps {}

const ReportsDashboard: React.FC<ReportsDashboardProps> = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const facilityName = session?.sessionLocation?.display;
  const today = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const visibleCategories = useMemo(() => filterCategories(reportCategories, searchTerm), [searchTerm]);
  const matchCount = visibleCategories.reduce((count, category) => count + category.reports.length, 0);
  const isSearching = searchTerm.trim().length > 0;

  const renderReportTile = (report: ReportDefinition, tone: string) => {
    const Icon = report.icon;

    return (
      <ClickableTile
        key={report.path}
        className={styles.tile}
        data-tone={tone}
        onClick={() => navigate(report.path)}
        aria-label={`${report.code} ${report.name}`}
      >
        <div className={styles.tileIcon}>
          <Icon size={20} />
        </div>
        <div className={styles.tileCopy}>
          <p className={styles.tileCode}>{report.code}</p>
          <h4 className={styles.tileName}>{report.name}</h4>
        </div>
        <ArrowRight size={16} className={styles.tileArrow} />
      </ClickableTile>
    );
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <Report size={20} />
        </div>
        <h3 className={styles.headerTitle}>Reports</h3>
        <div className={styles.headerMeta}>
          {facilityName && (
            <span className={styles.metaItem}>
              <Location size={16} />
              {facilityName}
            </span>
          )}
          <span className={styles.metaItem}>
            <Calendar size={16} />
            {today}
          </span>
        </div>
      </header>

      <div className={styles.toolbar}>
        <Layer className={styles.searchLayer}>
          <Search
            id="reports-search"
            labelText="Search reports"
            placeholder="Search reports"
            size="sm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onClear={() => setSearchTerm('')}
          />
        </Layer>
        <p className={styles.resultCount}>
          {isSearching ? `${matchCount} of ${totalReportCount} reports` : `${totalReportCount} reports available`}
        </p>
      </div>

      {visibleCategories.length > 0 ? (
        visibleCategories.map((category) => (
          <section key={category.id} className={styles.category}>
            <div className={styles.categoryHeader} data-tone={category.tone}>
              <h5 className={styles.categoryTitle}>{category.title}</h5>
              <Tag size="sm" type="outline">
                {category.reports.length}
              </Tag>
            </div>
            <div className={styles.grid}>
              {category.reports.map((report) => renderReportTile(report, category.tone))}
            </div>
          </section>
        ))
      ) : (
        <Layer className={styles.emptyState}>
          <Report size={32} className={styles.emptyStateIcon} />
          <h5>No reports match &ldquo;{searchTerm}&rdquo;</h5>
          <p>Try a form number such as 731, or a service such as immunization.</p>
          <Button kind="ghost" size="sm" onClick={() => setSearchTerm('')}>
            Clear search
          </Button>
        </Layer>
      )}
    </div>
  );
};

export default ReportsDashboard;
