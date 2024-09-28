import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"

import "./styles/global.css"
import React from "react"
import { AuthProvider } from "./contexts/auth.tsx"

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>
)
