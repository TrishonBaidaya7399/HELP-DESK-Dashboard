import PropTypes from "prop-types";
import { FaPen, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Link, NavLink } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Checkbox } from "@mui/material";
import { RiDeleteBin5Line } from "react-icons/ri";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Id",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "staffId",
    numeric: false,
    disablePadding: true,
    label: "Staff ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "speciality",
    numeric: false,
    disablePadding: false,
    label: "Speciality",
  },
  {
    id: "setting",
    numeric: false,
    disablePadding: false,
    label: "Setting",
  },
];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ bgcolor: "#55D6C2" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sx={{ fontSize: "18px", fontWeight: "700" }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const OperatorDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("staffId");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/users");
        console.log("Users: ", response.data);
  
        // Set only those users where role is "Operator"
        const operatorUsers = response.data.filter(user => user?.role === "operator");
        setUsers(operatorUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
  
    fetchData();
  }, [axiosPublic]);
  

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredUsers.map((n) => n.staffId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, user) => {
    const selectedIndex = selected.indexOf(user);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
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

  const isSelected = (user) => selected.indexOf(user) !== -1;

  return (
    <div className="pt-6 pb-12 mb-auto">
      <h1 className="text-2xl font-semibold text-left">Database</h1>
      <div className="my-4 grid grid-cols-3 bg-[#55D6C2] text-back w-full rounded-sm">
      <Link className="border-r-2 border-black text-center text-xl" to="/database/user">
        <button >
          User
        </button>
        </Link>
        <Link className="border-r-2 border-black text-center text-xl text-white bg-[#296EF2]" to="/database/operator">
        <button >
          Operation Team
        </button>
        </Link>
        <Link className="border-r-2 border-black text-center text-xl " to="/database/technical">
        <button >
          Technical Support
        </button>
        </Link>
      </div>
      <div className="searchBar my-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search By Name"
            className="w-full max-w-xs px-4 h-[40px] bg-gray-300 rounded-lg text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-xl -ml-8 mt-1">
            <button>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <Box sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 850 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredUsers.length}
            />
            <TableBody>
              {stableSort(filteredUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const isItemSelected = isSelected(user.staffId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, user.staffId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={user.staffId}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        bgcolor: "rgba(106, 103, 103, 0.21)",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <NavLink className=" pl-4">{user._id}</NavLink>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.speciality}</TableCell>
                      <TableCell>
                        <div className="flex gap-4 text-xl">
                          <div className="edit">
                            <FaPen/>
                          </div>
                          <div className="delete"><RiDeleteBin5Line /></div>
                        </div>
                        </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

OperatorDatabase.propTypes = {
  onSelectAllClick: PropTypes.node,
  order: PropTypes.node,
  orderBy: PropTypes.node,
  numSelected: PropTypes.node,
  rowCount: PropTypes.node,
  onRequestSort: PropTypes.node,
};

export default OperatorDatabase;
