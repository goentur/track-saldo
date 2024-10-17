import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faCogs, faExchangeAlt, faMoneyBillWave, faPlus, faStoreAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Head, Link } from "@inertiajs/react"
import { Card, CardBody, CardHeader, CardTitle, Table } from "react-bootstrap"
import Layout from "../../Layouts/Layout"

function Index({ pengaturanTunais,tokos }) {
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
                                        <td className="f-12">
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
                            <h6 className="m-0"><FontAwesomeIcon icon={faStoreAlt}/> TOKO</h6>
                        </div>
                        <hr />
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="w-1">NO</th>
                                    <th>NAMA</th>
                                    <th>ALAMAT</th>
                                    <th>LOGO</th>
                                    <th className="w-1">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tokos.map((toko,index) => (
                                    <tr key={index}>
                                        <td className="text-center">{ ++index}.</td>
                                        <td>{ toko.nama }</td>
                                        <td>{ toko.alamat }</td>
                                        <td className="w-10 text-center">
                                            <img className="w-2" src={ toko.logo } alt="Logo toko" />
                                        </td>
                                        <td className="text-center">
                                            <Link href={route('pengaturan.toko.edit',toko.id)} className="btn btn-sm btn-success"><FontAwesomeIcon icon={faEdit}/></Link>
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