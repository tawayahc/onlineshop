import React from 'react'
import Layout from '../components/Layout/Layout'

function CompletePage() {

  const handleOnClick = () => {
    window.location.href = '/'
  }
  return (
    <div className='flex flex-col justify-center content-center items-center h-96 w-full'>
      <h1 className='text-5xl'>Complete</h1>
      <button className='btn btn-accent btn-wide mt-8' onClick={handleOnClick}>Home</button>
    </div>
  )
}

export default () => (
  <Layout>
    <CompletePage />
  </Layout>
);