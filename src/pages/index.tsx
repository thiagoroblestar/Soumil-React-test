import { Inter } from 'next/font/google';
import { ChangeEvent, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SearchInput from '@/components/SearchInput';
import List from '@/components/List';
import { BookResponse } from '@/types';
import Loading from '@/components/Loading';
import SortButton from '@/components/SortButton';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [search, setSearch] = useState('');
  const [ascending, setAscending] = useState(false);
  const { data, isFetching } = useQuery({
    queryKey: ['books', search],
    queryFn: async () => {
      const res = await axios.get<BookResponse>(`https://openlibrary.org/search.json?q=${search}`);
      return res.data;
    },
    enabled: Boolean(search),
  });

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, 1000);

  const handleSortClick = () => {
    setAscending(!ascending);
  };

  const sortedItems = useMemo(() => {
  const items = data?.docs || [];
    return [...items].sort((a, b) => {
      return ascending ? a.first_publish_year - b.first_publish_year : b.first_publish_year - a.first_publish_year;
    });
  }, [data?.docs, ascending]);

  return (
    <main
      className={`min-h-screen px-8 ${inter.className}`}
    >
      <div className='sticky top-0 py-4 flex gap-3'>
        <SearchInput
          placeholder='Search'
          onChange={handleSearch}
        />
        <SortButton
          ascending={ascending}
          onClick={handleSortClick}
        />
      </div>
      {
        isFetching ? <Loading /> : (
          <List
            items={sortedItems}
          />
        )
      }
    </main>
  )
}
