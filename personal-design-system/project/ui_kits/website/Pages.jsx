function Work() {
  return (
    <div className="page-enter">
      <section className="hero" style={{paddingBottom: 24}}>
        <div className="container">
          <div className="eyebrow">WORK · 2022 — 2026</div>
          <h1>Things I've <em>made</em>, mostly small.</h1>
        </div>
      </section>
      <section className="section" style={{paddingTop: 24}}>
        <div className="container">
          <div className="work-list">
            {WORKS.map((w, i) => (
              <div key={w.title} className="work-row">
                <div className="work-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="work-title">{w.title}</div>
                  <div className="work-desc">{w.desc}</div>
                </div>
                <div className="work-tag">{w.tag}</div>
                <div className="work-year">{w.year}<span className="work-arrow" style={{marginLeft:8}}>→</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Writing() {
  return (
    <div className="page-enter">
      <section className="hero" style={{paddingBottom: 24}}>
        <div className="container">
          <div className="eyebrow">WRITING · 34 POSTS</div>
          <h1>Notes, essays, and <em>occasional talks.</em></h1>
        </div>
      </section>
      <section className="section" style={{paddingTop: 32}}>
        <div className="container">
          <div className="writing-grid">
            {ARTICLES.map(a => (
              <div key={a.title} className="article-card">
                <div className="meta">{a.date} · {a.kind}</div>
                <h3>{a.title}</h3>
                <p>{a.blurb}</p>
                <div className="footer">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="page-enter">
      <section className="section" style={{paddingTop: 72}}>
        <div className="container">
          <div className="about-grid">
            <div className="portrait">
              <div className="label">portrait placeholder</div>
            </div>
            <div>
              <div className="eyebrow" style={{marginBottom: 14}}>ABOUT</div>
              <div className="bio">
                <strong>Hi, I'm Lumen.</strong> I spend my days designing interfaces and my evenings reading about why they fail. I live in a small apartment with a good chair and a lot of books, and I try to make digital things that feel as considered as the paper ones.
              </div>
              <div className="timeline">
                <div className="timeline-row"><div className="timeline-year">2024 —</div><div className="timeline-what">independent, making small tools <span className="where">· solo</span></div></div>
                <div className="timeline-row"><div className="timeline-year">2022 — 24</div><div className="timeline-what">design lead <span className="where">· a calmer notes company</span></div></div>
                <div className="timeline-row"><div className="timeline-year">2020 — 22</div><div className="timeline-what">product designer <span className="where">· a reading-focused startup</span></div></div>
                <div className="timeline-row"><div className="timeline-year">2018 — 20</div><div className="timeline-what">contract illustrator + interface work</div></div>
                <div className="timeline-row"><div className="timeline-year">2016</div><div className="timeline-what">BA, Graphic Design <span className="where">· a small school in the pacific northwest</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Work, Writing, About });
