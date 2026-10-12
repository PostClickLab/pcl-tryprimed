// Converts the raw design exports in /design into web-ready WebP files.
// Run with `npm run images` whenever source assets change.
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const jobs = [
  { from: 'design/assets/photos', to: 'src/assets/images/photos', max: 1800, quality: 78 },
  { from: 'design/assets/products', to: 'src/assets/images/products', max: 1400, quality: 82 },
]

for (const job of jobs) {
  const src = path.join(root, job.from)
  const out = path.join(root, job.to)
  await mkdir(out, { recursive: true })
  for (const file of (await readdir(src)).filter((f) => f.endsWith('.png'))) {
    const target = path.join(out, file.replace(/\.png$/, '.webp'))
    const info = await sharp(path.join(src, file))
      .resize({ width: job.max, height: job.max, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: job.quality, alphaQuality: 90, effort: 5 })
      .toFile(target)
    console.log(`${file} -> ${path.relative(root, target)} (${Math.round(info.size / 1024)} KB)`)
  }
}
