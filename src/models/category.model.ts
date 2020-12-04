import { Product } from './product.model';

export interface Category {
  CategoryId: string;
  Name: string;
  ParentId: string;
  Description: string;
  CategoryType: string;
  CompanyType: string;
  ImageUrl: string;
  IsDeleted: boolean;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  IsSelected?: boolean;
  Class?: string[];
  Children?: Category[];
  Products?: Product[];
}
