import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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

function PenghasilanLain({ toko, anggotas, onProcessingDone }) {
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
            nominal: null,
            anggota: null,
            tabungan: null,
            biayaTransfer: null,
            keterangan: null,
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axios.post(route('transaksi.transfer.penghasilan-lain.simpan'), values);
                toast.success(response.data.message);
                onProcessingDone()
            } catch (error) {
                toast.error(error.response.data.message)
            }finally{
                setLoading(false)
            }
        },
        validationSchema : yup.object().shape({
            nominal: yup.number().required(),
            anggota: yup.string().uuid().nullable(true),
            tabungan: yup.string().uuid().nullable(true),
            biayaTransfer: yup.number().nullable(true),
            keterangan: yup.string().nullable(true),
        })
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="row">
                <Form.Group className="mb-2 col-lg-6" controlId="validationFormNominal">
                    <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        autoFocus
                        id="nominal"
                        name="nominal"
                        placeholder="Masukan nominal"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${formik.touched.nominal && formik.errors.nominal && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("nominal", values)}
                    />
                    {formik.touched.nominal && formik.errors.nominal && <div className="text-end invalid-feedback">{formik.errors.nominal}</div>}
                </Form.Group>
                <Form.Group className="mb-2 col-lg-6" controlId="validationFormAnggota">
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
                </Form.Group>
                <Form.Group className="mb-2 col-lg-6" controlId="validationFormTabungan">
                    <Form.Label>TABUNGAN</Form.Label>
                    <Typeahead
                        id="tabungan"
                        size="lg"
                        name="tabungan"
                        placeholder="Pilih tabungan"
                        required
                        labelKey={(tabungans) => `${tabungans.merek.nama} | ${tabungans.no}`}
                        options={tabungans}
                        onChange={(selected) => formik.setFieldValue('tabungan', selected.length > 0 ? selected[0].id : '')}
                        isInvalid={Boolean(formik.touched.tabungan && formik.errors.tabungan)}
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.tabungan && formik.errors.tabungan}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2 col-lg-6" controlId="validationFormBiayaTransfer">
                    <Form.Label>BIAYA TRANSFER</Form.Label>
                    <CurrencyInput
                        id="biayaTransfer"
                        name="biayaTransfer"
                        placeholder="Masukan biaya transfer"
                        prefix="Rp "
                        className={`form-control form-control-lg text-end ${formik.touched.biayaTransfer && formik.errors.biayaTransfer && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("biayaTransfer", values)}
                        disabled={!formik.values.tabungan}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.biayaTransfer && formik.errors.biayaTransfer}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan nominal apabila ada biaya transfer.</Form.Label>
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
        </Form>
    );
}

export default PenghasilanLain;
