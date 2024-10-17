import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";
import IconMenu from "../../../images/menus/IconMenu";
import Layout from "../../Layouts/Layout";
import Dashboard from "../Dashboard";
import DataLaporan from "../Laporan/DataLaporan";
import DataLaporanDetail from "../Laporan/DataLaporanDetail";
import FormAnggota from "./Anggota/FormAnggota";
import InvestasiAnggota from "./Anggota/InvestasiAnggota";
import TabunganAnggota from "./Anggota/TabunganAnggota";
import DataTransaksi from "./DataTransaksi";
import Konsumtif from "./Pengeluaran/Konsumtif";
import Produktif from "./Pengeluaran/Produktif";
import PaketData from "./Penjualan/PaketData";
import Pulsa from "./Penjualan/Pulsa";
import Tabungan from "./Tabungan";
import MutasiSaldo from "./Transfer/MutasiSaldo";
import PenghasilanLain from "./Transfer/PenghasilanLain";
import TarikTunai from "./Transfer/TarikTunai";
import TarikTunaiEDC from "./Transfer/TarikTunaiEDC";
import Tunai from "./Transfer/Tunai";
import ViaATMNasabah from "./Transfer/ViaATMNasabah";

function Menu({multi, tokos, tanggalTransaksi}){
    const { role } = usePage().props.auth;
    const [toko, setToko] = useState([]);
    const [reloadTabungan, setReloadTabungan] = useState(false);
    const [dataAnggota, setDataAnggota] = useState([]);
    const [modal, setModal] = useState(false);
    const [tipeForm, setTipeForm] = useState(null);
    const [fullscreen, setFullScreen] = useState(null);
    const [title, setTitle] = useState(null);
    const handleModal = (tipeForm, fs,title) => {
        setTipeForm(tipeForm)
        setTitle(title)
        setFullScreen(fs)
        setModal(true)
    };
    
    useEffect(() => {
        if (tokos != '') {
            handleSetDataAnggota()
        }
    }, [tokos]);

    const handleSetDataAnggota = async () => {
        try {
            const responseAnggota = await axios.post(route('master.anggota.data-by-toko'), { toko: multi?toko:tokos.id });
            setDataAnggota(responseAnggota.data);
            setModal(false);
        } catch (error) {
            toast.error(error);
        }
    }
    const handleChildProcessingDone = () => {
        setModal(false);
        setReloadTabungan(true)
    };
    const handleResetReloadTabungan = () => {
        setReloadTabungan(false);
    };
  
    return (
    <Layout>
        <Head title="TRANSAKSI"/>
        <div className="row">
            <div className="col-lg-3">
                {multi?
                <Form.Group className="mb-3 col-lg-12" controlId="validationFormToko">
                    <Typeahead
                        id="toko"
                        name="toko"
                        placeholder="Pilih toko"
                        size="lg"
                        autoFocus
                        required
                        labelKey={(tokos) => `${tokos.nama}`}
                        options={tokos}
                        onChange={(selected) => setToko(selected.length > 0 ? selected[0].id : '')}
                    />
                </Form.Group>
                :null}
                <Tabungan toko={multi?toko:tokos.id} reloadTabungan={reloadTabungan} onReloadComplete={handleResetReloadTabungan}/>
            </div>
            <div className="col-lg-9">
                <div className="row gap-2 d-flex justify-content-center mb-3">
                    {role == 'pemilik' ? (<>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconDashboard} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Dashboard</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('dashboard', false, 'Dashboard') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-warning p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconMutasiSaldo} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Mutasi Saldo</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('mutasi-saldo', false, 'Mutasi Saldo') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-danger p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconProduktif} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Produktif</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('produktif', false, 'Produktif') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-danger p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconKonsumtif} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Konsumtif</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('konsumtif', false, 'Konsumtif') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    </>):''}
                    <div className="card col-md-1 border-success p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconPenghasilanLain} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Penghasilan Lain</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('penghasilan-lain', false, 'Penghasilan Lain') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconTransferViaAtmNasabah} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Via ATM Na...</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('via-atm-nasabah', false, 'Via ATM Nasabah') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconTransferTunai} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Transfer Tunai</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('transfer-tunai', false, 'Transfer Tunai') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconTarikTunai} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Tarik Tunai</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('tarik-tunai', false, 'Tarik Tunai') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconEdc} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Tarik Tunai EDC</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('tarik-tunai-edc', false, 'Tarik Tunai EDC') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconTabunganAnggota} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Tabungan</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('tabungan', true, 'Tabungan') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconInvestasi} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Investasi</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('investasi', true, 'Investasi') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconPaketPulsa} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Pulsa</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('pulsa', false, 'Pulsa') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconPaketInternet} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Paket Data</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('paket-data', false, 'Paket Data') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconLaporan} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Laporan</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('laporan', false, 'Laporan') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconLaporanDetail} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Laporan Detail</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('laporan-detail', false, 'Laporan Detail') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                    <div className="card col-md-1 border-primary p-1 align-items-center text-center shadow">
                        <img src={IconMenu.IconAnggota} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                        <p className="br p-0 m-0 f-12">Anggota</p>
                        <a href="#" onClick={() => multi? toko:tokos ? handleModal('anggota', false, 'Anggota') : toast.error('Pilih toko terlebih dahulu')}  className="stretched-link"></a>
                    </div>
                </div>
                <hr className="p-0 mt-2 mb-2" />
                <DataTransaksi toko={multi?toko:tokos} anggotas={dataAnggota} reloadTabungan={reloadTabungan} onReloadComplete={handleResetReloadTabungan} tanggalTransaksi={tanggalTransaksi} />
            </div>
        </div>
        <Modal
            dialogClassName={fullscreen?null:"modal-90w"}
            fullscreen={fullscreen}
            show={modal}
            onHide={() => {
                if(tipeForm=='anggota'){
                    handleSetDataAnggota()
                }
                setModal(false)
            }}
            backdrop="static"
            keyboard={false}
            aria-labelledby="modal"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="modal">
                {title}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tipeForm == 'dashboard' ? <Dashboard toko={multi?toko:tokos.id}/>:''}
                {tipeForm == 'mutasi-saldo' ? <MutasiSaldo toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'produktif' ? <Produktif toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'konsumtif' ? <Konsumtif toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'penghasilan-lain' ? <PenghasilanLain toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'via-atm-nasabah' ? <ViaATMNasabah toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleChildProcessingDone} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:''}
                {tipeForm == 'transfer-tunai' ? <Tunai toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleChildProcessingDone} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:''}
                {tipeForm == 'tarik-tunai' ? <TarikTunai toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleChildProcessingDone} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:''}
                {tipeForm == 'tarik-tunai-edc' ? <TarikTunaiEDC toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleChildProcessingDone} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:''}
                {tipeForm == 'tabungan' ? <TabunganAnggota toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleChildProcessingDone} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:''}
                {tipeForm == 'investasi' ? <InvestasiAnggota toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleChildProcessingDone} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:''}
                {tipeForm == 'pulsa' ? <Pulsa toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'paket-data' ? <PaketData toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'laporan' ? <DataLaporan toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'laporan-detail' ? <DataLaporanDetail toko={multi?toko:tokos.id} onProcessingDone={handleChildProcessingDone}/>:''}
                {tipeForm == 'anggota' ? <FormAnggota toko={multi?toko:tokos.id}/>:''}
            </Modal.Body>
        </Modal>
    </Layout>
    )
}

export default Menu