import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Res,
	ValidationPipe,
	InternalServerErrorException
} from '@nestjs/common';
import { Response } from 'express';
import { CustomerSignup } from './customer.signup.model';

import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	async createCustomer(@Body(ValidationPipe) body: CustomerSignup) {
		const { email, full_name, password } = body;
		const result = await this.customerService.createCustomer(email, full_name, password);
		if (result) {
			throw new InternalServerErrorException('Something bad happened', {
				cause: new Error(),
				description: 'Some error description'
			});
		}
		return result;
	}

	@Get()
	async findCustomerByID(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
		await this.customerService.findCustomerByID(id);
	}
}
