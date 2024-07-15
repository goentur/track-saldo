import Layout from "../../../../Layouts/Layout";
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity";
import { Button, CardBody, CardFooter, CardHeader, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Menu({ anggotas }){
    const route = useRoute();
    const formAnggootaLabel = (anggotas) => `${anggotas.toko.nama} | ${anggotas.nama} | ${anggotas.alamat}`;
    const { data, setData, post, errors, processing } = useForm({
        anggota: "",
        nama: "",
    })
    const handleAnggotaChange = (selected) => {
        if (selected.length > 0) {
            setData('anggota', selected[0].id);
        }
    };
    function submit(e) {
        e.preventDefault()
        post(route("via-atm-nasabah.simpan"))
    }
    return (
    <Layout>
        <Head title="TRANSFER VIA ATM NASABAH"/>
        <Form onSubmit={submit} className="card">
            <CardHeader className="d-flex justify-content-between align-items-center">
                <h1><FontAwesomeIcon icon={faUniversity}/> TRANSFER VIA ATM NASABAH</h1>
                <Link href={route('merek.index')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft}/> KEMBALI KE MENU</Link>
            </CardHeader>
            <CardBody className="row">
                <Form.Group className="mb-3 col-lg-12" controlId="validationFormAnggota">
                    <Form.Label>Anggota</Form.Label>
                    <Typeahead id="anggota" labelKey={formAnggootaLabel} name="anggota" options={anggotas} placeholder="Pilih anggota" onChange={handleAnggotaChange} size="lg" isInvalid={!!errors.anggota} autoFocus required/>
                    <Form.Control.Feedback type="invalid">
                        {errors.anggota}
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="col-lg-12 text-center">
                    <h3>BIAYA ADMIN</h3>
                </div>
                <div className="col-lg-6">
                    <div className="text-center">
                        <h4>TRANFER KE TABUNGAN</h4>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="text-center">
                        <h4>TUNAI</h4>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FontAwesomeIcon icon={faSave}/> } SIMPAN</Button>
            </CardFooter>
        </Form>
    </Layout>
    )
}

export default Menu