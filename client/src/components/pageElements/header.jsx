// import doWeHaveToken from "../functions/checkIfAutorized";
import logo from "../logos/logo.svg";

export default function Header() {
  return (
    <nav className="autorizationNavElemes">
      <a className="Logo" href="/">
        <img src={logo} alt="SingLogo" />
      </a>

      <div className="headerUserNav">
        <a href="https://jusan.kz" className="headerBtns">
          JUSAN.KZ
        </a>
        <a href="https://jusan.kz" className="headerBtns">
          О НАС
        </a>
        <a href="https://jusan.kz" className="headerBtns">
          КОНТАКТЫ
        </a>
        <a href="/developers" className="headerBtns">
          РАЗРАБОТЧИКИ
        </a>

        {/* <a
            href="/"
            className="button-5"
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            Выйти
          </a> */}
      </div>
    </nav>
  );
}
