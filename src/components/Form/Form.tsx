import React from 'react';
import Button from '../Button/Button';
import style from './Form.module.scss';
import { useEffect } from 'react';
import { ERRORS, generateId, getALaterYear } from '@/utils/Utils';

interface FormProps {
    title: string;
    formState: any;
    fields: inputProps[];
    executeFunction: (param: inputProps) => void;
    mainButtonName: string;
}

interface inputProps {
    label: string;
    id: string,
    name: string,
    type: string,
    inputType: string,
    disabled?: boolean,
    minDate?: string,
    maxDate?: string,
}

const Form: React.FC<FormProps> = ({ title, formState, executeFunction, fields, mainButtonName }) => {
    const {
        values,
        handleChange,
        handleSubmit,
        resetForm,
        isValid,
        setValues
    } = formState


    useEffect(() => {
        const releaseDate = values['date_release'].value;
        const revisionDate = releaseDate ? getALaterYear(releaseDate) : '';
        setValues((prevValues: any) => ({
            ...prevValues,
            date_revision: {
                ...prevValues.date_revision,
                value: revisionDate,
                error: releaseDate ? '' : ERRORS['date_revision']
            }
        }));
    }, [values['date_release'].value, setValues]);

    return (
        <form className={style.bankForm} onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
            if (isValid) executeFunction(values);
        }}>
            <header>
                <h1>{title}</h1>
            </header>
            <section className={style.formContainer}>
                {fields && fields.map((field) => {
                    if (field.inputType) {
                        const error = values[field.name].error;

                        return <div
                            key={field.id}
                            className={`${style.inputForm} ${field.disabled ? style.disabled : ''} ${error ? style.invalid : ''}`}
                        >
                            <label htmlFor={field.id}>{field.label}</label>
                            <div className={style.input}>
                                <input
                                    type={field.type}
                                    id={field.id}
                                    name={field.name}
                                    min={field.minDate && field.minDate}
                                    max={field.maxDate && field.maxDate}
                                    value={values[field.name].value}
                                    onChange={(e) => {
                                        if (field.name === "id") {
                                            e.target.value = generateId(e.target.value);
                                        }
                                        handleChange(e)
                                    }}
                                />
                            </div>
                            <small className={style.message}>
                                {error && values[field.name].error}
                            </small>
                        </div>
                    }
                    return null;
                })}
            </section>

            <footer>
                <Button type='button' onClick={resetForm}>Reiniciar</Button>
                <Button
                    type="submit"
                    buttonStyle="primary"
                >
                    {mainButtonName}
                </Button>
            </footer>
        </form>
    );
};

export default Form;
