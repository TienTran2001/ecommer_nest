import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreatePostBodyDTO, GetPostItemDTO } from 'src/routes/posts/post.dto'
import { AuthTypes, ConditionGuard } from 'src/shared/constants/auth.constants'
import { ActiveUser } from 'src/shared/decorators/active-user-decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // @UseGuards(APIKeyGuard)
  // @UseGuards(AccessTokenGuard)

  @Auth([AuthTypes.Bearer, AuthTypes.ApiKey], {
    condition: ConditionGuard.And,
  })
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postService.getPosts(userId).then((posts) => {
      return posts.map((post) => new GetPostItemDTO(post))
    })
  }

  @Auth([AuthTypes.Bearer, AuthTypes.ApiKey], {
    condition: ConditionGuard.Or,
  })
  @Post()
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postService.createPost(userId, body))
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return new GetPostItemDTO(await this.postService.getPost(Number(id)))
  }

  @Auth([AuthTypes.Bearer])
  @Put(':id')
  async updatePost(@Param('id') id: string, @ActiveUser('userId') userId: string, @Body() body: CreatePostBodyDTO) {
    return new GetPostItemDTO(await this.postService.updatePost(Number(id), Number(userId), body))
  }

  @Auth([AuthTypes.Bearer])
  @Delete(':id')
  deletePost(@Param('id') id: string, @ActiveUser('userId') userId: string): Promise<boolean> {
    return this.postService.deletePost(Number(id), Number(userId))
  }
}
