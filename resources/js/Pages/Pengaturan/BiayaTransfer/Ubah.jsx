import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
function Ubah({ tokos, pengaturanNominal }) {
    const route = useRoute();
    const { data, setData, put, errors, processing } = useForm({
        toko: pengaturanNominal.toko_id,
        nominal: pengaturanNominal.nominal,
    })
    
    const [selectedToko, setSelectedToko] = useState(null);

    useEffect(() => {
        const selected = tokos.find(toko => toko.id === pengaturanNominal.toko_id);
        setSelectedToko(selected || null);
    }, [tokos, pengaturanNominal.toko_id]);
    function submit(e) {
        e.preventDefault()
        put(route("pengaturan.biaya-transfer.update",pengaturanNominal.id))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - PENGATURAN BIAYA TRANFER"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM PENGATURAN BIAYA TRANFER</h1>
                    <Link href={route('pengaturan.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE PENGATURAN</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>TOKO <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="toko" labelKey={(tokos) => `${tokos.nama}`} name="toko" options={tokos} placeholder="Pilih toko" onChange={(selected) => {if (selected.length > 0) {setData('toko', selected[0].id);}}} size="lg" isInvalid={!!errors.toko} selected={selectedToko ? [selectedToko] : []} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNominal">
                            <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput id="nominal" name="nominal" placeholder="Masukan nominal" className={`form-control form-control-lg text-end ${errors.nominal && 'is-invalid'}`} prefix="Rp " value={data.nominal} onValueChange={(values) => setData("nominal", values)} required />
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

export default Ubah