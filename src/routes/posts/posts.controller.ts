import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthTypes, ConditionGuard } from 'src/shared/constants/auth.constants'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // @UseGuards(APIKeyGuard)
  // @UseGuards(AccessTokenGuard)

  @Auth([AuthTypes.Bearer, AuthTypes.ApiKey], { condition: ConditionGuard.Or })
  @UseGuards(AuthenticationGuard)
  @Get()
  getPosts() {
    return this.postService.getPost()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postService.createPost(body)
  }
}
