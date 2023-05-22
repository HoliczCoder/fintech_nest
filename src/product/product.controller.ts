import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SessionGuard } from 'src/auth/guard/session.guard';

@Controller('product')
@UseGuards(SessionGuard)
@SetMetadata('isPublic', true)
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@SetMetadata('isPublic', false)
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id);
	}

	@Patch(':id')
	@SetMetadata('isPublic', false)
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(':id')
	@SetMetadata('isPublic', false)
	remove(@Param('id') id: string) {
		return this.productService.remove(+id);
	}
}
