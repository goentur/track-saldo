import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";

function FormPinjam({ toko, anggotas, tabungans, onProcessingDone }) {
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            toko: toko,
            anggota: null,
            tabungan: null,
            nominal: null,
            keterangan: null,
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axios.post(route('transaksi.transfer.pinjam.pinjam'), values);
                toast.success(response.data.message);
                onProcessingDone()
            } catch (error) {
                toast.error(error.response.data.message)
            }finally{
                setLoading(false)
            }
        },
        validationSchema : yup.object().shape({
            anggota: yup.string().uuid().required(),
            tabungan: yup.string().uuid().required(),
            nominal: yup.number().required(),
            keterangan: yup.string().nullable(true),
        })
    });
    return (<>
        <span className="fs-5">FORM PINJAM DANA</span>
        <p className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Form ini digunakan untuk meminjam dana dari anggota.</p>
        <hr className="m-0 p-0 mb-3" />
        <Form onSubmit={formik.handleSubmit} >
            <div className="row">
                <Form.Group className="mb-2 col-lg-6" controlId="validationFormAnggota">
                    <Form.Label>ANGGOTA <span className="text-danger">*</span></Form.Label>
                    <Typeahead
                        id="anggota"
                        size="lg"
                        name="anggota"
                        placeholder="Pilih anggota"
                        required
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
                    <Form.Label>TABUNGAN <span className="text-danger">*</span></Form.Label>
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
                <Form.Group className="mb-2 col-lg-12" controlId="validationFormNominal">
                    <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="nominal"
                        name="nominal"
                        placeholder="Masukan nominal"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${formik.touched.nominal && formik.errors.nominal && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("nominal", values)}
                        disabled={!formik.values.tabungan}
                    />
                    {formik.touched.nominal && formik.errors.nominal && <div className="text-end invalid-feedback">{formik.errors.nominal}</div>}
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
    </>);
}

export default FormPinjam;
