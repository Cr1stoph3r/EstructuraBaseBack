import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from '../interfaces/Response.interface';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  private buildMenuStructure(items, parentId = null, level = 0) {
    try {
      return items
        .filter((item) => item.idCategory === parentId && item.level === level)
        .map((item) => ({
          id: item.id,
          order: item.order,
          title: item.title,
          icon: item.icon,
          target: item.target,
          submenu: this.buildMenuStructure(items, item.id, level + 1), // Construir submenús
        }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll(): Promise<Response> {
    try {
      console.log('Obteniendo menús');
      const menus = await this.prisma.menu.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          order: 'asc',
        },
      });

      const menuStructure = this.buildMenuStructure(menus);
      if (menuStructure.length === 0) {
        return {
          FlgOk: 0,
          message: 'No se encontraron menús',
          data: null,
        };
      }

      return {
        FlgOk: 1,
        message: 'Menús obtenidos correctamente',
        data: menuStructure,
      };
    } catch (error) {
      console.log(error);
      return {
        FlgOk: 0,
        message: 'Error al obtener los menús',
        data: null,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
