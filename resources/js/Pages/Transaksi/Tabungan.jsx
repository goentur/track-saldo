import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { pickBy } from "lodash";
import { useRef, useState } from "react";
import { Button, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { Rupiah } from "../../Helpers/Rupiah";
import Pagination from "../Components/Pagination";
function Tabungan({ tabungans }){
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const perPage = useRef(tabungans.per_page);
    const [search, setSearch] = useState("");
    const handleChangePerPage = (e) => {
        perPage.current = e.target.value;
        getData()
    }
    const handleSearch = (e) => {
        e.preventDefault();
        getData()
    }
    const getData = () => {
        setIsLoading(true);
        router.get(route('transaksi.menu',pickBy({
            perpage : perPage.current,
            search,
        })),{},{
            preserveScroll : true,
            preserveState : true,
            onFinish : () => setIsLoading(false),
        })
    }
    return (<>
        <div className="row mb-2">
            <div className="col-lg-1">
                <select name="" id="" className="form-control" value={perPage.current} onChange={handleChangePerPage}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="col-lg-11">
                <Form onSubmit={handleSearch}>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" placeholder="Cari data" aria-describedby="inputGroupPrepend" name="search" autoFocus value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <Button variant="primary" type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
                    </InputGroup>
                </Form>
            </div>
        </div>
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th className="w-1 text-center">NO</th>
                    <th>TOKO</th>
                    <th>MEREK</th>
                    <th className="w-1">NO</th>
                    <th className="w-1 text-end">NOMINAL</th>
                </tr>
            </thead>
            <tbody>
                {isLoading?(
                    <tr>
                        <td colSpan={7} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                    </tr>
                ): 
                tabungans.data.map((tabungan,index) => (
                <tr key={tabungan.id}>
                    <td className="text-center">{ tabungans.from + index}.</td>
                    <td>{ tabungan.toko.nama }</td>
                    <td>{ tabungan.merek.nama }</td>
                    <td>{ tabungan.no }</td>
                    <td className="text-end">{ Rupiah(tabungan.nominal) }</td>
                </tr>
                ))}
            </tbody>
        </Table>
        <div className="row">
            <div className="col-lg-4">Menampilkan {tabungans.from} sampai {tabungans.to} dari {tabungans.total} data</div>
            <div className="col-lg-8"><Pagination datas={tabungans.links}/></div>
        </div>
    </>)
}

export default Tabungan