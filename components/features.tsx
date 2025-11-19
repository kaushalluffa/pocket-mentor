import { BarChart3, Globe, Lock, PieChart, Shield, Zap } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Everything you need to <br className="hidden md:block" /> manage
            your wealth
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Powerful tools designed to help you track, save, and grow your money
            with minimal effort.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BarChart3,
              title: "Smart Analytics",
              description:
                "Visualize your spending habits with interactive charts and get personalized insights to save more.",
            },
            {
              icon: Shield,
              title: "Bank-Grade Security",
              description:
                "Your data is encrypted with 256-bit AES encryption. We never sell your personal information.",
            },
            {
              icon: Zap,
              title: "Real-time Tracking",
              description:
                "Connect your accounts and track transactions in real-time. Never miss a payment or suspicious charge.",
            },
            {
              icon: PieChart,
              title: "Investment Portfolio",
              description:
                "Track all your investments in one place. Stocks, crypto, real estate, and more.",
            },
            {
              icon: Globe,
              title: "Multi-currency Support",
              description:
                "Travel often? We support over 150 currencies with real-time exchange rates.",
            },
            {
              icon: Lock,
              title: "Privacy First",
              description:
                "We are GDPR and CCPA compliant. You have full control over your data and privacy settings.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
