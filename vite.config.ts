import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function versionedPackageResolver() {
  return {
    name: 'versioned-package-resolver',
    enforce: 'pre' as const,
    async resolveId(id: string, importer: string | undefined) {
      // Some generated imports include versions, e.g. "pkg@1.2.3".
      // Strip the version suffix so normal node resolution can work.
      const match = id.match(/^(@[^/]+\/[^@]+|[^@/]+)@\d.+$/)
      if (!match) {
        return null
      }
      return this.resolve(match[1], importer, { skipSelf: true })
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    versionedPackageResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
