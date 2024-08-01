import Layout from "../Layouts/Layout"
import { Head } from "@inertiajs/react"

function Error({ message }) {
    return (
        <>
            <Head title="ERROR"/>
            <Layout>
                <div className="alert alert-danger text-center">
                    <h3>PERINGATAN</h3>
                    { message }
                </div>
            </Layout>
        </>
    )
}
export default Error