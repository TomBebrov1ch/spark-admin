import { User } from "@infrastructure/models/userModel";
import { Website } from "@infrastructure/models/websiteModel";
import validator from "validator";
import { UserRole, WebsiteCommand } from "./types";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";

// Валидация почты
export async function validEmail(email: string): Promise<boolean> {
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

// Валидация паролей
export async function validPassword(password: string): Promise<boolean> {
  if (!validator.isLength(password, { min: 8, max: 16 })) {
    throw new Error("Length of password must be between 8 and 16 characters");
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password)) {
    throw new Error("Password must have at least one special character");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must have at least one uppercase character");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Password must have at least one lowecase character");
  }
  return true;
}

// Проверка валидности URL
export async function validURL(url: string): Promise<boolean> {
  if (!url) {
    return false;
  }
  if (
    validator.isURL(url, {
      protocols: ["https"],
      require_valid_protocol: true,
      validate_length: true,
      allow_underscores: false,
    })
  ) {
    return true;
  }
  return false;
}

// Валидация веб-сайт юзера
export async function validWebsiteUser(
  user: UserToWebsite,
  command: string
): Promise<boolean> {
  if (user.isSparkAdmin === true) {
    return true;
  }
  if (command == WebsiteCommand.update) {
    return (
      user.role === UserRole.Editor ||
      user.role === UserRole.Owner ||
      user.role === UserRole.Admin
    );
  }
  if (command == WebsiteCommand.delete) {
    return user.role === UserRole.Owner;
  }
  return true;
}
