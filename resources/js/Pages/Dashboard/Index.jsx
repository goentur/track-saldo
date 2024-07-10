import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../Layouts/Layout";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";

function Index(){
    return (
    <Layout>
        <Head title="DASHBOARD"/>
        <h3><FontAwesomeIcon icon={faDashboard}/> DASHBOARD</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae fugit assumenda voluptatem voluptatibus consectetur. Esse laborum minus quibusdam recusandae nam suscipit similique corrupti perferendis, harum ad nulla sed fuga quis!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae fugit assumenda voluptatem voluptatibus consectetur. Esse laborum minus quibusdam recusandae nam suscipit similique corrupti perferendis, harum ad nulla sed fuga quis!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae fugit assumenda voluptatem voluptatibus consectetur. Esse laborum minus quibusdam recusandae nam suscipit similique corrupti perferendis, harum ad nulla sed fuga quis!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae fugit assumenda voluptatem voluptatibus consectetur. Esse laborum minus quibusdam recusandae nam suscipit similique corrupti perferendis, harum ad nulla sed fuga quis!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae fugit assumenda voluptatem voluptatibus consectetur. Esse laborum minus quibusdam recusandae nam suscipit similique corrupti perferendis, harum ad nulla sed fuga quis!</p>
    </Layout>
    )
}

export default Index