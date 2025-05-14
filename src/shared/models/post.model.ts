export class PostModel {
  id: number
  title: string
  content: string
  authorId: number
  updatedAt: Date
  createdAt: Date

  constructor(partial: Partial<PostModel>) {
    Object.assign(this, partial)
  }
}
