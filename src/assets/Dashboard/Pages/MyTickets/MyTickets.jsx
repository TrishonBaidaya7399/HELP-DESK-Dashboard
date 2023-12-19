import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import useTicket from "../../../../Hooks/useTicket";
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
import { AuthContext } from "../../../../Providers/AuthProvider";
import { NavLink } from "react-router-dom";

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
    id: "ticket",
    numeric: false,
    disablePadding: true,
    label: "Ticket No.",
  },
  {
    id: "subject",
    numeric: false,
    disablePadding: false,
    label: "Subject",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "supportedBy",
    numeric: false,
    disablePadding: false,
    label: "Supported By",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "rate",
    numeric: false,
    disablePadding: false,
    label: "Rate",
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
            sx={{fontSize:"18px", fontWeight:"700"}}
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

const MyTickets = () => {
  const [tickets] = useTicket();
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ticket");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useContext(AuthContext);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.ticket.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredTickets.map((n) => n.ticket);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ticket) => {
    const selectedIndex = selected.indexOf(ticket);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ticket);
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

  const isSelected = (ticket) => selected.indexOf(ticket) !== -1;

  return (
    <div className="pt-6 pb-12 mb-auto">
      <h1 className="text-2xl font-semibold text-center">List of Tickets</h1>
      <div className="searchBar mt-12 mb-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Find Ticket"
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
              rowCount={filteredTickets.length}
            />
            <TableBody>
              {stableSort(filteredTickets, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ticket, index) => {
                  const isItemSelected = isSelected(ticket.ticket);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, ticket.ticket)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={ticket.ticket}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        bgcolor: "rgba(106, 103, 103, 0.21)",
                      }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <NavLink
                          className="btn-link pl-4"
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        >
                          {ticket.ticket}
                        </NavLink>
                      </TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        {ticket.status === "In Progress" ? (
                          <button
                            disabled={user?.role !== "admin"}
                            className="bg-[#0BFF68] text-black p-1 rounded-lg"
                          >
                            In Progress
                          </button>
                        ) : ticket.status === "On Hold" ? (
                          <button
                            disabled={user?.role !== "admin"}
                            className="bg-blue-700 text-white p-1 rounded-lg"
                          >
                            On Hold
                          </button>
                        ) : ticket.status === "Closed" ? (
                          <button
                            disabled={user?.role !== "admin"}
                            className="bg-gray-400 text-white p-1 rounded-lg"
                          >
                            Closed
                          </button>
                        ) : (
                          ""
                        )}
                      </TableCell>

                      <TableCell>Tech support</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>
                        <div className="rating">
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                        </div>
                      </TableCell>
                      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box rounded-sm">
            <h1 className="font-bold text-2xl text-center mb-6">Ticket Details</h1>
            <h3 className="font-semibold text-lg">Ticket No: {ticket.ticket}</h3>
            <h3 className="font-semibold text-lg">Date: {ticket.date}</h3>
            <h3 className="font-semibold text-lg">Name: {ticket.name}</h3>
            <h3 className="font-semibold text-lg">Dept: N/A</h3>
            <h3 className="font-semibold text-lg">Title: N/A</h3>
            <h3 className="font-semibold text-lg">Description: {ticket.description}</h3>
            <h3 className="font-semibold text-lg">Category: {ticket.category}</h3>
            <h3 className="font-semibold text-lg">Type: {ticket.type}</h3>
            <h3 className="font-semibold text-lg">Property: {ticket.property}</h3>
            <h3 className="font-semibold text-lg">Status: {ticket.Status}</h3>
            <h3 className="font-semibold text-lg">Attachment: N/A</h3>

            <div className="modal-action flex justify-center">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="bg-[#43D752] py-2 px-8 rounded-lg text-xl font-semibold">Close</button>
              </form>
            </div>
          </div>
        </dialog>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
       
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};

MyTickets.propTypes = {
  onSelectAllClick: PropTypes.node,
  order: PropTypes.node,
  orderBy: PropTypes.node,
  numSelected: PropTypes.node,
  rowCount: PropTypes.node,
  onRequestSort: PropTypes.node,
};
export default MyTickets;
