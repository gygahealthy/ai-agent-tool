import { Button } from "@/components/ui/button";

export const BlogCTA = () => {
  return (
    <div className="border-t border-[#1E2329] bg-[#13161C] py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-lg bg-gradient-to-r from-teal-900/50 to-blue-900/50 p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Start Your AI Journey?
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              Join our community of innovators and stay updated with the latest in AI technology. 
              Get exclusive access to tutorials, resources, and expert insights.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                className="w-full bg-teal-500 text-white hover:bg-teal-600 sm:w-auto"
                size="lg"
              >
                Get Started Now
              </Button>
              <Button
                variant="outline"
                className="w-full border-teal-500 text-teal-400 hover:bg-teal-950 sm:w-auto"
                size="lg"
              >
                Learn More
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Join over 10,000+ developers already using our platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};