import { Checkbox, TableCell, TableRow } from "@mui/material";
import React from "react";
import {
  EditButton,
  RecordContextProvider,
  ShowButton,
  useResourceContext,
} from "react-admin";

const QuanticDatagridRow = (props) => {
  const { record, id, onToggleItem, children, selected, isRowSelectable } =
    props;
  const resource = useResourceContext(record);

  
  return (
    <RecordContextProvider value={record}>
      <TableRow>
        {React.Children.map(children, (field) => (
          <TableCell key={`${id}-${field.props.source}`}>{field}</TableCell>
        ))}
        <TableCell>
          <EditButton resource={resource} record={record}/>
        </TableCell>
        <TableCell>
          <ShowButton resource={resource} record={record} />
        </TableCell>
        <TableCell padding="none">
          <Checkbox
            disabled={isRowSelectable}
            checked={selected}
            onClick={(event) => onToggleItem(id, event)}
          />
        </TableCell>
      </TableRow>
    </RecordContextProvider>
  );
};

export default QuanticDatagridRow;
