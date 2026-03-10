import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_temas'})
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: 'A descrição do tema é obrigatória'})
  @Length(5, 255, {message: 'A descrição do tema deve ter entre 5 e 255 caracteres'})
  @Column({length: 255, nullable: false})
  descricao: string;

  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[]; // Array de retorno das postagens relacionadas ao tema
}