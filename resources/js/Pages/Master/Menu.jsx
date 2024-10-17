import { Head, Link, usePage } from "@inertiajs/react";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import iconBrand from "../../../images/menus/brand.svg";
import iconPaket from "../../../images/menus/paket.svg";
import iconPegawai from "../../../images/menus/pegawai.svg";
import iconPemilik from "../../../images/menus/pemilik.svg";
import iconTabungan from "../../../images/menus/tabungan.svg";
import iconToko from "../../../images/menus/toko.svg";
import iconZonaWaktu from "../../../images/menus/zona-waktu.svg";
import Layout from "../../Layouts/Layout";

function Menu(){
    const route = useRoute();
    const { role } = usePage().props.auth;
    return (
    <Layout>
        <Head title="MASTER"/>
        <Card>
            <CardBody>
                <CardTitle className="text-center mb-3">MENU MASTER</CardTitle>
                <div className="row d-flex justify-content-center align-items-center">
                    {role == 'developer'? 
                    <>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconZonaWaktu} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Zona Waktu</p>
                                    <Link href={route('master.zona-waktu.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconToko} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Toko</p>
                                    <Link href={route('master.toko.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconPemilik} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Pemilik</p>
                                    <Link href={route('master.pemilik.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>   
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconBrand} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Merek</p>
                                    <Link href={route('master.merek.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconTabungan} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Tabungan</p>
                                    <Link href={route('master.tabungan.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconPegawai} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Pegawai</p>
                                    <Link href={route('master.pegawai.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconPaket} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <p className="fw-bold">Paket</p>
                                    <Link href={route('master.paket.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </CardBody>
        </Card>
    </Layout>
    )
}

export default Menu