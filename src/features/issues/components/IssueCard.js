import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {STATUS_TODO} from "../../../constants/statuses";
import clsx from "clsx";
import { CircularProgress} from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 50
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: 'right',
    marginBottom: 12,
  },
  selected: {
    backgroundColor: 'lightblue'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default function IssueCard(
  {
    id,
    status = STATUS_TODO,
    summary = '',
    selected = false,
    onSelect = () => {
    },
    loading
  }) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={clsx({[classes.selected]: selected})} onClick={onSelect}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h6" component="h4">
            {id}
          </Typography>
          {loading && <CircularProgress />}
          <Typography className={classes.pos} color="textSecondary">
            {status}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}
