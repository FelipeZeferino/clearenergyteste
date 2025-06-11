export function calculateDiscount(monthlyBill: number) {
  return monthlyBill * 0.25;
}

export function calculateAnnualSavings(years: number, monthlyBill: number) {
  const totalWithoutDiscount = monthlyBill * 12 * years;
  const monthlyDiscount = calculateDiscount(monthlyBill);
  const totalWithDiscount = (monthlyBill - monthlyDiscount) * 12 * years;

  return {
    years,
    totalWithoutDiscount,
    totalWithDiscount,
    totalSaved: totalWithoutDiscount - totalWithDiscount,
  };
}
