import { AppModule } from "@/app.module";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const serverAdapter = new ExpressAdapter();
  // serverAdapter.setBasePath("/bull-board");
  // createBullBoard({
  //   queues: Object.values(QueueJobEnum).map(
  //     (key) => new BullAdapter(app.get<Queue>(`BullQueue_${key}`))
  //   ),
  //   serverAdapter,
  // });

  // app.use("/bull-board", serverAdapter.getRouter());
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .setTitle("Single Tenant Boilerplate")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors({ origin: "*" });
  const PORT = process.env.PORT;
  if (!PORT || isNaN(+PORT)) throw new Error("Port not configured");
  await app.listen(+PORT);
}
bootstrap();
