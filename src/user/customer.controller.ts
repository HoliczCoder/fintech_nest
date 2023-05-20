import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	async createCustomer(@Req() req: Request) {
		const { body } = req;
		const { email, full_name, password } = body;
		return await this.customerService.createCustomer(email, full_name, password);
	}
}
