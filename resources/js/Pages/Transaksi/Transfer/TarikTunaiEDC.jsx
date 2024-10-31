import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { useRoute } from "../../../../../vendor/tightenco/ziggy";

function TarikTunaiEDC({ toko, anggotas, onProcessingDone, showModalAnggota }) {
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [tabungans, setTabungan] = useState([]);

    useEffect(() => {
        if (toko != '') {
            getData()
        }
    }, [toko]);
    const getData = async () => {
        try {
            const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: toko });
            setTabungan(responseTabungan.data);
        } catch (error) {
            toast.error(error);
        }
    }
    const formik = useFormik({
        initialValues: {
            toko: toko,
            nominalBiayaYangDigunakan: null,
            tabunganYangDigunakan: null,
            anggota: null,
            tabunganBiayaAdmin: null,
            nominalBiayaAdmin: null,
            keterangan: null,
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axios.post(route('transaksi.transfer.tarik-tunai-edc.simpan'), values);
                toast.success(response.data.message);
                onProcessingDone()
            } catch (error) {
                toast.error(error.response.data.message)
            }finally{
                setLoading(false)
            }
        },
        validationSchema : yup.object().shape({
            nominalBiayaYangDigunakan: yup.number().required("Nominal biaya yang digunakan is a required field"),
            tabunganYangDigunakan: yup.string().uuid().required("Tabungan yang digunakan is a required field"),
            anggota: yup.string().uuid().nullable(true),
            tabunganBiayaAdmin: yup.string().uuid().nullable(true),
            nominalBiayaAdmin: yup.number().required("Nominal biaya admin is a required field"),
            keterangan: yup.string().nullable(true),
        })
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="row">
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormNominalBiayaYangDigunakan">
                    <Form.Label>BIAYA YANG DIGUNAKAN <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="nominalBiayaYangDigunakan"
                        name="nominalBiayaYangDigunakan"
                        placeholder="Masukan nominal biaya yang digunakan"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${formik.touched.nominalBiayaYangDigunakan && formik.errors.nominalBiayaYangDigunakan && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("nominalBiayaYangDigunakan", values)}
                        autoFocus
                    />
                    {formik.touched.nominalBiayaYangDigunakan && formik.errors.nominalBiayaYangDigunakan && <div className="text-end invalid-feedback">{formik.errors.nominalBiayaYangDigunakan}</div>}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormTabunganYangDigunakan">
                    <Form.Label>TABUNGAN YANG DIGUNAKAN <span className="text-danger">*</span></Form.Label>
                    <Typeahead
                        id="tabunganYangDigunakan"
                        size="lg"
                        name="tabunganYangDigunakan"
                        placeholder="Pilih tabungan yang digunakan"
                        required
                        labelKey={(tabungans) => `${tabungans.merek.nama} | ${tabungans.no}`}
                        options={tabungans}
                        onChange={(selected) => formik.setFieldValue('tabunganYangDigunakan', selected.length > 0 ? selected[0].id : '')}
                        isInvalid={Boolean(formik.touched.tabunganYangDigunakan && formik.errors.tabunganYangDigunakan)}
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.tabunganYangDigunakan && formik.errors.tabunganYangDigunakan}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormAnggota">
                    <Form.Label>ANGGOTA</Form.Label>
                    <Typeahead
                        id="anggota"
                        size="lg"
                        name="anggota"
                        placeholder="Pilih anggota"
                        labelKey={(anggotas) => `${anggotas.nama} | ${anggotas.alamat}`}
                        options={anggotas}
                        onChange={(selected) => formik.setFieldValue('anggota', selected.length > 0 ? selected[0].id : '')}
                        isInvalid={Boolean(formik.touched.anggota && formik.errors.anggota)}
                        maxResults={7}
                        disabled={anggotas.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.anggota && formik.errors.anggota}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih apabila pelanggan terdaftar sebagai anggota.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormTabunganBiayaAdmin">
                    <Form.Label>TABUNGAN BIAYA ADMIN</Form.Label>
                    <Typeahead
                        id="tabunganBiayaAdmin"
                        size="lg"
                        name="tabunganBiayaAdmin"
                        placeholder="Pilih tabungan biaya admin"
                        required
                        labelKey={(tabungans) => `${tabungans.merek.nama} | ${tabungans.no}`}
                        options={tabungans}
                        onChange={(selected) => formik.setFieldValue('tabunganBiayaAdmin', selected.length > 0 ? selected[0].id : '')}
                        isInvalid={Boolean(formik.touched.tabunganBiayaAdmin && formik.errors.tabunganBiayaAdmin)}
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.tabunganBiayaAdmin && formik.errors.tabunganBiayaAdmin}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih apabila menggunakan selain tunai.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-8" controlId="validationFormBiayaAdmin">
                    <Form.Label>BIAYA ADMIN <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="nominalBiayaAdmin"
                        name="nominalBiayaAdmin"
                        placeholder="Masukan nominal biaya admin"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${formik.touched.nominalBiayaAdmin && formik.errors.nominalBiayaAdmin && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("nominalBiayaAdmin", values)}
                    />
                    {formik.touched.nominalBiayaAdmin && formik.errors.nominalBiayaAdmin && <div className="text-end invalid-feedback">{formik.errors.nominalBiayaAdmin}</div>}
                </Form.Group>
                <Form.Group className="mb-2 col-lg-12" controlId="validationFormKeterangan">
                    <Form.Label>KETERANGAN</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Masukan keterangan"
                        aria-describedby="inputGroupPrepend"
                        name="keterangan"
                        onChange={(e)=> formik.setFieldValue("keterangan", e.target.value)}
                        isInvalid={Boolean(formik.touched.keterangan && formik.errors.keterangan)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.keterangan && formik.errors.keterangan}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan keterangan apabila ada catatan yang perlu disimpan.</Form.Label>
                </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="align-item-end" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
            <Button variant="success" type="button" className="ms-3 align-item-end" onClick={showModalAnggota}><FontAwesomeIcon icon={faPlus} /> ANGGOTA</Button>
        </Form>
    );
}

export default TarikTunaiEDC;
