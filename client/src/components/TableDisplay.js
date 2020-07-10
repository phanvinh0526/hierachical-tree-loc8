import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableBody, TableCell, TableContainer } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';


const useStyles = makeStyles({
  table:{
    maxWidth: 450,
  },
  container:{
    maxHeight: 800,
    height: 800,
  },
  tbl_header:{
    backgroundColor: blueGrey[500],
  }
});

const TableDisplay = (props) => {
  const classes = useStyles();
  const rows = props.data;

  return(
    <TableContainer className={classes.container}>
    <Table stickyHeader className={classes.table} size="small">
      <TableHead className={classes.tbl_header}>
        <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Paremt_ID</TableCell>
          <TableCell align="center">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">{row.parent_id}</TableCell>
            <TableCell align="center">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  )
}

export default TableDisplay;