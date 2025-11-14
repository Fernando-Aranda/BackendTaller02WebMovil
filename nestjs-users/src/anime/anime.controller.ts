import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.animeService.findAll(page, limit);
  }

  @Post()
  create(@Body() dto: CreateAnimeDto) {
    return this.animeService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAnimeDto) {
    return this.animeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.remove(id);
  }
}
