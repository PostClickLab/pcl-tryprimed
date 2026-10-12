import type { Answers } from '@/data/consultation'

/**
 * Integration points. Replace the bodies with real API calls (EHR intake,
 * CRM, email provider) without touching the UI.
 */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function submitConsultation(answers: Answers) {
  await wait(1400)
  return { reference: `PR-${Date.now().toString(36).toUpperCase().slice(-6)}`, answers }
}

export async function submitContact(payload: Record<string, string>) {
  await wait(1000)
  return { ok: true as const, payload }
}

export async function joinWaitlist(email: string, treatment: string) {
  await wait(800)
  return { ok: true as const, email, treatment }
}
