import style from './Home.module.scss';

import Button from '@/components/Button/Button';
import InputSearch from '@/components/InputSearch/InputSearch';
import Layout from '@/components/Layout/Layout';
import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/Table';
import { axiosService } from '@/utils/Utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface itemProps {
    id: string,
    name: string,
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

const Home = () => {
    const [pageResults, setPageResults] = useState(5);
    const [lastDeleted, setLastDeleted] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<itemProps[]>([]);
    const navigate = useNavigate();

    const headers = ['Logo', 'Nombre del producto', 'Descripción', 'Fecha de liberación', 'Fecha de reestructuración', ''];

    const processData = (data: itemProps[] = []) => {
        const finalData = data
            .filter(el => {
                if (el.name.toLowerCase().includes(searchValue)
                    || el.description.toLowerCase().includes(searchValue)) {
                    return el
                }
            })
            .slice(0, pageResults).map(item => ({
                ...item,
                emptyColumn: ''
            }));

        return finalData;
    }

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axiosService({
                method: "get",
                url: "/bp/products"
            });
            const newData = processData(response.data);
            setProducts(newData);
        } catch (error: any) {
            console.error('Error:', error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            const response = await axiosService({
                method: "delete",
                url: `/bp/products/${id}`
            });
            if (response.message === "Product removed successfully") {
                setLastDeleted(id);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [lastDeleted,
        pageResults,
        searchValue]);

    return (
        <Layout>
            <div className={style.header}>
                <InputSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Button
                    buttonStyle="primary"
                    type="button"
                    onClick={() => navigate("/agregar")}
                >
                    Agregar
                </Button>
            </div>

            {isLoading ? <Spinner /> : <Table
                headers={headers}
                items={products}
                deleteProduct={deleteProduct}
                pageResults={pageResults}
                setPageResults={setPageResults}
                navigateTo={navigate}
            />}


        </Layout>
    )
}

export default Home