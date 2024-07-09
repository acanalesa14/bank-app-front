import Form from '@/components/Form/Form';
import Layout from '@/components/Layout/Layout';
import useForm, { FormValues } from '@/hooks/useForm';
import { axiosService, genericValidation, getFormattedDate } from '@/utils/Utils';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const EditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const name = queryParams.get('name');
    const description = queryParams.get('description');
    const logo = queryParams.get('logo');
    const date_release = queryParams.get('date_release');
    const date_revision = queryParams.get('date_revision');

    const validations = async (name: string, value: string): Promise<string | undefined> => genericValidation(name, value);

    const formState = useForm({
        id: { value: id, error: '' },
        name: { value: name, error: '' },
        description: { value: description, error: '' },
        logo: { value: logo, error: '' },
        date_release: { value: date_release, error: '' },
        date_revision: { value: date_revision, error: '' }
    }, validations, true);

    const fields = [
        { label: "ID", id: "id", name: "id", type: "text", inputType: "input", disabled: true },
        { label: "Nombre", id: "name", name: "name", type: "text", inputType: "input" },
        { label: "Descripción", id: "description", name: "description", type: "text", inputType: "input" },
        { label: "Logo", id: "logo", name: "logo", type: "text", inputType: "input" },
        { label: "Fecha de Liberación", id: "date_release", name: "date_release", type: "date", inputType: "input", minDate: getFormattedDate("current") },
        { label: "Fecha Revisión", id: "date_revision", name: "date_revision", type: "date", inputType: "input", disabled: true }
    ];

    const editProduct = async ({ id, name, description, logo, date_release, date_revision }: FormValues) => {
        try {
            const response = await axiosService({
                method: "put",
                url: `/bp/products/${id.value}`,
                data: {
                    name: name.value,
                    description: description.value,
                    logo: logo.value,
                    date_release: date_release.value,
                    date_revision: date_revision.value
                }
            });

            if (response.message === "Product updated successfully") {
                alert("Producto actualizado correctamente");
                formState.resetForm();
                navigate("/");
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <Layout>
            <Form
                title="Formulario de edición"
                formState={formState}
                fields={fields}
                executeFunction={editProduct}
                mainButtonName="Actualizar"
            />
        </Layout>
    )
}

export default EditPage