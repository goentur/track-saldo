import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faFolderOpen, faGear, faHomeAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRoute } from '../../../vendor/tightenco/ziggy';


function Layout({children}) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const route = useRoute();
    const { url } = usePage();
    const { role } = usePage().props.auth;
    const { flash } = usePage().props;
    useEffect(() => {
        if (theme === 'light') {
            document.body.style.backgroundColor = '#a1a1a1';
        } else {
            document.body.style.backgroundColor = '';
        }
        document.documentElement.setAttribute('data-bs-theme', theme);

        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash,theme]);
    const isActive = (segment) => url.startsWith(segment);
    return (
    <>
        <Container fluid="fluid" className='mt-3' style={{marginBottom:'100px'}}>
            {children}
        </Container>
        <ToastContainer position="top-left" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme="colored"/>
        <nav className="navbar navbar-expand navbar-dark bg-primary text-white fixed-bottom m-0 p-0">
            <ul className="navbar-nav nav-justified w-100 p-0">
                {role == 'pemilik' || role == 'developer' ? 
                    <li className='nav-item'>
                    <Link href={route('master.menu')} className={`${isActive('/master') ? 'active ':''}nav-link text-center`}>
                        <span className="icon-menu"><FontAwesomeIcon icon={faFolderOpen}/></span><br />
                    </Link>
                    </li>
                : ''}
                {role == 'pemilik' || role == 'pegawai' ? 
                    <li className='nav-item'>
                    <Link href={route('transaksi.menu')} className={`${isActive('/transaksi') ? 'active ':''}nav-link text-center`}>
                        <span className="icon-menu"><FontAwesomeIcon icon={faPlusCircle}/></span><br />
                    </Link  >
                    </li>
                : ''}
                {role == 'pemilik' ? 
                    <li className='nav-item'>
                    <Link href={route('pengaturan.index')} className={`${isActive('/pengaturan') ? 'active ':''}nav-link text-center`}>
                        <span className="icon-menu"><FontAwesomeIcon icon={faGear}/></span><br />
                    </Link>
                    </li>
                : ''}
                <li className='nav-item'>
                <Link href={route('profil.index')} className={`${isActive('/profil') ? 'active ':''}nav-link text-center`}>
                    <span className="icon-menu"><FontAwesomeIcon icon={faUserCircle}/></span><br />
                </Link>
                </li>
            </ul>
        </nav>
    </>
  );
}

export default Layout;