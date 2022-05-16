import React from 'react';

const Table = ({ data }) => {
    return (
        <table className="table-auto w-full">
            <thead className='bg-secondary border border-gray-300 rounded-md text-sm font-medium h-14 text-gray-700 text-left'>
                <tr>
                    <th className='p-5'>Serial</th>
                    <th className='p-5'>Name</th>
                    <th className='p-5'>Status</th>
                    <th className='p-5'>Email</th>
                    <th className='p-5'>Role</th>
                    <th className='p-5'>Action</th>
                </tr>
            </thead>
            <tbody className='text-left text-gray-500'>
                {
                    data.length === 0 ? 'loading...' :
                        data?.map((user, index) =>
                            <tr key={index} className={`border border-gray-200 h-12 ${index % 2 && 'bg-secondary'} p-3`}>
                                <td className='p-5 whitespace-nowrap'>{index + 1}</td>
                                <td className='p-5 whitespace-nowrap'>{user?.displayName}</td>
                                <td className='p-5 whitespace-nowrap'>online
                                </td>
                                <td className='p-5 whitespace-nowrap'>{user?.email}</td>
                                <td className='p-5 whitespace-nowrap'>admin</td>
                                <td className='p-5 whitespace-nowrap'>
                                    <select name="" id="">
                                        <option value="">action</option>
                                        <option value="">delete</option>
                                        <option value="">edit</option>
                                    </select>
                                </td>
                            </tr>

                        )
                }
            </tbody>
        </table>
    );
};

export default Table;