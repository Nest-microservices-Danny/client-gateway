/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { Products_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(Products_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return { message: 'Product created' };
  }

  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDTO,
    );
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
    // try {
    //   return await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return { message: `Product with id ${id} deleted` };
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return {
      message: `Product with id ${id} updated with data ${JSON.stringify(body)}`,
    };
  }
}
