import Layout from "../../Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { Card, CardBody, Modal } from "react-bootstrap";
import IconTransferViaAtmNasabah  from "../../../images/menus/transfer-via-atm-nasabah.svg";
import IconTransferTunai  from "../../../images/menus/transfer-tunai.svg";
import IconTarikTunai  from "../../../images/menus/tarik-tunai.svg";
import IconMutasiSaldo  from "../../../images/menus/mutasi-saldo.svg";
import IconPaketPulsa  from "../../../images/menus/paket-pulsa.svg";
import IconPaketInternet  from "../../../images/menus/paket-internet.svg";
import IconLaporan  from "../../../images/menus/laporan.svg";
import IconLaporanDetail  from "../../../images/menus/laporan-detail.svg";
import IconTabungan  from "../../../images/menus/tabungan.svg";
import IconProduktif  from "../../../images/menus/produktif.svg";
import IconKonsumtif  from "../../../images/menus/konsumtif.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faFileExcel, faFileWord } from "@fortawesome/free-regular-svg-icons";
import DataLaporan from "../Laporan/Laporan/DataLaporan";
import DataLaporanDetail from "../Laporan/LaporanDetail/DataLaporan";
import Tabungan from "./Tabungan";

function Menu({tokos,tabungans}){
    const route = useRoute();
    const { role } = usePage().props.auth;
    const [modalLaporan, setModalLaporan] = useState(false);
    const handleModalLaporan = () => setModalLaporan(true);
    const [modalLaporanDetail, setModalLaporanDetail] = useState(false);
    const handleModalLaporanDetail = () => setModalLaporanDetail(true);
    const [modalTabungan, setModalTabungan] = useState(false);
    const handleModalTabungan = () => setModalTabungan(true);
    return (
    <Layout>
        <Head title="TRANSAKSI"/>
        <Card>
            <CardBody>
                <h3 className="text-center mb-3">TRANSFER</h3>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-2 mb-3">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <img src={IconTransferViaAtmNasabah} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                <h6 className="card-title">Via ATM Nasabah</h6>
                                <Link href={route('transaksi.transfer.via-atm-nasabah.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-3">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <img src={IconTransferTunai} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                <h5 className="card-title">Tunai</h5>
                                <Link href={route('transaksi.transfer.tunai.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-3">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <img src={IconTarikTunai} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                <h5 className="card-title">Tarik Tunai</h5>
                                <Link href={route('transaksi.transfer.tarik-tunai.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    {role == 'pemilik' ? (
                        <div className="col-md-2 mb-3">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <img src={IconMutasiSaldo} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                <h5 className="card-title">Mutasi Saldo</h5>
                                <Link href={route('transaksi.transfer.mutasi-saldo.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    ):''}
                </div>
                <hr />
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="text-center mb-3">PENJUALAN</h3>
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-4 mb-3">
                                <div className="card shadow text-center border-primary">
                                    <div className="card-body">
                                        <img src={IconPaketPulsa} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                        <h5 className="card-title">Pulsa</h5>
                                        <Link href={route('transaksi.penjualan.pulsa.index')} className="stretched-link"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="card shadow text-center border-primary">
                                    <div className="card-body">
                                        <img src={IconPaketInternet} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                        <h5 className="card-title">Paket Data</h5>
                                        <Link href={route('transaksi.penjualan.paket-data.index')} className="stretched-link"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center mb-3">LAPORAN</h3>
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-4 mb-3">
                                <div className="card shadow text-center border-primary">
                                    <div className="card-body">
                                        <img src={IconLaporan} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                        <h5 className="card-title">Laporan</h5>
                                        <a href="#" onClick={handleModalLaporan} className="stretched-link"></a>
                                    </div>
                                </div>
                            </div>
                            {role == 'pemilik' ? (
                            <div className="col-md-4 mb-3">
                                <div className="card shadow text-center border-primary">
                                    <div className="card-body">
                                        <img src={IconLaporanDetail} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                        <h5 className="card-title">Laporan Detail</h5>
                                        <a href="#" onClick={handleModalLaporanDetail} className="stretched-link"></a>
                                    </div>
                                </div>
                            </div>
                            ):(  
                            <div className="col-md-4 mb-3">
                                <div className="card shadow text-center border-primary">
                                    <div className="card-body">
                                        <img src={IconTabungan} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                        <h5 className="card-title">Tabungan</h5>
                                        <a href="#" onClick={handleModalTabungan} className="stretched-link"></a>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                {role == 'pemilik' ? (<>
                <hr />
                <h3 className="text-center mb-3">PENGELUARAN</h3>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-2 mb-3">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <img src={IconProduktif} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                <h5 className="card-title">Produktif</h5>
                                <Link href={route('transaksi.pengeluaran.produktif.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-3">
                        <div className="card shadow text-center border-primary">
                            <div className="card-body">
                                <img src={IconKonsumtif} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                <h5 className="card-title">Konsumtif</h5>
                                <Link href={route('transaksi.pengeluaran.konsumtif.index')} className="stretched-link"/>
                            </div>
                        </div>
                    </div>
                </div>
                </>):''}
            </CardBody>
        </Card>
        <Modal
            dialogClassName="modal-90w"
            show={modalLaporan}
            onHide={() => setModalLaporan(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="modal-laporan"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="modal-laporan">
                <FontAwesomeIcon icon={faFileWord} /> LAPORAN
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataLaporan tokos={tokos}/>
            </Modal.Body>
        </Modal>
        {role == 'pegawai' ? (<>
        <Modal
            dialogClassName="modal-90w"
            show={modalTabungan}
            onHide={() => setModalTabungan(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="modal-laporan"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="modal-laporan">
                <FontAwesomeIcon icon={faCreditCard} /> TABUNGAN
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabungan tabungans={tabungans}/>
            </Modal.Body>
        </Modal>
        </>):<>
        <Modal
            dialogClassName="modal-90w"
            show={modalLaporanDetail}
            onHide={() => setModalLaporanDetail(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="modal-laporan-detail"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="modal-laporan-detail">
                <FontAwesomeIcon icon={faFileExcel} /> LAPORAN DETAIL
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataLaporanDetail tokos={tokos}/>
            </Modal.Body>
        </Modal>
        </>
        }
    </Layout>
    )
}

export default Menu