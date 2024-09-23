# README SteamClone 1.0

+ Dự án này được tạo ra để người dùng dễ dàng mua game và trải nghiệm những tựa game mà người dùng muốn.
+ Đặc điểm chính của Web này là UI thân thiện và có vài chức năng tương tự Steam 

![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Steam_gray-brown_logo.svg/2560px-Steam_gray-brown_logo.svg.png)


## Demo

- Hiện đang trong quá trình thử nghiệm  [BETA]
- Sử dụng database MongoDB, nếu quá trình lấy flie game từ steam không thành công thì đã có sẵn 2 file json được để trong folder Database
  + Ở MongoDB Create new Databasse
  + Database name: `steamDB`
  + Collection name: `games` | `genres`
  + => **Cuối cùng ADD DATA và Import JSON file ở Folder Database của steamclone vào 2 tên tương ứng**

- Nếu bạn muốn thay đổi cấu hình MogonDB thì hãy đến SteamClone/Backend/config/mongodb.js
  
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

Create 2 terminal

```bash 
  cd frontend 
```

```bash 
  cd backend 
```


Install dependencies all front end & back end

```bash
  npm install 
```

Start the server frontend & BackEnd

```bash
  npm start
```

## Screenshot
![App Screenshot](https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-07-25%20203434.png)

![App Screenshot](https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-08-31%20155604.png)

![App Screenshot](https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-08-31%20155613.png)

## Video demo
```bash
 https://youtu.be/zZd_RgvPfic
```
