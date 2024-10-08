import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
function Ubah({ zonaWaktu }) {
    const route = useRoute();
    const { data, setData, put, errors, processing } = useForm({
        nama: zonaWaktu.nama,
        singkatan: zonaWaktu.singkatan,
        gmt_offset: zonaWaktu.gmt_offset,
    })
    function submit(e) {
        e.preventDefault()
        put(route("master.zona-waktu.update",zonaWaktu))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - ZONA WAKTU"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faClipboard}/> ZONA WAKTU</CardTitle>
                    <Link href={route('master.zona-waktu.index')} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>NAMA <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-3" controlId="validationFormSingkatan">
                            <Form.Label>SINGKATAN <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan singkatan" aria-describedby="inputGroupPrepend" name="singkatan" value={data.singkatan} onChange={(e) => setData("singkatan", e.target.value)} isInvalid={!!errors.singkatan} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.singkatan}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-3" controlId="validationFormGMTOffset">
                            <Form.Label>GMT OFFSET <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput id="gmt_offset" name="gmt_offset" placeholder="Masukan gmt offset" className={`form-control form-control-lg ${errors.gmt_offset && 'is-invalid'}`} value={data.gmt_offset} disableGroupSeparators={true} onValueChange={(values) => setData("gmt_offset", values)} required />
                            {errors.gmt_offset && <div className="invalid-feedback">{errors.gmt_offset}</div>}
                            <a href="https://www.epochconverter.com/timezones" target="_blank" className="text-secondary"><FontAwesomeIcon icon={faShare}/> Referensi GMT Offset</a>
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