import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getComparator } from '@/utils';
import type { IData, Order, IOperatorAddonNames } from '@/types';
import { EnhancedTableHead } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { operatorService } from '@/services/operator.service';

export const EnhancedTable = () => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IData>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { data } = useQuery({
        queryKey: ['tableData'],
        queryFn: async () => {
            const [operators, operatorAddons] = await Promise.all([operatorService.getOperators(), operatorService.getOperatorAddon()]);

            return operators.map((operator) => {
                const fixedValues = {
                    id: operator.id,
                    name: operator.name,
                    avatar: operator.avatar,
                    isWorking: operator.isWorking,
                    createdAt: operator.createdAt,
                };

                const addonValues: IOperatorAddonNames = {
                    com: '',
                    agp: '',
                    css: '',
                    smtp: '',
                    dram: '',
                };

                operatorAddons.forEach((operatorAddon) => {
                    const key = operatorAddon.fieldName.toLowerCase() as keyof IOperatorAddonNames;

                    if (key in addonValues) {
                        addonValues[key] = operatorAddon.text;
                    }
                });

                return { ...fixedValues, ...addonValues };
            });
        },
        initialData: [],
    });

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

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () => [...data].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [data, order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%', marginTop: '16px' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow key={row.id} role="checkbox">
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell component="th" id={labelId} scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{`${row.isWorking}`}</TableCell>
                                        <TableCell>{row.createdAt}</TableCell>
                                        <TableCell>{row.com}</TableCell>
                                        <TableCell>{row.agp}</TableCell>
                                        <TableCell>{row.css}</TableCell>
                                        <TableCell>{row.smtp}</TableCell>
                                        <TableCell>{row.dram}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {/* {emptyRows > 0 && (
                                <TableRow
                                // style={{
                                //     height: 53 * emptyRows,
                                // }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
