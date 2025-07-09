import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Produto {
  @Prop()
  nome: string;

  @Prop()
  descricao: string;

  @Prop()
  preco: number;

  @Prop()
  foto: string;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
