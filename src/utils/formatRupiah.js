/**
 * Format angka ke format Rupiah
 * @param {number} amount - Angka yang akan diformat
 * @returns {string} - Format "Rp X.XXX.XXX"
 */
export function formatRupiah(amount) {
  if (!amount && amount !== 0) return 'Rp -'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format angka tanpa prefix Rp (untuk input)
 * @param {number} amount
 * @returns {string}
 */
export function formatNumber(amount) {
  if (!amount && amount !== 0) return ''
  return new Intl.NumberFormat('id-ID').format(amount)
}
