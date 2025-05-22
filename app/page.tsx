import { RichText } from '@graphcms/rich-text-react-renderer';
import Header from "./components/Header"
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
<Header pages={pages} />

      <main className="container mx-auto px-32 mt-0 mb-32">
        <h1 className="text-4xl font-bold mb-8"></h1>
        <div className="grid gap-64">
          {pages.map((page: PageType) => (
            <div id={page.slug} key={page.slug} className="bg-black p-0 scroll-mt-0">
              <h2 className="text-4xl uppercase text-white text-right mb-1 p-1">{page.title}</h2>
              <div className="prose border-4 border-white max-w-none text-gray-700">
                <RichText content={page.body.raw} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}