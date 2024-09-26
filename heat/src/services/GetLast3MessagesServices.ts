import prismaCliente from "../prisma"

export class GetLast3MessageService {
	async execute() {
		const messages = await prismaCliente.message.findMany({
			take: 3,
			orderBy: {
				created_at: "desc",
			},
			include: {
				user: true,
			},
		})

		return messages
	}
}
