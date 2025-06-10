export function calculateDiscount (monthlyBill: number) {
    return monthlyBill * 0.25
}

export function calculateAnnualSavings (numberOfYears: number, monthlyBill: number) {
    const withoutDiscount = monthlyBill * 12 * numberOfYears
    const withDiscount = calculateDiscount(monthlyBill) * numberOfYears

    return { withoutDiscount, withDiscount }
}