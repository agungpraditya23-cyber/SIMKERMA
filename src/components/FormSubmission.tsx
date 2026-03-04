import React from 'react';
import { ChevronRight, ChevronLeft, Save, Info, AlertCircle, CheckCircle2, Upload, FileCheck } from 'lucide-react';
import { Submission } from '../types';

interface FormSubmissionProps {
  onSubmit: (data: Submission) => void;
  isSubmitting: boolean;
}

export default function FormSubmission({ onSubmit, isSubmitting }: FormSubmissionProps) {
  const [step, setStep] = React.useState(1);
  const [subStep, setSubStep] = React.useState(1);
  const [formData, setFormData] = React.useState<Partial<Submission>>({
    type: 'MoU',
    p1_nama: 'H. ANDI PRAMONO, S.T., M.Si.',
    p1_jabatan: 'Kepala Biro Pemerintahan dan Otonomi Daerah',
    p1_alamat: 'Jl. Kompleks Bumi Praja Anduonohu, Kendari',
    p1_dasar_hukum: 'Peraturan Gubernur Sulawesi Tenggara Nomor 10 Tahun 2023 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah Provinsi Sulawesi Tenggara',
    kategori_mitra: 'KSDPK',
    status_naskah: 'BARU',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 3 && subStep === 1) {
      setSubStep(2);
    } else {
      setStep(s => s + 1);
    }
  };
  
  const prevStep = () => {
    if (step === 3 && subStep === 2) {
      setSubStep(1);
    } else {
      setStep(s => s - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, file_naskah: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3 && subStep === 2) {
      onSubmit(formData as Submission);
    } else {
      nextStep();
    }
  };

  const steps = [
    { id: 1, title: 'Pihak Pertama', description: 'Data Pemerintah Provinsi' },
    { id: 2, title: 'Pihak Kedua', description: 'Data Mitra / Instansi' },
    { id: 3, title: 'Detail Kerja Sama', description: 'Ruang Lingkup & Waktu' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-300 ${
                step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-200 text-slate-500'
              }`}>
                {step > s.id ? <CheckCircle2 size={20} /> : s.id}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-blue-600' : 'text-slate-400'}`}>{s.title}</p>
                <p className="text-[10px] text-slate-400 hidden sm:block">{s.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 -z-0 transition-all duration-500 ${
                  step > s.id ? 'bg-blue-600' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 text-blue-700 rounded-2xl border border-blue-100">
                <Info size={20} />
                <p className="text-sm font-medium">Data Pihak Pertama (Provinsi) biasanya sudah terisi secara default sesuai standar birokrasi.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Pimpinan</label>
                  <input
                    type="text"
                    name="p1_nama"
                    value={formData.p1_nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Jabatan</label>
                  <input
                    type="text"
                    name="p1_jabatan"
                    value={formData.p1_jabatan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Alamat Kantor</label>
                <input
                  type="text"
                  name="p1_alamat"
                  value={formData.p1_alamat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Dasar Hukum Jabatan</label>
                <textarea
                  name="p1_dasar_hukum"
                  value={formData.p1_dasar_hukum}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Instansi / Mitra</label>
                  <input
                    type="text"
                    name="p2_instansi"
                    placeholder="Contoh: Universitas Halu Oleo"
                    value={formData.p2_instansi || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kategori Mitra</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.kategori_mitra === 'KSDD' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                      <input
                        type="radio"
                        name="kategori_mitra"
                        value="KSDD"
                        checked={formData.kategori_mitra === 'KSDD'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-bold">KSDD</span>
                      <span className="text-[10px] opacity-70">(Daerah)</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${formData.kategori_mitra === 'KSDPK' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                      <input
                        type="radio"
                        name="kategori_mitra"
                        value="KSDPK"
                        checked={formData.kategori_mitra === 'KSDPK'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-bold">KSDPK</span>
                      <span className="text-[10px] opacity-70">(Pihak Ketiga)</span>
                    </label>
                  </div>
                </div>
              </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Pimpinan Mitra</label>
                  <input
                    type="text"
                    name="p2_nama"
                    placeholder="Nama Lengkap & Gelar"
                    value={formData.p2_nama || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Jabatan Pimpinan</label>
                  <input
                    type="text"
                    name="p2_jabatan"
                    placeholder="Contoh: Rektor / Direktur Utama"
                    value={formData.p2_jabatan || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Alamat Instansi Mitra</label>
                <textarea
                  name="p2_alamat"
                  placeholder="Alamat Lengkap Kantor Mitra"
                  value={formData.p2_alamat || ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && subStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Jenis Naskah</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="MoU">Memorandum of Understanding (MoU)</option>
                    <option value="PKS">Perjanjian Kerja Sama (PKS)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nomor Surat (Jika Ada)</label>
                  <input
                    type="text"
                    name="nomor_surat"
                    placeholder="Contoh: 100.3.7/123/2024"
                    value={formData.nomor_surat || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Judul Kerja Sama</label>
                <input
                  type="text"
                  name="judul"
                  placeholder="Contoh: Pengembangan Sumber Daya Manusia dan Inovasi Daerah"
                  value={formData.judul || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-semibold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ruang Lingkup (Pisahkan dengan koma)</label>
                <textarea
                  name="ruang_lingkup"
                  placeholder="Contoh: Pendidikan, Penelitian, Pengabdian Masyarakat, Pertukaran Data"
                  value={formData.ruang_lingkup || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tanggal Mulai</label>
                  <input
                    type="date"
                    name="jangka_waktu_mulai"
                    value={formData.jangka_waktu_mulai || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tanggal Berakhir</label>
                  <input
                    type="date"
                    name="jangka_waktu_selesai"
                    value={formData.jangka_waktu_selesai || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && subStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Status Naskah</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'BARU', label: 'Naskah Baru', icon: FileCheck },
                    { id: 'ADDENDUM', label: 'Naskah Addendum', icon: AlertCircle },
                    { id: 'PERPANJANGAN', label: 'Naskah Perpanjangan', icon: Save },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex flex-col items-center gap-3 p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                        formData.status_naskah === item.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status_naskah"
                        value={item.id}
                        checked={formData.status_naskah === item.id}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <item.icon size={24} />
                      <span className="font-bold text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Unggah Naskah (PDF/DOCX)</label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.doc,.docx"
                  />
                  <div className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center gap-4 transition-all ${
                    formData.file_naskah ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-slate-100 group-hover:border-slate-300'
                  }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      formData.file_naskah ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{formData.file_naskah ? 'File Berhasil Dipilih' : 'Klik atau Seret File ke Sini'}</p>
                      <p className="text-xs opacity-70">Format yang didukung: PDF, DOCX (Maks. 10MB)</p>
                    </div>
                    {formData.file_naskah && (
                      <div className="mt-2 px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        <span>Naskah Terlampir</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-100 pt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
              >
                <ChevronLeft size={20} />
                <span>Kembali</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50`}
            >
              {step === 3 && subStep === 2 ? (
                <>
                  <Save size={20} />
                  <span>{isSubmitting ? 'Menyimpan...' : 'Simpan & Buat Draf'}</span>
                </>
              ) : (
                <>
                  <span>Lanjut</span>
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
