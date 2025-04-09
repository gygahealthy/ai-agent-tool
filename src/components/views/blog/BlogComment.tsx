import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const BlogComment = () => {
  return (
    <div className="border-t border-[#1E2329] bg-[#13161C] py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Leave a comment</h2>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Input
                  placeholder="Name*"
                  className="border-[#2E3338] bg-[#1E2329] text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email*"
                  className="border-[#2E3338] bg-[#1E2329] text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Input
                placeholder="Website"
                className="border-[#2E3338] bg-[#1E2329] text-white"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your comment"
                className="min-h-[150px] border-[#2E3338] bg-[#1E2329] text-white"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                Submit Comment
              </Button>
              <p className="text-sm text-gray-400">* Required fields</p>
            </div>
          </form>

          {/* Sample Comments - You can make this dynamic later */}
          <div className="mt-16 space-y-8">
            <h3 className="text-xl font-semibold text-white">Comments (2)</h3>
            
            <div className="space-y-8">
              <div className="rounded-lg bg-[#1E2329] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-500/20 text-teal-400">
                      {/* Avatar placeholder */}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">John Doe</h4>
                      <p className="text-sm text-gray-400">2 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-teal-400 hover:text-teal-300">
                    Reply
                  </Button>
                </div>
                <p className="text-gray-300">
                  Great article! The insights about AI in web design are really helpful.
                </p>
              </div>

              <div className="ml-12 rounded-lg bg-[#1E2329] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-500/20 text-teal-400">
                      {/* Avatar placeholder */}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Jane Smith</h4>
                      <p className="text-sm text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-teal-400 hover:text-teal-300">
                    Reply
                  </Button>
                </div>
                <p className="text-gray-300">
                  Thanks for sharing these valuable insights! Looking forward to more content like this.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};