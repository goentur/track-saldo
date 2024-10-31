import axios from 'axios';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";
import FormPinjam from "./Pinjam/FormPinjam";
import Meminjamkan from "./Pinjam/Meminjamkan";

function Pinjam({ toko, anggotas, onProcessingDone }) {
    const route = useRoute();
    const [tabungans, setTabungan] = useState([]);

    useEffect(() => {
        if (toko != '') {
            getData()
        }
    }, [toko]);
    const getData = async () => {
        try {
            const responseTabungan = await axios.post(route('master.tabungan.data-by-toko'), { toko: toko });
            setTabungan(responseTabungan.data);
        } catch (error) {
            toast.error(error);
        }
    }
    
    return (<>
    <div className="row">
        <div className="col-lg-6">
            <Meminjamkan toko={toko} anggotas={anggotas} tabungans={tabungans} onProcessingDone={onProcessingDone}/>
        </div>
        <div className="col-lg-6">
            <FormPinjam toko={toko} anggotas={anggotas} tabungans={tabungans} onProcessingDone={onProcessingDone}/>
        </div>
    </div>
    </>);
}

export default Pinjam;
