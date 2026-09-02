import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { HomePage } from './pages/HomePage'
import { ArsipPage } from './pages/ArsipPage'
import { ArsipDetailPage } from './pages/ArsipDetailPage'
import { ArsipEditorPage } from './pages/ArsipEditorPage'
import { AmalanPage } from './pages/AmalanPage'
import { PaketDetailPage } from './pages/PaketDetailPage'
import { SesiPage } from './pages/SesiPage'
import { TasbihPage } from './pages/TasbihPage'
import { ProgramPage } from './pages/ProgramPage'
import { SholawatPage } from './pages/SholawatPage'
import { SholawatSetupPage } from './pages/SholawatSetupPage'
import { SholawatBacaPage } from './pages/SholawatBacaPage'
import { StatistikPage } from './pages/StatistikPage'
import { PengaturanPage } from './pages/PengaturanPage'

/** Mengarahkan tautan paket dari versi sebelumnya ke rute Amalan. */
function PaketLamaRedirect() {
  const { packageId } = useParams()
  return <Navigate to={`/amalan/${packageId}`} replace />
}

export default function App() {
  const location = useLocation()
  // Mode sesi tampil penuh layar tanpa tab bar agar benar-benar minim distraksi.
  const focusMode =
    location.pathname.startsWith('/sesi') || location.pathname === '/program/sholawat/baca'

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arsip" element={<ArsipPage />} />
        <Route path="/arsip/baru" element={<ArsipEditorPage />} />
        <Route path="/arsip/:id" element={<ArsipDetailPage />} />
        <Route path="/arsip/:id/ubah" element={<ArsipEditorPage />} />
        <Route path="/amalan" element={<AmalanPage />} />
        <Route path="/amalan/:packageId" element={<PaketDetailPage />} />
        {/* Rute lama dari versi sebelumnya tetap dapat dibuka. */}
        <Route path="/istighosah" element={<Navigate to="/amalan" replace />} />
        <Route path="/istighosah/:packageId" element={<PaketLamaRedirect />} />
        <Route path="/sesi/:packageId" element={<SesiPage />} />
        <Route path="/tasbih" element={<TasbihPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/program/sholawat" element={<SholawatPage />} />
        <Route path="/program/sholawat/baru" element={<SholawatSetupPage mode="baru" />} />
        <Route path="/program/sholawat/ubah" element={<SholawatSetupPage mode="ubah" />} />
        <Route path="/program/sholawat/baca" element={<SholawatBacaPage />} />
        {/* Rute Cinta Shalawat dari versi sebelumnya. */}
        <Route path="/sholawat" element={<Navigate to="/program/sholawat" replace />} />
        <Route path="/sholawat/baru" element={<Navigate to="/program/sholawat/baru" replace />} />
        <Route path="/sholawat/ubah" element={<Navigate to="/program/sholawat/ubah" replace />} />
        <Route path="/sholawat/baca" element={<Navigate to="/program/sholawat/baca" replace />} />
        <Route path="/statistik" element={<StatistikPage />} />
        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!focusMode && <TabBar />}
    </div>
  )
}
