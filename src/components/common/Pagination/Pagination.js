import React from 'react';

const Pagination = ({ totalPage, setCurrPage, setAdminCurrPage, currPage }) => {
    // console.log(totalPage)
    return (
        <div className='flex justify-center p-10'>
            {
                totalPage > 0 &&
                [...Array(totalPage)?.keys()]?.map(page => <button
                    key={page}
                    onClick={() => {
                        setCurrPage(page)
                        setAdminCurrPage && setAdminCurrPage(page)
                    }}
                    className={`w-6 h-6 lg:h-10 lg:w-10 rounded-full mr-3 bg-secondary-deep  ${page === currPage && 'bg-primary text-white'} font-medium text-gray-600`}
                >{page + 1}</button>)
            }
        </div>
    );
};

export default Pagination;