import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private hashPassword(password: string, salt: string): string {
    return crypto
      .scryptSync(
        password,
        salt,
        64, // Longueur de la clé
      )
      .toString('hex');
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    // Vérifier si l'email est déjà utilisé
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const salt = this.generateSalt();
    const hashedPassword = this.hashPassword(createUserDto.password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      salt,
    });

    const savedUser = await this.usersRepository.save(user);

    // Solution plus propre - créer un nouvel objet en sélectionnant uniquement les propriétés souhaitées
    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    } as User;
  }
}
