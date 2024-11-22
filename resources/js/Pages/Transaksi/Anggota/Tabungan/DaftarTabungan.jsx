import axios from "axios";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../../vendor/tightenco/ziggy";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { Rupiah } from "../../../../Helpers/Rupiah";

function DaftarTabungan({ toko }) {
    const route = useRoute();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        totalRecords: 0,
        perPage: 25,
        search: null
    });

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.post(route('master.anggota.daftar-tabungan-anggota'), {
                page: pagination.currentPage,
                search: pagination.search,
                perPage: pagination.perPage,
                toko
            });
            setData(response.data.data);
            setPagination((prev) => ({
                ...prev,
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                totalRecords: response.data.total,
                perPage: response.data.per_page
            }));
        } catch (error) {
            toast.error(error.message || "Error fetching data");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.currentPage, pagination.search, pagination.perPage]);

    const updatePage = (page) => setPagination((prev) => ({ ...prev, currentPage: page }));

    const startEntry = (pagination.currentPage - 1) * pagination.perPage + 1;
    const endEntry = Math.min(startEntry + pagination.perPage - 1, pagination.totalRecords);

    return (
        <>
            <div className="mb-3 row">
                <div className="col-lg-1">
                    <select className="form-control" onChange={(e) => setPagination((prev) => ({ ...prev, perPage: Number(e.target.value), currentPage: 1 }))}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className="col-lg-8">
                </div>
                <div className="col-lg-3 text-end">
                    <InputGroup>
                        <Form.Control
                            value={pagination.search}
                            onChange={(e) => setPagination((prev) => ({ ...prev, search: e.target.value, currentPage: 1 }))}
                            placeholder="Cari anggota"
                        />
                        <InputGroup.Text className="bg-primary"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                    </InputGroup>
                </div>
            </div>
            <table className="table-sm table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="w-1">NO</th>
                        <th>NAMA</th>
                        <th>TELP</th>
                        <th>ALAMAT</th>
                        <th className="w-1">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {loading?(
                        <tr>
                            <td colSpan={4} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                        </tr>
                    ): 
                    data.length > 0 ? data.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{startEntry + index}.</td>
                            <td>{item.nama}</td>
                            <td>{item.telp}</td>
                            <td>{item.alamat}</td>
                            <td className="text-end">{item.tabungan?Rupiah(item.tabungan.nominal):''}</td>
                        </tr>
                    )):
                        <tr>
                            <td colSpan={4} className="text-center">Data tidak ditemukan</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="mt-3 row">
                <div className="col-lg-6">
                    Menampilkan {startEntry} hingga {endEntry} dari {pagination.totalRecords} entri
                </div>
                <div className="col-lg-6 text-end">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => updatePage(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1 || loading}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} />
                    </button>
                    <span> Halaman {pagination.currentPage} dari {pagination.lastPage} </span>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => updatePage(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.lastPage || loading}
                    >
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default DaftarTabungan;
