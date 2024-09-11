import { Head, Link, usePage } from "@inertiajs/react";
import { Card, CardBody } from "react-bootstrap";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import iconAnggota from "../../../images/menus/anggota.svg";
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
                <h3 className="text-center mb-3">MENU MASTER</h3>
                <div className="row d-flex justify-content-center align-items-center">
                    {role == 'developer'? 
                    <>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconZonaWaktu} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h6 className="card-title">Zona Waktu</h6>
                                    <Link href={route('master.zona-waktu.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconToko} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h6 className="card-title">Toko</h6>
                                    <Link href={route('master.toko.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconPemilik} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h6 className="card-title">Pemilik</h6>
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
                                    <img src={iconAnggota} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h6 className="card-title">Anggota</h6>
                                    <Link href={route('master.anggota.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconBrand} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h5 className="card-title">Merek</h5>
                                    <Link href={route('master.merek.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconTabungan} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h5 className="card-title">Tabungan</h5>
                                    <Link href={route('master.tabungan.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconPegawai} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h5 className="card-title">Pegawai</h5>
                                    <Link href={route('master.pegawai.index')} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-2 mb-3">
                            <div className="card shadow text-center border-primary">
                                <div className="card-body">
                                    <img src={iconPaket} alt="Menu Icon" className="col-6 img-fluid mb-3" />
                                    <h5 className="card-title">Paket</h5>
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