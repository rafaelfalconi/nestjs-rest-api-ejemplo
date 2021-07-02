import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb+srv://rafael:edu900fs@unibe.7ujmc.azure.mongodb.net/ejemplo?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
