import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3002',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ERRORS = {
    id: "ID no válido!",
    longId: "Requerido, mínimo 3 caracteres y máximo 10",
    name: "El campo Nombre requerido, mínimo 6 caracteres y máximo 100",
    description: "El cámpo Apellido requerido, mínimo 10 caracteres y máximo 200",
    logo: "Requerido, no puede estar vacío",
    date_release: "Requerido, la Fecha debe ser igual o mayor a la fecha actual",
    date_revision: "Requerido, la Fecha debe ser exactamente un año posterior a la fecha de liberación"
}

const getFormattedDate = (date: (string | number) = "current", format = "YYYY-MM-DD"): string => {
    const {
        year,
        month,
        day
    } = getYearMonthDayValues(date);
    let formattedDate = "";
    if (format === "YYYY-MM-DD") {
        formattedDate = `${year}-${month}-${day}`;
    }

    if (format === "DD/MM/YYYY") {
        formattedDate = `${day}/${month}/${year}`;
    }

    return formattedDate;
};

const getYearMonthDayValues = (date: string | number = "current"): { year: string | number, month: string | number, day: string | number } => {
    let customDate: Date;

    if (date === "current") {
        customDate = new Date();
    } else {
        customDate = new Date(date);
    }

    const year = customDate.getUTCFullYear();
    let month: (number | string) = customDate.getUTCMonth() + 1;
    let day: (number | string) = customDate.getUTCDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return {
        year,
        month,
        day
    };
};

const isDateBefore = (firstDate: string, secondDate: string): boolean => {
    return new Date(firstDate) > new Date(secondDate);
};

const isDateIsAYearAfter = (firstDate: (string | Date), secondDate: (string | Date)) => {
    const fDate = firstDate instanceof Date ? firstDate : new Date(firstDate);
    const sDate = secondDate instanceof Date ? secondDate : new Date(secondDate);
    const compareDate = fDate.setFullYear(fDate.getFullYear());
    const compareSecondDate = sDate.setFullYear(sDate.getFullYear() - 1);
    return compareDate === compareSecondDate;
};

const getALaterYear = (date: (string | number | Date)) => {
    const newDate = date instanceof Date ? date : new Date(date);
    const newYear = newDate.setFullYear(newDate.getFullYear() + 1);
    return getFormattedDate(newYear);
};

interface serviceOptions {
    method: any;
    url: string;
    data?: any
}

const axiosService = async ({ method = "get", url = "", data }: serviceOptions) => {
    try {
        return await axiosInstance({
            url,
            method,
            data
        }).then(({ data }) => {
            return data;
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

function generateId(text: string) {
    let str = text.trim().toLowerCase();
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    return str;
}

function genericValidation(name: string, value: string) {
    if (name === "name") {
        if (value.length < 6 || value.length > 100) {
            return ERRORS[name]
        }
    }

    if (name === "description") {
        if (value.length < 10 || value.length > 200) {
            return ERRORS[name]
        }
    }

    if (name === "logo") {
        if (value.length === 0) {
            return ERRORS[name]
        }
    }

    if (name === "date_release") {
        if (isDateBefore(getFormattedDate("current"), value) || value.length === 0) {
            return ERRORS[name]
        }
    }

    if (name === "date_revision") {
        if (value.length === 0) {
            return ERRORS[name];
        }
    }
}

export {
    getFormattedDate,
    isDateBefore,
    isDateIsAYearAfter,
    getALaterYear,
    axiosService,
    generateId,
    genericValidation
}