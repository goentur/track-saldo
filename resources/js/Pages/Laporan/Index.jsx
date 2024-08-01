import Layout from "../../Layouts/Layout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, CardBody, CardFooter, CardHeader, Form, InputGroup, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { faFileAlt, faSave } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faHistory, faMoneyBill1Wave, faPrint } from "@fortawesome/free-solid-svg-icons";
import CurrencyInput from "react-currency-input-field";
import axios from 'axios';
import { useState } from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function Index() {
    const route = useRoute();
    const { data, setData, post, errors, processing } = useForm({
        toko: null,
    });

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    function submit(e) {
        e.preventDefault();
        post(route("transfer.tarik-tunai.simpan"));
    }
    return (
        <Layout>
            <Head title="LAPORAN" />
            <Form onSubmit={submit} className="card">
                <CardHeader className="text-center">
                    <h1><FontAwesomeIcon icon={faFileAlt} /> LAPORAN</h1>
                </CardHeader>
                <CardBody className="row">
                    <div className="col-lg-4 row">
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            className="form-control"
                            placeholderText="Pilih tanggal Transfer"
                            //   isClearable={true}
                        />
                    </div>
                    <div className="col-lg-3 d-grid gap-2">
                        <Button variant="primary" type="submit" className="align-item-end" disabled={processing}>
                            {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faHistory} />} LIHAT DATA
                        </Button>
                    </div>
                    <div className="col-lg-3 d-grid gap-2">
                        <Button variant="success" type="submit" className="align-item-end" disabled={processing}>
                            {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faPrint} />} CETAK
                        </Button>
                    </div>
                </CardBody>
            </Form>
        </Layout>
    );
}

export default Index;
