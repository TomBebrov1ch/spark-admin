import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { Website } from "@infrastructure/models/websiteModel";

export class GetWebsite {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(ownerId: number, url: string): Promise<Website> {
    const website = await this.websiteRepository.findByUrl(ownerId, url);

    if(website === null){
      throw new Error("No website found");
    }

    return website;
  }
}
