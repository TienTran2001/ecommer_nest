import { Injectable } from '@nestjs/common'
import { RoleName } from 'src/shared/constants/role.constants'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class RolesService {
  private clientRoleId: number | null = null

  constructor(private readonly prisma: PrismaService) {}

  async getClientRoleId() {
    if (this.clientRoleId) return this.clientRoleId

    const role = await this.prisma.role.findUniqueOrThrow({
      where: {
        name: RoleName.Client,
      },
    })
    this.clientRoleId = role.id
    return role.id
  }
}
