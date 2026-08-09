import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LogoV8Preview() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-black tracking-tight text-orange-500 md:text-6xl">
          V8
        </h1>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          扁平版 logo · 衣服和文字等高
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-400 md:text-lg">
          3 个扁平风格版本，衣服高度 = 文字高度，完全去掉了车缝线和阴影。请挑一个告诉我编号。
        </p>

        <div className="mt-12 space-y-12">
          {[
            {
              num: "1",
              img: "/logo-concepts/v8-flat-1.jpg",
              tags: ["扁平", "无阴影", "无车缝线"],
              why: "最干净、最现代的扁平处理。",
            },
            {
              num: "2",
              img: "/logo-concepts/v8-flat-2.jpg",
              tags: ["扁平", "横线分隔", "印刷感强"],
              why: "加了 thin rule 在文字下面，更有『品牌字标』感。",
            },
            {
              num: "3",
              img: "/logo-concepts/v8-flat-3.jpg",
              tags: ["极简", "无 tagline", "现代"],
              why: "去掉了 slogan，更适合做网站 favicon 和小尺寸使用。",
            },
          ].map((v) => (
            <section
              key={v.num}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-10"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-5xl font-black text-orange-500 md:text-6xl">
                    {v.num}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {v.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-neutral-400">
                  {v.why}
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-white p-8">
                  <img
                    src={v.img}
                    alt={`V8 flat logo ${v.num}`}
                    className="mx-auto h-32 w-auto md:h-40"
                  />
                </div>
                <div className="rounded-xl bg-neutral-800 p-8">
                  <img
                    src={v.img}
                    alt={`V8 flat logo ${v.num} dark`}
                    className="mx-auto h-32 w-auto md:h-40"
                  />
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-8 text-center">
          <p className="text-base font-medium text-orange-400">
            看好了告诉我"用 1" / "用 2" / "用 3"，我才会替换线上 logo
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
