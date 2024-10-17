import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { Rupiah } from "../../Helpers/Rupiah";
function Tabungan({ toko, reloadTabungan, onReloadComplete }){
    const route = useRoute();
    const [tabungans, setTabungan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (toko != '' ) {
            getData()
        }
        if (reloadTabungan) {
            getData()
            onReloadComplete()
        }
    }, [toko, reloadTabungan]);

    const getData = async () => {
        setIsLoading(true);
        try {
            const responseTabungan = await axios.post(route('transaksi.tabungan'), { toko: toko });
            setTabungan(responseTabungan.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error);
        }
    }
    return (<>
        <div>
            <Table bordered hover size="sm">
                <thead>
                    <tr className="f-14">
                        <th className="w-1 text-center">NO</th>
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
                    ): null}
                    {tabungans.length > 0 ? tabungans.map((tabungan,index) => (
                    <tr key={tabungan.id}>
                        <td className="text-center">{++index}.</td>
                        <td>{ tabungan.merek.nama }</td>
                        <td>{ tabungan.no }</td>
                        <td className="text-end">{ Rupiah(tabungan.nominal) }</td>
                    </tr>
                    )):
                    <tr>
                        <td colSpan={4} className="text-center">Data Belum ada</td>
                    </tr>
                    }
                </tbody>
            </Table>
        </div>
    </>)
}

export default Tabungan