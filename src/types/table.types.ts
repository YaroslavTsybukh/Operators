export interface IData {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

export type Order = 'asc' | 'desc';

export interface IHeadCell {
    disablePadding: boolean;
    id: keyof IData;
    label: string;
    numeric: boolean;
}

export interface IEnhancedTableProps {
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
}
