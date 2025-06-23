import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		origin: 'https://f950-24-53-139-33.ngrok-free.app',
		cors: true,
	},
})
