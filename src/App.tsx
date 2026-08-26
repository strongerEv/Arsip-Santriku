import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { HomePage } from './pages/HomePage'
import { ArsipPage } from './pages/ArsipPage'
import { ArsipDetailPage } from './pages/ArsipDetailPage'
import { ArsipEditorPage } from './pages/ArsipEditorPage'
import { IstighosahPage } from './pages/IstighosahPage'
import { PaketDetailPage } from './pages/PaketDetailPage'
import { SesiPage } from './pages/SesiPage'
import { StatistikPage } from './pages/StatistikPage'
import { PengaturanPage } from './pages/PengaturanPage'

export default function App() {
  const location = useLocation()
  // Mode sesi tampil penuh layar tanpa tab bar agar benar-benar minim distraksi.
  const focusMode = location.pathname.startsWith('/sesi')

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arsip" element={<ArsipPage />} />
        <Route path="/arsip/baru" element={<ArsipEditorPage />} />
        <Route path="/arsip/:id" element={<ArsipDetailPage />} />
        <Route path="/arsip/:id/ubah" element={<ArsipEditorPage />} />
        <Route path="/istighosah" element={<IstighosahPage />} />
        <Route path="/istighosah/:packageId" element={<PaketDetailPage />} />
        <Route path="/sesi/:packageId" element={<SesiPage />} />
        <Route path="/statistik" element={<StatistikPage />} />
        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!focusMode && <TabBar />}
    </div>
  )
}
