import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'tb_postagens'}) // CREATE TABLE tb_postagens
export class Postagem {

  @PrimaryGeneratedColumn() // PRIMARY KEY E AUTO INCREMENT
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim()) // Remover espaços vazios
  @IsNotEmpty() // Força a digitação
  @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
  titulo: string;

  @Transform(({value}: TransformFnParams) => value?.trim()) // Remover espaços vazios
  @IsNotEmpty() // Força a digitação
  @Column({length: 1000, nullable: false}) // VARCHAR(100) NOT NULL
  texto: string;

  @UpdateDateColumn()
  data: Date;
}