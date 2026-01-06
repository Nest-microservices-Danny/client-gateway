/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto } from './dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { OrderStatusDto } from './dto/order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersService.send('findAllOrders', orderPaginationDto); //return this.ordersService.send('findAllOrders', {});
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.ordersService.send('findOneOrder', { id }),
      );
    } catch (error: any) {
      console.error('Error in OrdersController.findOne:', error);
      throw new RpcException({
        status: error.statusCode,
        message: error.message,
      });
    }
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: OrderStatusDto,
    @Query() paginationDTO: PaginationDto,
  ) {
    try {
      return this.ordersService.send('findAllOrders', {
        ...paginationDTO,
        status: statusDto.status,
      });
    } catch (error: any) {
      console.error('Error in OrdersController.findAllByStatus:', error);
      throw new RpcException({
        status: error.statusCode,
        message: error.message,
      });
    }
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: OrderStatusDto,
  ) {
    try {
      return this.ordersService.send('changeOrderStatus', {
        id,
        status: statusDto.status,
      });
    } catch (error: any) {
      console.error('Error in OrdersController.changeOrderStatus:', error);
      throw new RpcException({
        status: error.statusCode,
        message: error.message,
      });
    }
  }
}
