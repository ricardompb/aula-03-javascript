import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProdutoModule,
    MongooseModule.forRoot('mongodb://localhost/mercado-livre'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
