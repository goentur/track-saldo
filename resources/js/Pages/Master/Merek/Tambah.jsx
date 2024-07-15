import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
function Tambah({tokos}) {
    const route = useRoute();
    const formTokoLabel = (tokos) => `${tokos.nama} | ${tokos.alamat}`;
    const { data, setData, post, errors, processing } = useForm({
        toko: "",
        nama: "",
    })
    const handleTokoChange = (selected) => {
        if (selected.length > 0) {
            setData('toko', selected[0].id);
        }
    };
    function submit(e) {
        e.preventDefault()
        post(route("merek.store"))
    }
    return (
        <>
        <Layout>
            <Head title="TAMBAH - MEREK"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM MEREK</h1>
                    <Link href={route('merek.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE DATA</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>Toko</Form.Label>
                            <Typeahead id="toko" labelKey={formTokoLabel} name="toko" options={tokos} placeholder="Pilih toko" onChange={handleTokoChange} size="lg" isInvalid={!!errors.toko} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="col-lg-12">
                            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FontAwesomeIcon icon={faSave}/> } SIMPAN</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Layout>
        </>
    )
}

export default Tambah