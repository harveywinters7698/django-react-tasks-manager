import { useEffect } from 'react'

export default function Admin() {

    useEffect(() => {
        window.location.href = "/admin/"
    }, [])

    return null;

}
