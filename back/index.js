const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const compression = require("compression");
const { indexRouter } = require("./src/Router/indexRouter");
const { userRouter } = require("./src/Router//userRouter");
// express 미들웨어 설정

//정적파일 제공
app.use(express.static("front"));

// cors 설정
app.use(cors());

// body json 파싱
app.use(express.json());

// HTTP 요청 압축
app.use(compression());

indexRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`);
});
