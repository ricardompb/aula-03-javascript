import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const produto = await this.produtoService.findOne(id);
    if (!produto) {
      throw new Error('Produto not found');
    }
    const produtoUpdate = new UpdateProdutoDto();
    produtoUpdate.nome = produto.nome;
    produtoUpdate.descricao = produto.descricao;
    produtoUpdate.preco = produto.preco;
    const foto = (file.buffer as Buffer).toString('base64');
    produtoUpdate.foto = `data:image/jpeg;base64,${foto}`;
    return this.produtoService.update(id, produtoUpdate);
  }
}
