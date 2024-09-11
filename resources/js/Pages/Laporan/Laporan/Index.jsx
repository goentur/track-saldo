import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import { CardBody, CardHeader, Form } from "react-bootstrap";
import Layout from "../../../Layouts/Layout";
import DataLaporan from "./DataLaporan";
function Index({tokos}) {
    return (
        <Layout>
            <Head title="LAPORAN" />
            <Form className="card">
                <CardHeader className="text-center">
                    <h1><FontAwesomeIcon icon={faFileAlt} /> LAPORAN</h1>
                </CardHeader>
                <CardBody>
                    <DataLaporan tokos={tokos}/>
                </CardBody>
            </Form>
        </Layout>
    );
}

export default Index;
