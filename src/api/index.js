const API_URL = "http://localhost:8000"

export const getProductList = async (req) => {
    return await fetch(`${API_URL}/product`)
}

export const createProduct = async (req) => {
    const body = JSON.stringify(req.body)
    return await fetch(`${API_URL}/product/`, {
        method: 'post', 
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: body
    })
}

export const updateProduct = async (req) => {
    const id = req.id;
    const body = JSON.stringify(req.body);

    console.log(body)

    return await fetch(`${API_URL}/product/${id}`, {
        method: 'put', 
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: body
    })
}

export const deleteProduct = async (req) => {
    const id = req.id;
    return await fetch(`${API_URL}/product/${id}`, {method: 'delete'});
}