import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";

function Setor({ toko, anggotas, tabungans, onProcessingDone, showModalAnggota }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: toko,
        anggota: null,
        nominalInvestasi: null,
        tabunganYangDigunakan: null,
        keterangan: null,
    });

    function submit(e) {
        e.preventDefault();
        if(data.nominalInvestasi >= 10000000){
            post(route("transaksi.transfer.investasi.setor"),{
                onSuccess: () => {
                    onProcessingDone();
                },
                onError: (e) => {
                    toast.error(e)
                },
            });
        }else{
            toast.error("Setoran minimal Rp. 10.000.000");
        }
    }
    return (
        <Form onSubmit={submit}>
            <div className="row">
                <Form.Group className="mb-2 col-lg-4" controlId="validationFormAnggota">
                    <Form.Label>ANGGOTA  <span className="text-danger">*</span></Form.Label>
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
                            maxResults={7}
                            disabled={anggotas.length === 0}
                        />
                        <Button variant="primary" type="button" className="align-item-end" onClick={showModalAnggota}><FontAwesomeIcon icon={faPlus} /></Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                        {errors.anggota}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2 col-lg-4" controlId="validationFormNominalInvestasi">
                    <Form.Label>NOMINAL INVESTASI <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="nominalInvestasi"
                        name="nominalInvestasi"
                        placeholder="Masukan nominal investasi"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${errors.nominalInvestasi && 'is-invalid'}`}
                        onValueChange={(values) => setData("nominalInvestasi", values)}
                    />
                    {errors.nominalInvestasi && <div className="text-end invalid-feedback">{errors.nominalInvestasi}</div>}
                </Form.Group>
                <Form.Group className="mb-2 col-lg-4" controlId="validationFormTabunganYangDigunakan">
                    <Form.Label>TABUNGAN YANG DIGUNAKAN</Form.Label>
                    <Typeahead
                        id="tabunganYangDigunakan"
                        name="tabunganYangDigunakan"
                        placeholder="Pilih tabungan yang digunakan"
                        size="lg"
                        labelKey={(tabungans) => `${tabungans.merek.nama} ( ${tabungans.no} )`}
                        options={tabungans}
                        onChange={(selected) => setData('tabunganYangDigunakan', selected.length > 0 ? selected[0].id : '')}
                        isInvalid={!!errors.tabunganYangDigunakan}
                        maxResults={7}
                        disabled={tabungans.length === 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.tabunganYangDigunakan}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Pilih apabila menggunakan selain tunai.</Form.Label>
                </Form.Group>
                <Form.Group className="mb-2 col-lg-12" controlId="validationFormKeterangan">
                    <Form.Label>KETERANGAN</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Masukan keterangan"
                        aria-describedby="inputGroupPrepend"
                        name="keterangan"
                        onChange={(e)=> setData("keterangan", e.target.value)}
                        isInvalid={!!errors.keterangan}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.keterangan}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan keterangan apabila ada catatan yang perlu disimpan.</Form.Label>
                </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
        </Form>
    );
}

export default Setor;
