import { faPrint, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { addDays, format } from "date-fns";
import { id } from "date-fns/locale/id";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Spinner, Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import DatePicker, { registerLocale } from "react-datepicker";
import { toast } from "react-toastify";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import NotaBesar from "./Transfer/NotaBesar";
registerLocale('id', id)
function DataTransaksi({ toko, anggotas, reloadTabungan, onReloadComplete, tanggalTransaksi}){
    const route = useRoute();
    const [transaksi, setDataTransaksi] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [anggota, setDataAnggota] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [nominal, setDataNominal] = useState(null);
    useEffect(() => {
        if (toko != '' ) {
            getData()
        }
        if (reloadTabungan) {
            getData()
            onReloadComplete()
        }
    }, [toko, reloadTabungan]);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(route('transaksi.data'), { 
                toko : toko.id,
                tanggal : dateRange[0]?format(dateRange[0],'dd-MM-yyyy') + ' - ' + format(dateRange[1],'dd-MM-yyyy'):tanggalTransaksi,
                anggota : anggota,
                nominal : nominal,
            });
            setDataTransaksi(response.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error);
        }
    }
    const [selectedId, setSelectedId] = useState(null);

    const resetSelectedId = () => {
        setSelectedId(null);
    };
    return (<>
        <Form onSubmit={(e) => {e.preventDefault(); getData()}} className="row mb-2">
            <div className="row col-lg-3">
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
            <Typeahead
                id="anggota"
                name="anggota"
                placeholder="Pilih anggota"
                className="col-lg-3"
                required
                autoFocus
                labelKey={(anggotas) => `${anggotas.nama} | ${anggotas.alamat}`}
                options={anggotas}
                onChange={(selected) => setDataAnggota(selected.length > 0 ? selected[0].id : null)}
                disabled={anggotas.length === 0}
                maxResults={7}
                />
            <div className="col-lg-2">
                <CurrencyInput
                    id="nominalBiayaAdmin"
                    name="nominalBiayaAdmin"
                    placeholder="Masukan nominal"
                    prefix="Rp "
                    className="form-control text-end"
                    onValueChange={(values) => setDataNominal(values)}
                />
            </div>
            <div className="col-lg-2">
                <Button type="submit"><FontAwesomeIcon icon={faSearch}/> CARI</Button>
            </div>
        </Form>
        <div className="table-responsive">
            <Table bordered hover size="sm">
                <thead>
                    <tr className="f-12">
                        <th className="w-1 text-center">NO</th>
                        <th className="w-6">PENGGUNA</th>
                        <th>ANGGOTA</th>
                        <th>KETERANGAN</th>
                        <th className="w-7 text-end">TOTAL</th>
                        <th className="w-1 text-center">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading?(
                        <tr>
                            <td colSpan={7} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                        </tr>
                    ): null}
                    {transaksi !== null ? transaksi.data.map((value,index) => (
                    <tr key={index} className="f-12">
                        <td className="text-center">{++index}.</td>
                        <td>
                            { value.pengguna }
                            <br />
                            <span className="f-10">{ value.tanggal }</span>
                        </td>
                        <td>{ value.anggota }</td>
                        <td>{ value.keterangan }</td>
                        <td className="text-end">Rp { value.total }</td>
                        <td className="text-center">
                            {value.aksi && (
                                <ButtonGroup aria-label="button action">
                                    <Button className="btn-sm-icon" variant="primary" onClick={() => setSelectedId(value.id)}><FontAwesomeIcon icon={faPrint}/></Button>
                                </ButtonGroup>
                            )}
                        </td>
                    </tr>
                    )):
                    <tr>
                        <td colSpan={6} className="text-center">Data Belum ada</td>
                    </tr>
                    }
                </tbody>
            </Table>
        </div>
        <div className="row">
            <div className="col-6">TOTAL PERPUTARAN UANG: <span className="fw-bold">{transaksi !== null ? transaksi.total : 0}</span></div>
            <div className="col-6 text-end">PERIODE TRANSAKSI : <span className="fw-bold">{transaksi !== null ? transaksi.tanggalAwal+ ' S.D. '+ transaksi.tanggalAkhir : "..."}</span></div>
        </div>
        {selectedId && <NotaBesar id={selectedId} toko={toko} resetSelectedId={resetSelectedId} />}
    </>)
}

export default DataTransaksi