import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class SubscriberDto {
  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  status: string;

  @IsOptional()
  updated_at?: Date;
}
