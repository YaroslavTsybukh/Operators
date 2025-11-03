import type { IOperatorAddonNames } from './operator.types';

export interface IData extends IOperatorAddonNames {
    id: number;
    avatar: string;
    name: string;
    isWorking: boolean;
    createdAt: string;
}

export type Order = 'asc' | 'desc';

export interface IHeadCell {
    id: keyof IData;
    fieldName: string;
}

export interface IEnhancedTableProps {
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
}
