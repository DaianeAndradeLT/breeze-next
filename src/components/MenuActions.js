import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import axios from 'axios'
import Swal from 'sweetalert2'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function MenuActions() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const fileInputRef = React.useRef(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleImport = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async event => {
        const file = event.target.files[0]

        // Create a FormData instance
        const formData = new FormData()
        // Append the file to the FormData instance
        formData.append('file', file)

        try {
            await axios.post('/api/products/import', formData, {
                headers: { 'Content-Type': `multipart/form-data` },
            })
            Swal.fire({
                icon: 'success',
                title: 'Arquivos importados com sucesso',
                showConfirmButton: false,
                timer: 1500,
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Falha na importação',
                showConfirmButton: false,
                timer: 1500,
            })
        }

        handleClose()
    }

    // const handleExport = () => {
    //     Swal.fire({
    //         icon: 'success',
    //         title: 'Arquivos exportados com sucesso',
    //         showConfirmButton: false,
    //         timer: 1500,
    //     })
    // }

    // faz um export usando a fução exportar csv do meu menu actions

    // }
    const handleExport = () => {
        axios
            .get('/api/products/export', {
                responseType: 'blob',
            })
            .then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                )
                const link = document.createElement('a')

                Swal.fire({
                    icon: 'success',
                    title: 'Arquivo gerado com sucesso!',
                    html: `<a href="${url}" download="products.csv" class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-4 py-2 border border-blue-700 inline-block mt-4">Baixar arquivo CSV</a>`,
                    showConfirmButton: false,
                })
            })
    }
    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                    backgroundColor: '#1D4ED8',
                    color: 'white',
                    textTransform: 'none',
                }}>
                Opções
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleImport} style={{ fontSize: '0.8rem' }}>
                    Importar CSV
                </MenuItem>
                <MenuItem onClick={handleExport} style={{ fontSize: '0.8rem' }}>
                    Exportar CSV
                </MenuItem>
            </Menu>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".csv"
                onChange={handleFileChange}
            />
        </div>
    )
}
