import { RichText } from '@graphcms/rich-text-react-renderer';
import MobileMenu from './components/MobileMenu';
export const revalidate = 10; // seconds

type PageType = {
  title: string;
  slug: string;
  body: {
    raw: any;
  };
};

async function getPages() {
  const response = await fetch(process.env.NEXT_HYGRAPH_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Pages {
        pages(orderBy: title_DESC) {
          title
          slug
          body {
            raw
          }
        }
      }`,
    }),
  });
  const json = await response.json();
  return json.data.pages;
}

export default async function Page() {
  const pages: PageType[] = await getPages();
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-black text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <h1 className="text-3xl font-bold">~</h1>
                <h1 className="text-3xl font-bold">Tilde</h1>
                <nav className="hidden md:flex space-x-6">
                  <a href="https://www.svtplay.se/kanaler" className="hover:text-gray-300">SVT PLAY</a>
                  <a href="https://embed.ted.com" className="hover:text-gray-300">TED</a>
                  <a href="https://www.arte.tv" className="hover:text-gray-300">ARTE</a>
                </nav>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <a href="https://dyoidart.work" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Dyoid
                </a>
                <a href="https://dyoidart.work/dev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Dev
                </a>
              </div>

              <MobileMenu />
            </div>
          </div>
        </div>
        
        <div className="bg-black/90 text-white py-4 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {pages.map((page: PageType) => (
                <a 
                  href={`#${page.slug}`}
                  key={page.slug}
                  className="text-sm tracking-wider uppercase hover:text-gray-300 transition-colors duration-200"
                >
                  {page.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 mt-0">
        <h1 className="text-4xl font-bold mb-8">All Pages</h1>
        <div className="grid gap-8">
          {pages.map((page: PageType) => (
            <div id={page.slug} key={page.slug} className="bg-white rounded-lg shadow-md p-8 scroll-mt-40">
              <h2 className="text-2xl text-gray-700 font-semibold mb-6">{page.title}</h2>
              <div className="prose max-w-none text-gray-700">
                <RichText content={page.body.raw} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}