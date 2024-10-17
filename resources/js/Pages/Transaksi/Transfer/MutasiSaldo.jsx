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

function MutasiSaldo({ toko, onProcessingDone }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: toko,
        tabunganDari: null,
        tabunganKe: null,
        nominal: null,
        biayaTransfer: null,
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
        post(route("transaksi.transfer.mutasi-saldo.simpan"),{
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
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormNominal">
                    <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        autoFocus
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
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormTabunganDari">
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
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.tabunganDari}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormTabunganKe">
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
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.tabunganKe}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormBiayaTranfer">
                    <Form.Label>BIAYA TRANSFER</Form.Label>
                    <CurrencyInput
                        id="biayaTransfer"
                        name="biayaTransfer"
                        placeholder="Masukan biaya transfer"
                        prefix="Rp "
                        className={`form-control form-control-lg text-end ${errors.biayaTransfer && 'is-invalid'}`}
                        onValueChange={(values) => setData("biayaTransfer", values)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.biayaTransfer}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan nominal apabila ada biaya transfer.</Form.Label>
                </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
        </Form>
    );
}

export default MutasiSaldo;
