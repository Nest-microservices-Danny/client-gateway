import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
  findAllProducts() {
    return this.productsClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return { message: `Single product with id ${id}` };
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
