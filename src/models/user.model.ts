export interface User {
  UserId?: string;
  Email: string;
  Name: string;
  UserType?: string;
  Surname: string;
  Address?: string;
  Password: string;
  CompanyId?: string;
  CompanyName?: string;
  RoleId?: number;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  NewPassword?: string;
  ConfirmPassword?: string;
  StatusId: any;
  UserToken?: any;
  Dp?: any;
  SystemRole?: string;
  SecurityToken?: string;
  Viewing?: boolean;
  PhoneNumber: any;
  Company?;
}
