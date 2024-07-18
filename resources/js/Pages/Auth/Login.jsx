import { faKey, faRightToBracket, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Head, router, useForm  } from "@inertiajs/react";

export default function Login(){
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })
    function submit(e) {
        e.preventDefault()
        post(route('login.submit'))
    }
    return (<>
        <Head title="LogIn"/>
        <section className="vh-100 bg-primary py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-6 col-xl-5">
                        <div className="mx-auto card border-1 border-primary rounded-4">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="mb-5 text-center">
                                    <h3 className="fw-normal"><b>T</b>rack<b>S</b>aldo</h3>
                                    <p>Silahkan masukan ke akun Anda</p>
                                </div>
                                <Form onSubmit={submit}>
                                    
                                    <Form.Group className="mb-3" controlId="validationFormEmail">
                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                        <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faUserAlt}/></InputGroup.Text>
                                        <Form.Control
                                            size="lg"
                                            type="email"
                                            placeholder="Masukan email anda"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            isInvalid={!!errors.email}
                                            autoFocus
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="validationFormPassword">
                                        <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                        <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faKey}/></InputGroup.Text>
                                        <Form.Control
                                            size="lg"
                                            type="password"
                                            placeholder="Masukan password anda"
                                            aria-describedby="inputGroupPrepend"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            isInvalid={!!errors.password}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-5" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" name="remember" onChange={(e) => setData("remember", data.remember?false:true)} label="Ingian Saya Terus" />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit">{processing?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FontAwesomeIcon icon={faRightToBracket}/> } Login</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}