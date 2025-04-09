interface BlogQuoteProps {
  children: React.ReactNode;
  author?: string;
}

export const BlogQuote = ({ children, author }: BlogQuoteProps) => (
  <div className="my-12 rounded-lg bg-[#0D2A2D] p-8 md:p-12">
    <div className="mx-auto max-w-3xl">
      <div className="text-lg leading-relaxed text-[#94A3B8] md:text-xl">{children}</div>
      {author && (
        <div className="mt-6 border-t border-[#1E4145] pt-4 text-sm text-[#64748B]">{author}</div>
      )}
    </div>
  </div>
);