// start.js

console.log('Chuẩn bị hack NASA - Tất cả đã sẵn sàng...')
console.log('Đang xử lý...')

// Giả lập tiến trình loading từ 10% đến 100%
const loadingProcess = () => {
    return new Promise((resolve, reject) => {
        let i = 10
        const interval = setInterval(() => {
            console.log(`Loading ${i}%...`)
            i += 10
            if (i > 100) {
                clearInterval(interval)
                resolve()
            }
        }, 100)
    })
}

loadingProcess().then(() => {
    // Yêu cầu người dùng chọn tiếp tục hay không
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    readline.question('Hack thành công NASA! Bạn có muốn tiếp tục (y/n)? ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            readline.question('Nhập tên dự án bạn muốn hack: ', (projectName) => {
                console.log(`Đang hack dự án "${projectName}"...`)
                console.log('Loading 10%...')
                console.log('Loading 20%...')
                setTimeout(() => {
                    console.log('Loading 50%...')
                    setTimeout(() => {
                        console.log('Hack thành công!')
                        console.log('Chạy npm start...')
                        // Thực hiện lệnh npm start
                        const exec = require('child_process').exec
                        exec('npm start', (error, stdout, stderr) => {
                            if (error) {
                                console.error(`Lỗi khi chạy npm start: ${error}`)
                                return
                            }
                            console.log(`Kết quả: ${stdout}`)
                            console.error(`Lỗi: ${stderr}`)
                        })
                    }, 2000) // Giả lập thời gian loading 50%
                }, 2000) // Giả lập thời gian loading 10%
            })
        } else {
            console.log('Hủy thao tác hack.')
            readline.close()
        }
    })
})
