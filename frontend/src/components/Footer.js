function Footer({loggedIn}) {
if (loggedIn) {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
    </footer>
  );} else {
    return(
      <></>
    )
  }
}

export default Footer;
