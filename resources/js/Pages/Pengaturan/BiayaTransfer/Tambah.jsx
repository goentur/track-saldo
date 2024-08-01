import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
function Tambah({tokos}) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: null,
        nominal: null,
    })
    function submit(e) {
        e.preventDefault()
        post(route("pengaturan.biaya-transfer.simpan"))
    }
    console.log(data)
    return (
        <>
        <Layout>
            <Head title="TAMBAH - PENGATURAN BIAYA TRANSFER"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM PENGATURAN BIAYA TRANSFER</h1>
                    <Link href={route('pengaturan.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE PENGATURAN</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>TOKO <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="toko" labelKey={(tokos) => `${tokos.nama}`} name="toko" options={tokos} placeholder="Pilih toko" onChange={(selected) => {if (selected.length > 0) {setData('toko', selected[0].id);}}} size="lg" isInvalid={!!errors.toko} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNominal">
                            <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput id="nominal" name="nominal" placeholder="Masukan nominal" className={`form-control form-control-lg text-end ${errors.nominal && 'is-invalid'}`} prefix="Rp " onValueChange={(values) => setData("nominal", values)} required />
                            {errors.nominal && <div className="invalid-feedback">{errors.nominal}</div>}
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