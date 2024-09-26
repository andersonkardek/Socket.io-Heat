import { response } from "express"
import prismaCliente from "../prisma"

export class ProfileUserService {
	async execute(user_id: string) {
		const user = await prismaCliente.user.findFirst({
			where: {
				id: user_id,
			},
		})

		return user
	}
}
