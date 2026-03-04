export interface Submission {
  id?: number;
  type: 'MoU' | 'PKS';
  status: 'DRAF' | 'REVIEW' | 'FINAL';
  
  // Pihak Pertama (Provinsi)
  p1_nama: string;
  p1_jabatan: string;
  p1_alamat: string;
  p1_dasar_hukum: string;
  
  // Pihak Kedua (Mitra)
  p2_instansi: string;
  p2_nama: string;
  p2_jabatan: string;
  p2_alamat: string;
  kategori_mitra: 'KSDD' | 'KSDPK';
  
  // Kerja Sama
  judul: string;
  ruang_lingkup: string;
  jangka_waktu_mulai: string;
  jangka_waktu_selesai: string;
  nomor_surat: string;
  status_naskah: 'BARU' | 'ADDENDUM' | 'PERPANJANGAN';
  file_naskah?: string; // Base64 or URL
  
  created_at?: string;
}
