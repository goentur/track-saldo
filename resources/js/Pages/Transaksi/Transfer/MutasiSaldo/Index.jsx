import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
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
        tabunganDari: null,
        tabunganKe: null,
        nominal: null,
        biayaTransfer: false,
    });
    const [tabungans, setTabungan] = useState([]);
    const [nominalBiayaTransfer, setNominalBiayaTransfer] = useState([]);

    const handleTokoChange = async (selected) => {
        if (selected.length > 0) {
            const tokoId = selected[0].id;
            setData({
                "toko" : tokoId,
                "tabunganYangDigunakan" : null,
                "nominal" : data.nominal,
                "biayaTransfer" : data.biayaTransfer,
            });
            try {
                const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: tokoId });
                setTabungan(responseTabungan.data);
                const responseBiayaTransfer = await axios.post(route('pengaturan.biaya-transfer.data-by-toko'), { toko: tokoId });
                setNominalBiayaTransfer(responseBiayaTransfer.data.nominal);
            } catch (error) {
                toast.error(error);
            }
        }
    };

    function submit(e) {
        e.preventDefault();
        post(route("transaksi.transfer.mutasi-saldo.simpan"));
    }
    return (
        <Layout>
            <Head title="MUTASI SALDO" />
            <Form onSubmit={submit} className="card">
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faExchangeAlt} /> MUTASI SALDO</CardTitle>
                    <Link href={route('transaksi.menu')} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft} /> KEMBALI</Link>
                </CardHeader>
                <CardBody>
                    <div className="row">
                        <Form.Group className="mb-3 col-lg-4" controlId="validationFormToko">
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
                        <Form.Group className="mb-3 col-lg-8" controlId="validationFormNominal">
                            <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput
                                id="nominal"
                                name="nominal"
                                placeholder="Masukan nominal"
                                prefix="Rp "
                                required
                                className={`form-control form-control-lg text-end ${errors.nominal && 'is-invalid'}`}
                                onValueChange={(values) => setData("nominal", values)}
                            />
                            {errors.nominal && <div className="text-end invalid-feedback">{errors.nominal}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormTabunganDari">
                            <Form.Label>TABUNGAN DARI <span className="text-danger">*</span></Form.Label>
                            <Typeahead
                                id="tabunganDari"
                                size="lg"
                                name="tabunganDari"
                                placeholder="Pilih tabungan dari"
                                required
                                labelKey={(tabungans) => `${tabungans.merek.nama} | ${tabungans.no}`}
                                options={tabungans}
                                onChange={(selected) => setData('tabunganDari', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.tabunganDari}
                                disabled={tabungans.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tabunganDari}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormTabunganKe">
                            <Form.Label>TABUNGAN KE <span className="text-danger">*</span></Form.Label>
                            <Typeahead
                                id="tabunganKe"
                                size="lg"
                                name="tabunganKe"
                                placeholder="Pilih tabungan ke"
                                required
                                labelKey={(tabungans) => `${tabungans.merek.nama} | ${tabungans.no}`}
                                options={tabungans}
                                onChange={(selected) => setData('tabunganKe', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.tabunganKe}
                                disabled={tabungans.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tabunganKe}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="alert alert-info p-0 pt-3">
                        <ul>
                            <b>INFORMASI BIAYA TRANSFER</b>
                            <li>Centang saja pada form checkbox apabila <b>ada</b> biaya transfer / cas.</li>
                        </ul>
                    </div>
                    <div className="row">
                        <Form.Group className="mb-3" controlId="formBiayaTransfer">
                            <Form.Check type="checkbox" name="biayaTransfer" onChange={(e) => setData("biayaTransfer", data.biayaTransfer?false:true)} label={`BIAYA TRANSFER SEBESAR ${nominalBiayaTransfer}`} disabled={tabungans.length === 0} />
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
