import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

function Navbar() {
    const [navBtn, setNavBtn] = useState("M4 6h16M4 12h16M4 18h16");
    const [navOpen, setNavOpen] = useState(true);
    const menu = useRef();
    const navLists = useRef([]);
    const [search, setSearch] = useState('');

    const changeBtn = () => {
        if(navOpen) setNavBtn("M6 18L18 6M6 6l12 12");
        else setNavBtn("M4 6h16M4 12h16M4 18h16");
        menu.current.classList.toggle('hidden');
        setNavOpen(!navOpen);
    }

    const handleNavLists = (i) => {
        navLists.current[i].classList.toggle('hidden');
    }

    useEffect(() => {
        const resetNav = () => {
            navLists?.current.forEach(c => c.classList.add('hidden'));
            setNavBtn("M4 6h16M4 12h16M4 18h16");
            setNavOpen(true);
            menu.current.classList.add('hidden');
        }

        window.addEventListener('resize', resetNav);

        return () => window.removeEventListener('resize', resetNav);
    }, [navLists, navOpen]);

    const handleSearch = e => {
        if(search.length < 3) e.preventDefault();
    }

    return (
        <nav className="fixed top-0 flex flex-row justify-between bg-white w-full px-4 z-10 items-center">
            <svg className="w-10 h-10 md:hidden cursor-pointer" onClick={changeBtn} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={navBtn}></path></svg>
            <div className="flex flex-row">
                <h2 className="text-5xl flex items-center py-3"><Link href="/">Recipes</Link></h2>
                <div ref={menu} className="hidden md:flex flex-col md:flex-row md:ml-5 absolute top-full left-0 md:static bg-white md:border-none border-y border-yellow-500 w-full">
                    <div className="relative cursor-pointer group h-full flex flex-col md:flex-row md:items-center px-5">
                        <div className="flex flex-row gap-2 font-bold text-lg uppercase items-center md:py-0 py-2" onClick={() => handleNavLists(0)}><span className="decoration-yellow-500 decoration-2 underline-offset-4 group-hover:underline">Recipes</span><svg className="w-5 h-5 stroke-rose-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div ref={el => navLists.current[0] = el} className="md:absolute left-5 top-3/4 border-yellow-500 md:border bg-white text-lg w-full hidden md:group-hover:block">
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/breakfast">Breakfast</Link></div>
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/lunch">Lunch</Link></div>
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/dinner">Dinner</Link></div>
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/drink">Drink</Link></div>
                        </div>
                    </div>
                    <div className="relative cursor-pointer group h-full flex flex-col md:flex-row md:items-center px-5 md:border-none border-y border-yellow-500">
                        <div className="flex flex-row gap-2 font-bold text-lg uppercase items-center md:py-0 py-2" onClick={() => handleNavLists(1)}><span className="decoration-yellow-500 decoration-2 underline-offset-4 group-hover:underline">Quick & Easy</span><svg className="w-5 h-5 stroke-rose-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div ref={el => navLists.current[1] = el} className="md:absolute left-5 top-3/4 border-yellow-500 md:border bg-white text-lg w-full hidden md:group-hover:block">
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/easy">Easy</Link></div>
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/quick">Quick</Link></div>
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/pasta">Pasta</Link></div>
                            <div className="p-1 hover:bg-yellow-300 hover:underline underline-offset-1"><Link href="/list/vegetarian">Vegetarian</Link></div>
                        </div>
                    </div>
                    <Link href="/about"><a className="flex flex-row gap-2 font-bold text-lg uppercase items-center cursor-pointer h-full px-5 md:py-0 py-2 decoration-yellow-500 decoration-2 underline-offset-4 hover:underline">About</a></Link>
                </div>
            </div>
            <form className="hover:absolute hover:h-full top-0 right-4 flex items-center gap-2 group bg-white pl-2" action="/search" onSubmit={handleSearch}>
                <button>
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
                <div className="hidden items-center gap-2 group-hover:flex">
                    <input type="text" className="border p-1" name="term" value={search} onChange={e => setSearch(e.target.value)} />
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </form>
        </nav>
    )
}

export default Navbar