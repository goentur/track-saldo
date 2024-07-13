import { Link } from "@inertiajs/react";

function Pagination({ datas }) {
    return (
    <>
        <nav aria-label="pagination data">
          <ul className="pagination justify-content-end">
            {datas.map((data) => (
                data.url ? 
                <li key={data.label} className="page-item">
                    <Link href={data.url} dangerouslySetInnerHTML={{ __html: data.label }} className={`page-link ${data.active ? "active" : ""}`} preserveScroll preserveState/>
                </li>
                : 
                <li key={data.label} className="page-item disabled">
                    <span dangerouslySetInnerHTML={{ __html: data.label }} className="page-link"></span>
                </li>
            ))}
          </ul>
        </nav>
    </>
    );
}

export default Pagination;