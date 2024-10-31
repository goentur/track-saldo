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

function Pulsa({ toko, onProcessingDone }) {
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [tabungans, setTabungan] = useState([]);
    const [pakets, setPaket] = useState([]);

    useEffect(() => {
        if (toko != '') {
            getData()
        }
    }, [toko]);
    const getData = async () => {
        try {
            const responsePulsa = await axios.post(route('master.paket.pulsa.by-toko'), { toko: toko });
            setPaket(responsePulsa.data);
            const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: toko });
            setTabungan(responseTabungan.data);
        } catch (error) {
            toast.error(error);
        }
    }
    function setHargaJualDariPaket(id){
        const paket = pakets.find(paket => paket.id === id);
        if(paket){
            formik.setFieldValue("hargaJual", paket.nominalHarga)
        }
    }
    const formik = useFormik({
        initialValues: {
            toko: toko,
            hargaJual: null,
            tabungan: null,
            hargaBeli: null,
            keterangan: null,
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axios.post(route('transaksi.penjualan.pulsa.simpan'), values);
                toast.success(response.data.message);
                onProcessingDone()
            } catch (error) {
                toast.error(error.response.data.message)
            }finally{
                setLoading(false)
            }
        },
        validationSchema : yup.object().shape({
            hargaJual: yup.number().required("Harga jual is a required field"),
            tabungan: yup.string().uuid().required(),
            hargaBeli: yup.number().required("Harga beli is a required field"),
            keterangan: yup.string().nullable(true),
        })
    });
    return (
        <Form onSubmit={formik.handleSubmit} >
            <div className="row">
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormPaketPulsa">
                    <Form.Label>PAKET PULSA</Form.Label>
                    <Typeahead
                        id="paketPulsa"
                        size="lg"
                        name="paketPulsa"
                        placeholder="Pilih paket pulsa"
                        required
                        labelKey={(pakets) => `${pakets.nama} | ${pakets.harga}`}
                        options={pakets}
                        onChange={(selected) => setHargaJualDariPaket(selected.length > 0 ? selected[0].id : '')}
                        maxResults={7}
                        autoFocus
                    />
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih paket pulsa apabila anda ingin harga jual muncul secara otomatis.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="hargaJual">
                    <Form.Label>HARGA JUAL <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="hargaJual"
                        name="hargaJual"
                        placeholder="Masukan harga jual"
                        prefix="Rp "
                        value={formik.values.hargaJual}
                        required
                        className={`form-control form-control-lg text-end ${formik.touched.hargaJual && formik.errors.hargaJual && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("hargaJual", values)}
                    />
                    {formik.touched.hargaJual && formik.errors.hargaJual && <div className="text-end invalid-feedback">{formik.errors.hargaJual}</div>}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormTabungan">
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
                <Form.Group className="mb-3 col-lg-3" controlId="hargaBeli">
                    <Form.Label>HARGA BELI <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="hargaBeli"
                        name="hargaBeli"
                        placeholder="Masukan harga beli"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${formik.touched.hargaBeli && formik.errors.hargaBeli && 'is-invalid'}`}
                        onValueChange={(values) => formik.setFieldValue("hargaBeli", values)}
                        disabled={!formik.values.tabungan}
                    />
                    {formik.touched.hargaBeli && formik.errors.hargaBeli && <div className="text-end invalid-feedback">{formik.errors.hargaBeli}</div>}
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

export default Pulsa;
