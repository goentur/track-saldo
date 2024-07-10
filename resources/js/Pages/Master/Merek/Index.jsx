import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../../Layouts/Layout";
import { faDashboard, faPlus, faTable } from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";
import { faClipboard, faStar } from "@fortawesome/free-regular-svg-icons";
import { Button, Modal, Table } from "react-bootstrap";
import { useState } from "react";

function Index(){
  const [show, setShow] = useState(false);
    return (
    <Layout>
        <Head title="MEREK"/>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h1><FontAwesomeIcon icon={faStar}/> MEREK</h1>
            <Button variant="primary" size="lg" onClick={() => setShow(true)}><FontAwesomeIcon icon={faPlus}/> TAMBAH DATA</Button>
        </div>
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th className="w-1">NO</th>
                    <th>NAMA</th>
                    <th className="w-1">AKSI</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </Table>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="formMerek"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="formMerek">
            <FontAwesomeIcon icon={faClipboard}/> FORM MEREK
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
    </Layout>
    )
}

export default Index