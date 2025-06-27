import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
	headLinkOptions: { preset: '2023' }, // still get the <link> tags printed
	images: ['public/logo.png'], // your original file
	// clone the built-in preset but kill the padding everywhere
	preset: {
		transparent: { ...minimal2023Preset.transparent, padding: 0 },
		maskable: { ...minimal2023Preset.maskable, padding: 0 },
		apple: { ...minimal2023Preset.apple, padding: 0 },
	},
})
