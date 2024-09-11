import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
function Ubah({ tokos, paket }) {
    const route = useRoute();
    const { data, setData, put, errors, processing } = useForm({
        toko: paket.toko_id,
        tipePaket: paket.tipe,
        nama: paket.nama,
        nominal: paket.harga,
    })
    const [selectedToko, setSelectedToko] = useState(null);

    useEffect(() => {
        const selected = tokos.find(toko => toko.id === paket.toko_id);
        setSelectedToko(selected || null);
    }, [tokos, paket.toko_id]);

    const handleTokoChange = (selected) => {
        setSelectedToko(selected[0] || null);
        setData('toko', selected.length > 0 ? selected[0].id : null);
    };
    function submit(e) {
        e.preventDefault()
        put(route("master.paket.update",paket))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - PAKET"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM PAKET</h1>
                    <Link href={route('master.paket.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE DATA</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>TOKO <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="toko" labelKey={(tokos) => `${tokos.nama}`} name="toko" options={tokos} placeholder="Pilih toko" onChange={handleTokoChange} size="lg" isInvalid={!!errors.toko} selected={selectedToko ? [selectedToko] : []} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormTipePaket">
                            <Form.Label>TIPE PAKET <span className="text-danger">*</span></Form.Label>
                            <select name="tipePaket" id="tipePaket" className={`form-control form-control-lg ${errors.tipePaket && 'is-invalid'}`} onChange={(e) => setData("tipePaket", e.target.value)} defaultValue={paket.tipe}>
                                <option value="">Pilih salah satu</option>
                                <option value="PULSA">PULSA</option>
                            </select>
                            <Form.Control.Feedback type="invalid">
                                {errors.tipePaket}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>NAMA <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNominal">
                            <Form.Label>NOMINAL / HARGA JUAL <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput id="nominal" name="nominal" placeholder="Masukan nominal" className={`form-control form-control-lg text-end ${errors.nominal && 'is-invalid'}`} value={data.nominal} prefix="Rp " onValueChange={(values) => setData("nominal", values)} required autoComplete="off" />
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