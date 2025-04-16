const API_URL = "http://localhost:5000/api/finances"

export const getFinances = async () => {
    const response = await fetch(API_URL);
    return await response.json();
}

export const addFinanes = async (transaction) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction),

    });

    return response.json();
}

export const deleteFinance = async (id) => {
    const response = await fetch(`${API_URL}/${id}`,{
        method: 'DELETE'
    })
    return await response.json();
}

export const getBarChart = async () => {
    const response = await fetch(`${API_URL}/charts/bar`);
    return await response.json();
}

export const getPieChart = async () => {
    const response = await fetch(`${API_URL}/charts/pie`);
    return await response.json();
}