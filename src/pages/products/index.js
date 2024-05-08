import '@/app/global.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AppLayout from '@/app/(app)/layout'
import Table from '@/components/Table'
import MenuActions from '@/components/MenuActions'

export const metadata = {
    title: 'Loja Virtual',
}

const Products = () => {
    const [products, setProducts] = useState([])
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
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

    const columns = ['Id', 'Nome', 'Preço', 'Categoria', 'Descrição']
    const data = products.map(product => ({
        Id: product.id,
        Nome: product.title,
        Preço: product.price,
        Categoria: product.category,
        Descrição: product.description,
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
                                <MenuActions />
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
export default Products
