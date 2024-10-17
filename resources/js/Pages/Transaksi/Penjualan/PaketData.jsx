import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";

function PaketData({ toko, onProcessingDone }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: toko,
        hargaJual: null,
        tabungan: null,
        hargaBeli: null,
    });
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
    function submit(e) {
        e.preventDefault();
        post(route("transaksi.penjualan.paket-data.simpan"),{
            onSuccess: () => {
                onProcessingDone();
            },
            onError: (e) => {
                toast.error(e)
            },
        });
    }
    return (
        <Form onSubmit={submit}>
            <div className="row">
                <Form.Group className="mb-3 col-lg-4" controlId="hargaBeli">
                    <Form.Label>HARGA BELI <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="hargaBeli"
                        name="hargaBeli"
                        placeholder="Masukan harga beli"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${errors.hargaBeli && 'is-invalid'}`}
                        onValueChange={(values) => setData("hargaBeli", values)}
                        autoFocus
                    />
                    {errors.hargaBeli && <div className="text-end invalid-feedback">{errors.hargaBeli}</div>}
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan harga beli dari provider atau penyedia layanan yang dipilih.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormtabungan">
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
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.tabungan}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="hargaJual">
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
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan harga jual kepada pelanggan.</Form.Label>
                </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
        </Form>
    );
}

export default PaketData;
