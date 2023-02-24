//readme

import { Optional } from "@/common/utilities/option.utils";
import { ethers } from "ethers";

const RPC_URLS: Record<number, string | undefined> = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  137: "https://polygon-rpc.com",
};

const getEthProvider = (
  chainId: number
): ethers.providers.StaticJsonRpcProvider =>
  new ethers.providers.StaticJsonRpcProvider(
    Optional.from(RPC_URLS[chainId]).unwrapOrThrow(
      `No RPC URL Configured for chainId ${chainId}`
    )
  );

export const appConfig = {
  default_schema_identifier: "public",
  default_migrations_folder: __dirname + "/../database/migrations",
  default_seeders_folder: __dirname + "/../database/seeders",
  tenant_migrations_folder: __dirname + "/../database/tenant_migrations",
  tenant_seeders_folder: __dirname + "/../database/tenant_seeders",
  recommended_bycrypt_rounds: 12,
  email_from: "mailer@schmserver.com",
  RPC_URLS,
  getEthProvider,
} as const;
