import { UserItems, Website } from "infrastructure/models/websiteModel";

export interface NewWebsiteInput {
  name: string;
  url: string;
  owner: number;
  ownerEmail: string;
  users: UserItems[];
  websiteCode: string;
}

export interface IWebsiteRepository {
  create?(userDetails: NewWebsiteInput): Promise<Website>;
  fetchHTMLContent?(url: string): Promise<any>;
  metaTagChecker?(htmlContent: any): Promise<any>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  addUserToWebsite?(websiteId: string, userItem: UserItems): Promise<void>;
}
