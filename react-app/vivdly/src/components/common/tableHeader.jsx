import React from 'react';

const TableHeader = ({ columns, sortColumn, onSort}) => {

  const raiseSort = path => {
    const sortColumnArray = { ...sortColumn};
    if (sortColumnArray.path === path){
      sortColumnArray.order = sortColumnArray.order === "asc" ? "desc" : "asc";
    }
    else {
      sortColumnArray.path = path;
      sortColumnArray.order = "asc";
    }
    onSort(sortColumnArray)
   }

   const renderSortIcon = column => {
     if (column.path !== sortColumn.path) return null;
     if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />
     return <i className="fa fa-sort-desc " />
   }
  return (
          <thead>
            <tr>
              {columns.map(column => (
                <th style={{cursor: "pointer"}} key={column.path || column.key} scope="col" onClick={() => raiseSort(column.path)}>{column.label} {renderSortIcon(column)}</th>
              ))}
            </tr>
          </thead>
   );
}
export default TableHeader;