import{  useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import './GenericTable.css';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, TableSortLabel, Toolbar, Typography
} from '@mui/material';
import NoData from '../NoData/NoData';

type Order = 'asc' | 'desc';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  renderCell?: (value: T[keyof T], row: T) => ReactNode;
}

interface GenericTableProps<T> {
  rows: T[];
  headCells: HeadCell<T>[];
  title?: string;
  totalData?: number
  loader?:boolean
  renderActions?: (row: T) => ReactNode;
}

export default function GenericTable<T extends { id: string | number }>({
  rows,
  headCells,
  totalData,
  title,
  renderActions,
}: GenericTableProps<T>) {
  
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(headCells[0]?.id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number ) => {
    setPage(newPage);
  
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const comparator = (a: T, b: T): number => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const visibleRows = useMemo(() => {
    return rows
      .slice()
      .sort((a, b) => (order === 'desc' ? comparator(a, b) : -comparator(a, b)))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, order, orderBy, page, rowsPerPage]);


  return (
    <Box sx={{ width: '100%',marginTop:'30px'}} className='GenericTable' >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
           {title}
          </Typography>
        </Toolbar>

        <TableContainer sx={{ paddingBottom: '1.5rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={String(headCell.id)}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((row) => {
                  return (
                    <TableRow
                      hover
                      key={String(row.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {headCells.map((headCell) => (
                        <TableCell
                          key={String(headCell.id)}
                          align={headCell.numeric ? 'right' : 'left'}
                        >
                          {headCell.renderCell
                            ? headCell.renderCell(row[headCell.id], row)
                            : String(row[headCell.id])}
                        </TableCell>
                      ))}

                      <TableCell align="center" className='Actions'>
                        {renderActions ? renderActions(row) : null}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  
                    <TableCell colSpan={headCells.length + 1} align="center"><NoData /> </TableCell>
                 
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalData || rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}


// used in any component
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import GenericTable , { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Box } from '@mui/material';
// interface Product {
//   id: number;
//   description : string;
//   type: string;
//   name: string;
//   price: number;
// }

// // Head Table Data
// const productHeadCells: HeadCell<Product>[] = [
//   { id: "name", label: 'name product', numeric: false, disablePadding: false },
//   { id: "description", label: "description", numeric: false, disablePadding: false },
//   { id: "type", label: "type", numeric: false, disablePadding: false },
//   { id: "price", label: "price", numeric: true, disablePadding: false },
// ];

//  function UsedInComponent() {
//   const product =[
//     {id:1 , description:'description' ,type: 'type' , name: 'name' , price: 'price'},
//     {id:2 , description:'description' ,type: 'type' , name: 'name' , price: 'price'},
//     {id:3 , description:'description' ,type: 'type' , name: 'name' , price: 'price'},
//     {id:4 , description:'description' ,type: 'type' , name: 'name' , price: 'price'},
//   ]

//   return (
//     <>
//       <GenericTable
//       rows={product}
//         headCells={productHeadCells}
//         title="User List"
//         renderActions={(row) => (
//             <>
//               <MoreVertIcon className='showList'/>
//               <Box className='list'>

//                 <Box onClick={() => console.log("Edit", row)}>
//                     <EditNoteIcon />
//                 </Box>
//                 <Box  onClick={() => console.log("view", row)}>
//                     <VisibilityIcon/>
//                 </Box>
//                 <Box onClick={() => console.log("delete", row)}>
//                     <DeleteIcon />
//                 </Box>
//               </Box>
              
//             </>
//     )}
//   />
//      </>
//   )
// }
