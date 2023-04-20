import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/user/customer.service';
import bcrypt from "bcrypt";
import { compare } from "bcrypt";
import { retry } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private customerService: CustomerService) {
    }

    async validateCustomer(email: string, password: string): Promise<any> {
        const customer = await this.customerService.findCustomer({
            email: email
        })
        if (customer) {
            const { password: hash } = customer;
            const result = await compare(password.toString(), hash.toString());
            if (result) {
                return result
            }
            return null
        }
        return null
    }
}
