function Nav({ route, setRoute }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['home', 'writing', 'work', 'about'];
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a className="nav-brand" onClick={() => setRoute('home')} style={{cursor:'pointer'}}>
            <span className="brand-tile">l</span>
            <span>lumen</span>
          </a>
          <div className="nav-links">
            {links.map(l => (
              <button
                key={l}
                className={`nav-link ${route === l ? 'active' : ''}`}
                onClick={() => setRoute(l)}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="signoff">Thanks for reading.</div>
            <div className="mono" style={{marginTop: 8}}>— lumen · 47.6062° N</div>
          </div>
          <div className="links">
            <a>email</a>
            <a>rss</a>
            <a>github</a>
            <a>are.na</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer });
