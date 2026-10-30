import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, ClickableTile, Layer, Search, Tab, TabList, TabPanel, TabPanels, Tabs, Tag } from '@carbon/react';
import { ArrowRight, DocumentMultiple_01, Report, type CarbonIconType } from '@carbon/react/icons';
import { formatDate, useSession } from '@openmrs/esm-framework';

import { registerCategories, totalRegisterCount } from '../registers/register-catalog';
import {
  filterCategories,
  reportCategories,
  totalReportCount,
  type ReportCategory,
  type ReportDefinition,
} from './report-catalog';
import styles from './reports-dashboard.module.scss';

interface ReportsDashboardProps {}

const ReportsDashboard: React.FC<ReportsDashboardProps> = () => {
  const navigate = useNavigate();
  const session = useSession();
  /* each tab keeps its own search */
  const [reportSearch, setReportSearch] = useState<string>('');
  const [registerSearch, setRegisterSearch] = useState<string>('');

  /* Reports first, Registers second; the open tab is kept in the URL */
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get('tab') === 'registers' ? 1 : 0;
  const selectTab = ({ selectedIndex }: { selectedIndex: number }) => {
    const next = new URLSearchParams(searchParams);
    if (selectedIndex === 1) {
      next.set('tab', 'registers');
    } else {
      next.delete('tab');
    }
    setSearchParams(next, { replace: true });
  };

  const facilityName = session?.sessionLocation?.display;
  const today = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

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

  const renderCategory = (category: ReportCategory) => (
    <section key={category.id} className={styles.category}>
      <div className={styles.categoryHeader} data-tone={category.tone}>
        <h5 className={styles.categoryTitle}>{category.title}</h5>
        <Tag size="sm" type="outline">
          {category.reports.length}
        </Tag>
      </div>
      <div className={styles.grid}>{category.reports.map((report) => renderReportTile(report, category.tone))}</div>
    </section>
  );

  /** A tab's list: search row, then its categories, or a message when nothing matches */
  const renderCatalog = ({
    id,
    noun,
    categories,
    total,
    term,
    setTerm,
    icon: Icon,
    hint,
  }: {
    id: string;
    noun: string;
    categories: ReportCategory[];
    total: number;
    term: string;
    setTerm: (term: string) => void;
    icon: CarbonIconType;
    hint: string;
  }) => {
    const visible = filterCategories(categories, term);
    const matches = visible.reduce((count, category) => count + category.reports.length, 0);
    const isSearching = term.trim().length > 0;
    const label = `Search ${noun}`;
    /* "1 register", "10 reports" */
    const counted = (n: number) => (n === 1 ? noun.replace(/s$/, '') : noun);

    return (
      <>
        <div className={styles.toolbar}>
          <Layer className={styles.searchLayer}>
            <Search
              id={id}
              labelText={label}
              placeholder={label}
              size="md"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              onClear={() => setTerm('')}
            />
          </Layer>
          <p className={styles.resultCount}>
            {isSearching ? `${matches} of ${total} ${counted(total)}` : `${total} ${counted(total)} available`}
          </p>
        </div>

        {visible.length > 0 ? (
          visible.map(renderCategory)
        ) : (
          <Layer className={styles.emptyState}>
            <Icon size={32} className={styles.emptyStateIcon} />
            <h5>
              No {noun} match &ldquo;{term}&rdquo;
            </h5>
            <p>{hint}</p>
            <Button kind="ghost" size="sm" onClick={() => setTerm('')}>
              Clear search
            </Button>
          </Layer>
        )}
      </>
    );
  };

  return (
    <div className={styles.dashboard}>
      {/* The facility and date sit at the right end of the tab row */}
      <div className={styles.tabsArea}>
        <p className={styles.headerMeta}>{[facilityName, today].filter(Boolean).join(' · ')}</p>
        <Tabs selectedIndex={selectedTab} onChange={selectTab}>
          <TabList aria-label="Reports and registers" className={styles.tabList}>
            <Tab>
              <span className={styles.tabLabel}>
                <Report size={16} />
                Reports
                <Tag size="sm" type="gray" className={styles.tabCount}>
                  {totalReportCount}
                </Tag>
              </span>
            </Tab>
            <Tab>
              <span className={styles.tabLabel}>
                <DocumentMultiple_01 size={16} />
                Registers
                <Tag size="sm" type="gray" className={styles.tabCount}>
                  {totalRegisterCount}
                </Tag>
              </span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className={styles.tabPanel}>
              {renderCatalog({
                id: 'reports-search',
                noun: 'reports',
                categories: reportCategories,
                total: totalReportCount,
                term: reportSearch,
                setTerm: setReportSearch,
                icon: Report,
                hint: 'Try a form number such as 731, or a service such as immunization.',
              })}
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              {/* Registers, from src/registers, listed and searched as the reports are */}
              {renderCatalog({
                id: 'registers-search',
                noun: 'registers',
                categories: registerCategories,
                total: totalRegisterCount,
                term: registerSearch,
                setTerm: setRegisterSearch,
                icon: DocumentMultiple_01,
                hint: 'Try a register number such as 362, or a service such as HTS.',
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsDashboard;
