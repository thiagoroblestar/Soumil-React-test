import { Doc } from '@/types';
import React from 'react';


interface ListProps {
  items: Doc[]
}

const List = ({ items }: ListProps) => {

  return (
    <div className="container mx-auto mb-4">
      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li key={index} className="py-4">
            <div className="text-xl font-semibold">{item.title}</div>
            <div className='flex gap-2 mt-1'>
              <div>{item.author_name}</div>
              {
                item.first_publish_year && (
                  <>
                    {item.author_name && <div className='border-gray-300 border-r' />}
                    <div>{item.first_publish_year}</div>
                  </>
                )
              }
              <div className='border-gray-300 border-r' />
              <div>{item.number_of_pages_median || 0} pages</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
