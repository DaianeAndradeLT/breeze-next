import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2'

const Table = ({ columns, data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-200 text-gray-900 font-bold">
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
                <tbody className="bg-white divide-y divide-gray-200 ">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-300">
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap">
                                    {row[column]}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className={'ml-2'} onClick={() => {}}>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        color="#4b4b4b"
                                        onClick={() => {
                                            let html = `
                                            // make a form to edit product
                                            <input />
                                            `
                                            Swal.fire('Editar Produto', html)
                                        }}
                                    />
                                </button>
                                <button
                                    className={'ml-2'}
                                    onClick={() => {
                                        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${row.Id}`
                                        axios.delete(url).then(() => {
                                            window.location.reload()
                                        })
                                    }}>
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
        </div>
    )
}

export default Table
