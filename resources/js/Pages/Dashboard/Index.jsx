import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../Layouts/Layout";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";
import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";

function Index({tanggal, data}){
    return (
    <Layout>
        <Head title="DASHBOARD"/>
            <h3><FontAwesomeIcon icon={faDashboard}/> DASHBOARD</h3>
        <hr />
        <div className="row gap-3 d-flex justify-content-center align-items-center text-center">
            <h3 className="m-0">PERIODE TRANSAKSI</h3>
            <h4 className="m-0">{tanggal.awal} S.D {tanggal.akhir}</h4>
            <Card bg="primary" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL PERPUTARAN UANG</h5>
                <hr className="m-0" />
                <CardText>Rp {data.perputaran}</CardText>
            </Card>
            <Card bg="success" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL PENAMBAHAN UANG</h5>
                <hr className="m-0" />
                <CardText>Rp {data.penambahan}</CardText>
            </Card>
            <Card bg="danger" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL PENGURANGAN UANG</h5>
                <hr className="m-0" />
                <CardText>Rp {data.pengurangan}</CardText>
            </Card>
            <Card bg="success" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL BIAYA ADMIN</h5>
                <hr className="m-0" />
                <CardText>Rp {data.biayaAdmin}</CardText>
            </Card>
            <Card bg="danger" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL BIAYA TRANSFER</h5>
                <hr className="m-0" />
                <CardText>Rp {data.biayaTransfer}</CardText>
            </Card>
            <Card bg="success" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL PENDAPATAN</h5>
                <hr className="m-0" />
                <CardText>Rp {data.pendapatan}</CardText>
            </Card>
            <Card bg="danger" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL PENGELUARAN PRODUKTIF</h5>
                <hr className="m-0" />
                <CardText>Rp {data.produktif}</CardText>
            </Card>
            <Card bg="danger" className="p-3 col-lg-3 text-center text-white">
                <h5>TOTAL PENGELUARAN KONSUMTIF</h5>
                <hr className="m-0" />
                <CardText>Rp {data.konsumtif}</CardText>
            </Card>
        </div>

    </Layout>
    )
}

export default Index