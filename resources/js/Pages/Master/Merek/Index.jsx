import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../../Layouts/Layout";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { faEdit, faStar } from "@fortawesome/free-regular-svg-icons";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Form, InputGroup, Modal, Spinner, Table } from "react-bootstrap";
import { useRef, useState } from "react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Pagination from "../../Components/Pagination";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { pickBy } from "lodash";
function Index({ mereks }){
    const route = useRoute();
    const { delete:destroy } = useForm()
    const [isLoading, setIsLoading] = useState(false);
    const perPage = useRef(mereks.per_page);
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
        router.get(route('merek.index',pickBy({
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
                destroy(route('merek.destroy',id))
            }
        })
    }
    return (
        <Layout>
            <Head title="MEREK"/>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h1><FontAwesomeIcon icon={faStar}/> MEREK</h1>
                    <Link href={route('merek.create')} className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faPlus}/> TAMBAH DATA</Link>
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
                                <th>NAMA</th>
                                <th className="w-1 text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading?(
                                <tr>
                                    <td colSpan={3} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                                </tr>
                            ): 
                            mereks.data.map((merek,index) => (
                            <tr key={merek.id}>
                                <td className="text-center">{ mereks.from + index}.</td>
                                <td>{ merek.nama }</td>
                                <td>
                                <ButtonGroup aria-label="button action">
                                <Link href={route('merek.edit',merek)} className="btn btn-sm btn-success"><FontAwesomeIcon icon={faEdit}/></Link>
                                <Button size="sm" variant="danger" onClick={() => hapus(merek.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                </ButtonGroup>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="row">
                        <div className="col-lg-4">Menampilkan {mereks.from} sampai {mereks.to} dari {mereks.total} data</div>
                        <div className="col-lg-8"><Pagination datas={mereks.links}/></div>
                    </div>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Index