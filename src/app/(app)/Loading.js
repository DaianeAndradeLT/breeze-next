import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
            <ClipLoader color="#1E6DE5" />

        </div>
    )
}

export default Loading
