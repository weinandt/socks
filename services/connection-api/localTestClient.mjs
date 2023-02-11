const data = {
    "example": "data"
}

const response = await fetch("http://localhost:3000/connections", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
})

const responseBody = await response.json()
console.log(responseBody)