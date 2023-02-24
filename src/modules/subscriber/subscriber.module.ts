import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscriber } from "./entities/subscriber.entity";
import { SubscriberController } from "./subscriber.controller";
import { SubscriberService } from "./subscriber.service";


@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
  exports: [SubscriberService],
})
export class SubscriberModule {}
