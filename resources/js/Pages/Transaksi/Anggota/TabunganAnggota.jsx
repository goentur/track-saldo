import axios from 'axios';
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import Setor from "./Tabungan/Setor";
import Tarik from "./Tabungan/Tarik";

function TabunganAnggota({ toko, anggotas, onProcessingDone, showModalAnggota }) {
    const route = useRoute();
    const [tabungans, setTabungan] = useState([]);
    const [nominalBiayaTransfer, setNominalBiayaTransfer] = useState([]);

    useEffect(() => {
        if (toko != '') {
            getData()
        }
    }, [toko]);
    const getData = async () => {
        try {
            const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: toko });
            setTabungan(responseTabungan.data);
            const responseBiayaTransfer = await axios.post(route('pengaturan.biaya-transfer.data-by-toko'), { toko: toko });
            setNominalBiayaTransfer(responseBiayaTransfer.data.nominal);
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>SETOR</Accordion.Header>
                <Accordion.Body>
                    <Setor toko={toko} anggotas={anggotas} tabungans={tabungans} onProcessingDone={onProcessingDone} showModalAnggota={showModalAnggota}/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>TARIK</Accordion.Header>
                <Accordion.Body>
                    <Tarik toko={toko} anggotas={anggotas} tabungans={tabungans} onProcessingDone={onProcessingDone} nominalBiayaTransfer={nominalBiayaTransfer}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default TabunganAnggota;
