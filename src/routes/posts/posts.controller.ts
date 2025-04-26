import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(APIKeyGuard)
  @UseGuards(AccessTokenGuard)
  @Get()
  getPosts() {
    return this.postService.getPost()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postService.createPost(body)
  }
}
