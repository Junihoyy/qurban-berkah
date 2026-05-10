import { useState, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { Upload, X, ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react'
import { formatRupiah } from '../utils/formatRupiah'

const INITIAL_FORM = {
  name: '',
  type: 'kambing',
  price: '',
  height_cm: '',
  weight_kg: '',
  description: '',
  is_sold: false,
}

export default function AnimalForm({ initialData, onSuccess, onCancel, addToast }) {
  const isEdit = !!initialData
  const [form, setForm] = useState(isEdit ? {
    name: initialData.name || '',
    type: initialData.type || 'kambing',
    price: initialData.price || '',
    height_cm: initialData.height_cm || '',
    weight_kg: initialData.weight_kg || '',
    description: initialData.description || '',
    is_sold: initialData.is_sold || false,
  } : INITIAL_FORM)

  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(initialData?.photo_url || null)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) {
      addToast('Ukuran foto maksimal 5MB', 'error')
      return
    }
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPhotoPreview(reader.result)
    reader.readAsDataURL(file)
  }, [addToast])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }, [handleFileSelect])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nama hewan wajib diisi'
    if (!form.price || Number(form.price) <= 0) errs.price = 'Harga wajib diisi'
    if (!form.height_cm || Number(form.height_cm) <= 0) errs.height_cm = 'Tinggi wajib diisi'
    if (!form.weight_kg || Number(form.weight_kg) <= 0) errs.weight_kg = 'Berat wajib diisi'
    if (!isEdit && !photoFile) errs.photo = 'Foto wajib diunggah'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      let photo_url = initialData?.photo_url || null

      // Upload foto jika ada file baru
      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('animals')
          .upload(fileName, photoFile, { upsert: false })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from('animals').getPublicUrl(fileName)
        photo_url = urlData.publicUrl
      }

      const payload = {
        name: form.name.trim(),
        type: form.type,
        price: Number(form.price),
        height_cm: Number(form.height_cm),
        weight_kg: Number(form.weight_kg),
        description: form.description.trim(),
        is_sold: form.is_sold,
        photo_url,
      }

      if (isEdit) {
        const { error } = await supabase.from('animals').update(payload).eq('id', initialData.id)
        if (error) throw error
        addToast('Hewan berhasil diperbarui!', 'success')
      } else {
        const { error } = await supabase.from('animals').insert([payload])
        if (error) throw error
        addToast('Hewan berhasil ditambahkan!', 'success')
      }

      onSuccess()
    } catch (err) {
      console.error(err)
      addToast(err.message || 'Terjadi kesalahan, coba lagi.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Nama Hewan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="cth. Kambing Boer Jantan"
          className="input-field"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Tipe */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Jenis Hewan <span className="text-red-500">*</span>
        </label>
        <select name="type" value={form.type} onChange={handleChange} className="input-field">
          <option value="kambing">🐐 Kambing</option>
          <option value="domba">🐑 Domba</option>
        </select>
      </div>

      {/* Harga */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Harga <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">Rp</span>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="2500000"
            min="0"
            className="input-field pl-10"
          />
        </div>
        {form.price > 0 && (
          <p className="text-xs text-primary mt-1">{formatRupiah(Number(form.price))}</p>
        )}
        {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
      </div>

      {/* Tinggi & Berat */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Tinggi (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="height_cm"
            value={form.height_cm}
            onChange={handleChange}
            placeholder="65"
            min="0"
            className="input-field"
          />
          {errors.height_cm && <p className="text-xs text-red-500 mt-1">{errors.height_cm}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Berat (kg) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="weight_kg"
            value={form.weight_kg}
            onChange={handleChange}
            placeholder="30"
            min="0"
            className="input-field"
          />
          {errors.weight_kg && <p className="text-xs text-red-500 mt-1">{errors.weight_kg}</p>}
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Tuliskan deskripsi singkat tentang hewan..."
          className="input-field resize-none"
        />
      </div>

      {/* Upload Foto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Foto Hewan {!isEdit && <span className="text-red-500">*</span>}
        </label>
        {photoPreview ? (
          <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ aspectRatio: '4/3' }}>
            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => { setPhotoPreview(null); setPhotoFile(null) }}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
            >
              <X size={14} className="text-gray-600" />
            </button>
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-lg">Preview</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging ? 'drag-active' : 'border-gray-300 hover:border-primary hover:bg-green-50/50'
            }`}
          >
            <Upload size={28} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">Drag & drop foto di sini</p>
            <p className="text-xs text-gray-400 mt-1">atau klik untuk memilih file</p>
            <p className="text-xs text-gray-300 mt-2">PNG, JPG, WEBP — Maks. 5MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
        {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
      </div>

      {/* Status Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50">
        <div>
          <p className="text-sm font-medium text-gray-700">Status Hewan</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {form.is_sold ? 'Hewan sudah terjual' : 'Hewan masih tersedia'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, is_sold: !p.is_sold }))}
          className="transition-colors"
        >
          {form.is_sold
            ? <ToggleRight size={40} style={{ color: '#e53e3e' }} />
            : <ToggleLeft size={40} style={{ color: '#1a6b3a' }} />
          }
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#1a6b3a' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Menyimpan...
            </span>
          ) : isEdit ? 'Simpan Perubahan' : 'Tambah Hewan'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-lg text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}
