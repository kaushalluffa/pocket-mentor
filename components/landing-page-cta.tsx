import { Button } from "./ui/button";

const LandingPageCTA = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center text-primary-foreground md:px-12 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-size:24px_24px opacity-20"></div>
          <div className="absolute -top-24 -left-24 -z-10 h-[300px] w-[300px] rounded-full bg-white/10 blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 -z-10 h-[300px] w-[300px] rounded-full bg-white/10 blur-[100px]"></div>

          <h2 className="mx-auto mb-6 max-w-[700px] text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            Ready to take control of your financial future?
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-primary-foreground/80 md:text-xl">
            Join over 500,000 users who are already managing their money smarter
            with PocketMentor.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-full px-8 text-base font-semibold text-primary"
            >
              Get Started for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-primary-foreground/20 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageCTA