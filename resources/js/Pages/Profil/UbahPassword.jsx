import { faKey, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardTitle, Form, Spinner } from "react-bootstrap";
import { useRoute } from "../../../../vendor/tightenco/ziggy";

function UbahPassword(){
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        passwordLama: "",
        passwordBaru: "",
        konfirmasiPasswordBaru: "",
    })
    function submit(e) {
        e.preventDefault()
        post(route("profil.ubah-password"))
    }
    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle><FontAwesomeIcon icon={faKey}/> UBAH PASSWORD</CardTitle>
                    <p>Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.</p>
                    <form onSubmit={submit} className="mt-4">
                        <Form.Group className="mb-3 col-lg-6" controlId="validationFormPasswordLama">
                            <Form.Label>PASSWORD LAMA <span className="text-danger">*</span></Form.Label>
                            <Form.Control size="lg" type="password" placeholder="Masukan password lama" aria-describedby="inputGroupPrepend" name="passwordLama" value={data.passwordLama} onChange={(e) => setData("passwordLama", e.target.value)} isInvalid={!!errors.passwordLama} required/>
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordLama}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-lg-6" controlId="validationFormPasswordBaru">
                                <Form.Label>PASSWORD BARU <span className="text-danger">*</span></Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Masukan password baru" aria-describedby="inputGroupPrepend" name="passwordBaru" value={data.passwordBaru} onChange={(e) => setData("passwordBaru", e.target.value)} isInvalid={!!errors.passwordBaru} required/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.passwordBaru}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="validationFormKonfirmasiPasswordBaru">
                                <Form.Label>KONFIRMASI PASSWORD BARU <span className="text-danger">*</span></Form.Label>
                                <Form.Control size="lg" type="password" placeholder="Masukan konfirmasi password baru" aria-describedby="inputGroupPrepend" name="konfirmasiPasswordBaru" value={data.konfirmasiPasswordBaru} onChange={(e) => setData("konfirmasiPasswordBaru", e.target.value)} isInvalid={!!errors.konfirmasiPasswordBaru} required/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.konfirmasiPasswordBaru}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-lg-12 mb-3">
                            <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FontAwesomeIcon icon={faSave}/> } SIMPAN</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    )
}

export default UbahPassword;