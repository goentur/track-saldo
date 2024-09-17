import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
function Tambah({tabungans}) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: null,
        tabungan: null,
    })
    const handleTabunganChange = (selected) => {
        if (selected.length > 0) {
            setData({
                'toko' : selected[0].toko_id,
                'tabungan' : selected[0].id,
            });
        }
    };
    function submit(e) {
        e.preventDefault()
        post(route("pengaturan.tunai.simpan"))
    }
    return (
        <>
        <Layout>
            <Head title="TAMBAH - PENGATURAN TUNAI"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faClipboard}/> TUNAI</CardTitle>
                    <Link href={route('pengaturan.index')} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI</Link>
                </CardHeader>
                <CardBody>
                    <div className="alert alert-info">
                        <p>INFORMASI</p>
                        <ul>
                            <li>Pilihlah tabungan yang akan dijadikan sebagai uang tunai.</li>
                            <li>Pilihlah pada masing-masing toko</li>
                        </ul>
                    </div>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-12" controlId="validationFormTabungan">
                            <Form.Label>TABUNGAN <span className="text-danger">*</span></Form.Label>
                            <Typeahead id="tabungan" labelKey={(tabungans) => `${tabungans.toko.nama} | ${tabungans.merek.nama} ( ${tabungans.no} )`} name="tabungan" options={tabungans} placeholder="Pilih tabungan" onChange={handleTabunganChange} size="lg" isInvalid={!!errors.tabungan} autoFocus required/>
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

export default Tambah