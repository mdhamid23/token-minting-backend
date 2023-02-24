import { QueryParserPipe } from "@/common/pipes";
import {
    Body, Controller, Get, Param, Patch, Post, Query
  } from "@nestjs/common";
  import { ApiTags } from "@nestjs/swagger";
import { TokenService } from "./create-token.service";
import { CreateTokenDto } from "./dto/create-token.dto";
  
  @ApiTags("Token")
  @Controller({ path: "tokens" })
  export class TokenController {
    constructor(private readonly tokenService: TokenService) {}
  
    @Get()
    FindAll( @Query(new QueryParserPipe("MANY", [])) findOption) {
        return this.tokenService.findAll(findOption); 
    }
    @Get('/one')
    FindOne( @Query(new QueryParserPipe("MANY", [])) findOption) {
        return this.tokenService.findOne(findOption); 
    }
    @Post()
    CreateToken(@Body() dto: CreateTokenDto) {
      return this.tokenService.CreateToken(dto);
    }
  
    @Patch("/:id")
    UnSubscribe(@Param("id") id:string, @Body() dto: CreateTokenDto) {
      return this.tokenService.updateOne(+id,dto);
    }
  }
  