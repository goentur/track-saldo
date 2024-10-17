import { faEdit, faSave } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faRefresh, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal, Spinner } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
function FormAnggota({toko}) {
    const route = useRoute();
    const [loadingData, setLoadingData] = useState(false);
    const [loadingFormAnggota, setLoadingFormAnggota] = useState(false);
    const [loadingPengambilanPoin, setLoadingPengambilanPoin] = useState(false);
    const [search, setSearch] = useState("");
    const [dataAnggota, setDataAnggota] = useState(null);
    const [modalAnggota, setModalAnggota] = useState(false);
    const [dataForm, setDataForm] = useState({
        id: "",
        toko_id: toko,
        nama: "",
        telp: "",
        alamat: "",
    });
    useEffect(() => {
        getData()
    }, [toko]);
    const simpanAtauUpdate = async (e) => {
        e.preventDefault()
        setLoadingFormAnggota(true);
        try {
            const response = await axios.post(route('master.anggota.simpan-atau-ubah'), dataForm);
            toast.success(response.data.pesan);
            setLoadingFormAnggota(false)
            muatUlangForm()
            getData();
        } catch (error) {
            toast.error(error);
            setLoadingFormAnggota(false)
        }
    }
    const [nominalPengambilanPoin, setNominalPengambilanPoin] = useState();
    const [dataFormPenambilanPoin, setDataFormPenambilanPoin] = useState({
        id: "",
        toko_id: toko,
        nama: "",
        telp: "",
        alamat: "",
        poin: "",
        nominalPoin: "",
    })
    const simpanPengambilanPoin = async (e) => {
        e.preventDefault()
        if(nominalPengambilanPoin > dataFormPenambilanPoin.nominalPoin){
            toast.error("Nominal pengambilan poin melebihi poin yang didapat");
        }else{
            setLoadingPengambilanPoin(true);
            try {
                const response = await axios.post(route('master.anggota.pengambilan-poin'), {
                    toko : toko,
                    anggota : dataFormPenambilanPoin.id,
                    nominalPengambilanPoin : nominalPengambilanPoin,
                });
                setModalAnggota(false)
                toast.success(response.data.pesan);
                muatUlangForm()
                getData();
                setLoadingPengambilanPoin(false)
            } catch (error) {
                toast.error(error);
                setLoadingPengambilanPoin(false)
            }
        }
    }
    function muatUlangForm (){
        setDataForm({
            id: "",
            toko_id: toko,
            nama: "",
            telp: "",
            alamat: "",
            poin: "",
            nominalPoin: "",
        })
    }
    const getData = async () => {
        setLoadingData(true);
        try {
            const response = await axios.post(route('master.anggota.data'), {
                toko : toko,
                search : search,
            });
            setDataAnggota(response.data);
            setLoadingData(false)
        } catch (error) {
            setLoadingData(false)
            toast.error(error);
        }
    }
    function ambilSatu(id) {
        const anggota = dataAnggota.find(anggota => anggota.id === id);
        setDataForm(anggota)
    }
    function ambilPoin(id) {
        const anggota = dataAnggota.find(anggota => anggota.id === id);
        setDataFormPenambilanPoin(anggota)
        setModalAnggota(true)
    }
    return (<>
        <Form onSubmit={simpanAtauUpdate} className="row">
            <Form.Group className="mb-3 col-lg-4" controlId="validationFormNama">
                <Form.Label>NAMA <span className="text-danger">*</span></Form.Label>
                <Form.Control size="lg" type="text" placeholder="Masukan nama" aria-describedby="inputGroupPrepend" name="nama" value={dataForm.nama||''} onChange={(e) => setDataForm((prevState) => ({...prevState, "nama" : e.target.value}))} required/>
            </Form.Group>
            <Form.Group className="mb-3 col-lg-2" controlId="validationFormTelp">
                <Form.Label>TELP <span className="text-danger">*</span></Form.Label>
                <CurrencyInput id="telp" name="telp" placeholder="Masukan telp" className={`form-control form-control-lg`} disableGroupSeparators={true} onValueChange={(values) => setDataForm((prevState) => ({...prevState, "telp" : values}))} required value={dataForm.telp||''} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="validationFormAlamat">
                <Form.Label>ALAMAT <span className="text-danger">*</span></Form.Label>
                <Form.Control size="lg" type="text" placeholder="Masukan alamat" aria-describedby="inputGroupPrepend" name="alamat" value={dataForm.alamat||''} onChange={(e) => setDataForm((prevState) => ({...prevState, "alamat" : e.target.value}))} required/>
            </Form.Group>
            <div className="col-lg-12">
                <Button variant="primary" type="submit" className="align-item-end" disabled={loadingFormAnggota}>{loadingFormAnggota?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FontAwesomeIcon icon={faSave}/> } SIMPAN</Button>
                <Button variant="danger" type="button" className="ms-3" disabled={loadingFormAnggota} onClick={() => muatUlangForm()}>{loadingFormAnggota?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FontAwesomeIcon icon={faRefresh}/> } MUAT ULANG FORM</Button>
            </div>
        </Form>
        <hr />
        <Form onSubmit={(e) => {e.preventDefault(); getData()}} className="row mb-2">
            <div className="col-lg-6 text-info fw-14">
                <FontAwesomeIcon icon={faInfoCircle} /> Data yang ditampilkan hanya 5, silahkan cari data pada form
            </div>
            <div className="col-lg-4">
                <Form.Control type="text" placeholder="Cari anggota" name="cari" value={search} onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Button type="submit" className="col-lg-1"><FontAwesomeIcon icon={faSearch}/> CARI</Button>
        </Form>
        <table className="table table-bordered table-hovered">
            <thead>
                <tr>
                    <th className="w-1 text-center">NO</th>
                    <th>NAMA</th>
                    <th className="w-1">TELP</th>
                    <th>ALAMAT</th>
                    <th className="text-end">POIN</th>
                    <th className="w-1 text-center">AKSI</th>
                </tr>
            </thead>
            <tbody className="">
                {loadingData?(
                    <tr>
                        <td colSpan={7} className="text-center"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Mohon Tunggu...</td>
                    </tr>
                ): null}
                {dataAnggota !== null ? dataAnggota.map((value,index) => (
                <tr key={index}>
                    <td className="text-center">{++index}.</td>
                    <td>{ value.nama }</td>
                    <td>{ value.telp }</td>
                    <td>{ value.alamat }</td>
                    <td className="text-end">{ value.poin }</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="button action">
                            <Button size="sm" variant="success" onClick={() => ambilSatu(value.id)}><FontAwesomeIcon icon={faEdit}/></Button>
                            <Button size="sm" variant="primary" onClick={() => ambilPoin(value.id)}><FontAwesomeIcon icon={faShoppingCart}/></Button>
                        </ButtonGroup>
                    </td>
                </tr>
                )):
                <tr>
                    <td colSpan={7} className="text-center">Data Belum ada</td>
                </tr>
                }
            </tbody>
        </table>
        <Modal
            show={modalAnggota}
            onHide={() => {
                setModalAnggota(false)
            }}
            backdrop="static"
            keyboard={false}
            aria-labelledby="modal"
            centered
            size="lg"
        >
            <Modal.Header closeButton>
            <Modal.Title id="modal">
                PENGAMBILAN POIN ANGGOTA
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-6">
                        <table className="table-sm">
                            <tbody>
                                <tr>
                                    <td className="w-1 top">NAMA</td>
                                    <td className="w-1 top">:</td>
                                    <td>{dataFormPenambilanPoin.nama}</td>
                                </tr>
                                <tr>
                                    <td className="w-1 top">TELP</td>
                                    <td className="w-1 top">:</td>
                                    <td>{dataFormPenambilanPoin.telp}</td>
                                </tr>
                                <tr>
                                    <td className="w-1 top">ALAMAT</td>
                                    <td className="w-1 top">:</td>
                                    <td>{dataFormPenambilanPoin.alamat}</td>
                                </tr>
                                <tr>
                                    <td className="w-1 top">POIN</td>
                                    <td className="w-1 top">:</td>
                                    <td>{dataFormPenambilanPoin.poin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6">
                        <Form onSubmit={simpanPengambilanPoin}>
                            <Form.Group className="mb-3" controlId="validationFormNominal">
                                <Form.Label>NOMINAL <span className="text-danger">*</span></Form.Label>
                                <CurrencyInput
                                    autoFocus
                                    id="nominal"
                                    name="nominal"
                                    placeholder="Masukan nominal"
                                    prefix="Rp "
                                    required
                                    className={`form-control form-control-lg text-end`}
                                    onValueChange={(values) => setNominalPengambilanPoin(values)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="align-item-end" disabled={loadingPengambilanPoin}>
                                {loadingPengambilanPoin ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FontAwesomeIcon icon={faSave} />} SIMPAN
                            </Button>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>)
}

export default FormAnggota