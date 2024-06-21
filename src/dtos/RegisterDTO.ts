import { EconomyDTO } from "./EconomyDTO";

export type RegisterDTO = {
    id: string;
    name: string;
    date: string;
    timeInSeconds: number;
    economies: EconomyDTO[];
};
