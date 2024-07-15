import Layout from "../../../Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faHandHoldingUsd, faMoneyBill1Wave, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Head, Link } from "@inertiajs/react";
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity";
import { useRoute } from '../../../../../vendor/tightenco/ziggy';

function Menu(){
    const route = useRoute();
    return (
    <Layout>
        <Head title="TRANSFER"/>
        <h1 className="text-center mb-0"><FontAwesomeIcon icon={faGripHorizontal}/></h1>
        <h3 className="text-center mb-5">PILIH MENU</h3>
        <div className="row mb-5">
            <div className="col-md-3">
                <div className="card bg-primary shadow text-center text-white">
                    <div className="card-body">
                        <FontAwesomeIcon icon={faUniversity} className="fa-2x mb-3"/>
                        <h5 className="card-title">Transfer via ATM Nasabah</h5>
                        <p className="card-text">Transfer uang melalui ATM nasabah dengan mudah dan cepat.</p>
                        <Link href={route('via-atm-nasabah.index')} className="stretched-link"/>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card bg-primary shadow text-center text-white">
                    <div className="card-body">
                        <FontAwesomeIcon icon={faHandHoldingUsd} className="fa-2x mb-3"/>
                        <h5 className="card-title">Transfer Tunai</h5>
                        <p className="card-text">Lakukan transfer tunai dengan cepat dan aman.</p>
                        <Link href="" className="stretched-link"/>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card bg-primary shadow text-center text-white">
                    <div className="card-body">
                        <FontAwesomeIcon icon={faWallet} className="fa-2x mb-3"/>
                        <h5 className="card-title">Tambah Saldo</h5>
                        <p className="card-text">Tambah saldo akun Anda secara mudah dan cepat.</p>
                        <Link href="" className="stretched-link"/>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card bg-primary shadow text-center text-white">
                    <div className="card-body">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className="fa-2x mb-3"/>
                        <h5 className="card-title">Tarik Tunai</h5>
                        <p className="card-text">Tarik tunai dari akun Anda dengan aman dan nyaman.</p>
                        <Link href="" className="stretched-link"/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Menu