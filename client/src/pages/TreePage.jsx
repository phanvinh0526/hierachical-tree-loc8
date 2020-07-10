import React, { useState, useEffect } from 'react';
import axios from "axios";
import { makeStyles, Grid, Paper } from '@material-ui/core';
import TreeDisplay from '../components/TreeDisplay';
import TableDisplay from '../components/TableDisplay';
import { blueGrey } from '@material-ui/core/colors';

const TREE_SERVICE_API = '/api/tree'
const TABLE_SERVICE_API = '/api/table'
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    // gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    width: '100%',
    
  },
  chart: {
    height: 800,
    maxHeight: 800,
    backgroundColor: blueGrey[50],
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  left:{
    marginRight: 5,
    overflow: "hidden",
  },
  right:{
    marginLeft: 5,
  }
}));

export default function TreePage() {
  const [state, setState] = useState({isFetching: false, data: {}, table: []}) // Current state, funcs to update state
  // Run function after each render by default
  useEffect(() => {
    
    // fetching Tree Data
    const fetchData = async () => {
      try {
        setState({data: state.data, table: state.table, isFetching: true});
        const res_tree = await axios.get(TREE_SERVICE_API)
        const res_tbl  = await axios.get(TABLE_SERVICE_API)
        setState({data: res_tree.data, table: res_tbl.data, isFetching: false})
      } catch (error) {
        console.log("Error in fetchData hook: ", error)
        setState({data: state.data, table: state.table, isFetching: false});
      }
    };
    fetchData();
  }, []) // Run only one time

  const classes = useStyles();

  if(!state.isFetching && state.data && state.table){
    return(
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item justify="center" xs={12}>
            <Paper className={classes.paper}>
              <h1>Display Hierarchical Data with React, and NodeJS</h1>
              <hr />
              <h3>Abstract</h3>
              <p>
                In the Tree view, I display node's name and its value.
                Node's value is calculated by adding up the value of all the child nodes.
              </p>
              <p>
                The table on the right side displays the given dataset.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={8} >
            <Paper className={[classes.paper, classes.chart, classes.left]}>
              <TreeDisplay data={state.data} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={[classes.paper, classes.chart, classes.right]}>
              <TableDisplay data={state.table} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return(
      <div>
        <h2>Fetching data from APIs...</h2>
      </div>
    )
  }
  
}