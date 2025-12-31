export interface Event {
    category?: string | undefined;
    id: string;
    title: string;
    description: string;
    endDate: string;
    markets: {
        yesLabel?: string | undefined;
        noLabel?: string | undefined;
        id: string;
        title: string;
        chance: number | string;
        description: string;
    }[];
}