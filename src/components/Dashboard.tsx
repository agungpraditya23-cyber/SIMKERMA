import React from 'react';
import { Search, Filter, MoreVertical, FileText, CheckCircle, Clock, AlertCircle, Trash2, Eye } from 'lucide-react';
import { Submission } from '../types';

interface DashboardProps {
  submissions: Submission[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, status: string) => void;
  isAdmin: boolean;
}

export default function Dashboard({ submissions, onView, onDelete, onUpdateStatus, isAdmin }: DashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeMenu, setActiveMenu] = React.useState<number | null>(null);

  const filteredSubmissions = submissions.filter(s => 
    s.p2_instansi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'FINAL':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider"><CheckCircle size={14} /> Final</span>;
      case 'REVIEW':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider"><Clock size={14} /> Review</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider"><FileText size={14} /> Draf</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Pengajuan', value: submissions.length, icon: FileText, color: 'blue' },
          { label: 'Dalam Review', value: submissions.filter(s => s.status === 'REVIEW').length, icon: Clock, color: 'amber' },
          { label: 'Selesai / Final', value: submissions.filter(s => s.status === 'FINAL').length, icon: CheckCircle, color: 'emerald' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 bg-${stat.color}-100 text-${stat.color}-600 rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari mitra atau judul..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-all">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mitra / Instansi</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Judul Kerja Sama</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold">
                          {s.p2_instansi.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{s.p2_instansi}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-slate-500">{s.p2_nama}</p>
                            <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-bold uppercase tracking-tighter">
                              {s.kategori_mitra}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700 max-w-xs truncate">{s.judul}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`w-fit px-2 py-1 rounded text-[10px] font-bold ${s.type === 'MoU' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'}`}>
                          {s.type}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">
                          {s.status_naskah}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(s.status)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500">{new Date(s.created_at!).toLocaleDateString('id-ID')}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isAdmin && (
                          <div className="relative">
                            <button 
                              onClick={() => setActiveMenu(activeMenu === s.id ? null : s.id!)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="Kelola Status"
                            >
                              <MoreVertical size={18} />
                            </button>
                            
                            {activeMenu === s.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-30 py-2 animate-in fade-in zoom-in duration-200">
                                <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ubah Status</p>
                                <button 
                                  onClick={() => { onUpdateStatus(s.id!, 'DRAF'); setActiveMenu(null); }}
                                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                                >
                                  <FileText size={14} /> Draf
                                </button>
                                <button 
                                  onClick={() => { onUpdateStatus(s.id!, 'REVIEW'); setActiveMenu(null); }}
                                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-600 flex items-center gap-2"
                                >
                                  <Clock size={14} /> Review
                                </button>
                                <button 
                                  onClick={() => { onUpdateStatus(s.id!, 'FINAL'); setActiveMenu(null); }}
                                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2"
                                >
                                  <CheckCircle size={14} /> Final
                                </button>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button 
                                  onClick={() => { onDelete(s.id!); setActiveMenu(null); }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 size={14} /> Hapus Permanen
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        <button 
                          onClick={() => onView(s.id!)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Lihat Draf"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <AlertCircle size={48} strokeWidth={1} />
                      <p>Belum ada data pengajuan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
