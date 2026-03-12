function formatCurrency(amount) {
    const hehe = amount / 100
    // Chuyển đổi số tiền sang chuỗi
    const amountString = hehe.toString()

    // Định dạng lại phần nguyên để ngăn cách bằng dấu chấm cho mỗi hàng nghìn
    let integerPart = amountString.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    // Ghép lại phần nguyên và phần thập phân thành kết quả cuối cùng
    const formattedAmount = integerPart + '₫'

    return formattedAmount
}

export default formatCurrency
