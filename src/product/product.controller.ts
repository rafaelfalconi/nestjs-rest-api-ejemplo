import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { ProductDto } from 'src/product/dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getAllProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productId')
  async getProductById(@Res() res, @Param('productId') productId: string) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    const product = await this.productService.getProductById(productId);
    if (!product)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res.status(HttpStatus.OK).json(product);
  }

  // /product/delete?id=60831570f4f6f01160bbcc09
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('id') productId: string) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    const productDeleted = await this.productService.deleteProductById(
      productId,
    );
    if (!productDeleted)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ message: 'producto eliminado con exito' });
  }

  @Delete('/:productId')
  async deleteProductById(@Res() res, @Param('productId') productId: string) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    const productDeleted = await this.productService.deleteProductById(
      productId,
    );
    if (!productDeleted)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ message: 'producto eliminado con exito' });
  }

  @Post('/')
  async createProduct(@Res() res, @Body() product: ProductDto) {
    try {
      const productResponse = await this.productService.createProduct(product);
      return res
        .status(HttpStatus.ACCEPTED)
        .json({ message: 'el producto fue creado con exito' });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: e.errors.name.message });
    }
  }

  @Put('/:productId')
  async editProduct(
    @Res() res,
    @Param('productId') productId: string,
    @Body() product: ProductDto,
  ) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe!' });
    const updateProduct = await this.productService.updateProduct(
      productId,
      product,
    );
    if (!updateProduct)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ message: 'producto se edito con exito' });
  }
}
