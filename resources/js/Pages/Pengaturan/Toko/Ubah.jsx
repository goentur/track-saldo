import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Spinner } from "react-bootstrap";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
function Ubah({ toko }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        id: toko.id,
        nama: toko.nama,
        alamat: toko.alamat,
        logo: "",
    })
    
    function submit(e) {
        e.preventDefault()
        post(route("pengaturan.toko.update"),{
            forceFormData: true,
        })
    }
    return (
        <>
        <Layout>
            <Head title="TOKO"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faStoreAlt}/> TOKO </CardTitle>
                    <Link href={route('pengaturan.index')} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-4" controlId="validationFormNama">
                            <Form.Label>NAMA <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-5" controlId="validationFormAlamat">
                            <Form.Label>ALAMAT <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan alamat" aria-describedby="inputGroupPrepend" name="alamat" value={data.alamat} onChange={(e) => setData("alamat", e.target.value)} isInvalid={!!errors.alamat} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.alamat}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="col-lg-3">
                            <Form.Label>LOGO</Form.Label>
                            <br className="m-0 p-0" />
                            <input type="file" onChange={e => setData('logo', e.target.files[0])} />
                            <br className="m-0 p-0" />
                            <Form.Label className="text-info f-12">Extension : png, jpg, jpeg, dan webp (max : 256 Kb)</Form.Label>
                            {errors.logo && <span className="text-danger f-14">{errors.logo}</span>}
                        </div>
                        <div className="col-lg-8">
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