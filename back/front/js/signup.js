//토큰 검사
const token = localStorage.getItem("x-access-token");

if (token) {
  alert("로그아웃 후 이용해주세요.");
  location.href = "index.html";
}

//입력값 유효성 검사

//이메일
const inputEmail = document.getElementById("email");
inputEmail.addEventListener("input", isValidEmail);
const emailMessagge = document.querySelector("div.email-message");

//비밀번호
const inputPassword = document.getElementById("password");
inputPassword.addEventListener("input", isValidPassword);
const passwordMessagge = document.querySelector("div.password-message");

//비밀번호 확인
const inputPasswordConfirm = document.getElementById("password-confirm");
inputPasswordConfirm.addEventListener("input", isValidPasswordConfirm);
const passwordConfirmMessagge = document.querySelector(
  "div.password-confirm-message"
);
//닉네임

const inputNickname = document.getElementById("nickname");
inputNickname.addEventListener("input", isValidNickname);
const nicknameMessagge = document.querySelector("div.nickname-message");

//이메일 형식 검사
function isValidEmail(event) {
  const currentEmail = inputEmail.value;
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!emailReg.test(currentEmail)) {
    emailMessagge.style.visibility = "visible";
    return false;
  }
  emailMessagge.style.visibility = "hidden";

  return true;
}

//비밀번호 형식 검사
function isValidPassword(event) {
  const currentPassword = inputPassword.value;
  const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
  if (!passwordReg.test(currentPassword)) {
    passwordMessagge.style.visibility = "visible";
    return false;
  }
  passwordMessagge.style.visibility = "hidden";

  return true;
}

//비밀번호 형식 검사
function isValidPasswordConfirm(event) {
  const currentPassword = inputPassword.value;
  const currentPasswordConfirm = inputPasswordConfirm.value;

  if (currentPassword != currentPasswordConfirm) {
    passwordConfirmMessagge.style.visibility = "visible";
    return false;
  }
  passwordConfirmMessagge.style.visibility = "hidden";

  return true;
}

// //닉네임 형식 검사
function isValidNickname(event) {
  const currentNickname = inputNickname.value;

  if (currentNickname.length < 2 || currentNickname.length > 10) {
    nicknameMessagge.style.visibility = "visible";
    return false;
  }
  nicknameMessagge.style.visibility = "hidden";

  return true;
}

// #####  회원가입 API 요청

const buttonSignup = document.getElementById("signup");
buttonSignup.addEventListener("click", signup);

async function signup(event) {
  const isValidReq =
    isValidEmail() &&
    isValidPassword() &&
    isValidPasswordConfirm() &&
    isValidNickname();

  if (!isValidReq) {
    alert("회원 정보를 확인해주세요.");
    return false;
  }

  const currentEmail = inputEmail.value;
  const currentPassword = inputPassword.value;
  const currentNickname = inputNickname.value;

  const config = {
    method: "post",
    url: url + "/user",
    data: {
      email: currentEmail,
      password: currentPassword,
      nickname: currentNickname,
    },
  };
  try {
    const res = await axios(config);

    if (res.data.code === 400) {
      alert(res.data.message);
      location.reload();
      return false;
    }

    if (res.data.code === 200) {
      alert(res.data.message);
      location.href = "signin.html";
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}
