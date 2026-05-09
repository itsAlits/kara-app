export default function Testimonials({ content = {} }) {
  const {
    eyebrow = "Customer stories",
    heading = "What our satisfied customers are saying",
    subheading = "Clear, confident feedback from brands who trust our strategy, design, and delivery.",
    stat = { value: "91%", label: "Clients recommend our design services for clarity, quality, and measurable results." },
    items = [],
  } = content;

  // Split items into layout positions (first 2 + remaining)
  const [t1, t2, t3, t4] = items;

  return (
    <section id="testimonials" className="py-20 px-5 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 max-w-3xl mx-auto leading-tight">
            {heading}
          </h2>
          <p className="mt-2 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          {/* Large dark featured */}
          {t1 && (
            <article className="rounded-2xl block lg:relative bg-slate-950 text-white p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-4">Customer story</p>
              <h3 className="text-xl lg:text-3xl font-normal leading-tight text-white mb-5">{t1.quote}</h3>
              <p className="text-xs lg:text-sm leading-relaxed text-slate-300 max-w-2xl">{t1.body}</p>
              {(t1.author || t1.role) && (
                <div className="lg:absolute mt-4 text-xs bottom-10 lg:text-sm text-slate-400">
                  {t1.author}{t1.author && t1.role ? " • " : ""}{t1.role}
                </div>
              )}
            </article>
          )}

          <div className="space-y-6">
            {/* Stat card */}
            <aside className="rounded-2xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-4">Facts &amp; numbers</p>
              <div className="lg:text-[3.5rem] text-4xl font-medium text-slate-900 leading-none">{stat.value}</div>
              <p className="mt-4 text-xs lg:text-sm text-gray-600 leading-relaxed">{stat.label}</p>
            </aside>

            {t2 && (
              <article className="rounded-2xl border-gray-200 border bg-slate-100 p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-4">Customer story</p>
                <h3 className="text-xl font-normal text-slate-900 leading-tight mb-4">{t2.quote}</h3>
                <p className="text-xs lg:text-sm leading-relaxed text-gray-600">{t2.body}</p>
                {(t2.author || t2.role) && (
                  <div className="mt-6 text-xs lg:text-sm text-gray-500">
                    {t2.author}{t2.author && t2.role ? " • " : ""}{t2.role}
                  </div>
                )}
              </article>
            )}
          </div>
        </div>

        {(t3 || t4) && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {t3 && (
              <article className="rounded-2xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-4">Customer story</p>
                <h3 className="text-xl font-normal text-slate-900 leading-tight mb-4">{t3.quote}</h3>
                <p className="text-xs lg:text-sm leading-relaxed text-gray-600">{t3.body}</p>
              </article>
            )}
            {t4 && (
              <article className="rounded-2xl bg-slate-950 text-white p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-4">Customer story</p>
                <h3 className="text-xl font-normal leading-tight mb-5">{t4.quote}</h3>
                <p className="text-xs lg:text-sm leading-relaxed text-slate-300">{t4.body}</p>
              </article>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
