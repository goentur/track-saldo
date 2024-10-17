import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";

function ViaATMNasabah({ toko, anggotas, onProcessingDone, showModalAnggota }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: toko,
        anggota: null,
        tabunganBiayaAdmin: null,
        nominalBiayaAdmin: null
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
        post(route("transaksi.transfer.via-atm-nasabah.simpan"),{
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
                <Form.Group className="mb-3 col-lg-5" controlId="validationFormAnggota">
                    <Form.Label>ANGGOTA</Form.Label>
                    <InputGroup>
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
                            autoFocus
                            maxResults={7}
                            disabled={anggotas.length === 0}
                        />
                        <Button variant="primary" type="button" className="align-item-end" onClick={showModalAnggota}><FontAwesomeIcon icon={faPlus} /> ANGGOTA</Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                        {errors.anggota}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih apabila pelanggan terdaftar sebagai anggota.</Form.Label>
                </Form.Group>
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
                        maxResults={5}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.tabunganBiayaAdmin}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih apabila menggunakan selain tunai.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="validationFormBiayaAdmin">
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
            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
        </Form>
    );
}

export default ViaATMNasabah;
