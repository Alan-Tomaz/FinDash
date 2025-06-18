export interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  picturePath: string;
  birthDate: Date;
  location: string;
  description: string;
  adminLevel: number;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
