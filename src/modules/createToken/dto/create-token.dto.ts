import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTokenDto {
  @IsOptional()
  token_name?: string;

  @IsOptional()
  token_symbol?: string;

  @IsOptional()
  decimals?: number;

  @IsOptional()
  set_supply_cap: number;

  @IsOptional()
  initial_supply: number;

  @IsOptional()
  wallet_address: string;

  @IsOptional()
  contract_address: string;

  @IsNotEmpty()
  mintable: boolean;

  @IsNotEmpty()
  burnable: boolean;

  @IsOptional()
  updated_at?: Date;
}
