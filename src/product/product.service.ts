import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { ProductDto } from 'src/product/dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') readonly productModel: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<ProductDocument[]> {
    const products = await this.productModel.find();
    return products;
  }

  async createProduct(productDto: ProductDto): Promise<ProductDto> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  async getProductById(productId: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async deleteProductById(productId: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    return deletedProduct;
  }

  async updateProduct(
    productId: string,
    producto: ProductDto,
  ): Promise<Product> {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      productId,
      producto,
    );
    return updateProduct;
  }
}
