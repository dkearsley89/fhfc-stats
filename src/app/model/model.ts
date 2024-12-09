export interface HomeRecords {
  records: HomeRecord[];
}
export interface HomeRecord {
  name: string;
  label: string;
  data: RecordData[];
}
export interface RecordData {
  Id: string;
  n: string;
  a: number;
}
export interface LastUpdated {
  lastUpdated: string;
}
export interface AssociationRecords {
  data: AssociationRecordData[];
}
export interface AssociationRecordData {
  y: string;
  n: string;
  g: string;
  a: string;
  id: string;
}
export interface YearlyAwards {
  grades: GradeAwardData[];
}
export interface GradeAwardData {
  name: string;
  awards: Award[];
}
export interface Award {
  name: string;
  player: string;
  id: string;
}
export interface Players {
  players: Player[];
}
export interface Player {
  name: string;
  id: number;
}
export interface Coaches {
  coaches: Coach[];
}
export interface Coach {
  name: string;
  id: number;
}
export interface Records {
  records: Record[];
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
export interface HonourBoard {
  name: string;
  headers: HonourBoardHeaders;
  data: HonourBoardData[];
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
export interface Milestones {
  milestones: Milestone[]
}
export interface Milestone {
  name: string;
  grade: string;
  type: string;
  upcoming: MilestoneData[];
  recent: MilestoneData[];
}
export interface MilestoneData {
  Id: string;
  n: string;
  a: number;
}