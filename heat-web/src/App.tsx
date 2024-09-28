import { useContext } from "react"
import { LoginBox } from "./components/LoginBox"
import { MessageList } from "./components/MessageList"
import { AuthContext } from "./contexts/auth"
import styles from "./App.module.scss"
import { SendMessageBox } from "./components/SendMessageBox"

export function App() {
	const { user } = useContext(AuthContext)

	return (
		<main
			className={`${styles.contentWrapper} ${
				// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
				Boolean(user) ? styles.contentSigned : ""
			}`}
		>
			<MessageList />
			{/* biome-ignore lint/complexity/noExtraBooleanCast: <explanation> */}
			{Boolean(user) ? <SendMessageBox /> : <LoginBox />}
		</main>
	)
}
