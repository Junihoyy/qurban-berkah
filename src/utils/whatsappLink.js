import { formatRupiah } from './formatRupiah'

const WA_NUMBER = '6285716011258'

/**
 * Generate WhatsApp URL dengan pesan otomatis
 * @param {Object} animal - Data hewan
 * @param {string} animal.name - Nama hewan
 * @param {number} animal.price - Harga hewan
 * @returns {string} - WhatsApp URL
 */
export function generateWhatsAppLink(animal) {
  const message = `Assalamualaikum, saya tertarik dengan ${animal.name} seharga ${formatRupiah(animal.price)}. Apakah masih tersedia?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Generate WhatsApp URL umum (tanpa hewan spesifik)
 * @returns {string} - WhatsApp URL
 */
export function generateWhatsAppGeneral() {
  const message = 'Assalamualaikum, saya ingin tanya mengenai hewan qurban yang tersedia.'
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export { WA_NUMBER }
