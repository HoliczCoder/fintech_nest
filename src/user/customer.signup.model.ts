import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class CustomerSignup {
	@IsString()
	@MinLength(4)
	@MaxLength(50)
	email: string;

	@IsString()
	@MinLength(5)
	@MaxLength(50)
	// @Matches(/^(?=.*\d).{5,20}$/, {
	// 	message: 'password too weak'
	// })
	password: string;

	@IsString()
	@MinLength(5)
	@MaxLength(50)
	full_name: string;

	constructor(email: string, password: string, full_name: string) {
		this.email = email;
		this.password = password;
		this.full_name = full_name;
	}
}
