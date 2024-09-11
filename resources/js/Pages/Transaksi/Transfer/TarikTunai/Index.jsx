import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
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
        anggota: null,
        tabunganYangDigunakan: null,
        nominalBiayaYangDigunakan: null,
        tabunganBiayaAdmin: null,
        nominalBiayaAdmin: null
    });
    const [anggotas, setAnggota] = useState([]);
    const [tabungans, setTabungan] = useState([]);

    const handleTokoChange = async (selected) => {
        if (selected.length > 0) {
            const tokoId = selected[0].id;
            setData({
                "toko" : tokoId,
                "anggota" : null,
                "tabunganYangDigunakan" : null,
                "nominalBiayaYangDigunakan" : data.nominalBiayaYangDigunakan,
                "tabunganBiayaAdmin" : null,
                "nominalBiayaAdmin" : data.nominalBiayaAdmin,
            });
            try {
                const responseAnggota = await axios.post(route('master.anggota.data-by-toko'), { toko: tokoId });
                setAnggota(responseAnggota.data);
                const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: tokoId });
                setTabungan(responseTabungan.data);
            } catch (error) {
                toast.error(error);
            }
        }
    };

    function submit(e) {
        e.preventDefault();
        post(route("transaksi.transfer.tarik-tunai.simpan"));
    }
    return (
        <Layout>
            <Head title="TARIK TUNAI" />
            <Form onSubmit={submit} className="card">
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faMoneyBill1Wave} /> TARIK TUNAI</h1>
                    <Link href={route('transaksi.menu')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faArrowLeft} /> KEMBALI KE MENU</Link>
                </CardHeader>
                <CardBody>
                    <div className="alert alert-info p-0 pt-3">
                        <ul>
                            <li>Form <b>ANGGOTA</b> bisa dikosongi apabila pelanggan tidak kenal/mengenali.</li>
                        </ul>
                    </div>
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
                        <Form.Group className="mb-3 col-lg-8" controlId="validationFormAnggota">
                            <Form.Label>ANGGOTA</Form.Label>
                            <Typeahead
                                id="anggota"
                                name="anggota"
                                placeholder="Pilih anggota"
                                size="lg"
                                required
                                labelKey={(anggotas) => `${anggotas.nama} | ${anggotas.alamat}`}
                                options={anggotas}
                                onChange={(selected) => setData('anggota', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.anggota}
                                disabled={anggotas.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.anggota}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-4" controlId="validationFormTabunganYangDigunakan">
                            <Form.Label>TABUNGAN YANG DIGUNAKAN <span className="text-danger">*</span></Form.Label>
                            <Typeahead
                                id="tabunganYangDigunakan"
                                name="tabunganYangDigunakan"
                                placeholder="Pilih tabungan yang digunakan"
                                size="lg"
                                required
                                labelKey={(tabungans) => `${tabungans.merek.nama} ( ${tabungans.no} )`}
                                options={tabungans}
                                onChange={(selected) => setData('tabunganYangDigunakan', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.tabunganYangDigunakan}
                                disabled={tabungans.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tabunganYangDigunakan}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-8" controlId="validationFormNominalBiayaYangDigunakan">
                            <Form.Label>BIAYA YANG DIGUNAKAN <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput
                                id="nominalBiayaYangDigunakan"
                                name="nominalBiayaYangDigunakan"
                                placeholder="Masukan nominal biaya yang digunakan"
                                prefix="Rp "
                                required
                                className={`form-control form-control-lg text-end ${errors.nominalBiayaYangDigunakan && 'is-invalid'}`}
                                onValueChange={(values) => setData("nominalBiayaYangDigunakan", values)}
                            />
                            {errors.nominalBiayaYangDigunakan && <div className="text-end invalid-feedback">{errors.nominalBiayaYangDigunakan}</div>}
                        </Form.Group>
                    </div>
                    <div className="alert alert-info p-0 pt-3">
                        <ul>
                            <b>INFORMASI BIAYA ADMIN</b>
                            <li>Form <b>TABUNGAN BIAYA ADMIN</b> <b>bisa</b> dikosongi apabila pelanggan membayar biaya admin menggunakan uang tunai.</li>
                            <li>Form <b>TABUNGAN BIAYA ADMIN</b> dipilih apabila pelanggan membayar biaya admin <b>bukan</b> menggunakan uang tunai.</li>
                        </ul>
                    </div>
                    <div className="row">
                        <Form.Group className="mb-3 col-lg-4" controlId="validationFormTabunganBiayaAdmin">
                            <Form.Label>TABUNGAN BIAYA ADMIN</Form.Label>
                            <Typeahead
                                id="tabunganBiayaAdmin"
                                name="tabunganBiayaAdmin"
                                placeholder="Pilih tabungan biaya admin"
                                size="lg"
                                required
                                labelKey={(tabungans) => `${tabungans.merek.nama} ( ${tabungans.no} )`}
                                options={tabungans}
                                onChange={(selected) => setData('tabunganBiayaAdmin', selected.length > 0 ? selected[0].id : '')}
                                isInvalid={!!errors.tabunganBiayaAdmin}
                                disabled={tabungans.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tabunganBiayaAdmin}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-8" controlId="validationFormBiayaAdmin">
                            <Form.Label>BIAYA ADMIN <span className="text-danger">*</span></Form.Label>
                            <CurrencyInput
                                id="nominalBiayaAdmin"
                                name="nominalBiayaAdmin"
                                placeholder="Masukan nominal biaya admin"
                                prefix="Rp "
                                required
                                className={`form-control form-control-lg text-end ${errors.nominal && 'is-invalid'}`}
                                onValueChange={(values) => setData("nominalBiayaAdmin", values)}
                            />
                            {errors.nominalBiayaAdmin && <div className="text-end invalid-feedback">{errors.nominalBiayaAdmin}</div>}
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
