import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faHistory, faInfoCircle, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";

function Tarik({ toko, anggotas, tabungans, onProcessingDone,nominalBiayaTransfer }) {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: toko,
        anggota: null,
        nominalPengambilan: null,
        tabunganYangDigunakan: null,
        biayaTransfer: false
    });
    function submit(e) {
        e.preventDefault();
        post(route("transaksi.transfer.investasi.setor"),{
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
                    <Form.Control.Feedback type="invalid">
                        {errors.anggota}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormNominalPengambilan">
                    <Form.Label>NOMINAL PENGAMBILAN <span className="text-danger">*</span></Form.Label>
                    <CurrencyInput
                        id="nominalPengambilan"
                        name="nominalPengambilan"
                        placeholder="Masukan nominal pengambilan"
                        prefix="Rp "
                        required
                        className={`form-control form-control-lg text-end ${errors.nominalPengambilan && 'is-invalid'}`}
                        onValueChange={(values) => setData("nominalPengambilan", values)}
                    />
                    {errors.nominalPengambilan && <div className="text-end invalid-feedback">{errors.nominalPengambilan}</div>}
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
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormBiayaTranfer">
                    <Form.Label>BIAYA TRANSFER</Form.Label>
                    <CurrencyInput
                        id="biayaTransfer"
                        name="biayaTransfer"
                        placeholder="Masukan biaya transfer"
                        prefix="Rp "
                        className={`form-control form-control-lg text-end ${errors.biayaTransfer && 'is-invalid'}`}
                        onValueChange={(values) => setData("biayaTransfer", values)}
                        disabled={data.tabunganYangDigunakan?false:true}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.biayaTransfer}
                    </Form.Control.Feedback>
                    <Form.Label className="text-info f-14"><FontAwesomeIcon icon={faInfoCircle} /> Masukan nominal apabila ada biaya transfer.</Form.Label>
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
                <Form.Group className="mb-3 col-lg-4" controlId="validationFormBiayaAdmin">
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
                <div className="mb-3 col-lg-2">
                    <Button variant="primary" type="submit" className="align-item-end" disabled={true}>
                        {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <FontAwesomeIcon icon={faMoneyBill1Wave}/> INVESTASI YANG TERSEDIA
                    <table className="table table-sm table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="w-1">NO</th>
                                <th>TANGGAL</th>
                                <th>PENGGUNA</th>
                                <th>KETERANGAN</th>
                                <th>NOMINAL</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="col-lg-6">
                    <FontAwesomeIcon icon={faHistory}/> RIWAYAT INVESTASI
                    <table className="table table-sm table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="w-1">NO</th>
                                <th>TANGGAL</th>
                                <th>PENGGUNA</th>
                                <th>KETERANGAN</th>
                                <th>NOMINAL</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </Form>
    );
}

export default Tarik;
