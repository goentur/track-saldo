import Layout from "../../Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faGlobe, faHandHoldingUsd, faMoneyBill1Wave, faPersonDotsFromLine, faPhoneAlt, faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { Head, Link } from "@inertiajs/react";
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { Card, CardBody } from "react-bootstrap";

function Menu(){
    const route = useRoute();
    return (
    <Layout>
        <Head title="TRANSAKSI"/>
        <Card>
            <CardBody>
                <h3 className="text-center mb-3">TRANSFER</h3>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faUniversity} className="fa-2x mb-3"/>
                                <h5 className="card-title">Transfer via ATM Nasabah</h5>
                                <Link href={route('transaksi.transfer.via-atm-nasabah.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faHandHoldingUsd} className="fa-2x mb-3"/>
                                <h5 className="card-title">Transfer Tunai</h5>
                                <Link href={route('transaksi.transfer.tunai.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faMoneyBill1Wave} className="fa-2x mb-3"/>
                                <h5 className="card-title">Tarik Tunai</h5>
                                <Link href={route('transaksi.transfer.tarik-tunai.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faExchangeAlt} className="fa-2x mb-3"/>
                                <h5 className="card-title">Mutasi Saldo</h5>
                                <Link href={route('transaksi.transfer.mutasi-saldo.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h3 className="text-center mb-3">PENJUALAN</h3>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faPhoneAlt} className="fa-2x mb-3"/>
                                <h5 className="card-title">Pulsa</h5>
                                <Link href={route('transaksi.penjualan.pulsa.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faGlobe} className="fa-2x mb-3"/>
                                <h5 className="card-title">Paket Data</h5>
                                <Link href={route('transaksi.penjualan.paket-data.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h3 className="text-center mb-3">PENGELUARAN</h3>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faStoreAlt} className="fa-2x mb-3"/>
                                <h5 className="card-title">Produktif</h5>
                                <Link href={route('transaksi.pengeluaran.produktif.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <FontAwesomeIcon icon={faPersonDotsFromLine} className="fa-2x mb-3"/>
                                <h5 className="card-title">Konsumtif</h5>
                                <Link href={route('transaksi.penjualan.paket-data.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    </Layout>
    )
}

export default Menu