import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ThemeMode from './ThemeMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDashboard, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faFolder, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../vendor/tightenco/ziggy';


function Layout({children}) {
  const route = useRoute();

  const { user } = usePage().props.auth
  const { delete:destroy } = useForm()
  function logout(e) {
    e.preventDefault()
    destroy(route('logout'),{
        onSuccess: () => {
          localStorage.removeItem('auth');
          router.reload(route('login'));
        }
    })
  }
  return (
  <>
    <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
      <Container>
        <Link className="navbar-brand" href={route('home')}><b>T</b>rack<b>S</b>aldo</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href={route('dashboard')}><FontAwesomeIcon icon={faDashboard}/> DASHBOARD</Link>
            <NavDropdown title={<span><FontAwesomeIcon icon={faFolder} /> MASTER</span>} id="collapsible-nav-dropdown">
              <Link className="dropdown-item" href={route('master.merek')}><FontAwesomeIcon icon={faStar}/> MEREK</Link>
              <Link className="dropdown-item" href={route('master.merek')}><FontAwesomeIcon icon={faCreditCard}/> TABUNGAN</Link>
              <Link className="dropdown-item" href={route('master.merek')}><FontAwesomeIcon icon={faStar}/> MEREK</Link>
              <Link className="dropdown-item" href={route('master.merek')}><FontAwesomeIcon icon={faStar}/> MEREK</Link>
              <Link className="dropdown-item" href={route('master.merek')}><FontAwesomeIcon icon={faStar}/> MEREK</Link>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link><ThemeMode/></Nav.Link>
            <NavDropdown title={<span><FontAwesomeIcon icon={faUser} /> {user.name}</span>}  align="end">
              <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faUser}/> Profil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faCog}/> Pengaturan</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/> LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container fluid="lg" style={{paddingTop: "4.5rem"}}>
        {children}
    </Container>
  </>
  );
}

export default Layout;