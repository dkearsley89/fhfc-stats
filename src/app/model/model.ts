export interface LastUpdated {
    date: string;
}
export interface Players {
    players?: Player[];
}
export interface Player {
    name?: string;
    id?: number;
}
export interface Records {
    records?: Record[];
}
export interface Record {
    name?: string;
    headers?: RecordHeaders;
    data?: RecordData[];
}
export interface RecordHeaders {
    c1: string;
    c2: string;
}
export interface RecordData {
    n: string;
    a: number;
}
export interface HonourBoard {
    name?: string;
    headers?: HonourBoardHeaders;
    data?: HonourBoardData[];
}
export interface HonourBoardHeaders {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
}
export interface HonourBoardData {
    year: number;
    premiers: boolean;
    coach: string;
    captain: string;
    bf: string;
    mostGoals: string;
    goals: number;
}