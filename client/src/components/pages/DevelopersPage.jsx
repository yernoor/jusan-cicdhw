import Footer from "../pageElements/footer";
import Header from "../pageElements/header";

export default function Developers() {
  return (
    <div className="developersPage">
      <Header />
      <div className="developersInfo">
        <div className="teamLogo">
          <img src={require("../logos/teamLogo.png")} alt="teamLogo" />
        </div>
        <div className="developers">
          <div className="developer">
            <div className="developerPic">
              <img src={require("../logos/nariman.png")} alt="dev" />
            </div>
            <div className="developerInfo">Azamatov Nariman (Frontend)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require("../logos/makhambet.png")} alt="dev" />
            </div>
            <div className="developerInfo">Torezhan Makhambet (Backend)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require("../logos/zhandos.png")} alt="dev" />
            </div>
            <div className="developerInfo">Yernazarov Zhandos (Backend)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require("../logos/dastan.png")} alt="dev" />
            </div>
            <div className="developerInfo">Shokimov Dastan (Backend)</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
