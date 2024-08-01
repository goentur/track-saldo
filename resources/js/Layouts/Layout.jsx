import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ThemeMode from './ThemeMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import { useEffect } from 'react';
import Menu from './Menus';


function Layout({children}) {
  const route = useRoute();
  const { user } = usePage().props.auth;
  const { role } = usePage().props.auth;
  const { flash } = usePage().props;
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
  useEffect(() => {
      if (flash.success) {
          toast.success(flash.success);
      }
      if (flash.error) {
          toast.error(flash.error);
      }
  }, [flash]);
  return (
  <>
    <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
      <Container>
        <Link className="navbar-brand" href={route('home')}><b>T</b>rack<b>S</b>aldo</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Menu role={role}/>
          </Nav>
          <Nav>
            <Nav.Link><ThemeMode/></Nav.Link>
            <NavDropdown title={<span><FontAwesomeIcon icon={faUser} /> {user.name}</span>}  align="end">
              <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faUser}/> Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/> LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme="colored"/>
    <Container fluid="lg" style={{paddingTop: "4.5rem"}}>
      {children}
    </Container>
  </>
  );
}

export default Layout;