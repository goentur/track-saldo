import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { pickBy } from "lodash";
import { useRef, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Layout from "../../../Layouts/Layout";
import Pagination from "../../Components/Pagination";
function Index({ pegawais }){
    const route = useRoute();
    const { delete:destroy } = useForm()
    const [isLoading, setIsLoading] = useState(false);
    const perPage = useRef(pegawais.per_page);
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
        router.get(route('master.pegawai.index',pickBy({
            perpage : perPage.current,
            search,
        })),{},{
            preserveScroll : true,
            preserveState : true,
            onFinish : () => setIsLoading(false),
        })
    }

    const hapus = (id) => {
        withReactContent(Swal).fire({
            title: "Apakah Anda serius?",
            text: "ingin menghapus data ini!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#0d6efd",
            confirmButtonText: "Ya, hapus data ini!",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('master.pegawai.destroy',id))
            }
        })
    }
    return (
        <Layout>
            <Head title="PEGAWAI"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle><FontAwesomeIcon icon={faUsers}/> PEGAWAI</CardTitle>
                    <Link href={route('master.pegawai.create')} className="btn btn-primary"><FontAwesomeIcon icon={faPlus}/> TAMBAH DATA</Link>
                </CardHeader>
                <CardBody>
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
                                <th className="w-5">ZONA WAKTU</th>
                                <th className="w-1">EMAIL</th>
                                <th>NAMA</th>
                                <th>TOKO</th>
                                <th className="w-1 text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading?(
                                <tr>
                                    <td colSpan={6} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                                </tr>
                            ): 
                            pegawais.data.map((pegawai,index) => (
                            <tr key={pegawai.id}>
                                <td className="text-center">{ pegawais.from + index}.</td>
                                <td>{ pegawai.zona_waktu.nama }</td>
                                <td>{ pegawai.email }</td>
                                <td>{ pegawai.name }</td>
                                <td>
                                    { pegawai.toko.map(toko => (
                                            <span className="badge me-1 bg-primary" key={pegawai.id+'-'+toko.id}>{toko.nama}</span>
                                        )) 
                                    }
                                </td>
                                <td>
                                    <ButtonGroup aria-label="button action">
                                        <Link href={route('master.pegawai.edit',pegawai)} className="btn btn-sm btn-success"><FontAwesomeIcon icon={faEdit}/></Link>
                                        <Button size="sm" variant="danger" onClick={() => hapus(pegawai.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="row">
                        <div className="col-lg-4">Menampilkan {pegawais.from??0} sampai {pegawais.to??0} dari {pegawais.total} data</div>
                        <div className="col-lg-8"><Pagination datas={pegawais.links}/></div>
                    </div>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Index