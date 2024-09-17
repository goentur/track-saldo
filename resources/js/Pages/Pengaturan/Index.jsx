import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faCogs, faExchangeAlt, faMoneyBillWave, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Head, Link } from "@inertiajs/react"
import { Card, CardBody, CardHeader, CardTitle, Table } from "react-bootstrap"
import Layout from "../../Layouts/Layout"

function Index({ pengaturanTunais,pengaturanBiayaTransfers }) {
    return (
        <>
            <Head title="PENGATURAN"/>
            <Layout>
                <Card>
                    <CardHeader>
                        <CardTitle><FontAwesomeIcon icon={faCogs}/> PENGATURAN</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="m-0"><FontAwesomeIcon icon={faMoneyBillWave}/> TABUNGAN TUNAI</h6>
                            <Link href={route('pengaturan.tunai.tambah')} className="btn btn-primary"><FontAwesomeIcon icon={faPlus}/> TAMBAH</Link>
                        </div>
                        <hr />
                        <div className="alert alert-info">
                            <p>INFORMASI</p>
                            <ul>
                                <li>Buatlah pengaturan tunai pada masing-masing toko.</li>
                                <li>Jika anda mengubah data pengaturan, maka transaksi yang bersifat uang tunai akan masuk ke tabungan yang anda ubah.</li>
                            </ul>
                        </div>
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="w-1">NO</th>
                                    <th>PENGGUNA</th>
                                    <th>TOKO</th>
                                    <th>MEREK</th>
                                    <th className="w-1">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengaturanTunais.map((pengaturanTunai,index) => (
                                    <tr key={index}>
                                        <td className="text-center">{ ++index}.</td>
                                        <td>
                                            { pengaturanTunai.pengguna }
                                            <br />
                                            { pengaturanTunai.tanggal }
                                        </td>
                                        <td>{ pengaturanTunai.toko }</td>
                                        <td>
                                            { pengaturanTunai.tabungan }
                                            <br />
                                            { pengaturanTunai.no_tabungan }
                                        </td>
                                        <td className="text-center">
                                            <Link href={route('pengaturan.tunai.edit',pengaturanTunai.id)} className="btn btn-sm btn-success"><FontAwesomeIcon icon={faEdit}/></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="m-0"><FontAwesomeIcon icon={faExchangeAlt}/> BIAYA TRANSFER</h6>
                            <Link href={route('pengaturan.biaya-transfer.tambah')} className="btn btn-primary"><FontAwesomeIcon icon={faPlus}/> TAMBAH</Link>
                        </div>
                        <hr />
                        <div className="alert alert-info">
                            <p>INFORMASI</p>
                            <ul>
                                <li>Buatlah pengaturan biaya transfer pada masing-masing toko.</li>
                                <li>Jika anda mengubah data pengaturan, maka transaksi nominal biaya transfer akan mengikuti perubahan  data.</li>
                            </ul>
                        </div>
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="w-1">NO</th>
                                    <th>PENGGUNA</th>
                                    <th>TOKO</th>
                                    <th className="w-1">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengaturanBiayaTransfers.map((data,index) => (
                                    <tr key={index}>
                                        <td className="text-center">{ ++index}.</td>
                                        <td>
                                            { data.pengguna }
                                            <br />
                                            { data.tanggal }
                                        </td>
                                        <td>
                                            { data.toko }
                                            <br />
                                            { data.nominal }
                                        </td>
                                        <td className="text-center">
                                            <Link href={route('pengaturan.biaya-transfer.edit',data.id)} className="btn btn-sm btn-success"><FontAwesomeIcon icon={faEdit}/></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Layout>
        </>
    )
}
export default Index