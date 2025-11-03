import { type FC } from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import type { IData, IEnhancedTableProps, IHeadCell } from '@/types';
import { operatorService } from '@/services/operator.service';
import { useQuery } from '@tanstack/react-query';

const fixedHeadCells: IHeadCell[] = [
    {
        id: 'name',
        fieldName: 'Користувач',
    },
    {
        id: 'isWorking',
        fieldName: 'Працює',
    },
    {
        id: 'createdAt',
        fieldName: 'Дата доєднання',
    },
];

export const EnhancedTableHead: FC<IEnhancedTableProps> = ({ order, orderBy, onRequestSort }) => {
    const { data } = useQuery({
        queryKey: ['operatorAddon'],
        queryFn: operatorService.getOperatorAddon,
        select: (data) => {
            const transformed = data.map((item) => ({
                id: item.fieldName.toLowerCase() as keyof IData,
                fieldName: item.fieldName,
            }));

            return [...fixedHeadCells, ...transformed];
        },
    });

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
