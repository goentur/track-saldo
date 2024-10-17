import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

function NotaBesar({ id, toko, resetSelectedId }) {
    const componentRef = useRef(null);
    const [dataTransaksi, setDataTransaksi] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPageMargins = () => {
        return `
            @page {
                margin: 0.5cm;
            }
        `;
    };

    const handlePrintLaporan = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Nota Transaksi',
        pageStyle: getPageMargins,
        onAfterPrint: () => {
            resetSelectedId();
        },
    });

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(route('transaksi.get'), { id: id });
                setDataTransaksi(response.data);
            } catch (error) {
                toast.error(error.message || "Error fetching transaction data");
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [id]);

    useEffect(() => {
        if (!isLoading && dataTransaksi && componentRef.current) {
            handlePrintLaporan(); // Call printing only after data and ref are ready
        }
    }, [isLoading, dataTransaksi, componentRef.current]);

    if (isLoading || !dataTransaksi) {
        return (<><Spinner size='sm'/> LOADING ...</>);
    }

    return (
        <div ref={componentRef}>
            <table className='table-sm text-center' width={'100%'}>
                <tbody>
                    <tr>
                        <td rowSpan={2} width={'15%'} className='text-center'><img src={toko.logo} width={'35%'} className='img-fluid'/></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <span className='f-14 fw-bold'>{toko.nama}</span>
                            <br className='m-0 p-0' />
                            <span className='f-12'>{toko.alamat}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr className='m-0 p-0' />
            <table className='table-sm f-14'>
                <tbody>
                    <tr>
                        <td className='w-1 fw-semibold'>TANGGAL</td>
                        <td className='w-1'>:</td>
                        <td width={'30%'}>{dataTransaksi?.tanggal}</td>
                        <td className='w-1  fw-semibold'>ANGGOTA</td>
                        <td className='w-1'>:</td>
                        <td>{dataTransaksi?.anggota}</td>
                    </tr>
                    <tr>
                        <td className='fw-semibold'>KASIR</td>
                        <td className='w-1'>:</td>
                        <td>{dataTransaksi?.kasir}</td>
                        <td className='w-1 fw-semibold'>ALAMAT</td>
                        <td className='w-1'>:</td>
                        <td>{dataTransaksi?.alamat}</td>
                    </tr>
                    <tr>
                        <td className='fw-semibold'>TIPE</td>
                        <td className='w-1'>:</td>
                        <td>{dataTransaksi?.tipe}</td>
                        <td className='fw-semibold'>CETAK</td>
                        <td className='w-1'>:</td>
                        <td>{dataTransaksi?.cetak}</td>
                    </tr>
                </tbody>
            </table>
            
            <table className='table table-bordered table-sm f-14 m-0 p-0'>
                <thead>
                    <tr>
                        <th>KETERANGAN</th>
                        <th className='w-4 text-end'>NOMINAL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataTransaksi?.detail.map((value,index) => (
                            <tr key={index}>
                                <td className='2'>{value.keterangan}</td>
                                <td className='text-end'>{value.nominal}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td className='text-end'>TOTAL</td>
                        <td className='text-end fw-bold'>{dataTransaksi.total}</td>
                    </tr>
                </tbody>
            </table>
            <div className='text-center f-10 m-0 p-0'>TERIMA KASIH</div>
            <br className='m-0 p-0' />
            <div className='text-center mt-1 f-10'>potong disini</div>
            <hr className='m-0 p-0' />
        </div>
    );
}

export default NotaBesar;
