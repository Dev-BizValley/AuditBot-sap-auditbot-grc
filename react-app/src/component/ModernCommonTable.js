import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from "mui-datatables";
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';
import baseTheme, { getDynamicFont } from '../theme';

const isValidHexColor = (col) => {
    if (!col || typeof col !== 'string') return false;
    const clean = col.trim();
    return /^#[0-9A-F]{3}$/i.test(clean) || /^#[0-9A-F]{6}$/i.test(clean);
};

const hexToRgba = (hex, opacity) => {
    if (!hex || typeof hex !== 'string') return `rgba(37, 99, 235, ${opacity})`;
    let c = hex.trim();
    if (!c.startsWith('#')) return `rgba(37, 99, 235, ${opacity})`;
    c = c.substring(1);
    if (c.length === 3) {
        c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    if (c.length !== 6) return `rgba(37, 99, 235, ${opacity})`;
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return `rgba(37, 99, 235, ${opacity})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ModernCommonTable = (props) => {
    const { isReport } = props;

    // Core state for the table
    const [data, setData] = useState([]);
    const [header, setHeader] = useState([]);
    const tableStateRef = React.useRef({ displayData: null, columns: null });



    // Memoized core values to prevent unnecessary re-renders
    const primaryColor = useMemo(() => {
        const col = props.colors && props.colors[0];
        if (isValidHexColor(col)) {
            return col.trim();
        }
        return '#2563eb';
    }, [props.colors]);

    const tableHeaderColor = useMemo(() => {
        const col = props.colors && props.colors[8];
        if (isValidHexColor(col)) {
            return col.trim();
        }
        return primaryColor;
    }, [props.colors, primaryColor]);

    const dynamicFont = useMemo(() => getDynamicFont(props.colors), [props.colors]);

    // Calculate stable table height for screenfit (v2.15.0 requires theme-level enforcement)
    const tableBodyMaxHeight = props.options?.tableBodyMaxHeight || (isReport ? 'calc(100vh - 250px)' : 'calc(100vh - 200px)');

    // Handle title which might be string or array from backend
    const tableTitle = useMemo(() => {
        if (!props.name) return "";
        if (typeof props.name === 'string') return props.name;
        if (Array.isArray(props.name) && props.name.length > 0) {
            return props.name[0];
        }
        return "";
    }, [props.name]);

    // Custom debounced search that synchronizes correctly when search chips are closed
    const CustomSearchRender = useMemo(() => {
        return (searchText, handleSearch, hideSearch, options) => {
            return <DebouncedSearch
                searchText={searchText}
                onSearch={handleSearch}
                onHide={hideSearch}
                primaryColor={primaryColor}
                dynamicFont={dynamicFont}
                title={tableTitle} // Pass title to search component
                isTocGrid={props.isTocGrid}
            />;
        };
    }, [primaryColor, dynamicFont, tableTitle, props.isTocGrid]);

    useEffect(() => {
        if (props.data) setData(props.data);
        if (props.header) setHeader(props.header);
    }, [props.data, props.header]);

    // Constructing a polished Material UI Theme override using the configuration
    const getMuiTheme = useMemo(() => createMuiTheme({
        palette: {
            type: 'light',
            primary: { main: primaryColor },
            secondary: { main: '#64748b' },
            background: {
                paper: '#FFFFFF',
                default: '#FFFFFF'
            },
            text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.87)'
            }
        },
        typography: {
            fontFamily: dynamicFont,
        },
        overrides: {
            MUIDataTable: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    boxShadow: 'none',
                    border: 'none',
                    margin: '0 !important',
                    padding: '0 !important',
                },
                responsiveScrollMaxHeight: {
                    maxHeight: tableBodyMaxHeight + ' !important',
                    overflowX: 'auto !important',
                    overflowY: 'auto !important',
                    '&::-webkit-scrollbar': { width: '12px', height: '12px' },
                    '&::-webkit-scrollbar-track': { background: '#f8fafc', borderRadius: '10px' },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#94a3b8',
                        borderRadius: '10px',
                        border: '3px solid #f8fafc',
                        '&:hover': { background: '#000000de' }
                    },
                    /* Scrollbar Arrows */
                    '&::-webkit-scrollbar-button:single-button': {
                        backgroundColor: '#f8fafc',
                        display: 'block',
                        backgroundSize: '7px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    },
                    '&::-webkit-scrollbar-button:single-button:vertical:decrement': {
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%2364748b' viewBox='0 0 100 100'><polygon points='50,20 0,80 100,80'/></svg>")`,
                    },
                    '&::-webkit-scrollbar-button:single-button:vertical:increment': {
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%2364748b' viewBox='0 0 100 100'><polygon points='0,20 100,20 50,80'/></svg>")`,
                    },
                    '&::-webkit-scrollbar-button:single-button:horizontal:decrement': {
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%2364748b' viewBox='0 0 100 100'><polygon points='80,0 80,100 20,50'/></svg>")`,
                    },
                    '&::-webkit-scrollbar-button:single-button:horizontal:increment': {
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%2364748b' viewBox='0 0 100 100'><polygon points='20,0 20,100 80,50'/></svg>")`,
                    }
                }
            },
            MUIDataTableHeadCell: {
                root: {
                    fontFamily: dynamicFont,
                    fontSize: '10px',
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    borderBottom: '1px solid #cbd5e1',
                    borderRight: '1px solid rgba(255, 255, 255, 0.4)',
                    padding: "0px 6px",
                    height: '30px !important',
                    minHeight: '30px !important',
                    backgroundColor: `${primaryColor} !important`,
                    color: '#FFFFFF !important',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                    '& > span': {
                        justifyContent: 'center',
                        width: '100%',
                        height: '30px',
                    },
                    '& .MuiButtonBase-root': {
                        justifyContent: 'center',
                        width: '100%',
                        height: '30px',
                        padding: 0,
                        margin: 0,
                    },
                    '& svg': { color: '#FFFFFF !important' },
                    '& .MuiTableSortLabel-active': { color: '#FFFFFF !important' },
                    '&:first-child': {
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                    },
                    '&:last-child': {
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                    }
                },
                fixedHeader: {
                    backgroundColor: `${primaryColor} !important`,
                    zIndex: 100,
                }
            },
            MUIDataTableBodyCell: {
                root: {
                    fontFamily: dynamicFont,
                    fontSize: '11px',
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                    padding: "2px 8px", // Slightly increased horizontal for readability
                    textAlign: "left",
                    borderBottom: '1px solid #e2e8f0', // Lighter border
                    borderRight: '1px solid #e2e8f0',
                    color: '#000000de',
                }
            },
            MuiTableRow: {
                root: {
                    height: '24px !important',
                    minHeight: '24px !important',
                    '&:nth-of-type(even)': {
                        backgroundColor: '#f8fafc !important'
                    },
                    '&:hover': {
                        backgroundColor: `${hexToRgba(primaryColor, 0.08)} !important`,
                        cursor: 'default'
                    }
                }
            },
            MuiPopover: {
                paper: {
                    borderRadius: 12,
                    marginTop: 8,
                    maxHeight: 450,
                    maxWidth: 'calc(100vw - 32px)',
                    overflowY: 'auto',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e2e8f0',
                },
                root: {
                    zIndex: '2000 !important'
                }
            },
            MuiDialogContent: {
                root: {
                    padding: '8px 24px !important',
                    backgroundColor: '#f8fafc',
                    '&:first-child': {
                        paddingTop: '8px !important',
                    }
                }
            },
            MUIDataTableToolbar: {
                root: {
                    height: '30px !important',
                    minHeight: '30px !important',
                    padding: '0 8px !important',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'sticky', // Make toolbar sticky
                    top: 0,
                    zIndex: 110,
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f1f5f9',
                    margin: 0,
                    backgroundColor: '#ffffff',
                },
                titleRoot: {
                    flex: 1,
                    width: '100%', // Force it to take available space
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: 0,
                    margin: 0,
                },
                titleText: {
                    color: '#000000de',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    fontFamily: dynamicFont,
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                    marginLeft: '8px',
                    marginRight: '32px', // Ensures a constant gap before the icons
                },
                actions: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: '0 0 auto', // Prevent it from taking space from titleRoot
                    width: 'auto',
                    '& button': {
                        padding: '4px',
                        width: '28px',
                        height: '28px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        },
                        marginLeft: '12px',
                    },
                    '& svg': {
                        fontSize: '1.2rem !important',
                        width: '1.2rem !important',
                        height: '1.2rem !important',
                        color: '#000000de',
                        transition: 'color 0.2s ease',
                        '&:hover': {
                            color: `${primaryColor} !important`
                        }
                    }
                },
                icon: {
                    color: '#000000de',
                    fontSize: '1.2rem !important',
                    '&:hover': {
                        color: primaryColor
                    }
                },
                iconActive: {
                    color: `${primaryColor} !important`,
                    fontSize: '1.2rem !important',
                }
            },
            MuiTablePagination: {
                root: {
                    display: 'none', // We will use our custom footer instead
                }
            },
            MUIDataTableFilterList: {
                root: {
                    display: 'none !important',
                },
                chip: {
                    backgroundColor: hexToRgba(primaryColor, 0.15),
                    color: primaryColor,
                    fontFamily: dynamicFont,
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '11px'
                }
            },
            MUIDataTableFilter: {
                root: {
                    padding: '12px 16px',
                    minWidth: '260px',
                    maxWidth: '380px',
                },
                gridListTile: {
                    marginTop: '4px !important',
                    marginBottom: '4px !important',
                    padding: '0px 4px !important',
                },
                header: {
                    marginBottom: '8px',
                },
                title: {
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#000000de',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                },
                reset: {
                    fontSize: '11px',
                    fontWeight: 700,
                    color: primaryColor,
                    '&:hover': {
                        backgroundColor: hexToRgba(primaryColor, 0.08),
                    }
                }
            },
            MUIDataTableViewColumns: {
                root: {
                    padding: '8px 12px',
                    minWidth: '220px',
                },
                title: {
                    fontSize: '9px',
                    fontWeight: 800,
                    color: '#000000de',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                }
            },
            MuiCheckbox: {
                root: {
                    padding: '4px',
                    '& svg': {
                        fontSize: '1.1rem',
                    }
                }
            },
            MuiFormControlLabel: {
                label: {
                    fontSize: '12px',
                    fontFamily: dynamicFont,
                }
            },
            MuiFormControl: {
                root: {
                    margin: '0px 2px !important',
                }
            },
            MuiInputLabel: {
                root: {
                    fontSize: '13px !important',
                    fontFamily: dynamicFont,
                    color: '#000000de !important',
                    fontWeight: 400,
                },
                shrink: {
                    color: `${primaryColor} !important`,
                }
            },
            MuiInput: {
                root: {
                    fontSize: '13px !important',
                    fontFamily: dynamicFont,
                    marginTop: '16px !important',
                },
                underline: {
                    '&:before': {
                        borderBottom: '2px solid #e2e8f0 !important',
                    },
                    '&:hover:not($disabled):before': {
                        borderBottom: `2px solid ${primaryColor} !important`,
                    },
                    '&:after': {
                        borderBottom: `2px solid ${primaryColor} !important`,
                    }
                }
            },
            MuiSelect: {
                root: {
                    fontFamily: dynamicFont,
                    fontSize: '11px',
                },
                select: {
                    padding: '8px 0 4px',
                }
            },

            MuiMenuItem: {
                root: {
                    fontSize: '12px !important',
                    fontFamily: dynamicFont,
                    minHeight: 'auto !important',
                    paddingTop: '4px !important',
                    paddingBottom: '4px !important',
                }
            },
            MuiListItemText: {
                primary: {
                    fontSize: '12px !important',
                    fontFamily: dynamicFont,
                }
            },
        }
    }), [primaryColor, dynamicFont, tableBodyMaxHeight]);

    const dataKeys = useMemo(() => {
        return props.keys ? props.keys : Object.keys(data[0] || {});
    }, [data, props.keys]);

    const headerString = JSON.stringify(header);
    const dataKeysString = JSON.stringify(dataKeys);

    // Columns built from header
    const columns = useMemo(() => {
        return header.map((colLabel, index) => ({
            name: dataKeys[index] || colLabel,
            label: colLabel,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <div style={{ wordWrap: 'break-word', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {value === null || value === undefined ? '-' : value}
                    </div>
                )
            }
        }));
    }, [header, dataKeys]);

    // Create a stable string representation of props.options (ignoring specific function references)
    const optionsString = JSON.stringify(props.options, (k, v) => typeof v === 'function' ? 'func' : v);

    // Options for the table
    const options = useMemo(() => {
        const handlePrint = () => {
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                alert('Please allow popups to print the report.');
                return;
            }

            const tableTitle = props.name || 'Report Detail';

            const currentColumns = tableStateRef.current.columns || columns.map(c => ({ ...c, display: "true" }));
            const visibleColumns = currentColumns.filter(c => c.display === "true");

            const currentData = tableStateRef.current.displayData || data.map(d => ({ data: columns.map(c => d[c.name]) }));

            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${tableTitle}</title>
                    <style>
                        @page { size: landscape; margin: 10mm 5mm; }
                        body {
                            font-family: ${dynamicFont};
                            color: #000000de;
                            padding: 0 10px;
                            margin: 0;
                            font-size: 11px;
                        }
                        h2 {
                            text-align: center;
                            color: #000000de;
                            margin-bottom: 20px;
                            font-size: 18px;
                            font-weight: 600;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            page-break-inside: auto;
                        }
                        tr {
                            page-break-inside: avoid;
                            page-break-after: auto;
                        }
                        th, td {
                            border: 1px solid #cbd5e1;
                            padding: 8px 6px;
                            text-align: left;
                            word-break: normal;
                            overflow-wrap: break-word;
                            line-height: 1.4;
                            vertical-align: top;
                        }
                        th {
                            background-color: ${primaryColor || '#f1f5f9'};
                            color: white;
                            font-weight: 600;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                            font-size: 11px;
                            vertical-align: bottom;
                            padding: 8px 6px;
                        }
                        tr:nth-child(even) {
                            background-color: #f8fafc;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    </style>
                </head>
                <body>
                    <h2>${tableTitle}</h2>
                    <table>
                        <thead>
                            <tr>
                                ${visibleColumns.map(col => `<th>${col.label || col.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${currentData.map(rowObj => `
                                <tr>
                                    ${visibleColumns.map(col => {
                let val = null;
                if (rowObj && rowObj.dataIndex !== undefined && data[rowObj.dataIndex]) {
                    // Extract from raw original data using dataIndex
                    val = data[rowObj.dataIndex][col.name];
                } else {
                    // Fallback to what's in the rowObj (handles cases before first table change)
                    const colIndex = currentColumns.findIndex(c => c.name === col.name);
                    val = colIndex !== -1 ? rowObj.data[colIndex] : null;
                }

                if (typeof val === 'object' && val !== null) {
                    try { val = JSON.stringify(val); } catch (e) { val = String(val); }
                }
                val = (val === null || val === undefined) ? '-' : val;
                val = String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<td>${val}</td>`;
            }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <style>
                        @media print {
                            .print-toolbar { display: none !important; }
                        }
                    </style>
                    <div class="print-toolbar" style="text-align:center; padding:12px 0; position:sticky; top:0; background:#fff; z-index:10; border-bottom:1px solid #e2e8f0; margin-bottom:16px; display:flex; justify-content:center; gap:12px;">
                        <button onclick="window.print()" style="padding:8px 24px; font-size:13px; font-weight:500; color:#fff; background:${primaryColor || '#2563eb'}; border:none; border-radius:6px; cursor:pointer; font-family:${dynamicFont};">Print</button>
                        <button onclick="window.close()" style="padding:8px 24px; font-size:13px; font-weight:500; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:6px; cursor:pointer; font-family:${dynamicFont};">Close</button>
                    </div>
                </body>
                </html>
            `;

            printWindow.document.write(html);
            printWindow.document.close();
        };

        return {
            selectableRows: 'none',
            filterType: 'multiselect',
            responsive: "scrollMaxHeight",
            search: true,
            customSearchRender: CustomSearchRender,
            download: true,
            downloadOptions: {
                filterOptions: {
                    useDisplayedColumnsOnly: true,
                    useDisplayedRowsOnly: true
                }
            },
            viewColumns: true,
            elevation: 0,
            setTableProps: props.isTocGrid ? () => ({
                style: { width: '100%', tableLayout: 'auto', margin: '0' }
            }) : undefined,
            rowsPerPage: props.rowsPerPage || 100,
            rowsPerPageOptions: [100, 250, 500, 1000],
            tableBodyMaxHeight: tableBodyMaxHeight,
            textLabels: { body: { noMatch: "No records found" } },
            filterPopoverOptions: {
                anchorOrigin: props.isTocGrid ? {
                    vertical: 'top',
                    horizontal: 'right',
                } : {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                transformOrigin: props.isTocGrid ? {
                    vertical: 'top',
                    horizontal: 'left',
                } : {
                    vertical: 'top',
                    horizontal: 'center',
                },
            },
            viewColumnsPopoverOptions: {
                anchorOrigin: props.isTocGrid ? {
                    vertical: 'top',
                    horizontal: 'right',
                } : {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                transformOrigin: props.isTocGrid ? {
                    vertical: 'top',
                    horizontal: 'left',
                } : {
                    vertical: 'top',
                    horizontal: 'center',
                },
            },
            customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
                return (
                    <ModernPagination
                        count={count}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        changeRowsPerPage={changeRowsPerPage}
                        changePage={changePage}
                        primaryColor={primaryColor}
                        dynamicFont={dynamicFont}
                        rowsPerPageOptions={props.rowsPerPageOptions || [100, 250, 500, 1000]}
                    />
                );
            },
            ...props.options,
            onTableChange: (action, tableState) => {
                tableStateRef.current = { displayData: tableState.displayData, columns: tableState.columns };
                if (props.options && props.options.onTableChange) {
                    props.options.onTableChange(action, tableState);
                }
            },
            print: false, // Ensure native print is completely disabled to remove duplicates
            customToolbar: () => {
                return (
                    <>
                        <Tooltip title="Print">
                            <IconButton
                                size="small"
                                onClick={handlePrint}
                            >
                                <PrintIcon style={{ fontSize: '1.2rem', color: '#000000de' }} />
                            </IconButton>
                        </Tooltip>
                        {props.onClose && (
                            <IconButton
                                size="small"
                                onClick={props.onClose}
                            >
                                <CloseIcon style={{ fontSize: '1.2rem', color: '#000000de' }} />
                            </IconButton>
                        )}
                    </>
                );
            }
        };
    }, [CustomSearchRender, props.isTocGrid, props.rowsPerPage, props.options, props.name, props.rowsPerPageOptions, props.onClose, tableBodyMaxHeight, dynamicFont, primaryColor, columns, data]);



    if (!header || header.length === 0) {
        return null;
    }
    console.log("[ModernCommonTable-THEME-COLOR-DEBUG]", { primaryColor, tableHeaderColor, tableTitle, colorsPassed: props.colors });
    console.log(`[ModernCommonTable-DEBUG] ${tableTitle} options:`, { onRowClick: options.onRowClick, onCellClick: options.onCellClick });
    return (
        <div style={{ position: 'relative' }}>
            <MuiThemeProvider theme={getMuiTheme}>
                <MUIDataTable
                    title={
                        <Box py={1} id="draggable-dialog-title" className="draggable-dialog-handle" style={{ cursor: 'move', width: '100%', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" style={{ fontWeight: 400, color: '#000000de', fontSize: '1.1rem', fontFamily: dynamicFont }}>
                                {props.name || 'Details'}
                            </Typography>
                        </Box>
                    }
                    data={data || []}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        </div>
    );
};

const ModernPagination = ({ count, page, rowsPerPage, changeRowsPerPage, changePage, primaryColor, dynamicFont, rowsPerPageOptions }) => {
    const totalPages = Math.ceil(count / rowsPerPage);
    const from = (page * rowsPerPage) + 1;
    const to = Math.min((page + 1) * rowsPerPage, count);

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(0, page - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages - 1, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(0, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <Box style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '4px 12px',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            minHeight: '36px',
            gap: '24px'
        }}>
            {/* 1. Rows Per Page */}
            <Box display="flex" alignItems="center">
                <Typography style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#000000de',
                    textTransform: 'uppercase',
                    marginRight: '8px',
                    fontFamily: dynamicFont
                }}>
                    Rows per page:
                </Typography>
                <RowsPerPageSelector
                    value={rowsPerPage}
                    onChange={changeRowsPerPage}
                    primaryColor={primaryColor}
                    dynamicFont={dynamicFont}
                    options={rowsPerPageOptions}
                />
            </Box>

            {/* 2. Showing Info */}
            <Box display="flex" alignItems="center">
                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: primaryColor,
                    marginRight: '8px'
                }} />
                <Typography style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#000000de',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: dynamicFont
                }}>
                    <span style={{ color: '#000000de' }}>{from}-{to}</span> of <span style={{ color: '#000000de' }}>{count}</span>
                </Typography>
            </Box>

            {/* 3. Page Numbers / Navigation */}
            <Box display="flex" alignItems="center">
                <IconButton
                    size="small"
                    disabled={page === 0}
                    onClick={() => changePage(page - 1)}
                    style={{ padding: '4px', marginRight: '4px' }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={page === 0 ? "#cbd5e1" : "#000000de"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </IconButton>

                {getPageNumbers().map(p => (
                    <Box
                        key={p}
                        onClick={() => changePage(p)}
                        style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            margin: '0 2px',
                            backgroundColor: p === page ? primaryColor : 'transparent',
                            color: p === page ? '#ffffff' : '#000000de',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: dynamicFont,
                            transition: 'all 0.2s ease',
                            boxShadow: p === page ? `0 4px 6px -1px ${hexToRgba(primaryColor, 0.4)}` : 'none'
                        }}
                    >
                        {p + 1}
                    </Box>
                ))}

                <IconButton
                    size="small"
                    disabled={page >= totalPages - 1}
                    onClick={() => changePage(page + 1)}
                    style={{ padding: '4px', marginLeft: '4px' }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={page >= totalPages - 1 ? "#cbd5e1" : "#000000de"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </IconButton>
            </Box>
        </Box>
    );
};

const RowsPerPageSelector = ({ value, onChange, primaryColor, dynamicFont, options = [100, 250, 500, 1000] }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (val) => {
        onChange(val);
        handleClose();
    };

    return (
        <>
            <Box
                onClick={handleClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: dynamicFont,
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                    color: '#000000de',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { backgroundColor: '#f1f5f9' }
                }}
            >
                {value}
                <ExpandMoreIcon style={{ fontSize: '1rem', marginLeft: '4px', color: '#000000de' }} />
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        borderRadius: '8px',
                        marginTop: '-8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #e2e8f0',
                        minWidth: '80px'
                    }
                }}
            >
                {options.map((opt) => (
                    <MenuItem
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        style={{
                            fontSize: '11px',
                            fontWeight: opt === value ? 700 : 500,
                            fontFamily: dynamicFont,
                            color: opt === value ? primaryColor : '#000000de',
                            backgroundColor: opt === value ? hexToRgba(primaryColor, 0.1) : 'transparent',
                            padding: '6px 16px',
                        }}
                    >
                        {opt}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

const DebouncedSearch = ({ searchText, onSearch, onHide, primaryColor, dynamicFont, title, isTocGrid }) => {
    const [localText, setLocalText] = useState(searchText || '');

    // Sync external clears (like clicking the "x" on a search chip)
    useEffect(() => {
        if (!searchText) setLocalText('');
    }, [searchText]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (localText !== (searchText || '')) {
                onSearch(localText);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [localText, searchText, onSearch]);

    return (
        <div style={{ display: 'flex', flex: 1, width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', width: '100%' }}>
                <Typography style={{
                    color: '#000000de',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    fontFamily: dynamicFont,
                    marginLeft: '8px',
                    whiteSpace: 'nowrap'
                }}>
                    {title}
                </Typography>

                <Box style={{ flexGrow: 1 }} />

                <Grow appear in={true} timeout={300} style={{ transformOrigin: isTocGrid ? 'right top' : 'center' }}>
                    <div style={{
                        position: isTocGrid ? 'absolute' : 'relative',
                        top: isTocGrid ? '90%' : 'auto',
                        right: isTocGrid ? '24px' : 'auto',
                        zIndex: isTocGrid ? 10 : 1,
                        boxShadow: isTocGrid ? '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' : 'none',
                        marginRight: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: isTocGrid ? '200px' : '200px',
                        backgroundColor: isTocGrid ? '#ffffff' : '#f1f5f9',
                        border: isTocGrid ? '1px solid #e2e8f0' : 'none',
                        borderRadius: '6px',
                        padding: '4px 12px',
                        transition: 'all 0.3s ease',
                        height: isTocGrid ? '28px' : '24px',
                        marginBottom: '4px',
                        marginLeft: '8px',
                    }}>
                        <TextField
                            variant="standard"
                            value={localText}
                            onChange={e => setLocalText(e.target.value)}
                            placeholder="Search table..."
                            fullWidth
                            autoFocus
                            inputProps={{
                                style: {
                                    textAlign: 'left', // Center the placeholder and text
                                    fontSize: '11px',
                                    fontFamily: dynamicFont,
                                    paddingBottom: '20px'
                                }
                            }}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                        <IconButton onClick={onHide} size="small" style={{ padding: 2 }}>
                            <ClearIcon style={{ color: '#000000de', fontSize: '0.9rem' }} />
                        </IconButton>
                    </div>
                </Grow>
            </div>
        </div>
    );
};

export default ModernCommonTable;
