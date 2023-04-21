import { Controller, Get, Param, Post, Body, Put, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get()
	createCustomer(@Req() req: Request, @Res() res: Response) {
		const { body } = req;
		const { email, full_name, password } = body;
	}
}
