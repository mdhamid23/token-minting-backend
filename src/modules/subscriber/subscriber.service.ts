import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubscriberDto } from "./dto/create-subscriber.dto";
import { Subscriber } from "./entities/subscriber.entity";
@Injectable()
export class SubscriberService {
  /**
   * Creates an instance of SaleItemService.
   * @param {Repository<Subscriber>} subscriberRepository
   */
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>
  ) {}

  async createSubscriber(dto: SubscriberDto) {
    try {
      // const getUser = this.findOne({
      //   where: { email_address: dto.email_address },
      // });
      // if (getUser) {
      //   dto.updated_at = new Date();
      //   await this.subscriberRepository.update(
      //     { email_address: dto.email_address },
      //     dto
      //   );
      //   return this.findOne({ where: { email_address: dto.email_address } });
      // }
      const user = this.subscriberRepository.create(dto);
      const savedOne = await this.subscriberRepository.save(user);
      return savedOne;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
  async findOne(findOption) {
    return this.subscriberRepository.findOne(findOption);
  }

  async unSubscriber(dto: SubscriberDto) {
    try {
      dto.updated_at = new Date();
      await this.subscriberRepository.update(
        { email_address: dto.email_address },
        dto
      );
      return this.findOne({ where: { email_address: dto.email_address } });
    } catch (err) {
      console.log("Error", err);
      throw new BadRequestException();
    }
  }
}
