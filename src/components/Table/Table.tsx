import { getFormattedDate } from '@/utils/Utils';
import React, { useState } from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Modal from '../Modal/Modal';
import style from './Table.module.scss';

export interface TableProps {
    headers: string[];
    items: ItemProps[];
    deleteProduct: (id: string) => void;
    pageResults: number;
    setPageResults: (value: number) => void;
    navigateTo: any;
}

export interface ItemProps {
    id: string,
    name: string,
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
    emptyColumn?: string;
};

const Table: React.FC<TableProps> = ({ headers, items, deleteProduct, pageResults, setPageResults, navigateTo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ItemProps | any>();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const handleDropdownToggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteProduct = (id: string) => {
        try {
            deleteProduct(id);
            closeModal();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleOnclick = (option: string, item: ItemProps) => {
        if (option === "Editar") {
            navigateTo(`/editar/${item.id}?name=${item.name}&description=${item.description}&logo=${item.logo}&date_release=${item.date_release}&date_revision=${item.date_revision}`);
        }

        if (option === "Eliminar") {
            setSelectedProduct(item);
            setIsModalOpen(true);
        }
    };

    const handleProductsResults = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageResults(Number(e.target.value))
    }

    return (
        <div className={`${style.bankTable}`}>
            {(items && items.length > 0) ?
                <>
                    <div className={style.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: ItemProps, index: number) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img className={style.itemImage} src={item.logo} alt={item.name} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{getFormattedDate(item.date_release, "DD/MM/YYYY")}</td>
                                        <td>{getFormattedDate(item.date_revision, "DD/MM/YYYY")}</td>
                                        <td>
                                            <Dropdown
                                                options={['Editar', 'Eliminar']}
                                                isOpen={index === openIndex}
                                                onClickOption={(option) => {
                                                    handleOnclick(option, item);
                                                    setSelectedProduct(item);
                                                }}
                                                onToggle={() => handleDropdownToggle(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.tableFooter}>
                        <span className={style.result}>
                            {items.length} Resultados
                        </span>

                        <div className={style.selectWrapper}>
                            <select
                                name="pages"
                                title="Resultados"
                                onChange={handleProductsResults}
                                value={pageResults}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                </> :
                <div className={style.emptyTable}>
                    <img src="https://i.imgur.com/QpOQLEw.png" alt="" />
                    <h3>Aún no hay productos registrado.</h3>
                </div>
            }
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                className={style.deleteModal}
                role="dialog"
            >
                <section>
                    <p
                        data-testid="modal-description"
                        className={style.description}
                    >¿Estas seguro de eliminar el producto {selectedProduct && selectedProduct.name}?</p>
                </section>
                <footer>
                    <Button
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleDeleteProduct(selectedProduct && selectedProduct.id)}
                        buttonStyle="primary"
                    >
                        Confirmar
                    </Button>
                </footer>
            </Modal>
        </div>
    );
};

export default Table;
