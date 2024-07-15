import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Tambah() {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        nama: "",
        singkatan: "",
        gmt_offset: "",
    })
    function submit(e) {
        e.preventDefault()
        post(route("zona-waktu.store"))
    }
    return (
        <>
        <Layout>
            <Head title="TAMBAH - ZONA WAKTU"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM ZONA WAKTU</h1>
                    <Link href={route('zona-waktu.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE DATA</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-3" controlId="validationFormSingkatan">
                            <Form.Label>Singkatan</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan singkatan" aria-describedby="inputGroupPrepend" name="singkatan" value={data.singkatan} onChange={(e) => setData("singkatan", e.target.value)} isInvalid={!!errors.singkatan} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.singkatan}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-3" controlId="validationFormGMTOffset">
                            <Form.Label>GMT Offset</Form.Label>
                            <Form.Control size="lg" type="number" placeholder="Masukan gmt offset" aria-describedby="inputGroupPrepend" name="gmt_offset" value={data.gmt_offset} onChange={(e) => setData("gmt_offset", e.target.value)} isInvalid={!!errors.gmt_offset} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.gmt_offset}
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