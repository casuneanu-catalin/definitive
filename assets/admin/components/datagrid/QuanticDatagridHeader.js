import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { DatagridClasses, useListContext } from "react-admin";

const QuanticDatagridHeader = (props) => {
  const { data, onSelect, selectedIds } = useListContext(props);

  const ids = data.map((row) => row.id);

  const handleSelectAll = React.useCallback(
    (event) => {
      if (event.target.checked) {
        const all = ids.concat(selectedIds.filter((id) => !ids.includes(id)));
        onSelect(
          props.isRowSelectable
            ? all.filter((id) => props.isRowSelectable(data[id]))
            : all
        );
      } else {
        onSelect([]);
      }
    },
    [data, ids, onSelect, props.isRowSelectable, selectedIds]
  );
  const all = props.isRowSelectable
    ? ids.filter((id) => props.isRowSelectable(data[id]))
    : ids;

  return (
    <TableHead>
      <TableRow>
        {React.Children.map(props.children, (child) => (
          <TableCell
            key={child.props.source}
            style={{ textTransform: "capitalize" }}
          >
            {child.props.label
              ? child.props.label
              : child.props.source.replace(/([a-z](?=[A-Z]))/g, "$1 ")}
          </TableCell>
        ))}
        <TableCell></TableCell>
        <TableCell></TableCell>
        {props.hasBulkActions && (
          <TableCell
            padding="none"
            className={`select-item ${DatagridClasses.checkbox}`}
          >
            <Checkbox
              className="select-all"
              color="primary"
              checked={
                selectedIds.length > 0 &&
                all.length > 0 &&
                all.every((id) => selectedIds.includes(id))
              }
              onChange={handleSelectAll}
            />
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default QuanticDatagridHeader;
