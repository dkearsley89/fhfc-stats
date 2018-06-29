export interface Records {
    records?: Record[];
}
export interface Record {
    name: string;
    headers: RecordHeaders;
    data: RecordData[];
}
export interface RecordHeaders {
    c1: string;
    c2: string;
}
export interface RecordData {
    name: string;
    amount: number;
}