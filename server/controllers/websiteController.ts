import { Request, Response } from 'express';
import { WebsiteRepository } from './../repositories/WebsiteRepository';
import { User } from "@models/userModel";
import { Website } from "@models/websiteModel";
import { AddWebsite } from "@use_cases/Website/AddWebsite";
import { GetWebsite } from '@use_cases/Website/getWebsite';

import sequelize from "config/sequelize";

class WebsiteController {
  private WebsiteRepository: WebsiteRepository;
  private addWebsiteUseCase: AddWebsite;
  private getWebsiteByOwner: GetWebsite;

  constructor(){
    this.addWebsiteUseCase = new AddWebsite(this.WebsiteRepository)
    this.getWebsiteByOwner = new GetWebsite(this.WebsiteRepository)
  }

  async addWebsite(req: Request, res: Response) {
    try {
      const newWebsite = await this.addWebsiteUseCase.execute(req.body)
      res.status(201).json({message: 'Веб-сайт успешно добавлен'})

    } catch (error) {
      console.error("Ошибка с созданием веб-сайта:", error);
      return res.status(500).json({ error: "Ошибка с созданием веб-сайта" });
    }
  }

  async getWebsites(req: Request, res: Response) {
    try {
      const userID: number = req.user.id;
      const websites = await this.getWebsiteByOwner.execute(userID);
      return res.status(201).json(websites)
    } catch (error) {
      console.error("Ошибка с получением сайтов:", error);
      return res.status(500).json({ error: "Ошибка с получением сайтов" });
    }
  }

  async addUser(req, res) {
    try {
      const { userEmail, userRole, websiteId } = req.body;
      const requesterID = req.user.id;

      const userRepository = sequelize.getRepository(User);
      const websiteRepository = sequelize.getRepository(Website);
      const website = await websiteRepository.findByPk(websiteId);

      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      const isOwner = website.owner === requesterID;

      if (!isOwner) {
        return res
          .status(403)
          .json({ message: "You are not the owner of this website" });
      }
      const userToAdd = await userRepository.findOne({
        where: { email: userEmail },
      });

      if (!userToAdd) {
        return res.status(404).json({ message: "User not found" });
      }

      const newUserItem = {
        id: userToAdd.id,
        email: userEmail,
        role: userRole,
      };

      website.users = [...website.users, newUserItem];
      await website.save();
      res.status(200).json({ message: "User added successfully", website });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  }
}
export default new WebsiteController();
