import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { FilterProductsDto } from './dto/FilterProductsDto';
import { UpdateProductDto } from './dto/updateProductDto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async getProducts(filters: FilterProductsDto) {
    const { name, price, discountPrice, sku, sortByPrice, page, limit } =
      filters;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          price: price ? { equals: price } : undefined,
          discountPrice: discountPrice ? { equals: discountPrice } : undefined,
          sku: sku ? { contains: sku, mode: 'insensitive' } : undefined,
        },
        orderBy: sortByPrice ? { price: sortByPrice } : undefined,
        skip,
        take: Number(limit),
      }),
      this.prisma.product.count({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          price: price ? { equals: price } : undefined,
          discountPrice: discountPrice ? { equals: discountPrice } : undefined,
          sku: sku ? { contains: sku, mode: 'insensitive' } : undefined,
        },
      }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: number, data: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
