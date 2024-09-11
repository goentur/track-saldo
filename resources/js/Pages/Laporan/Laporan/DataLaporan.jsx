import { faHistory, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { format } from "date-fns";
import { useRef, useState } from "react";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";

function DataLaporan({tokos}) {
    const route = useRoute();
    const [dataLaporan, setDataLaporan] = useState();
    const [toko, setToko] = useState();
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
        documentTitle : 'Laporan '+textTanggalAwal+' S.D. '+textTanggalAkhir,
        pageStyle : getPageMargins,
    });
    const lihatData = async () => {
        if (toko && dateRange) {
            setLoadingCari(true)
            try {
                const response = await axios.post(route('laporan.data.transaksi'), { 
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
        <Form >
            <div className="row">
                <div className="col-lg-4">
                    <Form.Group className="col-lg-12" controlId="validationFormToko">
                        <Typeahead id="toko" labelKey={(tokos) => `${tokos.nama}`} name="toko" options={tokos} placeholder="Pilih toko" onChange={(selected) => {if (selected.length > 0) {setToko(selected[0].id)}}} autoFocus/>
                    </Form.Group>
                </div>
                <div className="col-lg-4 row">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
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
                            <th className="w-1">TOTAL</th>  
                            <th>KETERANGAN</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {dataLaporan?
                        dataLaporan.map((data) => (
                        <tr key={data.no}>
                            <td className="text-center">{ data.no }.</td>
                            <td>{ data.tanggal }</td>
                            <td>{ data.pengguna }</td>
                            <td>{ data.anggota }</td>
                            <td className="text-end">{ data.total }</td>
                            <td>{ data.keterangan }</td>
                        </tr>))
                        :
                        <tr>
                            <td className="text-center" colSpan={6}>DATA TIDAK DITEMUKAN</td>
                        </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </Form>
    );
}

export default DataLaporan;
