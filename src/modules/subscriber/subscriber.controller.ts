import {
  Body, Controller, Patch, Post
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SubscriberDto } from "./dto/create-subscriber.dto";
import { SubscriberService } from "./subscriber.service";

@ApiTags("Subscribers")
@Controller({ path: "subscribers" })
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  Subscriber(@Body() dto: SubscriberDto) {
    return this.subscriberService.createSubscriber(dto);
  }

  @Patch()
  UnSubscribe(@Body() dto: SubscriberDto) {
    return this.subscriberService.unSubscriber(dto);
  }
}
