import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

function Dashboard({ toko, tanggalTransaksi }) {
    const [dataDashboard, setDataDashboard] = useState(null); // Set to null initially
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        if (toko !== '') {
            getDataDashboard();
        }
    }, [toko]);

    const getDataDashboard = async () => {
        setLoading(true);
        try {
            const rensponse = await axios.post(route('dashboard'), { 
                toko : toko,
                tanggal : dateRange[0]?format(dateRange[0],'dd-MM-yyyy') + ' - ' + format(dateRange[1],'dd-MM-yyyy'):tanggalTransaksi,
            });
            setDataDashboard(rensponse.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
    };
    return (
        <>
            <Form onSubmit={(e) => {e.preventDefault(); getDataDashboard()}} className="row mb-2">
                <div className="row col-lg-10">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        maxDate={addDays(new Date(), 0)}
                        locale="id"
                        dateFormat="dd-MM-yyyy"
                        className="form-control"
                        placeholderText="Pilih tanggal transaksi"
                        required
                    />
                </div>
                <div className="col-lg-2 d-grid gap-2">
                    <Button type="submit" disabled={loading}>{loading?<Spinner size="sm"/>:<FontAwesomeIcon icon={faSearch}/>} CARI</Button>
                </div>
            </Form>
            <h3 className="text-center m-0">PERIODE TRANSAKSI</h3>
            <h4 className="text-center m-0">{loading?'..':dataDashboard?.tanggal.awal ?? '-'} S.D {loading?'..':dataDashboard?.tanggal.akhir ?? '-'}</h4>
            <div className="row gap-3 mt-3 d-flex justify-content-center align-items-center p-4">
                <div className="card col-lg-3 widget-card border-primary shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PERPUTARAN UANG</span>
                        <h4 className="card-subtitle text-primary m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.perputaran ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENAMBAHAN UANG</span>
                        <h4 className="card-subtitle text-success m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.penambahan ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGURANGAN UANG</span>
                        <h4 className="card-subtitle text-danger m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.pengurangan ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL BIAYA ADMIN</span>
                        <h4 className="card-subtitle text-success m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.biayaAdmin ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL BIAYA TRANSFER</span>
                        <h4 className="card-subtitle text-danger m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.biayaTransfer ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-success shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENDAPATAN</span>
                        <h4 className="card-subtitle text-success m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.pendapatan ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGELUARAN PRODUKTIF</span>
                        <h4 className="card-subtitle text-danger m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.produktif ?? '0'}</h4>
                    </div>
                </div>
                <div className="card col-lg-3 widget-card border-danger shadow-sm">
                    <div className="card-body py-4">
                        <span className="card-title widget-card-title mb-3">TOTAL PENGELUARAN KONSUMTIF</span>
                        <h4 className="card-subtitle text-danger m-0">Rp {loading?<Spinner size="sm"/>:dataDashboard?.data.konsumtif ?? '0'}</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
