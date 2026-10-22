import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Button, Checkbox, IconButton, Layer, Pagination, Search, Tag } from '@carbon/react';
import {
  ArrowDown,
  ArrowUp,
  ArrowsVertical,
  Column,
  Download,
  Draggable,
  Filter,
  FilterRemove,
  Reset,
} from '@carbon/react/icons';

import { columnsToCsv, downloadCsv } from '../report-register';
import { cellValue, type LinelistColumn, toRegisterColumns } from './linelist-columns';
import { useColumnLayout } from './use-column-layout';
import styles from './linelist-table.scss';

interface LinelistTableProps {
  rows: Array<Record<string, any>>;
  columns: LinelistColumn[];
  /** Identifies this linelist's saved column layout, e.g. `moh-731:hts` */
  layoutKey: string;
  /** Name of the exported file, without extension */
  exportName: string;
}

type SortState = { header: string; direction: 'asc' | 'desc' } | null;

const PAGE_SIZES = [25, 50, 100, 250];

const asText = (value: unknown) => (value === null || value === undefined ? '' : String(value));

/** Blanks sort last in either direction; numbers sort as numbers, everything else naturally */
function compare(a: unknown, b: unknown): number {
  const blankA = asText(a) === '';
  const blankB = asText(b) === '';
  if (blankA || blankB) {
    return blankA === blankB ? 0 : blankA ? 1 : -1;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return asText(a).localeCompare(asText(b), undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * An analytic table for a linelist: search, per-column filters, sorting, and
 * columns the user can hide and reorder (by dragging a heading or from the
 * Columns menu). The layout is remembered per linelist; the export follows
 * what is on screen -- the visible columns in their order, every filtered and
 * sorted row across all pages.
 */
const LinelistTable: React.FC<LinelistTableProps> = ({ rows, columns, layoutKey, exportName }) => {
  const layout = useColumnLayout(columns, layoutKey);
  const { visible } = layout;

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);
  const columnsButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  /* Only filters on visible columns apply: a hidden column's filter would
     narrow the list with nothing on screen to say why. */
  const activeFilters = visible.filter((column) => (filters[column.header] ?? '').trim() !== '');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !query || visible.some((column) => asText(cellValue(column, row)).toLowerCase().includes(query));

      return (
        matchesSearch &&
        activeFilters.every((column) =>
          asText(cellValue(column, row)).toLowerCase().includes(filters[column.header].trim().toLowerCase()),
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, visible, search, filters]);

  const sorted = useMemo(() => {
    const column = sort && visible.find((item) => item.header === sort.header);
    if (!column) {
      return filtered;
    }
    const key = (row: Record<string, any>) => (column.sortValue ? column.sortValue(row) : cellValue(column, row));
    const direction = sort.direction === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const result = compare(key(a), key(b));
      /* blanks stay last whichever way the column is sorted */
      return asText(key(a)) === '' || asText(key(b)) === '' ? result : result * direction;
    });
  }, [filtered, sort, visible]);

  /* Back to the first page whenever the set of rows changes underneath */
  useEffect(() => setPage(1), [search, filters, sort, rows]);

  const offset = (page - 1) * pageSize;
  const pageRows = sorted.slice(offset, offset + pageSize);

  const cycleSort = (header: string) =>
    setSort((current) =>
      current?.header !== header
        ? { header, direction: 'asc' }
        : current.direction === 'asc'
          ? { header, direction: 'desc' }
          : null,
    );

  const clearFilters = () => {
    setFilters({});
    setSearch('');
  };

  const exportCsv = () => {
    const slug = exportName
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    downloadCsv(columnsToCsv(sorted, toRegisterColumns(visible)), `${slug}.csv`);
  };

  const isFiltered = search.trim() !== '' || activeFilters.length > 0;

  /* The Columns panel opens under its button but is kept inside the toolbar's
     width. A popover anchored to the button cannot fit on a phone, where the
     button sits mid-screen and a 20rem panel overflows whichever way it opens. */
  const placePanel = useCallback(() => {
    const toolbar = toolbarRef.current?.getBoundingClientRect();
    const button = columnsButtonRef.current?.getBoundingClientRect();
    const panelWidth = panelRef.current?.offsetWidth ?? 0;
    if (!toolbar || !button) {
      return;
    }
    const preferred = button.right - toolbar.left - panelWidth;
    setPanelPosition({
      top: button.bottom - toolbar.top + 4,
      left: Math.max(0, Math.min(preferred, toolbar.width - panelWidth)),
    });
  }, []);

  useLayoutEffect(() => {
    if (!isColumnsOpen) {
      return;
    }
    placePanel();

    const closeOnOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !columnsButtonRef.current?.contains(target)) {
        setIsColumnsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsColumnsOpen(false);
        columnsButtonRef.current?.focus();
      }
    };

    window.addEventListener('resize', placePanel);
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('resize', placePanel);
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isColumnsOpen, placePanel]);

  return (
    <div className={styles.linelist}>
      <div className={styles.toolbar} ref={toolbarRef}>
        <Search
          size="sm"
          labelText="Search the linelist"
          placeholder="Search all columns"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className={styles.search}
        />
        <Button
          kind={showFilters ? 'secondary' : 'ghost'}
          size="sm"
          renderIcon={Filter}
          onClick={() => setShowFilters((current) => !current)}
          aria-pressed={showFilters}
        >
          Filters{activeFilters.length > 0 ? ` (${activeFilters.length})` : ''}
        </Button>
        {isFiltered && (
          <Button kind="ghost" size="sm" renderIcon={FilterRemove} onClick={clearFilters}>
            Clear
          </Button>
        )}

        <Button
          ref={columnsButtonRef}
          kind={isColumnsOpen ? 'secondary' : 'ghost'}
          size="sm"
          renderIcon={Column}
          onClick={() => setIsColumnsOpen((current) => !current)}
          aria-expanded={isColumnsOpen}
          aria-controls={`${layoutKey}-columns`}
        >
          Columns ({visible.length}/{layout.ordered.length})
        </Button>
        {isColumnsOpen && (
          <Layer
            ref={panelRef}
            id={`${layoutKey}-columns`}
            role="dialog"
            aria-label="Columns"
            className={styles.columnsPanel}
            style={panelPosition}
          >
            <p className={styles.columnsHint}>Show, hide or reorder columns. You can also drag a heading.</p>
            <ul className={styles.columnsList}>
              {layout.ordered.map((column, index) => (
                <li key={column.header} className={styles.columnsItem}>
                  <Draggable size={16} className={styles.dragHandle} aria-hidden />
                  <Checkbox
                    id={`${layoutKey}-column-${index}`}
                    labelText={column.header}
                    checked={layout.isVisible(column.header)}
                    onChange={() => layout.toggle(column.header)}
                  />
                  <span className={styles.columnsMove}>
                    <IconButton
                      kind="ghost"
                      size="sm"
                      label="Move left"
                      disabled={index === 0}
                      onClick={() => layout.shift(column.header, -1)}
                    >
                      <ArrowUp size={16} />
                    </IconButton>
                    <IconButton
                      kind="ghost"
                      size="sm"
                      label="Move right"
                      disabled={index === layout.ordered.length - 1}
                      onClick={() => layout.shift(column.header, 1)}
                    >
                      <ArrowDown size={16} />
                    </IconButton>
                  </span>
                </li>
              ))}
            </ul>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Reset}
              onClick={layout.reset}
              disabled={!layout.isCustomised}
              className={styles.columnsReset}
            >
              Reset columns
            </Button>
          </Layer>
        )}

        <span className={styles.count}>
          {isFiltered
            ? `${sorted.length.toLocaleString()} of ${rows.length.toLocaleString()} records`
            : `${rows.length.toLocaleString()} records`}
        </span>
        <Button
          kind="tertiary"
          size="sm"
          renderIcon={Download}
          onClick={exportCsv}
          disabled={sorted.length === 0 || visible.length === 0}
        >
          Export CSV
        </Button>
      </div>

      {activeFilters.length > 0 && !showFilters && (
        <div className={styles.activeFilters}>
          {activeFilters.map((column) => (
            <Tag
              key={column.header}
              type="blue"
              size="sm"
              filter
              onClose={() => setFilters(({ [column.header]: _removed, ...rest }) => rest)}
            >
              {column.header}: {filters[column.header]}
            </Tag>
          ))}
        </div>
      )}

      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.rowNumber} scope="col">
                #
              </th>
              {visible.map((column) => {
                const direction = sort?.header === column.header ? sort.direction : null;
                return (
                  <th
                    key={column.header}
                    scope="col"
                    draggable
                    aria-sort={direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'}
                    className={classNames({
                      [styles.dragging]: dragged === column.header,
                      [styles.dropTarget]: dropTarget === column.header && dragged !== column.header,
                    })}
                    onDragStart={(event) => {
                      setDragged(column.header);
                      event.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(event) => {
                      if (dragged) {
                        event.preventDefault();
                        setDropTarget(column.header);
                      }
                    }}
                    onDragLeave={() => setDropTarget((current) => (current === column.header ? null : current))}
                    onDrop={(event) => {
                      event.preventDefault();
                      if (dragged) {
                        layout.move(dragged, column.header);
                      }
                      setDragged(null);
                      setDropTarget(null);
                    }}
                    onDragEnd={() => {
                      setDragged(null);
                      setDropTarget(null);
                    }}
                  >
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => cycleSort(column.header)}
                      title="Sort, or drag to move the column"
                    >
                      <span>{column.header}</span>
                      {direction === 'asc' ? (
                        <ArrowUp size={14} className={styles.sortActive} />
                      ) : direction === 'desc' ? (
                        <ArrowDown size={14} className={styles.sortActive} />
                      ) : (
                        <ArrowsVertical size={14} className={styles.sortIdle} />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
            {showFilters && (
              <tr className={styles.filterRow}>
                <th className={styles.rowNumber} />
                {visible.map((column) => (
                  <th key={column.header}>
                    <input
                      type="search"
                      className={styles.filterInput}
                      placeholder="Filter"
                      aria-label={`Filter ${column.header}`}
                      value={filters[column.header] ?? ''}
                      onChange={(event) =>
                        setFilters((current) => ({ ...current, [column.header]: event.target.value }))
                      }
                    />
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {pageRows.map((row, index) => (
              <tr key={offset + index}>
                <td className={styles.rowNumber}>{offset + index + 1}</td>
                {visible.map((column) => {
                  const text = asText(cellValue(column, row));
                  return (
                    <td key={column.header} className={column.wrap ? styles.wrap : undefined} title={text}>
                      {text}
                    </td>
                  );
                })}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td className={styles.noMatches} colSpan={visible.length + 1}>
                  {visible.length === 0 ? 'Every column is hidden.' : 'No records match the search and filters.'}{' '}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={visible.length === 0 ? layout.reset : clearFilters}
                  >
                    {visible.length === 0 ? 'Reset columns' : 'Clear filters'}
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sorted.length > PAGE_SIZES[0] && (
        <Pagination
          className={styles.pagination}
          page={page}
          pageSize={pageSize}
          pageSizes={PAGE_SIZES}
          totalItems={sorted.length}
          size="sm"
          onChange={({ page: nextPage, pageSize: nextSize }) => {
            setPage(nextPage);
            setPageSize(nextSize);
          }}
        />
      )}
    </div>
  );
};

export default LinelistTable;
