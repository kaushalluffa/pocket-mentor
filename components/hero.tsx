import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  PieChart,
  Wallet,
} from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size:24px_24px"></div>
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_20%)] opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                New: AI Investment Insights
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                The AI Finance Assistant in Your Pocket.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:mx-0 text-balance">
                Stop guessing where your money goes. PocketMentor analyzes your
                cash flow every week and tells you exactly what to invest and
                what to save.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
              <Button size="lg" className="rounded-full px-8 h-12 text-base">
                Get My Weekly Summary
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base"
              >
                See How It Works
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl">
              <div className="rounded-xl bg-background p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Balance
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      $124,592.45
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                    <span>+2.4%</span>
                  </div>
                </div>
                <div className="h-[200px] w-full bg-linear-to-b from-primary/5 to-transparent rounded-lg border border-primary/10 relative overflow-hidden mb-6">
                  {/* Abstract Chart Line */}
                  <svg
                    className="absolute bottom-0 left-0 right-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,200 L40,180 L80,190 L120,150 L160,160 L200,120 L240,130 L280,90 L320,100 L360,60 L400,70 L440,30 L480,40 L520,10 L560,20 L600,0 V200 H0 Z"
                      fill="url(#gradient)"
                      opacity="0.2"
                    />
                    <path
                      d="M0,200 L40,180 L80,190 L120,150 L160,160 L200,120 L240,130 L280,90 L320,100 L360,60 L400,70 L440,30 L480,40 L520,10 L560,20 L600,0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="currentColor"
                          className="text-primary"
                        />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: Wallet,
                      label: "Income",
                      amount: "+$8,240",
                      color: "text-green-500",
                    },
                    {
                      icon: CreditCard,
                      label: "Expenses",
                      amount: "-$3,420",
                      color: "text-red-500",
                    },
                    {
                      icon: PieChart,
                      label: "Investments",
                      amount: "+$1,250",
                      color: "text-blue-500",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-background shadow-sm">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-sm font-bold ${item.color}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]"></div>
            <div className="absolute -bottom-12 -left-12 -z-10 h-[300px] w-[300px] rounded-full bg-secondary/20 blur-[100px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
