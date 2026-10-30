import React from 'react';

export const reportDays = Array.from({ length: 31 }, (_, index) => index + 1);

export function renderDailyReportRows(
  rows: React.ReactNode,
  dailyData: Array<Record<string, any>>,
  indicatorKeys: string[],
  onIndicatorClick: (indicator: string, day: number) => void,
): React.ReactNode[] {
  const reportRows = React.Children.toArray(React.isValidElement(rows) ? rows.props.children : rows);
  const resultsByDay = new Map(dailyData.map((row) => [Number(row.day), row]));

  return reportRows.map((row, index) => {
    if (!React.isValidElement(row)) {
      return row;
    }

    const cells = React.Children.toArray(row.props.children);
    const indicator = indicatorKeys[index];
    if (cells.length < 3 || !indicator) {
      return row;
    }

    const total = dailyData.reduce((sum, dayRow) => {
      const value = Number(dayRow[indicator]);
      return Number.isFinite(value) ? sum + value : sum;
    }, 0);
    const totalCell = cells[cells.length - 1] as React.ReactElement;

    return React.cloneElement(
      row,
      { key: `report-row-${index}` },
      cells[0],
      cells[1],
      ...reportDays.map((day) => {
        const value = resultsByDay.get(day)?.[indicator] ?? 0;
        return (
          <td
            key={`day-${day}`}
            onClick={() => onIndicatorClick(indicator, day)}
            style={{ fontWeight: Number(value) > 0 ? 700 : undefined }}
          >
            {value}
          </td>
        );
      }),
      React.cloneElement(
        totalCell,
        { style: { ...totalCell.props.style, fontWeight: total > 0 ? 700 : undefined } },
        total,
      ),
    );
  });
}
