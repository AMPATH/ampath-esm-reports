import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Layer, Search, Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { ArrowRight, Calendar, DocumentMultiple_01, Location, Report, type CarbonIconType } from '@carbon/react/icons';
import { formatDate, useSession } from '@openmrs/esm-framework';

import { registerCategories, totalRegisterCount } from '../registers/register-catalog';
import {
  countReports,
  filterCategories,
  reportGroups,
  totalReportCount,
  type ReportCategory,
  type ReportDefinition,
} from './report-catalog';
import { FacilityClinics, useFacility } from '../common/report-header';
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

  /* The Reports tab's group (MOH, Program, Quality improvement), also kept in the URL */
  const selectedGroup = reportGroups.find((group) => group.id === searchParams.get('group')) ?? reportGroups[0];
  const selectGroup = (groupId: string) => {
    const next = new URLSearchParams(searchParams);
    if (groupId === reportGroups[0].id) {
      next.delete('group');
    } else {
      next.set('group', groupId);
    }
    setSearchParams(next, { replace: true });
  };
  /* each group's reports matching the search, so the switcher shows where the matches are */
  const groupMatches = (groupId: string) =>
    countReports(filterCategories(reportGroups.find((group) => group.id === groupId)?.categories ?? [], reportSearch));

  /* while searching, the first other group with matches, offered when this one has none */
  const groupWithMatches = reportSearch.trim()
    ? reportGroups.find((group) => group !== selectedGroup && groupMatches(group.id) > 0)
    : undefined;
  const showGroupWithMatches = groupWithMatches && (
    <Button kind="tertiary" size="sm" onClick={() => selectGroup(groupWithMatches.id)}>
      Show {groupMatches(groupWithMatches.id)} in {groupWithMatches.title}
    </Button>
  );

  /* the facility the reports cover (the session location's parent, e.g. MTRH
     for MTRH Module 1), as the reports themselves name it */
  const facility = useFacility(session?.sessionLocation?.uuid, session?.sessionLocation?.display ?? '');
  const facilityName = facility.name;
  const today = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  /* One report or register: its code and name, opening its page */
  const renderItem = (report: ReportDefinition) => (
    <button type="button" className={styles.sheetRow} title={report.description} onClick={() => navigate(report.path)}>
      <span className={styles.sheetCode}>{report.code}</span>
      <span className={styles.sheetName}>{report.name}</span>
      <ArrowRight size={16} className={styles.sheetArrow} />
    </button>
  );

  /* A tab's list on one white sheet, as a table of two sides: each
     category's name in one merged cell beside the rows of its items */
  const renderSheet = (categories: ReportCategory[], noun: string) => (
    <div className={styles.sheet}>
      <table className={styles.categoryTable} aria-label={noun}>
        {categories.map((category) => (
          /* each category in its own colour: a bar at its left, its code chips and hover */
          <tbody key={category.id} data-tone={category.tone}>
            {category.reports.map((report, index) => (
              <tr key={report.path}>
                {index === 0 && (
                  <th scope="rowgroup" rowSpan={category.reports.length} className={styles.categoryCell}>
                    <span className={styles.categoryName}>{category.label ?? category.title}</span>
                    <span className={styles.categoryDescription}>{category.description}</span>
                  </th>
                )}
                <td className={styles.itemCell}>{renderItem(report)}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
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
    groups,
    whenEmpty,
    elsewhere,
  }: {
    id: string;
    noun: string;
    categories: ReportCategory[];
    total: number;
    term: string;
    setTerm: (term: string) => void;
    icon: CarbonIconType;
    hint: string;
    /** Shown at the left of the search row, e.g. the report groups; without it the row shows the count */
    groups?: React.ReactNode;
    /** Shown instead of the categories when there are none to list yet */
    whenEmpty?: React.ReactNode;
    /** Offered when nothing here matches the search, e.g. a group that has matches */
    elsewhere?: React.ReactNode;
  }) => {
    const visible = filterCategories(categories, term);
    const matches = countReports(visible);
    const isSearching = term.trim().length > 0;
    const label = `Search ${noun}`;
    /* "1 register", "10 reports" */
    const counted = (n: number) => (n === 1 ? noun.replace(/s$/, '') : noun);

    return (
      <>
        <div className={groups ? styles.groupBar : `${styles.groupBar} ${styles.plainBar}`}>
          {groups ?? (
            <p className={styles.barCount}>
              {isSearching ? `${matches} of ${total} ${counted(total)}` : `${total} ${counted(total)}`}
            </p>
          )}
          <Layer className={styles.groupSearch}>
            <Search
              id={id}
              labelText={label}
              placeholder={label}
              size="sm"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              onClear={() => setTerm('')}
            />
          </Layer>
        </div>

        {categories.length === 0 && whenEmpty ? (
          whenEmpty
        ) : visible.length > 0 ? (
          renderSheet(visible, noun)
        ) : (
          <Layer className={styles.emptyState}>
            <Icon size={32} className={styles.emptyStateIcon} />
            <h5>
              No {noun} match &ldquo;{term}&rdquo;
            </h5>
            <p>{hint}</p>
            {elsewhere}
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
        <p className={styles.headerMeta}>
          {facilityName && (
            <span className={styles.metaItem}>
              <Location size={16} />
              <FacilityClinics name={facilityName} clinics={facility.clinics} />
            </span>
          )}
          <span className={styles.metaItem}>
            <Calendar size={16} />
            {today}
          </span>
        </p>
        <Tabs selectedIndex={selectedTab} onChange={selectTab}>
          <TabList aria-label="Reports and registers" className={styles.tabList}>
            <Tab>
              <span className={styles.tabLabel}>
                <Report size={16} />
                Reports
                <span className={styles.countBadge}>{totalReportCount}</span>
              </span>
            </Tab>
            <Tab>
              <span className={styles.tabLabel}>
                <DocumentMultiple_01 size={16} />
                Registers
                <span className={styles.countBadge}>{totalRegisterCount}</span>
              </span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className={styles.tabPanel}>
              {renderCatalog({
                id: 'reports-search',
                noun: 'reports',
                categories: selectedGroup.categories,
                total: countReports(selectedGroup.categories),
                term: reportSearch,
                setTerm: setReportSearch,
                icon: Report,
                hint: 'Try a form number such as 731, or a service such as immunization.',
                groups: (
                  /* the groups as plain text links, the open one underlined; counts follow the search */
                  <nav className={styles.groupNav} aria-label="Report groups">
                    {reportGroups.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        className={styles.groupLink}
                        aria-pressed={group === selectedGroup}
                        title={group.description}
                        onClick={() => selectGroup(group.id)}
                      >
                        <span className={styles.groupLinkTitle}>{group.title}</span>
                        <span className={styles.groupLinkShort}>{group.shortTitle}</span>
                        <span className={styles.countBadge} data-empty={groupMatches(group.id) === 0}>
                          {groupMatches(group.id)}
                        </span>
                      </button>
                    ))}
                  </nav>
                ),
                whenEmpty: (
                  <Layer className={styles.emptyState}>
                    <Report size={32} className={styles.emptyStateIcon} />
                    <h5>No {selectedGroup.title.toLowerCase()} yet</h5>
                    <p>They will be listed here as they are added.</p>
                    {showGroupWithMatches}
                  </Layer>
                ),
                elsewhere: showGroupWithMatches,
              })}
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              {/* Registers, from src/registers, searched as the reports are but listed
                  as one plain list, without their categories */}
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
