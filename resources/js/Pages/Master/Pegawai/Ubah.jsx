import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
function Ubah({ pegawai, zonaWaktus, tokos }) {
    const route = useRoute();
    const { data, setData, put, errors, processing } = useForm({
        zonaWaktu: pegawai.zona_waktu_id,
        email: pegawai.email,
        nama: pegawai.name,
        toko: pegawai.toko[0].id,
    })
    const [selectedZonaWaktu, setSelectedZonaWaktu] = useState(null);
    const [selectedToko, setSelectedToko] = useState(null);

    useEffect(() => {
        const zonaWaktuSelected = zonaWaktus.find(zonaWaktu => zonaWaktu.id === pegawai.zona_waktu_id);
        setSelectedZonaWaktu(zonaWaktuSelected || null);
        const tokoSelected = tokos.find(toko => toko.id === pegawai.toko[0].id);
        setSelectedToko(tokoSelected || null);
    }, [,tokos, pegawai.toko[0].id]);

    const handleZonaWaktuChange = (selected) => {
        setSelectedZonaWaktu(selected[0] || null);
        setData('toko', selected.length > 0 ? selected[0].id : null);
    };
    const handleTokoChange = (selected) => {
        setSelectedToko(selected[0] || null);
        setData('toko', selected.length > 0 ? selected[0].id : null);
    };
    function submit(e) {
        e.preventDefault()
        put(route("master.pegawai.update",pegawai))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - PEGAWAI"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM PEGAWAI</h1>
                    <Link href={route('master.pegawai.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE DATA</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-12" controlId="validationFormZonaWaktu">
                            <Form.Label>ZONA WAKTU <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="zonaWaktu" labelKey={(zonaWaktus) => `${zonaWaktus.nama}`} name="zonaWaktu" options={zonaWaktus} placeholder="Pilih zona waktu" onChange={handleZonaWaktuChange} size="lg" isInvalid={!!errors.zonaWaktu} selected={selectedZonaWaktu ? [selectedZonaWaktu] : []} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.zonaWaktu}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormEmail">
                            <Form.Label>EMAIL <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="email" placeholder="Masukan email" aria-describedby="inputGroupPrepend" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} isInvalid={!!errors.email} readOnly required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>NAMA <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-12" controlId="validationFormToko">
                            <Form.Label>TOKO <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="toko" labelKey={(tokos) => `${tokos.nama}`} name="toko" options={tokos} placeholder="Pilih toko" onChange={handleTokoChange} size="lg" isInvalid={!!errors.toko} selected={selectedToko ? [selectedToko] : []} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
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

export default Ubah