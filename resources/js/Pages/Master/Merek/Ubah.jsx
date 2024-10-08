import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
function Ubah({ tokos, merek }) {
    const route = useRoute();
    const formTokoLabel = (tokos) => `${tokos.nama}`;
    const { data, setData, put, errors, processing } = useForm({
        toko: merek.toko_id,
        nama: merek.nama,
    })
    
    const [selectedToko, setSelectedToko] = useState(null);

    useEffect(() => {
        const selected = tokos.find(toko => toko.id === merek.toko_id);
        setSelectedToko(selected || null);
    }, [tokos, merek.toko_id]);

    const handleTokoChange = (selected) => {
        setSelectedToko(selected[0] || null);
        setData('toko', selected.length > 0 ? selected[0].id : null);
    };
    function submit(e) {
        e.preventDefault()
        put(route("master.merek.update",merek))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - MEREK"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faClipboard}/> MEREK</CardTitle>
                    <Link href={route('master.merek.index')} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>TOKO <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="toko" labelKey={formTokoLabel} name="toko" options={tokos} placeholder="Pilih toko" onChange={handleTokoChange} size="lg" isInvalid={!!errors.toko} selected={selectedToko ? [selectedToko] : []} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>NAMA <span className="text-danger">*</span></Form.Label>
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

export default Ubah