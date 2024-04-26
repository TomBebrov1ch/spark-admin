import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { NewWebsiteInput } from "@core/utils/types";
import { validEmail, validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";
import websiteCodeGenerator from "@core/utils/generateWebsiteCode"

export class AddWebsite {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(
    request: AddWebsiteRequest,
    errors: ErrorDetails[]
  ): Promise<Website> {
    const { name, url, ownerID, ownerEmail } = request;
    const isValidUrl = await validURL(url);
    const isValidEmail = await validEmail(ownerEmail);

    if (!isValidUrl) {
      errors.push(new ErrorDetails(400, "Неправильная URL"));
      return;
    }
    if (!isValidEmail) {
      errors.push(new ErrorDetails(400, "Неправильный email"));
      return;
    }
    const { code, codeSignature } = await websiteCodeGenerator(url);
    const user = await this.userRepository.findByEmail(ownerEmail);

    if (user == null) {
      errors.push(new ErrorDetails(404, "Пользователь не был найден"));
      return;
    }

    const newWebsiteDetails: NewWebsiteInput = {
      name: name,
      url: url,
      owner: ownerID,
      ownerEmail: ownerEmail,
      websiteCode: code,
      websiteSignature: codeSignature,
      websiteCodeSignature: codeSignature,
    };

    const newWebsite = await this.websiteRepository.create(
      newWebsiteDetails,
      errors
    );
    console.log(errors);

    this.websiteRepository.addUser(newWebsite.id, user.id, user.id);

    return newWebsite;
  }
}
