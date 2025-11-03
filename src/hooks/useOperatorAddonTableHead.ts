import { useQuery } from '@tanstack/react-query';

import { operatorService } from '@/services/operator.service';
import type { IData, IHeadCell } from '@/types';

export const useOperatorAddonTableHead = (fixedHeadCells: IHeadCell[]) => {
    const { data, isLoading } = useQuery({
        queryKey: ['operator-addon'],
        queryFn: operatorService.getOperatorAddon,
        select: (data) => {
            const transformed = data.map((item) => ({
                id: item.fieldName.toLowerCase() as keyof IData,
                fieldName: item.fieldName,
            }));

            return [...fixedHeadCells, ...transformed];
        },
    });

    return { data, isLoading };
};
