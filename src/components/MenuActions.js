import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'

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
        // Trigger the file input click event to open the file selection dialog
        fileInputRef.current.click()
    }

    const handleFileChange = event => {
        const file = event.target.files[0]
        console.log('Import CSV', file)
        handleClose()
    }

    const handleExport = () => {
        // Generate CSV data
        const data = [
            ['Nome', 'Idade', 'Profissão'],
            ['João', '30', 'Engenheiro'],
            ['Maria', '25', 'Médica'],
            // Add more data rows as needed
        ]
        const csvContent = data.map(e => e.join(',')).join('\n')

        // Create a blob from the CSV data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

        // Create a link element, set its href to the blob, and click it to start the download
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', 'data.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        handleClose()
    }

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ backgroundColor: '#1E6DE5', color: 'white', textTransform: 'none' }}
            >
                Opções
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
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
                style={{ display: 'none' }} // Hide the file input
                accept=".csv" // Accept only .csv files
                onChange={handleFileChange}
            />
        </div>
    )
}
