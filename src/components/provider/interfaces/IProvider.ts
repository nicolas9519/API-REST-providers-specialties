export interface IProvider {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  projectedStartDate: Date;
  employerId: number;
  providerType: string;
  staffStatus: string;
  assignedTo: number;
  status: string;
  stage: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
