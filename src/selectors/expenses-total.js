/**
 * Sums up all expenses amounts and returns the sum.
 */
export default (expenses) => {
    // First map expenses array to a simpler array, just containing the amounts
    return expenses
    .map(expense => expense.amount)
    .reduce((sum, amount) => sum + amount, 0)
}