import type { IOperator, IOperatorAddon, IOperatorAddonNames } from '@/types';

export const transformOperators = (operators: IOperator[], operatorAddons: IOperatorAddon[]) => {
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
};
