import React from 'react';

const Pagination = ({ totalPage, setCurrPage, setAdminCurrPage, currPage }) => {
    return (
        <div className='flex justify-center p-10'>
            {
                [...Array(totalPage)?.keys()]?.map(page => <button
                    key={page}
                    onClick={() => {
                        setCurrPage(page)
                        setAdminCurrPage(page)
                    }}
                    className={`h-10 w-10 rounded-full mr-3 bg-secondary-deep  ${page === currPage && 'bg-primary text-white'} font-bold text-gray-600`}
                >{page + 1}</button>)
            }
        </div>
    );
};

export default Pagination;