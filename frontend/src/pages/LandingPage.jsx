import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LuTrendingUp, LuLayoutDashboard, LuClock, LuShield, 
  LuGlobe, LuTarget, LuArrowRight, LuPlay
} from 'react-icons/lu';
import Screenshot1 from '../assets/images/Screenshot 2026-04-19 at 01.00.38.png';
import Screenshot2 from '../assets/images/Screenshot 2026-04-19 at 00.56.45.png';
import Screenshot3 from '../assets/images/Screenshot 2026-04-19 at 01.00.26.png';

// ─── Floating stat card used in the hero ───────────────────────────────────
const FloatCard = ({ className = '', children }) => (
  <div
    className={`absolute bg-white rounded-2xl px-4 py-3 border border-gray-200/50 shadow-lg shadow-black/10 z-10 ${className}`}
  >
    {children}
  </div>
);

// ─── Individual feature card ────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="card group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-t-2xl" />
    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 text-xl mb-4">
      <Icon />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// ─── Screenshot placeholder slot ────────────────────────────────────────────
const ScreenshotSlot = ({ tag, hint, sub, icon: Icon, image, className = '' }) => (
  <div className={`rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50
                   flex flex-col items-center justify-center gap-3 p-8 text-center
                   transition-colors duration-200 hover:border-teal-300 hover:bg-teal-50/40 ${className}`}>
    {image ? (
      <img src={image} alt={tag} className="w-full h-full object-cover rounded-xl" />
    ) : (
      <>
        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 text-2xl">
          <Icon />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
          {tag}
        </span>
        <p className="text-sm font-medium text-gray-600">{hint}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </>
    )}
  </div>
);

