import './App.css';
import {useState} from "react";

function App() {

  const [color, setColor] = useState('#2589cc');
  const [text, setText] = useState('Follow');
  const [clickNum, setClickNum] = useState(1);
  const [result, setResult] = useState(500);

  const handleClick = () => {
    setClickNum(clickNum + 1);
    if (clickNum % 2 !== 0) {
      setColor('#46cc25');
      setText('Following');
      setResult(result + 1);
    } else {
      setColor('#2589cc');
      setText('Follow');
      setResult(result - 1);
    }
  };

  return (
    <div className="container">
      <header>
        <div>
          <img src="/images/2.jpg" alt="background" className="bg"/>
        </div>
        <div className="avatarcontainer">
          <img src="/images/1.jpg" alt="avatar" className="avatar"/>
        </div>
      </header>

      <div className="content">
        <div className="data">
          <ul>
            <li>
              777
              <span>Tweets</span>
            </li>
            <li>
              {`100,` + result}
              <span>Followers</span>
            </li>
          </ul>
        </div>

        <div className="follow" style={{backgroundColor: color}} onClick={handleClick}>
          {text}
        </div>
      </div>
    </div>
  );
}

export default App;
