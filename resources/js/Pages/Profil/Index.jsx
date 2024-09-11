import { faRightFromBracket, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, CardBody } from "react-bootstrap";
import Layout from "../../Layouts/Layout";
import ThemeMode from "../../Layouts/ThemeMode";
import UbahPassword from "./UbahPassword";

function Index(){
  const { user } = usePage().props.auth;
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
            <Layout>
                <Head title="PROFIL"/>
                <Card className="col-lg-12 mb-5">
                    <CardBody className="row">
                        <div className="col-lg-6">
                            <h4><FontAwesomeIcon icon={faUserAlt}/> INFORMASI PROFIL</h4>
                            <p>Berikut informasi profil Anda.</p>
                            <table className="table-sm mt-4">
                                <tbody>
                                    <tr>
                                        <td className="w-8 fw-bold">NAMA</td>
                                        <td className="w-1">:</td>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-8 fw-bold">EMAIL</td>
                                        <td className="w-1">:</td>
                                        <td>{user.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-danger mt-4" onClick={logout} ><FontAwesomeIcon icon={faRightFromBracket}/> KELUAR </button>
                        </div>
                        <div className="col-lg-6">
                            <h4><FontAwesomeIcon icon={faCog}/> PENGATURAN TAMPILAN</h4>
                            <p className="mb-4">Ubah mode tampilan anda.</p>
                            <ThemeMode/>
                        </div>
                    </CardBody>
                </Card>
                <UbahPassword/>
            </Layout>
        </>
    )
}

export default Index;