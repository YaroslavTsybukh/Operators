import { instance } from '@/config/api.config';
import type { IOperator, IOperatorAddon } from '@/types';

export const operatorService = {
    async getOperators() {
        const data = await instance.get<IOperator[]>('/operator');

        return data.data;
    },

    async getOperatorAddon() {
        const data = await instance.get<IOperatorAddon[]>('/operatorAddon');

        return data.data;
    },
};
