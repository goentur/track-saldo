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
    const { setData, post, errors, processing } = useForm({
        toko: toko,
        anggota: null,
        nominalTabungan: null,
        tabunganYangDigunakan: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("transaksi.transfer.tabungan.setor"),{
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
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormAnggota">
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
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormNominalTabungan">
                    <Form.Label>NOMINAL TABUNGAN <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="nominalTabungan"
                        name="nominalTabungan"
                        placeholder="Masukan nominal tabungan"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${errors.nominalTabungan && 'is-invalid'}`}
                        onValueChange={(values) => setData("nominalTabungan", values)}
                    />
                    {errors.nominalTabungan && <div className="text-end invalid-feedback">{errors.nominalTabungan}</div>}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormTabunganYangDigunakan">
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
            </div>
            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
            </Button>
        </Form>
    );
}

export default Setor;
