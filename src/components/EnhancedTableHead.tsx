import { type FC } from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import type { IData, IEnhancedTableProps } from '@/types';
import { useOperatorAddonTableHead } from '@/hooks';
import { fixedHeadCells } from '@/constants/fixedHeadCells.constants';

export const EnhancedTableHead: FC<IEnhancedTableProps> = ({ order, orderBy, onRequestSort }) => {
    const { data } = useOperatorAddonTableHead(fixedHeadCells);

    const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                {data &&
                    data.map((headCell) => (
                        <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.fieldName}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
};
