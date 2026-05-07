export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-5 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-3">
            Customer stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 max-w-3xl mx-auto leading-tight">
            What our satisfied customers are saying
          </h2>
          <p className="mt-2 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Clear, confident feedback from brands who trust our strategy, design, and delivery.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <article className="rounded-2xl block lg:relative bg-slate-950 text-white p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-4">
              Customer story
            </p>
            <h3 className="text-xl lg:text-3xl font-normal leading-tight text-white mb-5">
              Kara expertise transformed our vision into success with creativity, precision, and clarity.
            </h3>
            <p className="text-xs lg:text-sm leading-relaxed text-slate-300 max-w-2xl">
              We partnered on a premium digital experience built to reflect the brand’s values. Every design choice was intentional and aligned with business goals.
            </p>
            <div className="lg:absolute mt-4 text-xs bottom-10 lg:text-sm text-slate-400">
              Sarah Mitchell • Founder, Chipboard
            </div>

          </article>

          <div className="space-y-6">
            <aside className="rounded-2xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-4">
                Facts & numbers
              </p>
              <div className="lg:text-[3.5rem] text-4xl font-medium text-slate-900 leading-none">
                91%
              </div>
              <p className="mt-4 text-xs lg:text-sm text-gray-600 leading-relaxed">
                Clients recommend our design services for clarity, quality, and measurable results.
              </p>
            </aside>

            <article className="rounded-2xl border-gray-200 border  bg-slate-100 p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-4">
                Customer story
              </p>
              <h3 className="text-xl font-normal text-slate-900 leading-tight mb-4">
                Their attention to detail transformed our brand completely.
              </h3>
              <p className="text-xs lg:text-sm leading-relaxed text-gray-600">
                The process was seamless, thoughtful, and focused on delivering a refined brand experience.
              </p>
              <div className="mt-6 text-xs lg:text-sm text-gray-500">
                Sarah Mitchell — Marketing Head at TalentConnect
              </div>
            </article>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500 mb-4">
              Customer story
            </p>
            <h3 className="text-xl font-normal text-slate-900 leading-tight mb-4">
              Kara Design Agency brought our ideas to life with elegant clarity.”
            </h3>
            <p className=" text-xs lg:text-sm leading-relaxed text-gray-600">
              The work delivered was polished, strategic, and built to scale across every touchpoint.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 text-white p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-4">
              Customer story
            </p>
            <h3 className="text-xl font-normal leading-tight mb-5">
              A beautifully executed brand journey from brief to launch.
            </h3>
            <p className="text-xs lg:text-sm leading-relaxed text-slate-300">
              Every milestone felt intentional and well-managed, producing results that look premium and feel effortless.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
