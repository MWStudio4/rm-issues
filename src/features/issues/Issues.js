import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  clearSelected,
  getIssuesAsync,
  putIssuesAsync,
  selectedIssues, selectedPending,
  selectIssues,
  selectStatus,
  toggleIssue
} from './issuesSlice';
import IssueCard from "./components/IssueCard";
import {Backdrop, CircularProgress, FormControl, Grid, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {STATUS_DONE, STATUS_IN_PROGRESS, STATUS_TODO} from "../../constants/statuses";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#efefef',
    height: '100vh'
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  noIssues: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  },
  form: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: '20px 0',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export function Issues() {
  const classes = useStyles();
  const issues = useSelector(selectIssues);
  const status = useSelector(selectStatus);
  const selected = useSelector(selectedIssues);
  const pending = useSelector(selectedPending);
  const dispatch = useDispatch();

  const [formStatus, setFormStatus] = useState(STATUS_TODO);

  useEffect(() => {
    dispatch(getIssuesAsync())
  }, [dispatch])

  const onSelect = (id) => (event) => {
    event.stopPropagation();
    if (!event.ctrlKey) {
      dispatch(clearSelected());
    }
    dispatch(toggleIssue(id))
  }

  const onClearSelection = (event) => {
    if (event.ctrlKey) return;
    dispatch(clearSelected())
  }

  const onUpdateStatus = () => {
    dispatch(putIssuesAsync(formStatus))
  }

  const onChangeStatus = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setFormStatus(event.target.value);
  }

  return (
    <>
      <div className={classes.root} onClick={onClearSelection}>
        <Grid container>
          {
            issues && Array.isArray(issues) && issues.length > 0 ? issues.map(issue => (
              <Grid item xs={3} className={classes.card} key={issue.id}>
                <IssueCard id={issue.id} status={issue.status} summary={issue.summary}
                           selected={selected.includes(issue.id)} onSelect={onSelect(issue.id)}
                           loading={pending && selected.includes(issue.id)}/>
              </Grid>
            )) : (
              <div className={classes.noIssues}>No issues</div>
            )
          }
        </Grid>
      </div>
      {
        selected.length > 0 && (
          <div className={classes.form}>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={formStatus}
                onChange={onChangeStatus}
                inputProps={{
                  name: 'status',
                  id: 'status-simple',
                }}
              >
                <option value={STATUS_TODO}>To Do</option>
                <option value={STATUS_IN_PROGRESS}>In Progress</option>
                <option value={STATUS_DONE}>Done</option>
              </Select>
              <Button variant="contained" onClick={onUpdateStatus}>Update</Button>
            </FormControl>
          </div>
        )
      }
      <Backdrop className={classes.backdrop} open={status === 'loading'}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </>
  );
}
