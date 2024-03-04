import { bcryptjs } from 'bcryptjs';
import { User } from "@models/userModel";
import { IUserRepository } from '@interfaces/IUserRepositry';
import { IJWTService } from '@interfaces/IJWTService';

type UserResponse = {
    id:number,
    username: string;
    email: string;
    role: string;
}

export class LoginUser{
    constructor(
        private userRepository: IUserRepository,
        private jwtService: IJWTService
      ) {}


    async execute({email, password}: {
        email: string;
        password: string;
    }) : Promise<{user: UserResponse; accessToken: string; refreshToken: string}>{
        const user = await this.userRepository.findByEmail(email);
        if (!user){
            throw new Error('Пользователь не найден!')
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Неверный пароль!');
        }

        const userResponse: UserResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          };

          const accessToken = this.jwtService.generateAccessToken(userResponse);
          const refreshToken = this.jwtService.generateRefreshToken(userResponse);

        return { user: userResponse, accessToken, refreshToken };
    }
}