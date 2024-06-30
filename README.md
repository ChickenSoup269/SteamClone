<<<<<<< master
file .env => lưu các biến db ||
folder config => chứa các tệp cấu hình (như cấu hình connect mongodb) ||
folder controller => xử lý các yêu cầu HTTP ||
folder models => khai báo các kiểu dữ liệu  ||
folder middlewares => Chứa các middleware xử lý trước khi các yêu cầu đến các routes ( xác thực user ) ||
folder routes => chứa các tuyến API (Get,Post,..) ||
folder utils => || chứa các chức năng dùng để tái sử dụng nhiều nơi 
folder services => xử lý các method insert , delete , update , get ||
folder public => Chứa các dịch vụ (services) thực hiện các logic ||
=======

# README SteamClone 1.0

+ Dự án này được tạo ra để người dùng dễ dàng mua game và trải nghiệm những tựa game mà người dùng muốn.
+ Đặc điểm chính của Web này là UI thân thiện và có vài chức năng tương tự Steam 
+
+


![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Steam_gray-brown_logo.svg/2560px-Steam_gray-brown_logo.svg.png)


## Demo

- Hiện đang trong quá trình thử nghiệm  [BETA]


## Authors

- [@ChickenSoup269](https://github.com/ChickenSoup269) [FE]
- [@MenterTho](https://github.com/MenterTho) [BE]
- [@TinKim](https://github.com/TinKim) [BE]

## Run Locally

Clone the project

```bash
  git clone https://github.com/ChickenSoup269/SteamClone.git
```

Go to the project directory

```bash
  cd SteamClone
```

Install dependencies

```bash
  npm install
```

Start the server frontend & BackEnd

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

>>>>>>> master
