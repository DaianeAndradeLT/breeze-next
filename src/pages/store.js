import '@/app/global.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AppLayout from '@/app/(app)/layout'
import Table from '@/components/Table'
import MenuActions from '@/components/MenuActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

export const metadata = {
    title: 'Loja Virtual',
}

const Store = () => {
    const [products, setProducts] = useState([])
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`

    const handleCreateProduct = () => {
        Swal.fire({
            title: 'Criar Produto',
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
            confirmButtonText: 'Criar',
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: async () => {
                const form = document.getElementById('create-product-form')
                const title = form.querySelector('#title').value
                const price = form.querySelector('#price').value
                const description = form.querySelector('#description').value
                const image = form.querySelector('#image').value
                const category = form.querySelector('#category').value

                // Verifica se todos os campos obrigatórios foram preenchidos
                if (!title || !price || !description || !image || !category) {
                    Swal.showValidationMessage(
                        'Todos os campos são obrigatórios',
                    )
                    return false
                }

                return axios
                    .post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
                        {
                            title,
                            price,
                            description,
                            image,
                            category,
                        },
                    )
                    .then(response => response.data)
            },
        }).then(result => {
            if (result.isConfirmed) {
                // Atualiza a lista de produtos após a criação bem-sucedida
                fetchProducts()
                Swal.fire('Produto Criado', '', 'success')
            }
        })
    }

    const fetchProducts = () => {
        axios
            .get(url)
            .then(response => {
                setProducts(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setProducts(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const columns = ['Id', 'Nome', 'Preço', 'Categoria', 'Descrição', 'Imagem']
    const data = products.map(product => ({
        Id: product.id,
        Nome: product.title,
        Preço: product.price,
        Categoria: product.category,
        Descrição: product.description,
        Imagem: product.image,
    }))

    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-center">
                                    Lista de Produtos
                                </h1>
                                <div
                                    className=""
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        onClick={handleCreateProduct}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <MenuActions />
                                </div>
                            </div>
                            <br />
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Store
