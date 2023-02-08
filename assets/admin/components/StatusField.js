import React from "react";
import { ChipField, useRecordContext } from "react-admin";
import { makeStyles } from "@mui/styles";
import classnames from "classnames";

const useStyles = makeStyles({
  text: {color: '#fff'},
  draft: { backgroundColor: "#ffa500" },
  failed: { backgroundColor: "#FC100D" },
  approved: { backgroundColor: "#00FF00" },
  comingSoon: { backgroundColor: "blue" }
});

const StatusField = (props) => {
  const classes = useStyles();
  const record = useRecordContext();

  const isDraft = (v) => v?.toUpperCase() === "DRAFT";
  const isApproved = (v) => ["APPROVED", "LIVE"].includes(v?.toUpperCase());
  const isFailed = (v) => ["FAILED", "REJECTED", "EXPIRED"].includes(v?.toUpperCase());
  const isComingSoon = (v) => v?.toUpperCase() === "COMING_SOON";

  const classNames = classnames({
    [classes.text]: true,
    [classes.draft]: isDraft(record[props.source]),
    [classes.approved]: isApproved(record[props.source]),
    [classes.failed]: isFailed(record[props.source]),
    [classes.comingSoon]: isComingSoon(record[props.source])
  });

  return <ChipField className={classNames} {...props} />;
};

export default StatusField;
