import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'

function HomePage() {
  useEffect(() => {
    const token = localStorage.getItem('token')

    try {
      fetch("http://localhost:3333/authentication", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === "ok") {
              // alert("Authentication Success");
          } else {
              // alert("Authentication Failed");
              localStorage.removeItem('token')
              window.location = '/login';
          }
      })
      
    } catch (error) {
        console.error("Error:", error);
    }
  })
  
  return (
    <div>HomePage</div>
  )
}

export default () => (
  <Layout>
    <HomePage /> 
  </Layout>
);