import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    return this.produtoModel.create(createProdutoDto);
  }

  findAll() {
    return this.produtoModel.find().exec();
  }

  findOne(id: string) {
    return this.produtoModel.findById(id).exec();
  }

  update(id: string, updateProdutoDto: UpdateProdutoDto) {
    return this.produtoModel.findByIdAndUpdate(id, updateProdutoDto).exec();
  }

  remove(id: string) {
    return this.produtoModel.findByIdAndDelete(id).exec();
  }
}
