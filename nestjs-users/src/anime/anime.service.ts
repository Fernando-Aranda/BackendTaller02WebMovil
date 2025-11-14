import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import fetch, { Response } from 'node-fetch';

interface AnimeResponse {
  mal_id: number;
  title: string;
  synopsis: string;
  images?: { jpg?: { image_url?: string } };
  type?: string;
  episodes?: number;
  score?: number;
  url?: string;
  aired?: { from?: string };
}

@Injectable()
export class AnimeService {
  private localAnimes: any[] = [];

  async findAll(page = 1, limit = 20) {
    try {
      const url = `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`;
      const res: Response = await fetch(url);

      if (!res.ok) {
        throw new HttpException(
          `Error al obtener animes: ${res.statusText}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // ✅ Corregido: Tipar el resultado de json() correctamente
      const json: any = await res.json();

      // O si quieres más seguridad:
      // const json = (await res.json()) as { data: AnimeResponse[] };

      return json.data.map((a: AnimeResponse) => ({
        id: a.mal_id,
        title: a.title,
        synopsis: a.synopsis,
        image_url: a.images?.jpg?.image_url,
        type: a.type,
        episodes: a.episodes,
        score: a.score,
        url: a.url,
        year: a.aired?.from ? new Date(a.aired.from).getFullYear() : null,
      }));
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error al conectar con la API de Jikan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(createAnimeDto: CreateAnimeDto) {
    const newAnime = { id: Date.now().toString(), ...createAnimeDto };
    this.localAnimes.push(newAnime);
    return newAnime;
  }

  findOne(id: string) {
    const anime = this.localAnimes.find((a) => a.id === id);
    if (!anime) {
      throw new HttpException('Anime no encontrado', HttpStatus.NOT_FOUND);
    }
    return anime;
  }

  update(id: string, updateAnimeDto: UpdateAnimeDto) {
    const index = this.localAnimes.findIndex((a) => a.id === id);
    if (index === -1)
      throw new HttpException('Anime no encontrado', HttpStatus.NOT_FOUND);

    this.localAnimes[index] = {
      ...this.localAnimes[index],
      ...updateAnimeDto,
    };

    return this.localAnimes[index];
  }

  remove(id: string) {
    const exists = this.localAnimes.some((a) => a.id === id);
    if (!exists)
      throw new HttpException('Anime no encontrado', HttpStatus.NOT_FOUND);

    this.localAnimes = this.localAnimes.filter((a) => a.id !== id);
    return { message: `Anime ${id} eliminado correctamente` };
  }
}
