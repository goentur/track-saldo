import { faPrint, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { addDays, format } from "date-fns";
import { id } from "date-fns/locale/id";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, ButtonGroup, Form, Spinner, Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CurrencyInput from "react-currency-input-field";
import DatePicker, { registerLocale } from "react-datepicker";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import NotaBesar from "./Transfer/NotaBesar";
registerLocale('id', id)
function DataTransaksi(props, ref){
    const {role, toko, anggotas, tanggalTransaksi, onProcessingDone} = props;
    const route = useRoute();
    const [transaksi, setDataTransaksi] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [anggota, setDataAnggota] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [nominal, setDataNominal] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    
    useImperativeHandle(ref, () => ({
        dataTransaksi,
    }));
    const dataTransaksi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(route('transaksi.data'), { 
                toko : toko.id,
                tanggal : dateRange[0]?format(dateRange[0],'dd-MM-yyyy') + ' - ' + format(dateRange[1],'dd-MM-yyyy'):tanggalTransaksi,
                anggota : anggota,
                nominal : nominal,
            });
            setDataTransaksi(response.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setIsLoading(false)
        }
    }
    const resetSelectedId = () => {
        setSelectedId(null);
    };
    const hapus = (id) => {
        withReactContent(Swal).fire({
            title: "Apakah Anda serius?",
            text: "ingin menghapus transaksi ini!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#0d6efd",
            confirmButtonText: "Ya, hapus transaksi ini!",
            cancelButtonText: "Tidak",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(route('transaksi.hapus',id));
                    toast.success(response.data.message);
                    onProcessingDone();
                } catch (error) {
                    toast.error(error.response.data.message)
                }
            }
        })
    }
    return (<>
        <Form onSubmit={(e) => {e.preventDefault(); dataTransaksi()}} className="row mb-2">
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
        <div className="table-responsive transaksi">
            <Table bordered hover size="sm">
                <thead>
                    <tr className="f-12">
                        <th className="w-1 text-center">NO</th>
                        <th className="w-6">PENGGUNA</th>
                        <th>ANGGOTA</th>
                        <th>TIPE</th>
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
                        <td className="top">
                            { value.pengguna }
                            <br />
                            <span className="f-10">{ value.tanggal }</span>
                        </td>
                        <td className="top">{ value.anggota }</td>
                        <td className="top">{ value.tipe }</td>
                        <td className="top">{ value.keterangan }</td>
                        <td className="top text-end">Rp { value.total }</td>
                        <td className="top text-center">
                            <ButtonGroup aria-label="button action">
                            {value.aksi && (
                                <Button className="btn-sm btn-icon" variant="primary" onClick={() => setSelectedId(value.id)}><FontAwesomeIcon icon={faPrint}/></Button>
                            )}
                            {role == 'pemilik' && (
                                <Button className="btn-sm btn-icon" variant="danger" onClick={() => hapus(value.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                            )}
                            </ButtonGroup>
                        </td>
                    </tr>
                    )):
                    <tr>
                        <td colSpan={7} className="text-center">Data Belum ada</td>
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

export default forwardRef(DataTransaksi)