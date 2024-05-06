import '@/app/global.css'
import React from 'react'
import AppLayout from '@/app/(app)/layout'
import Table from '@/components/Table'
import MenuActions from '@/components/MenuActions'

export const metadata = {
    title: 'Loja Virtual',
}

const Products = () => {
    const columns = ['Nome', 'Idade', 'Profissão']
    const data = [
        { Nome: 'João', Idade: '30', Profissão: 'Engenheiro' },
        { Nome: 'Maria', Idade: '25', Profissão: 'Médica' },
    ]
    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-center" >Lista de Produtos</h1>
                                <MenuActions />
                            </div>
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default Products
