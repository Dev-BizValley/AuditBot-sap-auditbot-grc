import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

function createDataUser(
  SYSID,
  MANDT,
  BNAME,
  ZAUDIT_ID,
  ZAUDIT_NAME,
  ZSORT,
  REC_TYPE,
  TCODE,
  TCODE1,
  SU24,
  OBJECT,
  AGR_NAME,
  CHILD,
  AUTH,
  FIELD,
  LOW,
  HIGH,
  FP_IND,
  ORG_MATCH
) {
  return {
    SYSID,
    MANDT,
    BNAME,
    ZAUDIT_ID,
    ZAUDIT_NAME,
    ZSORT,
    REC_TYPE,
    TCODE,
    TCODE1,
    SU24,
    OBJECT,
    AGR_NAME,
    CHILD,
    AUTH,
    FIELD,
    LOW,
    HIGH,
    FP_IND,
    ORG_MATCH,
  };
}

function createDataRole(
  SYSID,
  MANDT,
  AGR_NAME,
  ZAUDIT_ID,
  ZAUDIT_NAME,
  ZSORT,
  REC_TYPE,
  TCODE,
  TCODE1,
  SU24,
  OBJECT,
  CHILD,
  AUTH,
  FIELD,
  LOW,
  HIGH,
  FP_IND,
  ORG_MATCH
) {
  return {
    SYSID,
    MANDT,
    AGR_NAME,
    ZAUDIT_ID,
    ZAUDIT_NAME,
    ZSORT,
    REC_TYPE,
    TCODE,
    TCODE1,
    SU24,
    OBJECT,
    CHILD,
    AUTH,
    FIELD,
    LOW,
    HIGH,
    FP_IND,
    ORG_MATCH,
  };
}

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
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

let headCells = [];

function EnhancedTableHead(props) {
  const {
    classes,
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
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.reporttableheader}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Nutrition
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: "0 10px",
    marginTop: 15,
    marginBottom: theme.spacing(2),
  },
  table: {
    borderCollapse: "collapse",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  reporttablecell: {
    fontFamily: (props) => props.colors[16],
    fontSize: 12,
    wordWrap: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "2px",
    textAlign: "left",
    backgroundColor: (props) => props.colors[15],
    border: "2px solid rgba(224, 224, 224, 1)",
    borderCollapse: "collapse",
  },
  reporttableheader: {
    fontFamily: (props) => props.colors[16],
    fontSize: 12,
    fontWeight: "bold",
    wordWrap: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    border: "2px solid rgba(224, 224, 224, 1)",
    padding: "2px",
    lineHeight: "inherit",
    backgroundColor: (props) => props.colors[15],
  },
  tablepaginationtoolbar: {
    minHeight: 30,
    fontFamily: (props) => props.colors[16],
    fontSize: "12px",
  },
  tablepaginationtext: {
    fontFamily: (props) => props.colors[16],
    fontSize: "12px",
  },
  container: {
    maxHeight: 420,
  },
}));

function createColumn(header, keys) {
  let headers = header.map((value, index) => {
    return {
      id: keys[index],
      numeric: false,
      disablePadding: true,
      label: value,
    };
  });

  return headers;
}

const GrcDrillDownTableDialogue = (props) => {
  const classes = useStyles(props);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(200);
  const [data, setData] = React.useState(props.data);

  React.useEffect(() => {
    setData(props.data);
    console.log("data for table ", data);
  }, [data, props]);

  const rows =
    Object.keys(data[0]).includes("AGR_NAME") &&
    Object.keys(data[0]).includes("BNAME")
      ? data.map((p) =>
          createDataUser(
            p.SYSID,
            p.MANDT,
            p.BNAME,
            p.ZAUDIT_ID,
            p.ZAUDIT_NAME,
            p.ZSORT,
            p.REC_TYPE,
            p.TCODE,
            p.TCODE1,
            p.SU24,
            p.OBJECT,
            p.AGR_NAME,
            p.CHILD,
            p.AUTH,
            p.FIELD,
            p.LOW,
            p.HIGH,
            p.FP_IND,
            p.ORG_MATCH
          )
        )
      : data.map((p) =>
          createDataRole(
            p.SYSID,
            p.MANDT,
            p.AGR_NAME,
            p.ZAUDIT_ID,
            p.ZAUDIT_NAME,
            p.ZSORT,
            p.REC_TYPE,
            p.TCODE,
            p.TCODE1,
            p.SU24,
            p.OBJECT,
            p.CHILD,
            p.AUTH,
            p.FIELD,
            p.LOW,
            p.HIGH,
            p.FP_IND,
            p.ORG_MATCH
          )
        );
  headCells = createColumn(props.header, Object.keys(data[0]));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          size={"small"}
          aria-label="sticky table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    //  style={{ height: (dense ? 13 : 53) * emptyRows }}
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      className={classes.reporttablecell}
                    >
                      {row.SYSID}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.MANDT}
                    </TableCell>
                    {Object.keys(data[0]).includes("AGR_NAME") &&
                    Object.keys(data[0]).includes("BNAME") ? (
                      <TableCell
                        align="right"
                        className={classes.reporttablecell}
                      >
                        {row.BNAME}
                      </TableCell>
                    ) : (
                      <TableCell
                        align="right"
                        className={classes.reporttablecell}
                      >
                        {row.AGR_NAME}
                      </TableCell>
                    )}
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.ZAUDIT_ID}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.ZAUDIT_NAME}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.ZSORT}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.REC_TYPE}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.TCODE}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.TCODE1}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.SU24}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.OBJECT}
                    </TableCell>
                    {Object.keys(data[0]).includes("AGR_NAME") &&
                    Object.keys(data[0]).includes("BNAME") ? (
                      <>
                        <TableCell
                          align="right"
                          className={classes.reporttablecell}
                        >
                          {row.AGR_NAME}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.reporttablecell}
                        >
                          {row.CHILD}
                        </TableCell>
                      </>
                    ) : (
                      <TableCell
                        align="right"
                        className={classes.reporttablecell}
                      >
                        {row.CHILD}
                      </TableCell>
                    )}
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.AUTH}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.FIELD}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.LOW}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.HIGH}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.FP_IND}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={classes.reporttablecell}
                    >
                      {row.ORG_MATCH}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 23 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[200, 500, 1000, 2000]}
        component="div"
        count={rows.length}
        classes={{
          toolbar: classes.tablepaginationtoolbar,
          caption: classes.tablepaginationtext,
        }}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          style: { height: "25px" },
        }}
        nextIconButtonProps={{
          style: { height: "25px" },
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
};
export default GrcDrillDownTableDialogue;
