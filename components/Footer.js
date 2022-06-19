import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className="mt-20 border-t border-yellow-500 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 py-10 px-20 gap-5">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl text-center sm:text-left">Recipes</h1>
                    <div className="flex flex-row gap-4 justify-center sm:justify-start">
                        <div className="uppercase font-bold">follow!</div>
                        <div className="flex flex-row gap-2">
                            <Link href="">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </Link>
                            <Link href="">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </Link>
                            <Link href="">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </Link>
                            <Link href="">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-gray-600 font-semibold text-center sm:text-left">
                    <Link href="/list/breakfast" className="hover:text-black">Breakfast</Link>
                    <Link href="/list/lunch" className="hover:text-black">Lunch</Link>
                    <Link href="/list/dinner" className="hover:text-black">Dinner</Link>
                    <Link href="/list/drink" className="hover:text-black">Drink</Link>
                    <Link href="/list/easy" className="hover:text-black">Easy</Link>
                    <Link href="/list/quick" className="hover:text-black">Quick</Link>
                    <Link href="/list/pasta" className="hover:text-black">Pasta</Link>
                    <Link href="/list/vegetarian" className="hover:text-black">Vegetarian</Link>
                </div>
            </div>
            <div className="text-center py-5 border-t-2">
                © COPYRIGHT BY Lorem. ALL RIGHTS RESERVED.
            </div>
        </footer>
    )
}

export default Footer