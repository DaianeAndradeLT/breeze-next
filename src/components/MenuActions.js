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
            const response = await axios.post(
                '/api/products/import',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Arquivos importados com sucesso",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                // position: "top-end",
                icon: "error",
                title: "Falha na importação",
                showConfirmButton: false,
                timer: 1500
            })
        }

        handleClose()
    }

    const handleExport = () => {
        // ... existing export logic ...
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Arquivos exportados com sucesso",
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                    backgroundColor: '#1E6DE5',
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
