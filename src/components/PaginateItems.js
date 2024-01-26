import React from 'react'
import ReactPaginate from "react-paginate";
const PaginateItems = ({items}) => {

    const itemsPerPage = 25;

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
        <thead className="text-xs text-white uppercase bg-gray-400 dark:text-white text-center">
          <tr scope="col" className="px-6 py-3">
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <td scope="col" className="px-6 py-3">
              UID
            </td>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              TimeStamp
            </th>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
          </tr>
        </thead>

        <tbody className="text-center">
          {currentItems.map((item) => (
            <tr key={item.uid} className="bg-gray-300 border-b border-blue-400">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.uid}</td>
              <td className="px-6 py-4">{item.score}</td>
              <td className="px-6 py-4">{item.country}</td>
              <td className="px-6 py-4">{item.timestamp}</td>
              <td className="px-6 py-4">{item.userrank}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>showing 25 (max) results per page*</p>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex flex-row justify-center my-10"
        pageClassName="mx-2"
        activeClassName="bg-blue-400 text-white"
        activeLinkClassName="bg-blue-400 text-white px-3 py-2 rounded-md"
        disabledClassName="text-gray-400"
        nextClassName="mx-2"
        previousClassName="mx-2"
      />
    </div>
  );
}

export default PaginateItems