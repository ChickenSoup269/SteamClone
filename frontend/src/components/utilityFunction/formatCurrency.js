function formatCurrency(amount) {
    // Chuyển đổi số tiền sang chuỗi
    const amountString = amount.toString()

    // Tìm vị trí dấu chấm phân cách phần nguyên và phần thập phân
    const decimalIndex = amountString.indexOf('.')

    // Phần nguyên là chuỗi từ đầu đến trước dấu chấm (hoặc toàn bộ chuỗi nếu không có dấu chấm)
    let integerPart = decimalIndex === 0 ? amountString : amountString.slice(0, decimalIndex)

    // Phần thập phân là chuỗi sau dấu chấm (nếu có)
    let decimalPart = decimalIndex === -1 ? '' : amountString.slice(decimalIndex + 1)

    // Định dạng lại phần nguyên để ngăn cách bằng dấu phẩy cho mỗi hàng nghìn
    integerPart = integerPart.replace(/\B(?=(\d{4})+(?!\d))/g, '.')

    // Kiểm tra và loại bỏ số 0 thừa ở phần thập phân (2 số 0)
    if (decimalPart === '0' || decimalPart === '00' || decimalPart === '000') {
        decimalPart = ''
    }

    // Ghép lại phần nguyên và phần thập phân thành kết quả cuối cùng
    const formattedAmount =
        decimalPart === '' ? integerPart + '₫' : integerPart + '.' + decimalPart.replace(/0{2}$/, '') + ' ₫'

    return formattedAmount
}
export default formatCurrency
