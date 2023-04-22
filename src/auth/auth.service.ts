import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { CustomerService } from 'src/user/customer.service';

@Injectable()
export class AuthService {
	constructor(private customerService: CustomerService) {}

	async validateCustomer(email: string, password: string): Promise<any> {
		const customer = await this.customerService.findCustomer({
			email: email
		});
		if (customer) {
			const { password: hash } = customer;
			const result = await compare(password.toString(), hash.toString());
			if (result) {
				return customer;
			}
			return null;
		}
		return null;
	}
}
