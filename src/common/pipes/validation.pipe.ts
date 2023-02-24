import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidatorOptions } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(
    private options: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
    }
  ) {}
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object, this.options);
    if (errors.length > 0) {
      throw new BadRequestException("Bad Request Payload");
    }
    return object;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
