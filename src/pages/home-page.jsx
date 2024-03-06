import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowUpRightFromCircleIcon, PlusIcon } from 'lucide-react';

import { asyncPopulateUsersAndThreads } from '../states/shared/action';

import ThreadList from '../components/thread-list';

export default function HomePage() {
  const { threads = [], users = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      return thread?.category.toLocaleLowerCase().includes(category?.toLocaleLowerCase());
    });
  }, [threads, category]);

  const threadList = useMemo(() => {
    return filteredThreads.map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
    }));
  }, [filteredThreads, users]);

  const threadCategory = useMemo(() => {
    return threads.reduce((accumulator, current) => {
      if (!accumulator.find((item) => item.category === current.category)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
  }, [threads]);

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <aside className="order-2 col-span-1 xl:h-24 xl:order-1 xl:sticky xl:top-20">
          <div className="flex flex-row items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Category Popular</h2>
            <button onClick={() => setCategory('')}>
              <div className="flex flex-row items-center font-medium underline underline-offset-4 hover:text-slate-500 focus:text-slate-500">
                <p>All</p>
              </div>
            </button>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 xl:flex-col">
            {threadCategory?.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setCategory(thread.category)}
                className="w-full px-2.5 py-1.5 border border-dashed border-slate-800 rounded-md hover:bg-slate-700  hover:text-white focus:bg-slate-700 focus:text-white active:bg-slate-500"
              >
                <span>{`#${thread.category}`}</span>
              </button>
            ))}
          </div>
        </aside>
        <div className="order-3 col-span-1 xl:col-span-2 xl:order-2">
          <h2 className="mb-3 text-xl font-semibold">Disscusion</h2>
          <ThreadList threadList={threadList} />
        </div>
        <aside className="order-1 col-span-1 xl:h-24 xl:order-3 xl:sticky xl:top-20">
          <nav className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2 transition-all duration-150 cursor-pointer group">
              <Link to="/leaderboards" className="font-semibold transition-all duration-150 group-hover:text-rose-500">
                Leaderboards
              </Link>
              <ArrowUpRightFromCircleIcon className="w-4 h-4 group-hover:text-rose-500" />
            </div>
            <button className="w-full px-2.5 py-1.5 border rounded-md border-dashed border-slate-600 hover:bg-slate-700 hover:text-white active:text-white">
              <Link to="/threads/create">
                <div className="flex flex-row items-center justify-center font-semibold">
                  <PlusIcon />
                  <span>Add Thread</span>
                </div>
              </Link>
            </button>
          </nav>
        </aside>
      </div>
    </section>
  );
}
