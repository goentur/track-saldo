import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import Pinjam from "./Transfer/Pinjam";
import TarikTunai from "./Transfer/TarikTunai";
import TarikTunaiEDC from "./Transfer/TarikTunaiEDC";
import TopUp from "./Transfer/TopUp";
import TransferTunai from "./Transfer/TransferTunai";
import ViaATMNasabah from "./Transfer/ViaATMNasabah";

function Menu({multi, tokos, tanggalTransaksi}){
    const { role } = usePage().props.auth;
    const [toko, setToko] = useState([]);
    const [dataAnggota, setDataAnggota] = useState([]);
    const [modal, setModal] = useState(false);
    const [tipeForm, setTipeForm] = useState(null);
    const [fullscreen, setFullScreen] = useState(null);
    const [title, setTitle] = useState(null);
    const componentTabungan = useRef(null);
    const componentDataTransaksi = useRef(null);
    const handleModal = (tipeForm, fs,title) => {
        setTipeForm(tipeForm)
        setTitle(title)
        setFullScreen(fs)
        setModal(true)
    };
    
    const menuPemiliks = [
        { border: 'border-primary', icon: IconMenu.IconDashboard, label: 'Dashboard', key: 'dashboard' },
        { border: 'border-danger', icon: IconMenu.IconProduktif, label: 'Produktif', key: 'produktif' },
        { border: 'border-danger', icon: IconMenu.IconKonsumtif, label: 'Konsumtif', key: 'konsumtif' },
        { border: 'border-warning', icon: IconMenu.IconMutasiSaldo, label: 'Mutasi Saldo', key: 'mutasi-saldo' },
    ]
    const menuPegawais = [
        { border: 'border-warning', icon: IconMenu.IconPinjam, label: 'Pinjam', key: 'pinjam' },
        { border: 'border-success', icon: IconMenu.IconPenghasilanLain, label: 'Penghasilan Lain', key: 'penghasilan-lain' },
        { border: 'border-primary', icon: IconMenu.IconTransferViaAtmNasabah, label: 'Via ATM Na...', key: 'via-atm-nasabah' },
        { border: 'border-primary', icon: IconMenu.IconTopUp, label: 'Top Up', key: 'top-up' },
        { border: 'border-primary', icon: IconMenu.IconTransferTunai, label: 'Transfer Tunai', key: 'transfer-tunai' },
        { border: 'border-primary', icon: IconMenu.IconTarikTunai, label: 'Tarik Tunai', key: 'tarik-tunai' },
        { border: 'border-primary', icon: IconMenu.IconEdc, label: 'Tarik Tunai EDC', key: 'tarik-tunai-edc' },
        { border: 'border-primary', icon: IconMenu.IconTabunganAnggota, label: 'Tabungan', key: 'tabungan', persist: true },
        { border: 'border-primary', icon: IconMenu.IconInvestasi, label: 'Investasi', key: 'investasi', persist: true },
        { border: 'border-primary', icon: IconMenu.IconPaketPulsa, label: 'Pulsa', key: 'pulsa' },
        { border: 'border-primary', icon: IconMenu.IconPaketInternet, label: 'Paket Data', key: 'paket-data' },
        { border: 'border-info', icon: IconMenu.IconLaporan, label: 'Laporan', key: 'laporan' },
        { border: 'border-info', icon: IconMenu.IconLaporanDetail, label: 'Laporan Detail', key: 'laporan-detail' },
        { border: 'border-info', icon: IconMenu.IconAnggota, label: 'Anggota', key: 'anggota' }
    ];
    useEffect(() => {
        handleSetDataAnggota()
        handleReloadData()
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
    const handleReloadData = () => {
        setModal(false);
        if (componentTabungan.current && componentDataTransaksi.current) {
            componentTabungan.current.dataTabungan(multi?toko:tokos);
            componentDataTransaksi.current.dataTransaksi(multi?toko:tokos, tanggalTransaksi);
        }
    }
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
                <Tabungan ref={componentTabungan}/>
            </div>
            <div className="col-lg-9">
                <div className="row gap-2 d-flex justify-content-center mb-3">
                    {role == 'pemilik' && menuPemiliks
                    .map(item => (
                        <div key={item.key} className={`card col-md-1 ${item.border} p-1 align-items-center text-center shadow`}>
                            <img src={item.icon} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                            <p className="br p-0 m-0 f-12">{item.label}</p>
                            <a
                                href="#"
                                onClick={() =>
                                    multi ? toko : tokos ? handleModal(item.key, item.persist || false, item.label) : toast.error('Pilih toko terlebih dahulu')
                                }
                                className="stretched-link"
                            ></a>
                        </div>
                    ))}
                    {menuPegawais
                    .map(item => (
                        <div key={item.key} className={`card col-md-1 ${item.border} p-1 align-items-center text-center shadow`}>
                            <img src={item.icon} alt="Menu Icon" className="col-6 img-fluid m-0 p-0" />
                            <p className="br p-0 m-0 f-12">{item.label}</p>
                            <a
                                href="#"
                                onClick={() =>
                                    multi ? toko : tokos ? handleModal(item.key, item.persist || false, item.label) : toast.error('Pilih toko terlebih dahulu')
                                }
                                className="stretched-link"
                            ></a>
                        </div>
                    ))}
                </div>
                <hr className="p-0 mt-2 mb-2" />
                <DataTransaksi ref={componentDataTransaksi} role={role} toko={multi?toko:tokos} anggotas={dataAnggota} tanggalTransaksi={tanggalTransaksi} onProcessingDone={handleReloadData}/>
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
                {tipeForm == 'dashboard' ? <Dashboard toko={multi?toko:tokos.id} tanggalTransaksi={tanggalTransaksi}/>:null}
                {tipeForm == 'produktif' ? <Produktif toko={multi?toko:tokos.id} tanggalTransaksi={tanggalTransaksi} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'konsumtif' ? <Konsumtif toko={multi?toko:tokos.id} tanggalTransaksi={tanggalTransaksi} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'mutasi-saldo' ? <MutasiSaldo toko={multi?toko:tokos.id} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'pinjam' ? <Pinjam toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'penghasilan-lain' ? <PenghasilanLain toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'via-atm-nasabah' ? <ViaATMNasabah toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'top-up' ? <TopUp toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'transfer-tunai' ? <TransferTunai toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'tarik-tunai' ? <TarikTunai toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'tarik-tunai-edc' ? <TarikTunaiEDC toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'tabungan' ? <TabunganAnggota toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'investasi' ? <InvestasiAnggota toko={multi?toko:tokos.id} anggotas={dataAnggota} onProcessingDone={handleReloadData} showModalAnggota={() => handleModal('anggota', false, 'Anggota')}/>:null}
                {tipeForm == 'pulsa' ? <Pulsa toko={multi?toko:tokos.id} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'paket-data' ? <PaketData toko={multi?toko:tokos.id} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'laporan' ? <DataLaporan toko={multi?toko:tokos.id} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'laporan-detail' ? <DataLaporanDetail toko={multi?toko:tokos.id} onProcessingDone={handleReloadData}/>:null}
                {tipeForm == 'anggota' ? <FormAnggota toko={multi?toko:tokos.id}/>:null}
            </Modal.Body>
        </Modal>
    </Layout>
    )
}

export default Menu