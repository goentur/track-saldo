import { Link } from '@inertiajs/react';
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCreditCard, faFolder, faStar } from '@fortawesome/free-regular-svg-icons';
import { faDashboard, faExchangeAlt, faStore, faUsers } from '@fortawesome/free-solid-svg-icons';
function Menu({role}) {
    const route = useRoute();
    return (
        <>
            { role=='pemilik' ? ( <>
            <Link className="nav-link" href={route('dashboard')}><FontAwesomeIcon icon={faDashboard}/> DASHBOARD</Link>
            <NavDropdown title={<span><FontAwesomeIcon icon={faFolder} /> MASTER</span>} id="collapsible-nav-dropdown">
              <Link className="dropdown-item" href={route('anggota.index')}><FontAwesomeIcon icon={faUsers}/> ANGGOTA</Link>
              <Link className="dropdown-item" href={route('merek.index')}><FontAwesomeIcon icon={faStar}/> MEREK</Link>
              <Link className="dropdown-item" href={route('tabungan.index')}><FontAwesomeIcon icon={faCreditCard}/> TABUNGAN</Link>
              <Link className="dropdown-item" href={route('pegawai.index')}><FontAwesomeIcon icon={faUsers}/> PEGAWAI</Link>
            </NavDropdown>
            </>):''}
            <Link className="nav-link" href={route('transfer.menu')}><FontAwesomeIcon icon={faExchangeAlt}/> TRANSFER</Link>
            { role=='developer' ? ( <>
            <NavDropdown title={<span><FontAwesomeIcon icon={faFolder} /> MASTER</span>} id="collapsible-nav-dropdown">
              <Link className="dropdown-item" href={route('zona-waktu.index')}><FontAwesomeIcon icon={faClock}/> ZONA WAKTU</Link>
              <Link className="dropdown-item" href={route('toko.index')}><FontAwesomeIcon icon={faStore}/> TOKO</Link>
              <Link className="dropdown-item" href={route('pemilik.index')}><FontAwesomeIcon icon={faUsers}/> PEMILIK</Link>
            </NavDropdown>
            </>):''}
        </>
    )
}
export default Menu