// ─── Main landing page ───────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  // Scroll-triggered fade-in
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.scroll-fade').forEach(el => {
      el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
      observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: LuTrendingUp,
      title: 'Instant Transaction Tracking',
      desc: 'Log income and expenses in seconds. Every entry is timestamped and categorised so you never lose the thread.',
    },
    {
      icon: LuLayoutDashboard,
      title: 'Visual Dashboards',
      desc: 'Clean charts and summary cards show exactly how your money is moving — at a glance, every day.',
    },
    {
      icon: LuClock,
      title: 'Monthly Reports',
      desc: 'A full breakdown of spending by category each month, so you can spot patterns and cut back where it counts.',
    },
    {
      icon: LuTarget,
      title: 'Budget Goals',
      desc: 'Set monthly limits per category. A progress bar shows exactly how close you are before you overshoot.',
    },
    {
      icon: LuShield,
      title: 'Secure & Private',
      desc: 'Your financial data is yours. Accounts are protected and your information is never shared with anyone.',
    },
    {
      icon: LuGlobe,
      title: 'Built for Kenya',
      desc: 'Designed around Kenyan shillings, local categories, and the way people here actually manage their money.',
    },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* ─── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between 
                      px-6 md:px-[6vw] h-16 bg-[#fcfbfc]/85 backdrop-blur-md 
                      border-b border-gray-200/70">
        <Link to="/">
         <span className="text-lg font-bold tracking-tight">
           Spend<span className="text-teal-500">Wise</span>
         </span>
       </Link>
        <ul className="hidden md:flex gap-8 list-none">
          {['About', 'Screenshots','Features',].map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button className="add-btn add-btn-fill" onClick={() => navigate('/signup')}>
          Get Started
        </button>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-[6vw] relative overflow-hidden" id="about">
        
        {/* Background blobs */}
        <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] 
                        rounded-[60%_40%_55%_45%] bg-teal-100/55 -z-10
                        animate-[blob_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[-80px] right-[200px] w-[280px] h-[280px] 
                        rounded-[45%_55%_40%_60%] bg-cyan-100/40 -z-10
                        animate-[blob_9s_ease-in-out_infinite_alternate-reverse]" />

        <div className="w-full max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 
                            text-xs font-semibold uppercase tracking-widest 
                            px-3 py-1.5 rounded-full border border-teal-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Your Personal Finance Companion
            </div>

            <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.1] 
                           tracking-tight text-gray-900 mb-6">
              Track Smarter,<br />
              Spend <span className="text-teal-500 italic font-normal" style={{ fontFamily: "'DM Serif Display', serif" }}>Better.</span>
            </h1>

            <p className="text-base text-gray-500 leading-relaxed max-w-[480px] mb-8">
              SpendWise shows you exactly where your money goes — with clean dashboards, 
              instant transaction tracking, and insights built around how you actually spend.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className="btn-primary !w-auto px-6 py-3" onClick={() => navigate('/signup')}>
                Get Started — It's Free
              </button>
              <a
                href="#screenshots"
                className="card-btn px-5 py-3 rounded-xl text-sm"
              >
                <LuPlay className="text-teal-500" />
                See it in action
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-gray-200 flex-wrap">
              {[
                { num: '100%', label: 'Free to use' },
                { num: 'Real-time', label: 'Expense updates' },
                { num: 'KSH', label: 'Built for Kenya' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-gray-900">{num}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — app mockup */}
          <div className="relative hidden md:block">
            {/* Browser mockup shell */}
            <div className="bg-white rounded-3xl border border-gray-200/70 overflow-hidden shadow-xl shadow-black/5">
              {/* Top bar */}
              <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
              </div>

              {/* Body */}
              <div className="flex" style={{ height: 340 }}>
                {/* Sidebar */}
                <div className="w-16 border-r border-gray-100 flex flex-col items-center pt-4 gap-2">
                  {[true, false, false].map((active, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base
                                  ${active ? 'bg-teal-50 text-teal-600' : 'text-gray-300'}`}
                    >
                      {i === 0 ? <LuLayoutDashboard /> : i === 1 ? <LuTrendingUp /> : <LuShield />}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-hidden">
                  <p className="text-[11px] font-semibold text-gray-900 mb-3">Good morning, John 👋</p>

                  {/* Mini stat cards */}
                  <div className="flex gap-2 mb-3">
                    {[
                      { label: 'Income', val: '85,000', teal: true },
                      { label: 'Expenses', val: '43,200', teal: false },
                      { label: 'Balance', val: '41,800', teal: false },
                    ].map(({ label, val, teal }) => (
                      <div key={label}
                        className={`flex-1 rounded-xl px-3 py-2 border 
                                    ${teal ? 'bg-teal-50 border-teal-100' : 'bg-gray-50 border-gray-200'}`}
                      >
                        <div className="text-[9px] text-gray-500">{label}</div>
                        <div className={`text-[13px] font-bold ${teal ? 'text-teal-700' : 'text-gray-900'}`}>{val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bar chart */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 mb-3">
                    <div className="text-[9px] text-gray-500 mb-2">Monthly Spending</div>
                    <div className="flex items-end gap-1.5 h-10">
                      {[45, 60, 35, 75, 55, 80, 50].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-primary' : 'bg-gray-200'}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="flex flex-col gap-1.5">
                    {[
                      { emoji: '🛒', name: 'Naivas Supermarket', date: 'Today, 10:30 AM', amt: '-3,450', neg: true },
                      { emoji: '💸', name: 'Salary — April', date: 'Apr 1, 8:00 AM', amt: '+85,000', neg: false },
                    ].map(({ emoji, name, date, amt, neg }) => (
                      <div key={name} className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-2 py-1.5">
                        <span className="text-sm mr-2">{emoji}</span>
                        <div className="flex-1">
                          <div className="text-[9px] font-semibold text-gray-700">{name}</div>
                          <div className="text-[8px] text-gray-400">{date}</div>
                        </div>
                        <div className={`text-[10px] font-bold ${neg ? 'text-rose-500' : 'text-teal-600'}`}>{amt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <FloatCard className="-bottom-5 -left-10 flex items-center gap-3 min-w-[180px]
                                   animate-[floatY_4s_ease-in-out_infinite_alternate]">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-base">💰</div>
              <div>
                <div className="text-[10px] text-gray-500">This month's savings</div>
                <div className="text-sm font-bold text-gray-900">KSH 41,800</div>
              </div>
            </FloatCard>

            <FloatCard className="-top-5 -right-8 min-w-[140px]
                                   animate-[floatY_4s_ease-in-out_2s_infinite_alternate]">
              <div className="text-[10px] text-gray-500 mb-1.5">Budget used</div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-primary rounded-full" />
              </div>
              <div className="text-[11px] font-semibold text-teal-700 mt-1">65% of KSH 66,500</div>
            </FloatCard>
          </div>
        </div>
      </section>

      {/* ─── SCREENSHOTS ──────────────────────────────────────────────────── */}
      <section id="screenshots" className="py-24 px-6 md:px-[6vw] bg-white border-y border-gray-200">
        <div className="scroll-fade mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">App Screenshots</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-tight text-gray-900 mb-3">
            See SpendWise in Action
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg">
            No learning curve. Open the app, add a transaction, see where you stand.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-5">
          <ScreenshotSlot
            tag="Dashboard View"
            hint="Your main dashboard screenshot"
            sub="Recommended: 700×400px or 16:9 ratio"
            icon={LuLayoutDashboard}
            image={Screenshot1}
            className="min-h-[200px] scroll-fade"
          />
          <ScreenshotSlot
            tag="Income & Expenses"
            hint="Transactions or chart view"
            sub="Recommended: 700×400px or 16:9 ratio"
            icon={LuTrendingUp}
            image={Screenshot2}
            className="min-h-[200px] scroll-fade"
          />
          <ScreenshotSlot
            tag="Budget Tracker"
            hint="Reports or budgets page"
            sub="Recommended: 700×400px or 16:9 ratio"
            icon={LuTarget}
            image={Screenshot3}
            className="min-h-[200px] scroll-fade"
          />
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 md:px-[6vw]">
        <div className="text-center max-w-xl mx-auto mb-16 scroll-fade">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Why SpendWise</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-tight text-gray-900 mb-3">
            Everything you need, nothing you don't
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Built for straightforward money management — no clutter, no confusion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {features.map((f, i) => (
            <div key={f.title} className="scroll-fade" style={{ transitionDelay: `${i * 80}ms` }}>
              <FeatureCard {...f} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BAND ─────────────────────────────────────────────────────── */}
      <div className="mx-6 md:mx-[6vw] mb-20 rounded-3xl bg-primary px-[5vw] py-20 
                                  text-center relative overflow-hidden scroll-fade">
        <div className="absolute top-[-150px] right-[-80px] w-[400px] h-[400px] 
                        rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[250px] h-[250px] 
                        rounded-full bg-white/5 pointer-events-none" />
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white tracking-tight mb-3 relative z-10">
          Start tracking your money today.
        </h2>
        <p className="text-white/75 text-base mb-8 max-w-md mx-auto relative z-10">
          Takes less than a minute to set up. No credit card, no fuss — just clarity.
        </p>
        <button
          className="bg-white text-teal-700 font-bold px-8 py-3.5 rounded-xl 
                     shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:shadow-xl
                     transition-all duration-200 relative z-10 inline-flex items-center gap-2"
          onClick={() => navigate('/signup')}
        >
          Create Free Account <LuArrowRight />
        </button>
      </div>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white/60 px-6 md:px-[6vw] pt-12 pb-8">
        <div className="flex flex-wrap justify-between gap-10 mb-10">
          <div>
            <div className="text-lg font-bold text-white mb-2">
              Spend<span className="text-teal-400">Wise</span>
            </div>
            <p className="text-sm max-w-[220px] leading-relaxed">
              Smart, simple expense tracking for everyday life in Kenya.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Product</p>
            {[['#features', 'Features'], ['#screenshots', 'Screenshots'], ['/signup', 'Sign Up'], ['/login', 'Log In']].map(([href, label]) => (
              <a key={label} href={href} className="text-sm hover:text-white transition-colors">{label}</a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Legal</p>
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-xs text-center">
          © {new Date().getFullYear()} SpendWise. Built with purpose in Kenya 🇰🇪
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;