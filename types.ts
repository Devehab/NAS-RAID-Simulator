
export enum RaidLevel {
  RAID0 = 'RAID 0',
  RAID1 = 'RAID 1',
  RAID5 = 'RAID 5',
  RAID6 = 'RAID 6',
  RAID10 = 'RAID 10'
}

export interface RaidStats {
  level: RaidLevel;
  totalCapacity: number;
  usableCapacity: number;
  protectionCapacity: number;
  unusableCapacity: number;
  faultTolerance: number;
  readSpeed: string;
  writeSpeed: string;
  minDisks: number;
  description: string;
}
