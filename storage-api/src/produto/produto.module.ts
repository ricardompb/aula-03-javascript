import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoSchema } from './entities/produto.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Produto', schema: ProdutoSchema }]),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
