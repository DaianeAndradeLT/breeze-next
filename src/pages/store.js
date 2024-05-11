import "@/app/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/app/(app)/layout";
import Table from "@/components/Table";
import Swal from "sweetalert2";
import H3 from "@/components/Title";
import Header from "@/app/(app)/Header";

export const metadata = {
    title: "Loja Virtual"
};

const Store = () => {
    const [products, setProducts] = useState([]);
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleImport = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async event => {
        const file = event.target.files[0];

        // Create a FormData instance
        const formData = new FormData();
        // Append the file to the FormData instance
        formData.append("file", file);

        try {
            await axios.post(url + "/import", formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, xsrfCookieName: "XSRF-TOKEN"

            });
            Swal.fire({
                icon: "success",
                title: "Arquivos importados com sucesso",
                showConfirmButton: true,
                timer: 1500
            }).then(() => { window.location.reload(); })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Falha na importação",
                showConfirmButton: true,
                timer: 1500
            });
        }

        handleClose();
    };

    const handleExport = () => {

        axios
            .get(url + "/export", {
                responseType: "blob",
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                xsrfCookieName: "XSRF-TOKEN"
            })
            .then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");

                Swal.fire({
                    icon: "success",
                    title: "Arquivo gerado com sucesso!",
                    html: `<a href="${url}" download="products.csv" class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-4 py-2 border border-blue-700 inline-block mt-4">Baixar arquivo CSV</a>`,
                    showConfirmButton: false
                });
            });
    };

    const handleMigrate = () => {

        axios
            .get(url + "/migrate", {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                xsrfCookieName: "XSRF-TOKEN"
            })
            .then(response => {
                Swal.fire({
                    icon: "success",
                    title: "Produtos migrados com sucesso",
                    showConfirmButton: true
                }).then(() => { window.location.reload(); });
            });
    };

    const handleCreateProduct = () => {
        Swal.fire({
            title: "Criar Produto",
            html: `
                <form id="create-product-form">
                <div class="flex flex-wrap">
                    <label for="title" class="block">Título:</label>
                    <input type="text" id="title" name="title" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                </div>
                <div class="flex flex-wrap">
                    <label for="price" class="block">Preço:</label>
                    <input type="number" id="price" name="price" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                </div>
                <div class="flex flex-wrap">
                    <label for="description" class="block">Descrição:</label>
                    <input type="text" id="description" name="description" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                </div>
                <div class="flex flex-wrap">
                    <label for="image" class="block">URL da Imagem:</label>
                    <input type="text" id="image" name="image" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                </div>
                <div class="flex flex-wrap">
                    <label for="category" class="block">Categoria:</label>
                    <input type="text" id="category" name="category" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
                </div>
            </form>
            `,
            confirmButtonText: "Criar",
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: async () => {
                const form = document.getElementById("create-product-form");
                const title = form.querySelector("#title").value;
                const price = form.querySelector("#price").value;
                const description = form.querySelector("#description").value;
                const image = form.querySelector("#image").value;
                const category = form.querySelector("#category").value;

                // Verifica se todos os campos obrigatórios foram preenchidos
                if (!title || !price || !description || !image || !category) {
                    Swal.showValidationMessage("Todos os campos são obrigatórios");
                    return false;
                }

                return axios
                    .post(url,
                        { title, price, description, image, category },
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                            xsrfCookieName: "XSRF-TOKEN"
                        })
                    .then(response => response.data);
            }
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire("Produto Criado", "", "success").then(() => {
                    window.location.reload();
                });
            }
        });
    };

    const fetchProducts = () => {
        axios
            .get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                xsrfCookieName: "XSRF-TOKEN"
            })
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const columns = ["Id", "Nome", "Preço", "Categoria", "Descrição", "Imagem"];
    const data = products.map(product => ({
        Id: product.id,
        Nome: product.title,
        Preço: product.price,
        Categoria: product.category,
        Descrição: product.description,
        Imagem: product.image
    }));

    useEffect(() => {
        fetchProducts();
    }, []);

        return (
            <AppLayout>
                <Header title="Produtos no Estoque" />
                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".csv"
                       onChange={handleFileChange} />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div className="" style={{ display: "flex", alignItems: "center" }}>
                                        <button onClick={handleCreateProduct} className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            Criar Produto
                                        </button>
                                        <button onClick={handleImport} className="bg-gray-800 text-sm hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
                                            Importar
                                        </button>
                                        <button onClick={handleExport} className="bg-gray-800 text-sm hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
                                            Exportar
                                        </button>
                                        <button onClick={handleMigrate} className="bg-gray-800 text-sm hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
                                            Importar da API
                                        </button>
                                    </div>
                                </div>
                                <br />
                                <Table columns={columns} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    };
    export default Store;
