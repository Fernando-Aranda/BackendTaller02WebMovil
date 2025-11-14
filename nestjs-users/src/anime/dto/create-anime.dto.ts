import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateAnimeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  synopsis?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  episodes?: number;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsNumber()
  year?: number;
}
