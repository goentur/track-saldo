import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from 'axios';
import { useState } from "react";
import { Button, CardBody, CardFooter, CardHeader, CardTitle, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";
import Layout from "../../../../Layouts/Layout";

function Index({ tokos }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: null,
        paketPulsa: null,
        tabungan: null,
        hargaBeli: null,
    });
    const [tabungans, setTabungan] = useState([]);
    const [pakets, setPaket] = useState([]);

    const handleTokoChange = async (selected) => {
        if (selected.length > 0) {
            const tokoId = selected[0].id;
            setData({
                "toko" : tokoId,
                "paketPulsa" : null,
                "tabungan" : null,
                "hargaBeli" : data.hargaBeli,
            });
            try {
                const responsePulsa = await axios.post(route('master.paket.pulsa.by-toko'), { toko: tokoId });
                setPaket(responsePulsa.data);
                const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: tokoId });
                setTabungan(responseTabungan.data);
            } catch (error) {
                toast.error(error);
            }
        }
    };

    function submit(e) {
        e.preventDefault();
        post(route("transaksi.penjualan.pulsa.simpan"));
    }
    return (
        <Layout>
            <Head title="PULSA" />
            <Form onSubmit={submit} className="card">
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faPhoneAlt} /> PULSA</CardTitle>
                    <Link href={route('transaksi.menu')} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft} /> KEMBALI</Link>
                </CardHeader>
                <CardBody>
                    <div className="row">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormToko">
                            <Form.Label>TOKO <span className="text-danger">*</span></Form.Label>
                            <Typeahead
                                id="toko"
                                name="toko"
                                placeholder="Pilih toko"
                                size="lg"
                                autoFocus
                                required
                                labelKey={(tokos) => `${tokos.nama}`}
                                options={tokos}
                                onChange={handleTokoChange}
                                isInvalid={!!errors.toko}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.toko}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormPaketPulsa">
                            <Form.Label>PAKET PULSA <span className="text-danger">*</span></Form.Label>
                            <Typeahead
                                id="paketPulsa"
                                size="lg"
                                name="paketPulsa"
                                placeholder="Pilih paket pulsa"
                                required
                                labelKey={(pakets) => `${pakets.nama} | ${pakets.harga}`}
                                options={pakets}
                                onChange={(selected) => setData('paketPulsa', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.paketPulsa}
                                disabled={pakets.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.paketPulsa}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormtabungan">
                            <Form.Label>TABUNGAN <span className="text-danger">*</span></Form.Label>
                            <Typeahead
                                id="tabungan"
                                name="tabungan"
                                placeholder="Pilih tabungan"
                                size="lg"
                                required
                                labelKey={(tabungans) => `${tabungans.merek.nama} ( ${tabungans.no} )`}
                                options={tabungans}
                                onChange={(selected) => setData('tabungan', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.tabungan}
                                disabled={tabungans.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tabungan}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="hargaBeli">
                            <Form.Label>HARGA BELI <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput
                                id="hargaBeli"
                                name="hargaBeli"
                                placeholder="Masukan harga beli"
                                prefix="Rp "
                                required
                                className={`form-control form-control-lg text-end ${errors.hargaBeli && 'is-invalid'}`}
                                onValueChange={(values) => setData("hargaBeli", values)}
                            />
                            {errors.hargaBeli && <div className="text-end invalid-feedback">{errors.hargaBeli}</div>}
                        </Form.Group>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                        {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
                    </Button>
                </CardFooter>
            </Form>
        </Layout>
    );
}

export default Index;
