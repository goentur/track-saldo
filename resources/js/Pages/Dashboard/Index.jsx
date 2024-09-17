import { Head } from "@inertiajs/react";
import { Card, CardBody } from "react-bootstrap";
import Layout from "../../Layouts/Layout";

function Index({tanggal, data}){
    return (
    <Layout>
        <Head title="DASHBOARD"/>
        <Card>
            <CardBody>

            <h3 className="text-center m-0">PERIODE TRANSAKSI</h3>
            <h4 className="text-center m-0">{tanggal.awal} S.D {tanggal.akhir}</h4>
            <div className="row gap-3 mt-3 d-flex justify-content-center align-items-center p-4">
                <div className="card col-lg-3 widget-card border-primary shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PERPUTARAN UANG</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.perputaran}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENAMBAHAN UANG</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.penambahan}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGURANGAN UANG</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.pengurangan}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL BIAYA ADMIN</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.biayaAdmin}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL BIAYA TRANSFER</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.biayaTransfer}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENDAPATAN</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.pendapatan}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGELUARAN PRODUKTIF</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.produktif}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGELUARAN KONSUMTIF</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {data.konsumtif}</h4>
                    </div>
                </div>
            </div>
            </CardBody>
        </Card>
    </Layout>
    )
}

export default Index