import envConfig from 'src/shared/config'
import { RoleName } from 'src/shared/constants/role.constants'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

const prisma = new PrismaService()
const hashingService = new HashingService()

const main = async () => {
  const roleCount = await prisma.role.count()
  if (roleCount > 0) {
    throw new Error('Roles already exist')
  }
  const roles = await prisma.role.createMany({
    data: [
      {
        name: RoleName.Admin,
        description: 'Admin role',
      },
      {
        name: RoleName.Client,
        description: 'Client role',
      },
      {
        name: RoleName.Seller,
        description: 'Seller role',
      },
    ],
  })

  const adminRole = await prisma.role.findFirstOrThrow({
    where: {
      name: RoleName.Admin,
    },
  })

  const hashingPassword = await hashingService.hash(envConfig.ADMIN_PASSWORD)
  const adminUser = await prisma.user.create({
    data: {
      name: envConfig.ADMIN_NAME,
      email: envConfig.ADMIN_EMAIL,
      password: hashingPassword,
      roleId: adminRole.id,
      phoneNumber: envConfig.ADMIN_PHONE_NUMBER,
    },
  })

  return {
    createRoleCount: roles.count,
    adminUser,
  }
}

main()
  .then(({ createRoleCount, adminUser }) => {
    console.log(`Create ${createRoleCount} roles`)
    console.log(`Create admin user: ${adminUser.name}`)
  })
  .catch((err) => {
    console.log(err)
  })
