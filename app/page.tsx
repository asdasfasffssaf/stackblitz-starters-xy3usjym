import { RichText } from '@graphcms/rich-text-react-renderer';
export const revalidate = 10; // seconds

type PageType = {
  title: string;
  slug: string;
  publishedAt: string;
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
        pages(orderBy: publishedAt_DESC) {
          title
          slug
          publishedAt
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
      <header className="static">
        <div className="bg-gray-300 text-white py-1">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-6">
              <h1 className="text-3xl font-bold">~</h1>
              <h1 className="text-3xl font-bold">Tilde</h1>
              <nav className="flex flex-row gap-4">
                <a href="https://www.svtplay.se/kanaler" target="_blank" className="hover:text-black transition-colors duration-200 transform hover:scale-150 transition-transform duration-300">SVT PLAY</a>
                <a href="https://embed.ted.com" target="_blank" className="hover:text-black transition-colors duration-200 transform hover:scale-150 transition-transform duration-300">TED</a>
                <a href="https://www.arte.tv" target="_blank" className="hover:text-black transition-colors duration-200 transform hover:scale-150 transition-transform duration-300">ARTE</a>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="bg-transparent text-white py-1 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-8 gap-8 text-center">
              {pages.map((page: PageType) => (
                <a 
                  href={`#${page.slug}`}
                  key={page.slug}
                  className="text-sm tracking-wider uppercase hover:text-white transform hover:scale-150 transition-transform duration-300"
                >
                  {page.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mt-0 mb-32">
        <h1 className="text-4xl font-bold mb-8"></h1>
        <div className="grid gap-32 md:gap-48 lg:gap-64">
          {pages.map((page: PageType) => (
            <div id={page.slug} key={page.slug} className="bg-black p-0 scroll-mt-0">
              <h2 className="text-4xl uppercase text-white text-right mb-1 p-1">{page.title}</h2>
              <div className="prose max-w-none text-gray-700">
                <RichText content={page.body.raw} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <a 
        href="#"
        className="fixed bottom-8 right-8 bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200"
      >
        <span className="text-2xl">↑</span>
        <span>Menu</span>
      </a>
    </>
  );
}