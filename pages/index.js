import Head from 'next/head'
import Image from 'next/image'
import { createClient } from 'contentful'
import Link from 'next/link'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  const easyRes = await client.getEntries({ content_type: 'recipe', 'metadata.tags.sys.id[in]': 'easy', limit: 3 });

  return {
    props: {
      recipes: res.items,
      easyRecipes: easyRes.items
    },
    revalidate: 10,
  }
}

export default function Home({ recipes, easyRecipes }) {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <main>
        <header className="flex flex-col lg:flex-row">
          <div className="lg:basis-3/5 lg:sticky top-0 h-screen">
            <Image src={'https:' + recipes[0].fields.image.fields.file.url} objectFit="cover" layout="fill" />
            <div className="absolute bottom-0 flex justify-center w-full mb-6">
              <Link href={"/recipes/"+recipes[0].fields.slug}>
                <a className="bg-white/80 p-4 group relative">
                  <div className="border-2 border-yellow-500 p-4 flex flex-col items-center max-w-4xl gap-4">
                    <h1 className="text-5xl font-serif">{recipes[0].fields.title}</h1>
                    <p className="text-center text-2xl">{recipes[0].fields.description}</p>
                    <div className="flex flex-row items-center gap-1">
                      <span className="uppercase text-sm font-bold group-hover:underline underline-offset-1">Get the Recipe</span>
                      <svg className="w-4 h-4 stroke-rose-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-20 lg:basis-2/5">
            <Link href="/list/new">
              <a className="flex flex-row items-center justify-center gap-2 group">
                <h1 className="text-4xl text-center underline underline-offset-4 decoration-yellow-500 group-hover:decoration-rose-900 font-serif">New from the Kitchen</h1>
                <svg className="w-8 h-8 stroke-rose-900 group-hover:stroke-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </Link>
            <div className="grid grid-cols-2 gap-4 mt-6 px-4">
              {recipes.map((recipe, i) => (
                <div className="bg-white hover:shadow-solid hover:shadow-yellow-500 hover:-translate-x-1 hover:-translate-y-1 transition-shadow" key={i}>
                  <Link href={'/recipes/'+recipe.fields.slug}>
                    <a className="flex flex-col gap-2">
                      <div className="h-52 overflow-hidden relative"><Image src={'https:'+ recipe.fields.image.fields.file.url} layout="fill" objectFit='cover' /></div>
                      <div className="uppercase font-bold text-rose-900 px-2 text-ellipsis whitespace-nowrap overflow-hidden">{recipe.metadata.tags.map((tag, i) => <span key={i} className='pr-4'>{tag.sys.id}</span>)}</div>
                      <div className="text-3xl px-2">{recipe.fields.title}</div>
                      <div className="px-2 pb-2 flex flex-row gap-1">
                        <svg className="w-6 h-6 stroke-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{recipe.fields.cookTime+recipe.fields.preparationTime+recipe.fields.inactiveTime} mins</span>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </header>
        <div className="mt-20 flex flex-col items-center">
            <Link href="/list/easy">
              <a className="flex flex-row items-center justify-center gap-2 group">
                  <h1 className="text-4xl text-center underline underline-offset-4 decoration-yellow-500 group-hover:decoration-rose-900 font-serif">Easy Meals</h1>
                  <svg className="w-8 h-8 stroke-rose-900 group-hover:stroke-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 lg:w-3/4 px-4 lg:px-0">
                {easyRecipes.map((recipe, i) => (
                  <div className="bg-white hover:shadow-solid hover:shadow-yellow-500 hover:-translate-x-1 hover:-translate-y-1 transition-shadow" key={i}>
                    <Link href={'/recipes/'+recipe.fields.slug}>
                    <a className="flex flex-col gap-2">
                        <div className="h-72 relative overflow-hidden"><Image src={'https:' + recipe.fields.image.fields.file.url} objectFit="cover" layout="fill" /></div>
                        <div className="uppercase font-bold text-rose-900 px-2 text-ellipsis whitespace-nowrap overflow-hidden">{recipe.metadata.tags.map((tag, i) => <span key={i} className='pr-4'>{tag.sys.id}</span>)}</div>
                        <div className="text-3xl px-2">{recipe.fields.title}</div>
                        <div className="px-2 pb-2 flex flex-row gap-1">
                            <svg className="w-6 h-6 stroke-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{recipe.fields.cookTime+recipe.fields.preparationTime+recipe.fields.inactiveTime} mins</span>
                        </div>
                    </a>
                    </Link>
                </div>
                ))}
            </div>
        </div>
      </main>
    </>
  )
}
