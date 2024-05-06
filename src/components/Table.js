import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const Table = ({ columns, data }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {column}
                        </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, colIndex) => (
                            <td
                                key={colIndex}
                                className="px-6 py-4 whitespace-nowrap">
                                {row[column]}
                            </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className={'ml-2'}
                                onClick={() => console.log('Edit record')}>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    color="#4b4b4b"
                                />
                            </button>
                            <button
                                className={'ml-2'}
                                onClick={() => console.log('Delete record')}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#4b4b4b"
                                />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
