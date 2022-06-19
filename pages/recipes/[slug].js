import React from 'react';
import { createClient } from 'contentful';
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'
import Fallback from '../../components/Fallback'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN
});

export const getStaticProps = async (context) => {
    const data = await client.getEntries({ content_type: 'recipe', 'fields.slug': context.params.slug });

    if (!data.items.length) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    return {
        props: {
            recipe: data.items[0],
        },
        revalidate: 60,
    }
}

export const getStaticPaths = async () => {
    const res = await client.getEntries({ content_type: 'recipe' });

    return {
        paths: res.items.map(item => ({ params: { slug: item.fields.slug } })),
        fallback: true
    }
}

function Recipe({ recipe, error }) {
    if (!recipe) return <Fallback />

    return (
        <>
            <Head>
                <title>{recipe.fields.title} - Recipes</title>
            </Head>
            <main className="mt-32 max-w-7xl mx-auto">
                <header className="flex flex-col border-b border-green-500/20 pb-10 px-4 text-center md:text-start">
                    <div className="flex flex-row gap-3 uppercase items-center font-bold justify-center md:justify-start">
                        <div className='hidden md:block'>TAGS:</div>
                        {recipe.metadata.tags.map((tag, i) => <Link key={i} href={'/list/' + tag.sys.id}><a className="p-2 text-green-800 bg-green-500/10 hover:bg-green-500/20"><span>{tag.sys.id}</span></a></Link>)}
                    </div>
                    <h1 className="text-5xl font-serif mt-10">{recipe.fields.title}</h1>
                    <p className="mt-5 text-2xl text-gray-500">{recipe.fields.description}</p>
                </header>
                <div className="px-4 md:px-24 mt-10 flex flex-col gap-10">
                    <div>
                        <Image src={'https:' + recipe.fields.image.fields.file.url} width={recipe.fields.image.fields.file.details.image.width} height={recipe.fields.image.fields.file.details.image.height} />
                    </div>
                    <div className="flex flex-col bg-gradient-to-b from-green-500/20 to-slate-100 p-5 gap-5">
                        <h2 className="text-4xl font-serif text-black/80">{recipe.fields.title}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 font-bold text-lg border-b border-green-500/20 pb-5">
                            <div className="flex flex-col">
                                <span className="uppercase text-green-800">prep time</span>
                                <span>{recipe.fields.preparationTime} mins</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase text-green-800">cook time</span>
                                <span>{recipe.fields.cookTime} mins</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase text-green-800">inactive time</span>
                                <span>{recipe.fields.inactiveTime} mins</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase text-green-800">total time</span>
                                <span>{recipe.fields.preparationTime + recipe.fields.cookTime + recipe.fields.inactiveTime} mins</span>
                            </div>
                        </div>
                        <div className="text-lg">
                            <div className="font-bold uppercase">servings</div>
                            <div className="font-semibold">{recipe.fields.servings} {recipe.fields.servings > 1 ? 'servings' : 'serving'}</div>
                        </div>
                    </div>
                    <h4 className="text-3xl p-5 pt-0 border-b border-green-500/20">Ingredients</h4>
                    <div className="px-5">
                        <ul className="list-disc relative left-5 marker:text-green-800 text-xl flex flex-col gap-2">
                            {recipe.fields.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                    </div>
                    <h4 className="text-3xl p-5 pt-0 border-b border-green-500/20">Method</h4>
                    <ul className="list-decimal relative left-10 marker:text-2xl marker:text-green-800 flex flex-col gap-5">
                        {recipe.fields.method.map((method, i) => (
                            <li key={i}>
                                <div className="text-xl">
                                    {method}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}

export default Recipe