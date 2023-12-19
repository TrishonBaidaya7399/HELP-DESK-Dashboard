import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    no: id,
    signInTime: name,
    staffId: calories,
    department: fat,
    activity: carbs,
    signOutTime: protein,
  };
}

const rows = [
  createData(1, '130821 / 0800', "XL000001", "IT", "Create Team"),
  createData(2, '130821 / 0800', "XL000001", "Software", "Create Team"),
  createData(3, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(4, '130821 / 0800', "XL000001", "Software", "Create Team"),
  createData(5, '130821 / 0800', "XL000001", "Operator", "Create Team"),
  createData(6, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(7, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(8, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(9, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(10, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(11, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(12, '130821 / 0800', "XL000001", "Technical", "Create Team"),
  createData(13, '130821 / 0800', "XL000001", "Technical", "Create Team"),
];

const headCells = [
  { id: 'no', label: 'No' },
  { id: 'signInTime', label: 'Date/Sign In Time' },
  { id: 'staffId', label: 'Staff ID' },
  { id: 'department', label: 'Department' },
  { id: 'activity', label: 'Activity' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ bgcolor: "#55D6C2" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
          sx={{fontWeight:"700", fontSize:18}}
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{ display: 'none' }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function UserLogHistory() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className="p-8 mb-auto w-full">
    <h1 className="text-2xl font-semibold text-left mb-6">User Log History</h1>
    <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.no}
                      </TableCell>
                      <TableCell align="left">{row.signInTime}</TableCell>
                      <TableCell align="left">{row.staffId}</TableCell>
                      <TableCell align="left">{row.department}</TableCell>
                      <TableCell align="left">{row.activity}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
    </div>
  );
}

export default UserLogHistory;
