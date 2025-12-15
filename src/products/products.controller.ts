import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return { message: 'Product created' };
  }

  @Get()
  findAllProducts() {
    return { message: 'List of products' };
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
