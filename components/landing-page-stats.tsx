
const LandingPageStats = () => {
  return (
    <section className="py-20 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          {[
            { value: "$2B+", label: "Transactions Tracked" },
            { value: "500k+", label: "Active Users" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "4.9/5", label: "App Store Rating" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-primary">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingPageStats