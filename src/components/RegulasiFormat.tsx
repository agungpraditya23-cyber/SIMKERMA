import React from 'react';
import { Book, FileDown, ExternalLink, ShieldCheck, FileText, Info } from 'lucide-react';

export default function RegulasiFormat() {
  const regulations = [
    {
      title: 'Permendagri No. 22 Tahun 2020',
      description: 'Tata Cara Kerja Sama Daerah dengan Daerah Lain dan Kerja Sama Daerah dengan Pihak Ketiga.',
      link: '#',
      category: 'Utama'
    },
    {
      title: 'PP No. 28 Tahun 2018',
      description: 'Peraturan Pemerintah tentang Kerja Sama Daerah.',
      link: '#',
      category: 'Dasar'
    },
    {
      title: 'UU No. 23 Tahun 2014',
      description: 'Undang-Undang tentang Pemerintahan Daerah (Pasal Kerja Sama).',
      link: '#',
      category: 'Undang-Undang'
    }
  ];

  const templates = [
    {
      name: 'Template MoU (Nota Kesepahaman)',
      type: 'Word',
      size: '45 KB',
      description: 'Format standar kesepakatan awal antara Pemprov dengan Mitra.',
      icon: FileText,
      color: 'blue'
    },
    {
      name: 'Template PKS (Perjanjian Kerja Sama)',
      type: 'Word',
      size: '62 KB',
      description: 'Format detail pelaksanaan kerja sama yang lebih teknis.',
      icon: ShieldCheck,
      color: 'indigo'
    },
    {
      name: 'Format Laporan Evaluasi',
      type: 'Excel',
      size: '28 KB',
      description: 'Template untuk pelaporan berkala hasil kerja sama.',
      icon: Book,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 p-10 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Regulasi & Format Dokumen</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Pusat referensi aturan dan template dokumen standar untuk memastikan setiap naskah kerja sama sesuai dengan ketentuan perundang-undangan yang berlaku.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regulations List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Book size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Landasan Regulasi (Permendagri & PP)</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {regulations.map((reg, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                        {reg.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{reg.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{reg.description}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex-shrink-0 flex items-center justify-center">
              <Info size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800 mb-1">Penting untuk Diperhatikan</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Setiap naskah kerja sama wajib merujuk pada Permendagri No. 22 Tahun 2020 sebagai acuan utama dalam penyusunan klausul dan tata cara penandatanganan.
              </p>
            </div>
          </div>
        </div>

        {/* Templates List */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <FileDown size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Template Dokumen</h3>
          </div>

          <div className="space-y-4">
            {templates.map((tpl, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className={`w-12 h-12 bg-${tpl.color}-100 text-${tpl.color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <tpl.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{tpl.name}</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{tpl.type} • {tpl.size}</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  <FileDown size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Butuh Bantuan?</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Jika Anda memerlukan format khusus yang tidak tersedia di sini, silakan hubungi Biro Pemerintahan.
            </p>
            <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all">
              Hubungi Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
