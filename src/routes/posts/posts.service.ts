import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostBodyDTO, GetPostItemDTO } from 'src/routes/posts/post.dto'
import { isNotFoundPrismaError } from 'src/shared/helpers'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: Number(userId),
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  createPost(userId: number, body: CreatePostBodyDTO) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(userId),
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  async getPost(id: number) {
    try {
      return new GetPostItemDTO(
        await this.prismaService.post.findUniqueOrThrow({
          where: {
            id: Number(id),
          },
          include: {
            author: {
              omit: {
                password: true,
              },
            },
          },
        }),
      )
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  updatePost(id: number, authorId: number, body: CreatePostBodyDTO) {
    try {
      return this.prismaService.post.update({
        where: {
          id: Number(id),
          authorId: Number(authorId),
        },
        data: {
          title: body.title,
          content: body.content,
        },
        include: {
          author: {
            omit: {
              password: true,
            },
          },
        },
      })
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  async deletePost(id: number, authorId: number) {
    try {
      await this.prismaService.post.delete({
        where: {
          id,
          authorId,
        },
      })
      return true
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }
}
