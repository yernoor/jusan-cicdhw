import Footer from "./components/pageElements/footer";
import Header from "./components/pageElements/header";
import Login from "./components/pages/login";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <div className="mainContainer">
          <div className="formbtn">
            <div className="mainText">
              <div className="mainTextTitle">
                Найди работу мечты c <span>JUSAN!</span>
              </div>
              <div className="mainTextDescription">
                ЗАПОЛНИ АНКЕТУ И ПРИСОЕДИНЯЙСЯ К НАШЕЙ КОМАНДЕ! :)
              </div>
            </div>
            <div className="mainAuth">
              <Login />
            </div>
          </div>
          <div className="mainPicture"></div>
        </div>
        <div className="mainMotivation">
          <div className="container">
            <div className="motivImage"></div>
            <div className="motivText">
              <div className="motivTextTitle">
                <span>JUSAN</span> – это символ дома и родины в Великой степи
              </div>
              <div className="motivTextDiscrtiption">
                <span>
                  Мы – казахстанский банк, который работает для процветания
                  своей страны и всего народа{" "}
                </span>
                <br />
                <br />
                <span>
                  Мы всегда стремимся добавить талантливых и целеустремленных
                  людей в нашу преданную рабочую силу. Если вы работаете в
                  команде, увлечены тем, что делаете, и рады возможности решать
                  проблемы,{" "}
                </span>
                <br />
                <span>
                  Jusan — это место для вас! В нашей организации вы можете быть
                  уверены, что работаете с самыми опытными специалистами в
                  отрасли и над сложными заданиями, а также технологиями. Это
                  поможет вам сделать вашу карьеру в правильном направлении.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
