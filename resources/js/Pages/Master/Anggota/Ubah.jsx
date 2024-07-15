import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import { Button, Card, CardBody, CardHeader, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSave } from "@fortawesome/free-regular-svg-icons";
import Layout from "../../../Layouts/Layout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect, useState } from "react";
function Ubah({ tokos, anggota }) {
    const route = useRoute();
    const formTokoLabel = (tokos) => `${tokos.nama} | ${tokos.alamat}`;
    const { data, setData, put, errors, processing } = useForm({
        toko: anggota.toko_id,
        nama: anggota.nama,
        telp: anggota.telp,
        alamat: anggota.alamat,
    })
    
    const [selectedToko, setSelectedToko] = useState(null); // Menggunakan null untuk mengizinkan Typeahead kosong jika perlu

    useEffect(() => {
        const selected = tokos.find(toko => toko.id === anggota.toko_id);
        setSelectedToko(selected || null); // Mengatur null jika tidak ada yang dipilih
    }, [tokos, anggota.toko_id]);

    const handleTokoChange = (selected) => {
        setSelectedToko(selected[0] || null); // Mengambil elemen pertama dari array selected atau null jika tidak ada yang dipilih
        setData('toko', selected.length > 0 ? selected[0].id : null); // Mengatur ID toko atau null jika tidak ada yang dipilih
    };
    function submit(e) {
        e.preventDefault()
        put(route("anggota.update",anggota))
    }
    return (
        <>
        <Layout>
            <Head title="UBAH - ANGGOTA"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faClipboard}/> FORM ANGGOTA</h1>
                    <Link href={route('anggota.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE DATA</Link>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submit} className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>Toko</Form.Label>
                            <Typeahead id="toko" labelKey={formTokoLabel} name="toko" options={tokos} placeholder="Pilih toko" onChange={handleTokoChange} size="lg" isInvalid={!!errors.toko} selected={selectedToko ? [selectedToko] : []} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={data.nama} onChange={(e) => setData("nama", e.target.value)} isInvalid={!!errors.nama} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.nama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormTelp">
                            <Form.Label>Telp</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Masukan telp" aria-describedby="inputGroupPrepend" name="telp" value={data.telp} onChange={(e) => setData("telp", e.target.value)} isInvalid={!!errors.telp} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.telp}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormAlamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as="textarea" size="lg" type="text" placeholder="Masukan alamat" aria-describedby="inputGroupPrepend" name="alamat" value={data.alamat} onChange={(e) => setData("alamat", e.target.value)} isInvalid={!!errors.alamat} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.alamat}
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