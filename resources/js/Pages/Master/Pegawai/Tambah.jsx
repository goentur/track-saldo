import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
function Tambah({zonaWaktus,tokos}) {
    const route = useRoute();
    const formZonaWaktuLabel = (zonaWaktus) => `${zonaWaktus.nama} | ${zonaWaktus.singkatan}`;
    const formTokoLabel = (tokos) => `${tokos.nama} | ${tokos.alamat}`;
    const { data, setData, post, errors, processing } = useForm({
        zonaWaktu: "",
        email: "",
        nama: "",
        password: "",
        password_confirmation: "",
        toko: "",
    })
    const handleZonaWaktuChange = (selected) => {
        if (selected.length > 0) {
            setData('zonaWaktu', selected[0].id);
        }
    };
    const handleTokoChange = (selected) => {
        if (selected.length > 0) {
            setData('toko', selected[0].id);
        }
    };
    function submit(e) {
        e.preventDefault()
        post(route("pegawai.store"))
    }
    return (
        <>
        <Layout>
            <Head title="TAMBAH - PEGAWAI"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM PEGAWAI</h1>
                    <Link href={route('pegawai.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE DATA</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-12" controlId="validationFormZonaWaktu">
                            <Form.Label>Zona Waktu</Form.Label>
                            <Typeahead id="zonaWaktu" labelKey={formZonaWaktuLabel} name="zonaWaktu" options={zonaWaktus} placeholder="Pilih zona waktu" onChange={handleZonaWaktuChange} size="lg" isInvalid={!!errors.zonaWaktu} autoFocus required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.zonaWaktu}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="lg" type="email" placeholder="Masukan email" aria-describedby="inputGroupPrepend" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} isInvalid={!!errors.email} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="Masukan password" aria-describedby="inputGroupPrepend" name="password" value={data.password} onChange={(e) => setData("password", e.target.value)} isInvalid={!!errors.password} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormConfirmasiPassword">
                            <Form.Label>Confirmasi Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="Confirmasi masukan password" aria-describedby="inputGroupPrepend" name="password_confirmation" value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} isInvalid={!!errors.password_confirmation} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.password_confirmation}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-12" controlId="validationFormToko">
                            <Form.Label>Toko</Form.Label>
                            <Typeahead id="toko" labelKey={formTokoLabel} name="toko" options={tokos} placeholder="Pilih toko" onChange={handleTokoChange} size="lg" isInvalid={!!errors.toko} required/>
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

export default Tambah