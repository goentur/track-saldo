import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import Layout from "../../../Layouts/Layout";
import DataLaporan from "./DataLaporan";
function Index({tokos}) {
    return (
        <Layout>
            <Head title="LAPORAN DETAIL" />
            <Card>
                <CardHeader className="text-center">
                    <h1><FontAwesomeIcon icon={faFileAlt} /> LAPORAN DETAIL</h1>
                </CardHeader>
                <CardBody>
                    <DataLaporan tokos={tokos}/>
                </CardBody>
            </Card>
        </Layout>
    );
}

export default Index;
