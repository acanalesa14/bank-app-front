import Form from '@/components/Form/Form';
import Layout from '@/components/Layout/Layout';
import useForm, { FormValues } from '@/hooks/useForm';
import { ERRORS, axiosService, genericValidation, getALaterYear, getFormattedDate } from '@/utils/Utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage: React.FC = () => {
    const navigate = useNavigate();

    const productIdExists = async (id: string) => {
        try {
            return await axiosService({
                url: `/bp/products/verification/${id}`,
                method: "get",
            }).then((response) => response);
        } catch (error) {
            console.error('Error checking product ID:', error);
            return true;
        }
    };

    const validations = async (name: string, value: string) => {
        if (name === "id") {
            if (value.length < 3 || value.length > 10) {
                return ERRORS["longId"];
            }

            return await productIdExists(value).then((res: boolean) => {
                if (res) return ERRORS[name];
            });
        }

        return genericValidation(name, value);
    }

    const formState = useForm({
        id: { value: '', error: '' },
        name: { value: '', error: '' },
        description: { value: '', error: '' },
        logo: { value: '', error: '' },
        date_release: { value: getFormattedDate("current"), error: '' },
        date_revision: { value: getALaterYear(getFormattedDate("current")), error: '' }
    }, validations, false);

    const fields = [
        { label: "ID", id: "id", name: "id", type: "text", inputType: "input" },
        { label: "Nombre", id: "name", name: "name", type: "text", inputType: "input" },
        { label: "Descripción", id: "description", name: "description", type: "text", inputType: "input" },
        { label: "Logo", id: "logo", name: "logo", type: "text", inputType: "input" },
        { label: "Fecha de Liberación", id: "date_release", name: "date_release", type: "date", inputType: "input", minDate: getFormattedDate("current") },
        { label: "Fecha Revisión", id: "date_revision", name: "date_revision", type: "date", inputType: "input", disabled: true }
    ];

    const createProduct = async ({ id, name, description, logo, date_release, date_revision }: FormValues) => {
        try {
            const response = await axiosService({
                method: "post",
                url: "/bp/products",
                data: {
                    id: id.value,
                    name: name.value,
                    description: description.value,
                    logo: logo.value,
                    date_release: date_release.value,
                    date_revision: date_revision.value
                }
            });

            if (response.message === "Product added successfully") {
                alert("Producto agregado correctamente");
                formState.resetForm();
                navigate("/")
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    return (
        <Layout>
            <Form
                title="Formulario de registro"
                formState={formState}
                fields={fields}
                executeFunction={createProduct}
                mainButtonName="Enviar"
            />
        </Layout>
    )
}

export default CreatePage