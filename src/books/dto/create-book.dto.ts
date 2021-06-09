import { IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly isbn: string;

  @IsString()
  @IsOptional()
  readonly cover?: string;
}
