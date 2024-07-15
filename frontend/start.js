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
        }, 500)
    })
}

loadingProcess().then(() => {
    // Yêu cầu người dùng chọn tiếp tục hay không
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    readline.question('Hack thành công NASA! /n Bạn có muốn tiếp tục (y/n)? ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            readline.question('Nhập tên dự án bạn muốn hack: ', (projectName) => {
                if (projectName.toLowerCase() === 'steamclone') {
                    console.log(`Đang hack dự án "${projectName}"...`)
                    console.log('Loading 10%...')
                    setTimeout(() => {
                        console.log('Loading 50%...')
                        setTimeout(() => {
                            console.log('Đang hack vào steamClone... kill kill terminal')
                            console.log('Hack thành công ✅')
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
                        }, 5000) // Giả lập thời gian loading 50%
                    }, 1000) // Giả lập thời gian loading 10%
                } else {
                    let i = 10
                    const interval = setInterval(() => {
                        console.log(`Loading ${i}%...`)
                        i += 10
                        if (i > 100) {
                            clearInterval(interval)
                            console.log('Hack không thành công! Tên dự án không hợp lệ.')
                            readline.close()
                        }
                    }, 1500)
                }
            })
        } else {
            console.log('Hủy thao tác hack.')
            readline.close()
        }
    })
})
