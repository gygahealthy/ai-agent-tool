import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email);
    // Reset form
    setEmail("");
    // Show success message (in a real app)
  };

  return (
    <section className="bg-white py-16">
      {/* Product Showcase Strip */}

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">Vela Newsletter</h2>
          <p className="mb-8 text-gray-600">Get timely updates from your favorite products</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full border-b border-gray-300 bg-transparent py-3 pl-2 pr-4 outline-none focus:border-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 border-b-2 border-black bg-transparent px-6 py-2 font-medium uppercase text-black transition-colors hover:text-gray-700 sm:mt-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
