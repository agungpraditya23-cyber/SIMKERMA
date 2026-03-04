import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FormSubmission from './components/FormSubmission';
import DraftViewer from './components/DraftViewer';
import RegulasiFormat from './components/RegulasiFormat';
import { Submission } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, FileText, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Default to true for this request
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      showToast('Gagal memuat data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (data: Submission) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.id) {
        showToast('Pengajuan berhasil disimpan!', 'success');
        await fetchSubmissions();
        setSelectedId(result.id);
        setActiveTab('drafts');
      } else {
        throw new Error(result.error || 'Gagal menyimpan data');
      }
    } catch (err: any) {
      console.error('Failed to submit:', err);
      showToast(`Gagal: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengajuan ini?')) return;
    try {
      await fetch('/api/submissions/' + id, { method: 'DELETE' });
      showToast('Pengajuan berhasil dihapus', 'success');
      fetchSubmissions();
    } catch (err) {
      showToast('Gagal menghapus data', 'error');
    }
  };

  const handleView = (id: number) => {
    setSelectedId(id);
    setActiveTab('drafts');
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/submissions/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast(`Status berhasil diperbarui ke ${status}`, 'success');
        fetchSubmissions();
      } else {
        throw new Error('Gagal memperbarui status');
      }
    } catch (err) {
      showToast('Gagal memperbarui status', 'error');
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'drafts') setSelectedId(null);
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            submissions={submissions} 
            onView={handleView} 
            onDelete={handleDelete} 
            onUpdateStatus={handleUpdateStatus}
            isAdmin={isAdmin}
          />
        );
      case 'new':
        return (
          <FormSubmission 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        );
      case 'drafts':
        const selected = submissions.find(s => s.id === selectedId);
        if (selected) {
          return (
            <DraftViewer 
              submission={selected} 
              onBack={() => setSelectedId(null)} 
            />
          );
        }
        return (
          <div className="space-y-6">
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200 mb-8">
              <h2 className="text-2xl font-bold mb-2">Daftar Draf Naskah</h2>
              <p className="opacity-80">Pilih naskah di bawah ini untuk membuka dan meninjau draf kerja sama.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.length > 0 ? (
                submissions.map((s) => (
                  <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${s.type === 'MoU' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {s.type}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(s.created_at!).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 h-12">{s.judul}</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {s.p2_instansi.charAt(0)}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{s.p2_instansi}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedId(s.id!)}
                      className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText size={16} />
                      <span>Buka Naskah</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <AlertCircle className="mx-auto text-slate-300 mb-4" size={64} strokeWidth={1} />
                  <h3 className="text-xl font-bold text-slate-900">Belum Ada Draf</h3>
                  <p className="text-slate-500 mt-2">Silakan buat pengajuan baru terlebih dahulu.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'regulasi':
        return <RegulasiFormat />;
      case 'settings':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Settings className="text-blue-600" size={24} />
                Pengaturan Sistem (Admin)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Manajemen Pengguna</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Admin Utama', role: 'Super Admin', status: 'Aktif' },
                      { name: 'Fasilitator 1', role: 'Editor', status: 'Aktif' },
                      { name: 'Verifikator', role: 'Viewer', status: 'Non-Aktif' },
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{user.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">{user.role}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-[9px] font-bold ${user.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:bg-slate-50 transition-all">
                    + Tambah Personel
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Konfigurasi Sistem</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Mode Maintenance</p>
                        <p className="text-xs text-slate-500">Nonaktifkan akses publik sementara</p>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Notifikasi Email</p>
                        <p className="text-xs text-slate-500">Kirim update status ke mitra otomatis</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <button className="w-full py-3 bg-red-50 text-red-600 rounded-2xl text-sm font-bold hover:bg-red-100 transition-all">
                        Reset Database (Hapus Semua Data)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <h4 className="font-bold mb-4">Log Aktivitas Sistem</h4>
              <div className="space-y-3">
                {[
                  'Admin mengubah status naskah "PKS UNHAS" menjadi FINAL',
                  'Fasilitator 1 membuat pengajuan baru: "MoU Pemkot Kendari"',
                  'Admin menghapus draf naskah ID #102',
                ].map((log, i) => (
                  <div key={i} className="text-xs flex gap-3 text-slate-400">
                    <span className="text-blue-500 font-mono">[10:45]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
      {renderContent()}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === 'success' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-red-600 border-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
