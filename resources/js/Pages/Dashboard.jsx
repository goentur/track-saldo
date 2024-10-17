import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Dashboard({ toko }) {
    const [dataDashboard, setDataDashboard] = useState(null); // Set to null initially
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (toko !== '') {
            getData();
        }
    }, [toko]);

    const getData = async () => {
        setIsLoading(true);
        try {
            const responseTabungan = await axios.post(route('dashboard'), { toko: toko });
            setDataDashboard(responseTabungan.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message || "Error fetching data");
        }
    };

    if (isLoading) {
        return <h3 className="text-center">Mohon menunggu...</h3>; // Display this while loading
    }

    if (!dataDashboard) {
        return null; // Return null if no data is available yet (optional handling)
    }

    return (
        <>
            <h3 className="text-center m-0">PERIODE TRANSAKSI</h3>
            <h4 className="text-center m-0">{dataDashboard.tanggal.awal} S.D {dataDashboard.tanggal.akhir}</h4>
            <div className="row gap-3 mt-3 d-flex justify-content-center align-items-center p-4">
                <div className="card col-lg-3 widget-card border-primary shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PERPUTARAN UANG</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.perputaran}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENAMBAHAN UANG</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.penambahan}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGURANGAN UANG</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.pengurangan}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL BIAYA ADMIN</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.biayaAdmin}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL BIAYA TRANSFER</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.biayaTransfer}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENDAPATAN</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.pendapatan}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGELUARAN PRODUKTIF</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.produktif}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGELUARAN KONSUMTIF</span>
                        <h4 className="card-subtitle text-body-secondary m-0">Rp {dataDashboard.data.konsumtif}</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
