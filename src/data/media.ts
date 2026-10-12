// Central image registry. Pages reference images by semantic key, so
// swapping a photo is a one-line change here.
import careLifestyle from '@/assets/images/photos/care-lifestyle.webp'
import hairSkin from '@/assets/images/photos/hair-skin.webp'
import heroCouple from '@/assets/images/photos/hero-couple.webp'
import heroConsultation from '@/assets/images/photos/hero-online-consultation.webp'
import longevity from '@/assets/images/photos/longevity-wellness.webp'
import clinician from '@/assets/images/photos/professional-illustrative.webp'
import recovery from '@/assets/images/photos/recovery-performance.webp'
import weight from '@/assets/images/photos/weight-management.webp'
import nasalSpray from '@/assets/images/products/nasal-spray.webp'
import oralOptions from '@/assets/images/products/oral-options.webp'
import topicalCream from '@/assets/images/products/topical-cream.webp'
import vialGhkcu from '@/assets/images/products/vial-ghkcu.webp'
import vialNad from '@/assets/images/products/vial-nad.webp'
import vialReta from '@/assets/images/products/vial-reta.webp'
import vialSemaglutide from '@/assets/images/products/vial-semaglutide.webp'
import vialTirzepatide from '@/assets/images/products/vial-tirzepatide.webp'

export const photos = {
  careLifestyle,
  hairSkin,
  heroCouple,
  heroConsultation,
  longevity,
  clinician,
  recovery,
  weight,
} as const

export const products = {
  nasalSpray,
  oralOptions,
  topicalCream,
  vialGhkcu,
  vialNad,
  vialReta,
  vialSemaglutide,
  vialTirzepatide,
} as const

/** Images the preloader waits for before revealing the first screen. */
export const criticalImages = [heroConsultation, clinician, vialSemaglutide, vialTirzepatide, vialNad, careLifestyle]
