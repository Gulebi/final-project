export const formatCurrency = (locale: string, currency: string, value: number, display?: string): string => {
    return Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        currencyDisplay: display,
    }).format(value);
};
