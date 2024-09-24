import axios from "axios"
import prismaCliente from "../prisma"

interface IAccessTokenResponse {
	access_token: string
}

interface IUserResponse {
	avatar_url: string
	login: string
	id: number
	name: string
}

export default class AuthenticateUserService {
	async execute(code: string) {
		const url = "https://github.com/login/oauth/access_token"

		const { data: accessTokenResponse } =
			await axios.post<IAccessTokenResponse>(url, null, {
				params: {
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code,
				},
				headers: {
					Accept: "application/json",
				},
			})

		const response = await axios.get<IUserResponse>(
			"https://api.github.com/user",
			{
				headers: {
					Authorization: `Bearer ${accessTokenResponse.access_token}`,
				},
			}
		)

		const { avatar_url, id, login, name } = response.data

		const user = await prismaCliente.user.findFirst({
			where: {
				github_id: id,
			},
		})

		if (!user) {
			await prismaCliente.user.create({
				data: {
					github_id: id,
					avatar_url,
					login,
					name,
				},
			})
		}

		return response.data
	}
}
