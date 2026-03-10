import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuariologin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'tb_postagens'}) // CREATE TABLE tb_postagens
export class Postagem {

  @PrimaryGeneratedColumn() // PRIMARY KEY E AUTO INCREMENT
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim()) // Remover espaços vazios
  @IsNotEmpty({message: 'O título é obrigatório'}) // Força a digitação
  @Length(5, 100, {message: 'O título deve ter entre 5 e 100 caracteres'})
  @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
  titulo: string;

  @Transform(({value}: TransformFnParams) => value?.trim()) // Remover espaços vazios
  @IsNotEmpty({message: 'O texto é obrigatório'}) // Força a digitação
  @Length(10, 1000, {message: 'O texto deve ter entre 10 e 1000 caracteres'})
  @Column({length: 1000, nullable: false}) // VARCHAR(100) NOT NULL
  texto: string;

  @UpdateDateColumn()
  data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE' // CASCADE deleta todas as postagens relacionadas ao tema
  })
  tema: Tema; // Representa a Chave Estrangeira

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE' // CASCADE deleta todas as postagens relacionadas ao usuario
  })
  usuario: Usuario; // Representa a Chave Estrangeira
}