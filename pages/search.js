import React from 'react'
import { createClient } from 'contentful';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'

export async function getServerSideProps({ query, res }) {
    if (!query.term) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    });

    const data = await client.getEntries({ content_type: 'recipe', 'fields.title[match]': query.term, limit: 24 });

    if(!data.items.length) res.statusCode = 404;

    return {
        props: {
            recipes: data.items,
            term: query.term
        }
    }
}

function List({ recipes, term }) {
    return (
        <>
            <Head>
                <title>{term} - Recipes</title>
            </Head>
            <main className="mt-32 max-w-7xl mx-auto px-5">
                <header className="flex items-center flex-col gap-5">
                    <span className="bg-green-500/20 text-green-800 text-lg p-2 font-bold">{term}</span>
                </header>
                <div className="flex flex-col gap-5 mt-10">
                    <h2 className="text-4xl border-b border-green-800 font-serif pb-5 text-green-800">Results</h2>
                    {!recipes.length ? (<h4 className='text-2xl text-center font-semibold'>No Results</h4>) : ''}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {recipes.map((recipe, i) => (
                            <div className="bg-white hover:shadow-solid hover:shadow-yellow-500 hover:-translate-x-1 hover:-translate-y-1 transition-shadow" key={i}>
                                <Link href={'/recipes/' + recipe.fields.slug}>
                                    <a className="flex flex-col gap-2">
                                        <div className="h-72 overflow-hidden relative"><Image src={'https:' + recipe.fields.image.fields.file.url} layout="fill" objectFit='cover' /></div>
                                        <div className="uppercase font-bold text-rose-900 px-2 text-ellipsis whitespace-nowrap overflow-hidden">{recipe.metadata.tags.map((tag, i) => <span key={i} className='pr-4'>{tag.sys.id}</span>)}</div>
                                        <div className="text-3xl px-2">{recipe.fields.title}</div>
                                        <div className="px-2 pb-2 flex flex-row gap-1">
                                            <svg className="w-6 h-6 stroke-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span>{recipe.fields.preparationTime + recipe.fields.cookTime + recipe.fields.inactiveTime} mins</span>
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

export default List