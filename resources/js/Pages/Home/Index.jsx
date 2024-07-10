import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../Layouts/Layout";
import { faBullseye, faChartLine, faWallet } from "@fortawesome/free-solid-svg-icons";
import { faBell, faFileAlt } from "@fortawesome/free-regular-svg-icons";

function Index(){
    return (
    <Layout>
        <div className="jumbotron text-center">
            <h1 className="display-4">Selamat Datang di TrackSaldo</h1>
            <p className="lead">Manajemen Keuangan Pribadi yang Mudah dan Efektif.</p>
        </div>

        <div className="text-center mb-4">
            <p className="lead">Dengan TrackSaldo, Anda dapat dengan mudah mengelola dan melacak pengeluaran harian Anda. Buat rencana keuangan yang bijak dan capai tujuan finansial Anda.</p>
        </div>

        <div className="row text-center">
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h1 className="feature-icon"><FontAwesomeIcon icon={faWallet}/></h1>
                        <h5 className="card-title">Pelacakan Pengeluaran</h5>
                        <p className="card-text">Catat dan kategorikan pengeluaran Anda dengan mudah.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h1 className="feature-icon"><FontAwesomeIcon icon={faChartLine}/></h1>
                        <h5 className="card-title">Anggaran Bulanan</h5>
                        <p className="card-text">Tetapkan batas pengeluaran untuk berbagai kategori dan pantau kemajuan Anda.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h1 className="feature-icon"><FontAwesomeIcon icon={faFileAlt}/></h1>
                        <h5 className="card-title">Laporan Keuangan</h5>
                        <p className="card-text">Dapatkan laporan keuangan yang detail untuk memahami pola pengeluaran Anda.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="row text-center">
            <div className="col-md-6 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h1 className="feature-icon"><FontAwesomeIcon icon={faBell}/></h1>
                        <h5 className="card-title">Pengingat Tagihan</h5>
                        <p className="card-text">Jangan pernah lagi melewatkan jatuh tempo tagihan dengan pengingat otomatis.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h1 className="feature-icon"><FontAwesomeIcon icon={faBullseye}/></h1>
                        <h5 className="card-title">Tujuan Finansial</h5>
                        <p className="card-text">Tetapkan tujuan finansial Anda dan lacak kemajuan Anda menuju pencapaian mereka.</p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Index