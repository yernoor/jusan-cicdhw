import instagram from "../logos/instagram.svg";
import facebook from "../logos/facebook.svg";

export default function Footer() {
  return (
    <>
      <div className="FooterContainer">
        <div className="aboveFooter">
          <div className="phones">
            <a className="telephone" href="tel:">
              +7 (717) 258-77-11
            </a>
            <a className="telephone" href="tel:">
              7711
            </a>
            <a className="email" href="mailto:">
              info@jusan.kz
            </a>
          </div>
          <div className="socialMedais">
            <a className="instagram" href="https://instagram.com/">
              <img src={instagram} alt="instagram" />
            </a>
            <a className="facebook" href="https://facebook.com/">
              <img src={facebook} alt="facebook" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footerContainer">
          <div className="footerDetails">
            <a href="https://jusan.kz">
              <div className="footerLogo"></div>
            </a>
            <div className="copyrights">
              © 2006–2022, First Heartland Jusan Bank 2022, Лицензия №
              0.0.00/000/00 от 28.07.2022
            </div>
          </div>
          <div className="footerNav">
            <a href="https://jusan.kz" className="footerBtns">
              JUSAN.KZ
            </a>
            <a href="https://jusan.kz" className="footerBtns">
              О НАС
            </a>
            <a href="https://jusan.kz" className="footerBtns">
              КОНТАКТЫ
            </a>
            <a href="/developers" className="footerBtns">
              РАЗРАБОТЧИКИ
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
