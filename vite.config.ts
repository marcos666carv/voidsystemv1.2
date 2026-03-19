import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

// ─── Design Tokens Dev Plugin ────────────────────────────────────────────────
// Expõe POST /api/design-tokens durante `npm run dev`.
// Recebe { changes: Record<cssVar, value> } e atualiza src/index.css.
// Vite HMR propaga as mudanças automaticamente.
function designTokensPlugin(): Plugin {
  return {
    name: 'design-tokens',
    configureServer(server) {
      server.middlewares.use('/api/design-tokens', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
          return
        }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const { changes } = JSON.parse(body) as { changes: Record<string, string> }
            const cssPath = resolve(process.cwd(), 'src/index.css')
            let css = readFileSync(cssPath, 'utf-8')

            for (const [varName, value] of Object.entries(changes)) {
              const escaped = varName.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
              css = css.replace(
                new RegExp(`(${escaped}:\\s*)([^;]+)(;)`, 'g'),
                `$1${value}$3`
              )
            }

            writeFileSync(cssPath, css)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, error: String(err) }))
          }
        })
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), designTokensPlugin()],
  resolve: {
    alias: {
      "@":  path.resolve(__dirname, "./src"),
      "@ds": path.resolve(__dirname, "./src/design-system"),
    },
  },
})
