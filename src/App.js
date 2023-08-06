import { useState } from 'react'; // useState 
import './App.css'; //css
import Box from './component/Box'; // Box component

// 1. 박스 두 개(타이틀, 사진, 결과값)
// 2. 가위 바위 보 버튼이 있다
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3 4의 결과를 가지고 승패를 따진다.
// 6. 승패 결과에 따라 테두리 색이 바뀐다. (이기면 초록, 지면 빨강, 비기면 검정)

/* 가위, 바위, 보 이름, 이미지 파일 */
const choice = {
  rock:{
    name : "Rock",
    img : "https://m.media-amazon.com/images/I/51WaIVrgYvL.jpg"
  },
  scissors:{
    name : "Scissors",
    img : "https://imageengine.victorinox.com/mediahub/31970/1280Wx1120H/CUT_8_0904_10__S1.jpg"
  },
  paper:{
    name : "Paper",
    img : "https://www.hobbycraft.co.uk/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dw8aedf2d1/images/large/584769_1000_1_-white-premium-smooth-paper-a4-100-pack.jpg"
  },
};


const before_start_you = {
  name: "empty",
  img: "https://pbs.twimg.com/media/DPzO4NHVwAARXSf.jpg"
};

const before_start_computer = {
  name: "empty",
  img: "https://mblogthumb-phinf.pstatic.net/MjAxOTA3MDhfMjY1/MDAxNTYyNTExODY2MjQx.hhRLcP15xEzKoiBbCNEnfB8j8VqOSp4fpGIgzcLDdAEg.DDCM0UWZdVoJ8J-Jxwby1YGNCPwPtjJATnN-v7LfFzMg.PNG.jwk0602/%EC%BA%A1%EC%B2%98_2019_07_07_23_53_52_523.png?type=w800"
};


function App() {

  const [userSelect, setUserSelect] = useState(before_start_you); // 사용자가 선택한 값
  const [computerSelect, setComputerSelect] = useState(before_start_computer); // 컴퓨터가 선택한 값
  const [result, setResult] = useState(""); // 사용자의 최종 결과값
  const [computerResult, setComputerResult] = useState("");

  /* play 함수 */
  /* 사용자와 컴퓨터가 가위바위보를 한 후, 사용자와 컴퓨터가 낸 값을 저장 */
  const play = (userChoice) => { // userChoice는 사용자가 버튼을 누름으로써 선택한 값
    setUserSelect(choice[userChoice]); // 사용자가 선택한 값의 배열이 들어감
    let computerChoice = randomChoice(); // 컴퓨터가 랜덤으로 선택한 값을 저장
    setComputerSelect(computerChoice); // 컴퓨터가 선택한 값의 배열이 들어감
    const userResult = judgement(choice[userChoice], computerChoice)
    setResult(userResult); // 승패 값의 결과가 들어감.

    if (userResult == "win"){
      setComputerResult("lose");
    }else if (userResult == "tie"){
      setComputerResult("tie");
    }else if (userResult == "lose"){
      setComputerResult("win");
    }
  };

  /* randomChoice 함수 */
  /* 컴퓨터가 랜덤으로 가위바위보를 낸 값 */
  const randomChoice = () => {
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 어레이로 만들어줌.
    let randomItem = Math.floor(Math.random() * itemArray.length); // 0부터 1까지의 길이에 대한 랜덤함수 생성 후 소수점 이하를 버린다.
    let final = itemArray[randomItem] 
    return choice[final] 
  };

  /* judgement 함수 */
  /* 사용자와 컴퓨터의 승패를 가린다. */
  const judgement = (user,computer) => {
    if (user.name == computer.name) {
      return "tie";
    } else if (user.name == "Rock") 
      return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors") 
      return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper") 
      return computer.name == "Rock" ? "win" : "lose";
  };

  /* 메인 화면에 보이는 부분 */
  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <div className='main'> 
        <Box title="You" className = {result} item={userSelect} result={result} />  
        <Box title="Computer" className = {computerResult} item={computerSelect} result={computerResult} /> 
      </div>
      <div className='main'> 
        <button className='button' onClick={() => play("scissors")}>scissors</button> 
        <button className='button' onClick={() =>play("rock")}>rock</button> 
        <button className='button' onClick={() =>play("paper")}>paper</button> 
      </div>
    </div>
  );
}

export default App;
