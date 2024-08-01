import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect, useState } from "react";
function Ubah({ tabungans, pengaturan }) {
    const route = useRoute();
    const { data, setData, put, errors, processing } = useForm({
        toko: pengaturan.toko_id,
        tabungan: pengaturan.tabungan_id,
    })
    
    const [selectedTabungan, setSelectedTabungan] = useState(null);

    useEffect(() => {
        const selected = tabungans.find(tabungan => tabungan.id === pengaturan.tabungan_id);
        setSelectedTabungan(selected || null);
    }, [tabungans, pengaturan.tabungan_id]);

    const handleTabunganChange = (selected) => {
        setSelectedTabungan(selected[0] || null);
        if (selected.length > 0) {
            setData({
                'toko' : selected[0].toko_id,
                'tabungan' : selected[0].id,
            });
        }
    };
    function submit(e) {
        e.preventDefault()
        put(route("pengaturan.tunai.update",pengaturan.id))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - PENGATURAN TUNAI"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM PENGATURAN TUNAI</h1>
                    <Link href={route('pengaturan.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE PENGATURAN</Link>
                </CardHeader>
                <CardBody>
                    <div className="alert alert-info">
                        <h4>INFORMASI</h4>
                        <ul>
                            <li>Jika anda mengubah data pengaturan, maka transaksi yang bersifat uang tunai akan masuk ke tabungan yang anda update.</li>
                        </ul>
                    </div>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-12" controlId="validationFormTabungan">
                            <Form.Label>TABUNGAN <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="tabungan" labelKey={(tabungans) => `${tabungans.toko.nama} | ${tabungans.merek.nama} ( ${tabungans.no} )`} name="tabungan" options={tabungans} placeholder="Pilih tabungan" onChange={handleTabunganChange} size="lg" isInvalid={!!errors.tabungan} selected={selectedTabungan ? [selectedTabungan] : []} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.tabungan}
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