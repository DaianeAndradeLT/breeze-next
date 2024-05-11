import "@/app/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/app/(app)/layout";
import Table from "@/components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faFileArrowDown,
    faFileArrowUp, faFileExport, faFileMedicalAlt, faCloudDownload
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

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
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Falha na importação",
                showConfirmButton: false,
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
                    title: "",
                    showConfirmButton: false
                });
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
                fetchProducts();
                Swal.fire("Produto Criado", "", "success");
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
            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".csv"
                   onChange={handleFileChange} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-center">
                                    Lista de Produtos
                                </h1>
                                <div className="" style={{ display: "flex", alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faPlus} onClick={handleCreateProduct}
                                                     style={{ marginRight: "10px" }} />
                                    <FontAwesomeIcon icon={faFileArrowUp} onClick={handleImport}
                                                     style={{ marginRight: "10px" }} />
                                    <FontAwesomeIcon icon={faFileArrowDown} onClick={handleExport}
                                                     style={{ marginRight: "10px" }} />
                                    <FontAwesomeIcon icon={faCloudDownload} onClick={handleMigrate}
                                                     style={{ marginRight: "10px" }} />
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
