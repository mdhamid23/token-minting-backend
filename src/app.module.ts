import { PostgresDatabaseProviderModule } from "@/providers/database/postgres/provider.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TokenModule } from "./modules/createToken/create-token.module";
import { SubscriberModule } from "./modules/subscriber/subscriber.module";

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    TokenModule,
    SubscriberModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // BullModule.forRoot({
    //   redis: {
    //     host: process.env.REDIS_HOST || "localhost",
    //     port: +(process.env.REDIS_PORT || 6379),
    //     password: process.env.REDIS_PASSWORD,
    //   },
    // }),
    // CacheModule.register({
    //   store: redisStore.create({
    //     host: process.env.REDIS_HOST || "localhost",
    //     port: +(process.env.REDIS_PORT || 6379),
    //     password: process.env.REDIS_PASSWORD,
    //   }),
    //   isGlobal: true,
    //   ttl: 10,
    // }),
    // ScheduleModule.forRoot(),
    // CacheManagerModule,
    // JobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
