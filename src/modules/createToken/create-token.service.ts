import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTokenDto } from "./dto/create-token.dto";
import { Token } from "./entities/create-token.entity";

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>
  ) {}
  async findAll(findOption) {
   try {
    const data = await this.tokenRepository.find(findOption);
    return data;
   } catch (error) {
    console.log(error);
    throw new BadRequestException();
   }
  }
  async findOne(findOption) {
    try {
     const data = await this.tokenRepository.findOne(findOption);
     return data;
    } catch (error) {
     console.log(error);
     throw new BadRequestException();
    }
   }

  async CreateToken(dto: CreateTokenDto) {
    try {
      const token = this.tokenRepository.create(dto);
      const savedOne = await this.tokenRepository.save(token);
      return savedOne;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
  async updateOne(id:number,dto:CreateTokenDto) {
    dto.updated_at=new Date();
    return await this.tokenRepository.update({ id: id }, dto);
  }
//   async unSubscriber(dto: CreateTokenDto) {
//     try {
//       dto.updated_at = new Date();
//       await this.tokenRepository.update(
//         { email_address: dto.email_address },
//         dto
//       );
//       return this.findOne({ where: { email_address: dto.email_address } });
//     } catch (err) {
//       console.log("Error", err);
//       throw new BadRequestException();
//     }
//   }
}
