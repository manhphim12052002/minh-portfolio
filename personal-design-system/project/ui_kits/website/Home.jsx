function Home({ setRoute }) {
  return (
    <div className="page-enter">
      <section className="hero">
        <div className="container">
          <div className="eyebrow"><span className="pulse"></span>AVAILABLE FOR WORK · SPRING 2026</div>
          <h1>Building quiet tools <em>with careful attention.</em></h1>
          <p className="lead">I design and build small digital things. Some ship, some don't — each teaches me something about making the next one calmer.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Selected work</h2>
            <a className="section-link" onClick={() => setRoute('work')}>see all →</a>
          </div>
          <div className="work-list">
            {WORKS.slice(0, 4).map((w, i) => (
              <div key={w.title} className="work-row" onClick={() => setRoute('work')}>
                <div className="work-num">0{i + 1}</div>
                <div>
                  <div className="work-title">{w.title}</div>
                  <div className="work-desc">{w.desc}</div>
                </div>
                <div className="work-tag">{w.tag}</div>
                <div className="work-year">
                  {w.year}
                  <span className="work-arrow" style={{marginLeft:8}}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Recent writing</h2>
            <a className="section-link" onClick={() => setRoute('writing')}>archive →</a>
          </div>
          <div className="writing-grid">
            {ARTICLES.slice(0, 2).map(a => (
              <div key={a.title} className="article-card" onClick={() => setRoute('writing')}>
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

const WORKS = [
  { title: 'Field notes, a reading app', desc: 'A small RSS reader that respects your attention.', tag: 'shipped', year: '2026' },
  { title: 'Metronome for meetings', desc: 'Keeps the pace without becoming the pace.', tag: 'shipped', year: '2025' },
  { title: 'The quiet inbox', desc: 'Batch-based email, for the people who still email.', tag: 'beta', year: '2025' },
  { title: 'A calmer calendar', desc: 'One week at a time, nothing else.', tag: 'sketch', year: '2024' },
  { title: 'Paper stopwatch', desc: 'A tiny physical timer that prints its log.', tag: 'side', year: '2024' },
];

const ARTICLES = [
  { date: 'MAR 2026', kind: 'ESSAY', title: 'A small system for a quiet life online', blurb: 'On building tools that ask for less of your attention, not more.', time: '8 min read' },
  { date: 'FEB 2026', kind: 'NOTES', title: 'Three weeks into any metaphor', blurb: 'There is a moment when the image you chose at the start stops working. You notice it before you can name it.', time: '4 min read' },
  { date: 'JAN 2026', kind: 'ESSAY', title: 'The weight of a default', blurb: 'Choosing a default is a moral act. Here is why I spent a week on a dropdown.', time: '11 min read' },
  { date: 'DEC 2025', kind: 'TALK', title: 'Interfaces that read like letters', blurb: 'Transcript of a talk about specificity, quiet, and writing for one reader.', time: '22 min read' },
];

Object.assign(window, { Home, WORKS, ARTICLES });
