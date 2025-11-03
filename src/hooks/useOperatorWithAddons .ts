import { useQuery } from '@tanstack/react-query';

import { operatorService } from '@/services/operator.service';
import { transformOperators } from '@/utils';

export const useOperatorWithAddons = () => {
    const { data = [], isLoading } = useQuery({
        queryKey: ['operator'],
        queryFn: async () => {
            const [operators, operatorAddons] = await Promise.all([operatorService.getOperators(), operatorService.getOperatorAddon()]);

            return transformOperators(operators, operatorAddons);
        },
    });

    return { data, isLoading };
};
