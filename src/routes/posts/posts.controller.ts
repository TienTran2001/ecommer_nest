import { Body, Controller, Get, Post } from '@nestjs/common'
import { GetPostItemDTO } from 'src/routes/posts/post.dto'
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
    return this.postService.getPost(userId).then((posts) => {
      return posts.map((post) => new GetPostItemDTO(post))
    })
  }

  @Auth([AuthTypes.Bearer])
  @Post()
  createPost(@Body() body: any, @ActiveUser('userId') userId: number) {
    console.log('userid: ', userId)
    return this.postService.createPost(userId, body)
  }
}
