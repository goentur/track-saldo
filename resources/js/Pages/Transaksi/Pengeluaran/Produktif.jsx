import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faHistory, faInfoCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import DatePicker from "react-datepicker";
import { addDays, format } from "date-fns";

function Produktif({ toko, tanggalTransaksi, onProcessingDone }) {
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [tabungans, setTabungan] = useState([]);
    const [dataProduktif, setDataProduktif] = useState(null);
    const [loadingCari, setLoadingCari] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    useEffect(() => {
        if (toko != '') {
            getData()
            getDataProduktif()
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
    const getDataProduktif = async () => {
        setLoadingCari(true);
        try {
            const response = await axios.post(route('transaksi.pengeluaran.produktif.data'), { 
                toko : toko,
                tanggal : dateRange[0]?format(dateRange[0],'dd-MM-yyyy') + ' - ' + format(dateRange[1],'dd-MM-yyyy'):tanggalTransaksi,
            });
            setDataProduktif(response.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoadingCari(false)
        }
    }
    const formik = useFormik({
        initialValues: {
            toko: toko,
            nominal: null,
            tabungan: null,
            biayaTransfer: null,
            keterangan: null,
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axios.post(route('transaksi.pengeluaran.produktif.simpan'), values);
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
            tabungan: yup.string().uuid().nullable(true),
            biayaTransfer: yup.number().nullable(true),
            keterangan: yup.string().nullable(true),
        })
    });
    return (<>
        <Form onSubmit={formik.handleSubmit}>
            <div className="row">
                <Form.Group className="mb-2 col-lg-4" controlId="validationFormNominal">
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
                <Form.Group className="mb-2 col-lg-4" controlId="validationFormTabungan">
                    <Form.Label>TABUNGAN</Form.Label>
                    <Typeahead
                        id="tabungan"
                        size="lg"
                        name="tabungan"
                        placeholder="Pilih tabungan"
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
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih apabila menggunakan selain tunai.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-2 col-lg-4" controlId="validationFormBiayaTranfer">
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
        <hr className="mb-3" />
        <div className="text-center">
            <span className="fs-4"><FontAwesomeIcon icon={faHistory}/> RIWAYAT PENGELUARAN PRODUKTIF</span>
            <br />
            <span className="fs-6">{loadingCari?'..':dataProduktif?.tanggalAwal ?? '-'} S.D {loadingCari?'..':dataProduktif?.tanggalAkhir ?? '-'}</span>
        </div>

        <div className="row">
            <div className="col-lg-6">
                <Form onSubmit={(e) => {e.preventDefault(); getDataProduktif()}} className="row mb-2">
                    <div className="row col-lg-8">
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            maxDate={addDays(new Date(), 0)}
                            locale="id"
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                            placeholderText="Pilih tanggal transaksi"
                            required
                        />
                    </div>
                    <div className="col-lg-2">
                        <Button type="submit" disabled={loadingCari}>{loadingCari?<Spinner size="sm"/> : <FontAwesomeIcon icon={faSearch}/>} CARI</Button>
                    </div>
                </Form>
            </div>
            <div className="col-lg-6 text-end fs-4">
                <b>TOTAL : </b>Rp { dataProduktif?.total ?? 0}
            </div>
        </div>
        <Table bordered hover size="sm" className="f-14">
            <thead>
                <tr>
                    <th className="w-1 text-center">NO</th>
                    <th className="w-6">PENGGUNA</th>
                    <th className="w-6">TANGGAL</th>
                    <th>KETERANGAN</th>
                    <th className="w-7 text-end">NOMINAL</th>
                </tr>
            </thead>
                <tbody>
                    {loadingCari?(
                        <tr>
                            <td colSpan={5} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                        </tr>
                    ): null}
                    {dataProduktif !== null ? dataProduktif.data.map((value,index) => (
                    <tr key={index}>
                        <td className="text-center">{value.no}.</td>
                        <td className="top">{ value.pengguna }</td>
                        <td className="top">{ value.tanggal }</td>
                        <td className="top">{ value.keterangan }</td>
                        <td className="top text-end">Rp { value.total }</td>
                    </tr>
                    )):
                    <tr>
                        <td colSpan={5} className="text-center">Data Belum ada</td>
                    </tr>
                    }
                </tbody>
        </Table>
    </>);
}

export default Produktif;
