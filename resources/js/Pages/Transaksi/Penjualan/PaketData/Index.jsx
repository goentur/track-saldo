import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from 'axios';
import { useState } from "react";
import { Button, CardBody, CardFooter, CardHeader, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";
import Layout from "../../../../Layouts/Layout";

function Index({ tokos }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: null,
        hargaJual: null,
        tabungan: null,
        hargaBeli: null,
    });
    const [tabungans, setTabungan] = useState([]);

    const handleTokoChange = async (selected) => {
        if (selected.length > 0) {
            const tokoId = selected[0].id;
            setData({
                "toko" : tokoId,
                "hargaJual" : null,
                "tabungan" : null,
                "hargaBeli" : data.hargaBeli,
            });
            try {
                const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: tokoId });
                setTabungan(responseTabungan.data);
            } catch (error) {
                toast.error(error);
            }
        }
    };

    function submit(e) {
        e.preventDefault();
        post(route("transaksi.penjualan.paket-data.simpan"));
    }
    return (
        <Layout>
            <Head title="PAKET DATA" />
            <Form onSubmit={submit} className="card">
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faGlobe} /> PAKET DATA</h1>
                    <Link href={route('transaksi.menu')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft} /> KEMBALI KE MENU</Link>
                </CardHeader>
                <CardBody>
                    <div className="alert alert-info p-0 pt-3">
                        <ul>
                            <b>INFORMASI</b>
                            <li><b>Harga jual</b> merupakan harga jual kepada pembeli.</li>
                            <li><b>Harga beli</b> merupakan harga beli pada tabungan.</li>
                        </ul>
                    </div>
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
                        <Form.Group className="mb-3 col-lg-6" controlId="hargaJual">
                            <Form.Label>HARGA JUAL <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput
                                id="hargaJual"
                                name="hargaJual"
                                placeholder="Masukan harga jual"
                                prefix="Rp "
                                required
                                className={`form-control form-control-lg text-end ${errors.hargaJual && 'is-invalid'}`}
                                onValueChange={(values) => setData("hargaJual", values)}
                            />
                            {errors.hargaJual && <div className="text-end invalid-feedback">{errors.hargaJual}</div>}
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
