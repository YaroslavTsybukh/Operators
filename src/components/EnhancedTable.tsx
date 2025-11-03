import * as React from 'react';
import {
    Avatar,
    CircularProgress,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    Checkbox,
} from '@mui/material';
import dayjs from 'dayjs';

import { getComparator } from '@/utils';
import type { IData, Order } from '@/types';
import { EnhancedTableHead } from '@/components';
import { useAppSelector, useOperatorWithAddons } from '@/hooks';

export const EnhancedTable = () => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IData>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const search = useAppSelector((state) => state.filter.search);

    const { data, isLoading } = useOperatorWithAddons();

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = data.filter((value) => value.name.toLowerCase().includes(search.toLowerCase().trim()));

    const visibleRows = React.useMemo(
        () => [...filteredData].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [filteredData, order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%', marginTop: '16px' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : visibleRows.length > 0 ? (
                                visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow key={row.id} role="checkbox">
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row">
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Avatar src={row.avatar} alt="аватар" />
                                                    {row.name}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={row.isWorking}
                                                    disableRipple
                                                    sx={{
                                                        pointerEvents: 'none',
                                                        color: '#F04259',
                                                        '&.Mui-checked': {
                                                            color: '#F04259',
                                                        },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{dayjs(row.createdAt).format('DD.MM.YYYY HH:mm')}</TableCell>
                                            <TableCell>{row.com}</TableCell>
                                            <TableCell>{row.agp}</TableCell>
                                            <TableCell>{row.css}</TableCell>
                                            <TableCell>{row.smtp}</TableCell>
                                            <TableCell>{row.dram}</TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
