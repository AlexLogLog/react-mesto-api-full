import logo from '../images/logo.svg';
import { useLocation, useHistory } from 'react-router-dom'

function Header({ email, onLogout }) {
  const { pathname } = useLocation();
  const history = useHistory();
  function linkNoAuth(from) {
    if ('/sign-in' === from) {
      return (
        <button
          className="header__button"
          onClick={() => history.push('/sign-up')}
        >
          Регистрация
        </button>)

    } else if ('/sign-up' === from) {
      return (
        <button
          className="header__button"
          onClick={() =>  history.push('/sign-in')}
        >
          Вход
        </button>
      )
    }
  };

  function linkAuth() {
    return (
      <>
        <span className="header__email">{email}</span>
        <button
          className="header__button"
          onClick={ onLogout}
        >
          Выход
      </button>
      </>
    )
  }
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      <div className="header__auth">
        {email
          ? linkAuth()
          : linkNoAuth(pathname)
        }
      </div>
    </header>
  );
}

export default Header;
