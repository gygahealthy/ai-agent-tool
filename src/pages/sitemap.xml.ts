import { GetServerSideProps } from 'next';
import { generateSiteMap } from '@/lib/sitemap';

function SitemapXML() {
  // This component will not be used, but is required for Next.js
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!res) {
    return {
      props: {},
    };
  }

  try {
    // Generate the XML sitemap
    const sitemap = generateSiteMap();

    // Set the appropriate headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');

    // Write the XML to the response
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return {
      props: {},
      notFound: true,
    };
  }
};

export default SitemapXML; 