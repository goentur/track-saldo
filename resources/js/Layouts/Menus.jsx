import { Link } from '@inertiajs/react';
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCreditCard, faFileAlt, faFileExcel, faFileWord, faFolder, faStar } from '@fortawesome/free-regular-svg-icons';
import { faCogs, faDashboard, faExchangeAlt, faStore, faTruck, faUsers } from '@fortawesome/free-solid-svg-icons';
function Menu({role}) {
    const route = useRoute();
    return (
        <>
            { role=='developer' ? ( <>
            <NavDropdown title={<span><FontAwesomeIcon icon={faFolder} /> MASTER</span>} id="collapsible-nav-dropdown">
              <Link className="dropdown-item" href={route('zona-waktu.index')}><FontAwesomeIcon icon={faClock}/> ZONA WAKTU</Link>
              <Link className="dropdown-item" href={route('toko.index')}><FontAwesomeIcon icon={faStore}/> TOKO</Link>
              <Link className="dropdown-item" href={route('pemilik.index')}><FontAwesomeIcon icon={faUsers}/> PEMILIK</Link>
            </NavDropdown>
            </>):''}
            { role=='pemilik' ? ( <>
            <Link className="nav-link" href={route('dashboard')}><FontAwesomeIcon icon={faDashboard}/> DASHBOARD</Link>
            <NavDropdown title={<span><FontAwesomeIcon icon={faFolder} /> MASTER</span>} id="collapsible-nav-dropdown">
              <Link className="dropdown-item" href={route('anggota.index')}><FontAwesomeIcon icon={faUsers}/> ANGGOTA</Link>
              <Link className="dropdown-item" href={route('merek.index')}><FontAwesomeIcon icon={faStar}/> MEREK</Link>
              <Link className="dropdown-item" href={route('tabungan.index')}><FontAwesomeIcon icon={faCreditCard}/> TABUNGAN</Link>
              <Link className="dropdown-item" href={route('pegawai.index')}><FontAwesomeIcon icon={faUsers}/> PEGAWAI</Link>
              <Link className="dropdown-item" href={route('paket.index')}><FontAwesomeIcon icon={faTruck}/> PAKET</Link>
            </NavDropdown>
            </>):''}
            { role=='pemilik' || role=='pegawai' ? ( <>
            <Link className="nav-link" href={route('transaksi.menu')}><FontAwesomeIcon icon={faExchangeAlt}/> TRANSAKSI</Link>
            </>):''}
            { role=='pemilik' ? ( <>
            <NavDropdown title={<span><FontAwesomeIcon icon={faFileAlt} /> LAPORAN</span>} id="collapsible-nav-dropdown">
              <Link className="dropdown-item" href={route('laporan.index')}><FontAwesomeIcon icon={faFileWord}/> LAPORAN</Link>
              <Link className="dropdown-item" href={route('laporan.detail')}><FontAwesomeIcon icon={faFileExcel}/> LAPORAN DETAIL</Link>
            </NavDropdown>
            <Link className="nav-link" href={route('pengaturan.index')}><FontAwesomeIcon icon={faCogs}/> PENGATURAN</Link>
            </>):''}
        </>
    )
}
export default Menu