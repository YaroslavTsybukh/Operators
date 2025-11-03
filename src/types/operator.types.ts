export interface IOperator {
    createdAt: string;
    name: string;
    avatar: string;
    isWorking: boolean;
    id: string;
}

export interface IOperatorAddon {
    fieldName: string;
    text: string;
    isChecked: boolean;
    id: string;
}

export interface IOperatorAddonNames {
    com: string;
    agp: string;
    css: string;
    smtp: string;
    dram: string;
}
