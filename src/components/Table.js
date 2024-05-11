import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";


const Table = ({ columns, data }) => {
    function populateForm(row) {
        let html = `
            <form id="edit-product-form" class="space-y-4 text-gray-700">
            <div class="flex flex-wrap">
                <label for="title" class="block">Título:</label>
                <input type="text" id="title" name="title" value="${row.Nome}" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="flex flex-wrap">
                <label for="price" class="block">Preço:</label>
                <input type="text" id="price" name="price" value="${row.Preço}" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="flex flex-wrap">
                <label for="description" class="block">Descrição:</label>
                <input type="text" id="description" name="description" value="${row.Descrição}" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="flex flex-wrap">
                <label for="image" class="block">URL da Imagem:</label>
                <input type="text" id="image" name="image" value="${row.Imagem}" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="flex flex-wrap">
                <label for="category" class="block">Categoria:</label>
                <input type="text" id="category" name="category" value="${row.Categoria}" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
        </form>
        `;

        Swal.fire({
            title: "Editar Produto",
            html: html,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const form = document.getElementById("edit-product-form");
                const formData = new FormData(form);
                const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${row.Id}`;
                try {
                    await axios.put(url, {
                        title: formData.get("title"),
                        price: formData.get("price"),
                        description: formData.get("description"),
                        image: formData.get("image"),
                        category: formData.get("category")
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        xsrfCookieName: "XSRF-TOKEN"

                    });
                    return true;
                } catch (error) {
                    Swal.showValidationMessage(error.response.data.message);
                    return false;
                }
            }
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire("Produto Editado", "", "success").then(() => {
                    window.location.reload();
                });
            }
        });
    }

    function handleDeleteProduct(row) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${row.Id}`;
        Swal.fire({
            title: "Excluir Produto",
            text: "Tem certeza que deseja excluir este produto?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    await axios.delete(url, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        xsrfCookieName: "XSRF-TOKEN"
                    });
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            }
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-200 text-gray-900 font-bold">
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">
                            {column}
                        </th>
                    ))}
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">
                        Ações
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                {data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-300">
                        {columns.map((column, colIndex) => {
                            const [isExpanded, setIsExpanded] = useState(
                                false
                            );
                            const textValue =
                                typeof row[column] === "string"
                                    ? row[column]
                                    : row[column].toString();
                            const text = isExpanded
                                ? textValue
                                : `${textValue.substring(0, 20)}...`;
                            return (
                                <td
                                    key={colIndex}
                                    className="px-2 py-1 whitespace-normal max-w-xs cursor-pointer"
                                    title={textValue}
                                    onClick={() => setIsExpanded(!isExpanded) }>
                                    {text}
                                </td>
                            );
                        })}
                        <td className="px-2 py-1 whitespace-normal max-w-xs">
                            <button className={"ml-2"} onClick={() => {
                            }}>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    color="#4b4b4b"
                                    onClick={() => populateForm(row)}
                                />
                            </button>
                            <button
                                className="ml-2"
                                onClick={() => handleDeleteProduct(row)}>
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
    );
};

export default Table;
