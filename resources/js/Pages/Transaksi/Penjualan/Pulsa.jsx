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

function Pulsa({ toko, onProcessingDone }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: toko,
        hargaJual: null,
        tabungan: null,
        hargaBeli: null,
    });
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
            setData("hargaJual", paket.nominalHarga)
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route("transaksi.penjualan.pulsa.simpan"),{
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
                        isInvalid={!!errors.paketPulsa}
                        maxResults={7}
                        autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.paketPulsa}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih paket pulsa apabila anda ingin harga jual muncul secara otomatis.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="hargaJual">
                    <Form.Label>HARGA JUAL <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="hargaJual"
                        name="hargaJual"
                        placeholder="Masukan harga jual"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${errors.hargaJual && 'is-invalid'}`}
                        value={data.hargaJual}
                        onValueChange={(values) => setData("hargaJual", values)}
                    />
                    {errors.hargaJual && <div className="text-end invalid-feedback">{errors.hargaJual}</div>}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormtabungan">
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
                <Form.Group className="mb-3 col-lg-3" controlId="hargaBeli">
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
            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
        </Form>
    );
}

export default Pulsa;
