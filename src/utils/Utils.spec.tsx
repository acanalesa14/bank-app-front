import {
    ERRORS,
    generateId,
    genericValidation,
    getALaterYear,
    getFormattedDate,
    isDateBefore,
    isDateIsAYearAfter
} from './Utils';

describe('getFormattedDate', () => {
    test('should return formatted date in "YYYY-MM-DD" format', () => {
        const formattedDate = getFormattedDate('2024-07-10', 'YYYY-MM-DD');
        expect(formattedDate).toBe('2024-07-10');
    });

    test('should return formatted date in "DD/MM/YYYY" format', () => {
        const formattedDate = getFormattedDate('2024-07-10', 'DD/MM/YYYY');
        expect(formattedDate).toBe('10/07/2024');
    });
});

describe('isDateBefore', () => {
    test('should return false if first date is before second date', () => {
        const result = isDateBefore('2024-07-10', '2024-07-11');
        expect(result).toBe(false);
    });

    test('should return true if first date is after second date', () => {
        const result = isDateBefore('2024-07-12', '2024-07-11');
        expect(result).toBe(true);
    });
});

describe('isDateIsAYearAfter', () => {
    test('should return false if first date is exactly a year after second date', () => {
        const result = isDateIsAYearAfter('2024-07-10', '2023-07-10');
        expect(result).toBe(false);
    });

    test('should return false if first date is not exactly a year after second date', () => {
        const result = isDateIsAYearAfter('2024-07-11', '2023-07-10');
        expect(result).toBe(false);
    });
});

describe('getALaterYear', () => {
    test('should return a date exactly one year after the provided date', () => {
        const result = getALaterYear('2024-07-10');
        expect(result).toBe('2025-07-10');
    });
});

describe('generateId', () => {
    test('should generate a valid ID from text', () => {
        const result = generateId('Some Text');
        expect(result).toBe('some-text');
    });
});

describe('genericValidation', () => {
    test('should return correct error for name length', () => {
        const result = genericValidation('name', 'short');
        expect(result).toBe(ERRORS.name);
    });

    test('should return correct error for description length', () => {
        const result = genericValidation('description', 'short');
        expect(result).toBe(ERRORS.description);
    });

    test('should return correct error for empty logo', () => {
        const result = genericValidation('logo', '');
        expect(result).toBe(ERRORS.logo);
    });

    test('should return correct error for date_release', () => {
        const result = genericValidation('date_release', '2024-07-01');
        expect(result).toBe(ERRORS.date_release);
    });

    test('should return correct error for date_revision', () => {
        const result = genericValidation('date_revision', '');
        expect(result).toBe(ERRORS.date_revision);
    });
});
