import { Eye, Filter, MessagesSquare, Network, Sparkles } from "lucide-react";

const valuePropositions = [
  {
    icon: MessagesSquare,
    title: "Expert Support",
    description: "Our team has the expertise to help you achieve your visual content goals",
  },
  {
    icon: Filter,
    title: "Reliable Experts",
    description: "Our team has the expertise to help you achieve your visual content goals",
  },
  {
    icon: Eye,
    title: "Image Quality",
    description: "Our team has the expertise to help you achieve your visual content goals",
  },
  {
    icon: Network,
    title: "Creation Technology",
    description: "Our team has the expertise to help you achieve your visual content goals",
  },
];

export function FeatureSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-visible bg-[#13161C] py-20 text-white">
      <div className="pointer-events-none absolute -left-[32rem] top-[-50vh] z-0 h-[1000px] w-[1000px] rounded-full bg-yellow-500/10 opacity-40 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-6 text-center lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl">
          <span className="mb-4 inline-block rounded-full border border-gray-600 bg-gray-800/50 px-4 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
            why choose us
          </span>
          <h2 className="mb-12 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <Sparkles className="mb-2 mr-2 inline-block h-8 w-8 text-cyan-400" /> Create Stunning
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              }}
            >
              Original Visuals
            </span>{" "}
            with Ease
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {valuePropositions.map((prop, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800/60">
                <prop.icon className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{prop.title}</h3>
              <p className="text-sm text-gray-400">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
