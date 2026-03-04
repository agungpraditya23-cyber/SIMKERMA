import React from 'react';
import { Download, Printer, Share2, ArrowLeft, FileCheck } from 'lucide-react';
import { Submission } from '../types';

interface DraftViewerProps {
  submission: Submission;
  onBack: () => void;
}

export default function DraftViewer({ submission, onBack }: DraftViewerProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getYear = (dateStr: string) => new Date(dateStr).getFullYear();

  return (
    <div className="space-y-8 pb-20">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-4 z-30">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all font-medium"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-all font-medium">
            <Printer size={18} />
            <span>Cetak</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-all font-medium">
            <Download size={18} />
            <span>Unduh PDF</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all font-medium shadow-lg shadow-blue-200">
            <FileCheck size={18} />
            <span>Finalisasi</span>
          </button>
        </div>
      </div>

      {/* Document Preview */}
      <div className="draft-paper">
        <div className="draft-header">
          <h2 className="text-xl font-bold uppercase mb-1">PEMERINTAH PROVINSI SULAWESI TENGGARA</h2>
          <h3 className="text-lg font-bold uppercase mb-1">SEKRETARIAT DAERAH</h3>
          <p className="text-sm italic">Jl. Kompleks Bumi Praja Anduonohu, Kendari</p>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-lg font-bold underline uppercase mb-1">
            {submission.type === 'MoU' ? 'MEMORANDUM OF UNDERSTANDING (MoU)' : 'PERJANJIAN KERJA SAMA (PKS)'}
          </h1>
          <p className="text-xs font-bold text-slate-500 mb-2">Kategori: {submission.kategori_mitra === 'KSDD' ? 'Kerja Sama Daerah dengan Daerah (KSDD)' : 'Kerja Sama Daerah dengan Pihak Ketiga (KSDPK)'} | Status: {submission.status_naskah}</p>
          <p className="text-md font-bold uppercase mb-1">ANTARA</p>
          <h2 className="text-md font-bold uppercase mb-1">PEMERINTAH PROVINSI SULAWESI TENGGARA</h2>
          <p className="text-md font-bold uppercase mb-1">DENGAN</p>
          <h2 className="text-md font-bold uppercase mb-4">{submission.p2_instansi}</h2>
          <p className="text-md font-bold uppercase mb-1">TENTANG</p>
          <h2 className="text-md font-bold uppercase underline">{submission.judul}</h2>
          <p className="text-md mt-2">Nomor: {submission.nomor_surat || '........................................'}</p>
        </div>

        <div className="space-y-6 text-justify leading-relaxed text-[14px]">
          <p>
            Pada hari ini, tanggal {formatDate(submission.created_at || new Date().toISOString())}, bertempat di Kendari, kami yang bertanda tangan di bawah ini:
          </p>

          <div className="pl-4 space-y-4">
            <p>
              <strong>1. {submission.p1_nama}</strong>, dalam hal ini bertindak untuk dan atas nama <strong>PEMERINTAH PROVINSI SULAWESI TENGGARA</strong>, berkedudukan di {submission.p1_alamat}, selanjutnya disebut sebagai <strong>PIHAK KESATU</strong>.
            </p>
            <p>
              <strong>2. {submission.p2_nama}</strong>, dalam hal ini bertindak untuk dan atas nama <strong>{submission.p2_instansi}</strong>, berkedudukan di {submission.p2_alamat}, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
            </p>
          </div>

          <p>
            PIHAK KESATU dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai PARA PIHAK, terlebih dahulu menerangkan hal-hal sebagai berikut:
          </p>

          <div className="space-y-4">
            <p>a. Bahwa PIHAK KESATU adalah Pemerintah Daerah Provinsi Sulawesi Tenggara yang memiliki kewenangan dalam penyelenggaraan urusan pemerintahan daerah;</p>
            <p>b. Bahwa PIHAK KEDUA adalah {submission.p2_instansi} yang bergerak di bidang {submission.judul.split(' ').slice(0, 3).join(' ')};</p>
            <p>c. Bahwa PARA PIHAK sepakat untuk mengadakan kerja sama dalam rangka {submission.judul}.</p>
          </div>

          <div className="text-center font-bold mt-8">
            <p>PASAL 1</p>
            <p>RUANG LINGKUP</p>
          </div>
          <p>Ruang lingkup kerja sama ini meliputi:</p>
          <ol className="list-decimal pl-8">
            {submission.ruang_lingkup.split(',').map((item, i) => (
              <li key={i} className="mb-1">{item.trim()}</li>
            ))}
            <li className="mb-1">Bidang lain yang disepakati oleh PARA PIHAK.</li>
          </ol>

          <div className="text-center font-bold mt-8">
            <p>PASAL 2</p>
            <p>JANGKA WAKTU</p>
          </div>
          <p>
            Kerja sama ini berlaku untuk jangka waktu sejak tanggal {formatDate(submission.jangka_waktu_mulai)} sampai dengan tanggal {formatDate(submission.jangka_waktu_selesai)}, dan dapat diperpanjang atau diakhiri berdasarkan kesepakatan PARA PIHAK.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-12 text-center">
            <div className="space-y-20">
              <p className="font-bold uppercase">PIHAK KEDUA</p>
              <div className="space-y-1">
                <p className="font-bold underline">{submission.p2_nama}</p>
                <p className="text-xs uppercase">{submission.p2_jabatan}</p>
              </div>
            </div>
            <div className="space-y-20">
              <p className="font-bold uppercase">PIHAK KESATU</p>
              <div className="space-y-1">
                <p className="font-bold underline">{submission.p1_nama}</p>
                <p className="text-xs uppercase">{submission.p1_jabatan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
