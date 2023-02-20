import React, { useState } from 'react';
import Select from 'react-select';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import images from './components/Images';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import './App.css'


const App = () => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const categories = [
    { label: 'All', value: null },
    { label: 'Nature', value: 'nature' },
    { label: 'Astronomy', value: 'astronomy' },
    { label: 'Animals', value: 'animals' },
  ];

  const sortedImages = images.slice().sort((a, b) => {
    if (sortAsc) {
      return a.category.localeCompare(b.category);
    } else {
      return b.category.localeCompare(a.category);
    }
  });

  const filteredImages = categoryFilter
    ? sortedImages.filter((image) =>  image.category === categoryFilter)
    : sortedImages;

  return (
    <div>
      <div className="sort-bar">
        {!categoryFilter && <div className="sort-button" onClick={() => setSortAsc(!sortAsc)}>
          {sortAsc ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
          <span>Category sorted by Alphabetical order</span>
        </div>}
        <div className="filter-select">
          <Select
            options={categories}
            value={categories.find((c) => c.value === categoryFilter)}
            onChange={(selectedOption) => {setCategoryFilter(selectedOption.value)}}
          />
        </div>
      </div>
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
      <Masonry
        >
        {filteredImages.map((image) => (
          <>
            <img key={image.id} src={image.src} alt={image.category} />
          </>
        ))}
      </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default App;
