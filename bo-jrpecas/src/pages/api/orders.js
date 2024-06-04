// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function getOrders() {
  try {
    const response = await fetch('http://localhost:3001/order', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // Add any additional headers you need here
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fecth data:', error)
    throw error
  }
}
