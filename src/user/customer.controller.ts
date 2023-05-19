import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UseFilters, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CustomerService } from './customer.service';
import { CustomerSignup } from './customer.signup.model';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('/customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	@UseFilters(new HttpExceptionFilter())
	async createCustomer(@Body(ValidationPipe) body: CustomerSignup) {
		const { email, full_name, password } = body;
		const result = await this.customerService.createCustomer(email, full_name, password);
		return result;
	}

	@Get()
	async findCustomerByID(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
		await this.customerService.findCustomerByID(id);
	}
}
