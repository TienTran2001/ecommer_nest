import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPost() {
    return 'All posts'
  }
}
