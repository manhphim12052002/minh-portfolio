const ARTICLES_DATA = [
  { id: 'small-system', date: '2026-03-14', dateLbl: 'MAR 14, 2026', kind: 'ESSAY', time: '8 MIN', year: '2026',
    title: 'A small system for a quiet life online',
    dek: 'On building tools that ask for less of your attention, not more.',
    body: [
      { t: 'p', c: 'There is a particular kind of exhaustion that comes from software designed to keep you inside it. You know the feeling — the infinite scroll, the cheerful badge, the email that asks if you meant to leave. It is the feeling of being managed.', first: true },
      { t: 'p', c: 'For a long time I thought the answer was discipline: blockers, timers, fasts. None of it took. What worked, eventually, was building my own small tools — each one shaped around a single question, each one happy to be closed.' },
      { t: 'q', c: 'The best interfaces feel like reading a letter. Specific. Quiet. Written for you.' },
      { t: 'h2', c: 'What "small" actually means' },
      { t: 'p', c: 'Small is not a feature count. Small is a posture — the software knows what it is for, and stops there. When you open it, it does its one thing. When you close it, it does not try to keep you.' },
      { t: 'p', c: 'I have been keeping a list of the small tools I love. Almost all of them were made by one or two people. Almost all of them could be explained in a sentence.' },
    ]
  },
  { id: 'metaphor', date: '2026-02-02', dateLbl: 'FEB 02, 2026', kind: 'NOTES', time: '4 MIN', year: '2026',
    title: 'Three weeks into any metaphor',
    dek: 'There is a moment when the image you chose at the start stops working.',
    body: [
      { t: 'p', c: 'I have started to notice a pattern. About three weeks into any design project, the metaphor I chose at the beginning — "garden", "workshop", "letter" — quietly stops being useful. It does not break. It just stops explaining things.', first: true },
      { t: 'p', c: 'For a while I thought this was a failure of the metaphor. Now I think it is the point. The metaphor was a scaffold; by week three, the building can stand on its own.' },
    ]
  },
  { id: 'default', date: '2026-01-08', dateLbl: 'JAN 08, 2026', kind: 'ESSAY', time: '11 MIN', year: '2026',
    title: 'The weight of a default',
    dek: 'Choosing a default is a moral act.',
    body: [
      { t: 'p', c: 'A default is an opinion, quietly held. Most of the people who encounter it will never change it. Which means, for most of your users, the default is the product.', first: true },
    ]
  },
  { id: 'letters', date: '2025-12-15', dateLbl: 'DEC 15, 2025', kind: 'TALK', time: '22 MIN', year: '2025',
    title: 'Interfaces that read like letters',
    dek: 'Transcript of a talk on specificity, quiet, and writing for one reader.',
    body: [
      { t: 'p', c: 'Thank you for having me. I want to talk today about a simple idea: the best software feels like a letter written to you.', first: true },
    ]
  },
  { id: 'calendar', date: '2025-10-20', dateLbl: 'OCT 20, 2025', kind: 'NOTES', time: '5 MIN', year: '2025',
    title: 'Against the infinite calendar',
    dek: 'One week at a time, nothing else.',
    body: [
      { t: 'p', c: 'A calendar that shows you next year is a calendar that shows you a fantasy. The week is the only honest unit.', first: true },
    ]
  },
];

function ReaderChrome({ view, currentTitle, setView }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`read-bar ${scrolled ? 'scrolled' : ''}`}>
      <div className="read-bar-inner">
        <div className="read-brand" onClick={() => setView({ name: 'index' })}>
          <span className="tile">l</span>
          <span>lumen</span>
        </div>
        {view.name === 'article' && (
          <div className="read-crumb">
            <span>writing</span><span className="sep">/</span><span>{currentTitle}</span>
          </div>
        )}
        <div className="read-actions">
          {view.name === 'article' && <button className="read-pill">save</button>}
          <button className="read-pill">subscribe</button>
        </div>
      </div>
      {view.name === 'article' && (
        <div className="progress"><div className="progress-bar" style={{width: progress + '%'}}/></div>
      )}
    </div>
  );
}

function ArticleIndex({ setView }) {
  const byYear = ARTICLES_DATA.reduce((acc, a) => { (acc[a.year] = acc[a.year] || []).push(a); return acc; }, {});
  return (
    <div className="page-enter">
      <div className="index-wrap">
        <div className="index-head">
          <div className="eyebrow">WRITING · {ARTICLES_DATA.length} POSTS</div>
          <h1>Notes, essays, and the occasional talk.</h1>
          <div className="lead">Longer-form thinking on interfaces, attention, and the small tools that make a quiet life online possible.</div>
        </div>
        {Object.keys(byYear).sort((a,b) => b.localeCompare(a)).map(year => (
          <div key={year}>
            <div className="index-year">— {year}</div>
            {byYear[year].map(a => (
              <div key={a.id} className="index-row" onClick={() => setView({ name: 'article', id: a.id })}>
                <div className="idx-date">{a.dateLbl}</div>
                <div className="idx-title">{a.title}</div>
                <div className="idx-kind">{a.kind}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleReader({ id, setView }) {
  const article = ARTICLES_DATA.find(a => a.id === id) || ARTICLES_DATA[0];
  return (
    <div className="page-enter">
      <div className="article">
        <div className="back" onClick={() => setView({ name: 'index' })}>← back to writing</div>
        <div className="meta">
          <span>{article.dateLbl}</span>
          <span>·</span>
          <span>{article.kind}</span>
          <span>·</span>
          <span>{article.time} READ</span>
        </div>
        <h1>{article.title}</h1>
        <div className="dek">{article.dek}</div>
        <div className="byline">
          <div className="avatar"></div>
          <div>
            <div className="byline-name">Lumen</div>
            <div className="byline-role">writing at 47.6062° N</div>
          </div>
          <div className="byline-right">v1 · {article.dateLbl}</div>
        </div>
        <div className="body">
          {article.body.map((b, i) => {
            if (b.t === 'p') return <p key={i} className={b.first ? 'first' : ''}>{b.c}</p>;
            if (b.t === 'h2') return <h2 key={i}>{b.c}</h2>;
            if (b.t === 'q') return <div key={i} className="pullquote">{b.c}</div>;
            return null;
          })}
        </div>
        <div className="signoff">
          <span className="mark"></span>
          <span className="text">— lumen</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ARTICLES_DATA, ReaderChrome, ArticleIndex, ArticleReader });
