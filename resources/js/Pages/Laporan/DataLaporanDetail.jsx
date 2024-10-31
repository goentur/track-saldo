import { faHistory, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { addDays, format } from "date-fns";
import React, { useRef, useState } from "react";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { id } from "date-fns/locale/id";
registerLocale('id', id)
function DataLaporanDetail({toko}) {
    const route = useRoute();
    const [dataLaporan, setDataLaporan] = useState();
    const [loadingCari, setLoadingCari] = useState();
    const [textTanggalAwal, setTextTanggalAwal] = useState();
    const [textTanggalAkhir, setTextTanggalAkhir] = useState();
    const [textTotal, setTextTotal] = useState(0);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const componentRef = useRef();
    const getPageMargins = () => {
        return `
        @page { 
            size: landscape;
            margin: 0.5cm;
        }
        `;
    };
    const handlePrintLaporan = useReactToPrint({
        content : () => componentRef.current,
        documentTitle : 'Laporan Detail'+textTanggalAwal+' S.D. '+textTanggalAkhir,
        pageStyle : getPageMargins,
    });
    const lihatData = async () => {
        if (toko && dateRange) {
            setLoadingCari(true)
            try {
                const response = await axios.post(route('laporan.data.transaksi.detail'), { 
                    toko : toko,
                    tanggal : format(dateRange[0],'dd-MM-yyyy') + ' - ' + format(dateRange[1],'dd-MM-yyyy'),
                });
                setTextTanggalAwal(response.data.tanggalAwal)
                setTextTanggalAkhir(response.data.tanggalAkhir)
                setTextTotal(response.data.total)
                setDataLaporan(response.data.data)
                setLoadingCari(false)
            } catch (error) {
                toast.error(error);
                setLoadingCari(false)
            }
        } else {
            toast.error("Pilih toko dan tanggal terlebih dahulu");
        }
    };
    return (
        <Form>
            <div className="row">
                <div className="col-lg-4 row">
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
                        placeholderText="Pilih tanggal Transfer"
                    />
                </div>
                <div className="col-lg-2 d-grid">
                    <Button variant="primary" type="button" onClick={lihatData} size="sm" className="align-item-end" disabled={loadingCari}>
                        {loadingCari ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faHistory}/>} LIHAT DATA
                    </Button>
                </div>
                <div className="col-lg-2 d-grid">
                    <Button variant="success" disabled={!dataLaporan} onClick={handlePrintLaporan} type="button" size="sm" className="align-item-end">
                        <FontAwesomeIcon icon={faPrint}/> CETAK
                    </Button>
                </div><style></style>
            </div>
            <hr />
            <div ref={componentRef}>
                <div className="text-center">
                    <h3>LAPORAN RIWAYAT TABUNGAN</h3>
                    <h5>{textTanggalAwal} S.D {textTanggalAkhir}</h5>
                </div>
                <h4>TOTAL : {'Rp '+textTotal}</h4>
                <Table bordered hover size="sm">
                <thead>
                    <tr>
                    <th className="w-1">NO</th>
                    <th>TANGGAL</th>
                    <th>PENGGUNA</th>
                    <th>ANGGOTA</th>
                    <th>TIPE</th>
                    <th>KETERANGAN</th>
                    <th className="w-1">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {dataLaporan ? (
                    dataLaporan.map((data) => (
                        <React.Fragment key={data.no}>
                        <tr key={data.no}>
                            <td colSpan={7} className="bg-primary"></td>
                        </tr>
                        <tr key={data.no} className="fw-bold">
                            <td className="top text-center">{data.no}.</td>
                            <td className="top">{data.tanggal}</td>
                            <td className="top">{data.pengguna}</td>
                            <td className="top">{data.anggota}</td>
                            <td className="top">{data.tipe}</td>
                            <td className="top">{data.keterangan}</td>
                            <td className="top text-end">{data.total}</td>
                        </tr>
                        {data.detail.map((detail) => (
                            <tr key={data.no + '-d-' + detail.id}>
                            <td></td>
                            <td></td>
                            <td className="top" colSpan={2}>{detail.merek} ({detail.no})</td>
                            <td className="top">{detail.tipe}</td>
                            <td className="top">{detail.keterangan}</td>
                            <td className="top text-end">{detail.nominal}</td>
                            </tr>
                        ))}
                        </React.Fragment>
                    ))
                    ) : (
                    <tr>
                        <td className="text-center" colSpan={6}>
                        DATA TIDAK DITEMUKAN
                        </td>
                    </tr>
                    )}
                </tbody>
                </Table>
            </div>
        </Form>
    );
}

export default DataLaporanDetail;
