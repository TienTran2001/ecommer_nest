import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthTypes } from 'src/shared/constants/auth.constants'
import { ActiveUser } from 'src/shared/decorators/active-user-decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // @UseGuards(APIKeyGuard)
  // @UseGuards(AccessTokenGuard)

  @Get()
  getPosts() {
    return this.postService.getPost()
  }

  @Auth([AuthTypes.Bearer])
  @Post()
  createPost(@Body() body: any, @ActiveUser('userId') userId: number) {
    console.log('userid: ', userId)
    return this.postService.createPost(userId, body)
  }
}
