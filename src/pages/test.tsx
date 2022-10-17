import React from 'react'
import { trpc } from '../utils/trpc'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

type Iprops ={
    fake:string
}

function Test(props:Iprops) {
    // const helloNoArgs = trpc.example.someData.useQuery()
    console.log(props)
  return (
    // <h1>{helloNoArgs.data?.data}</h1>
    <>
      <p>{props.fake}</p>
    <p>ME PLS</p>
    </>
  
  )
}

export default Test

export const getServerSideProps: GetServerSideProps = async (context) => {
    const payload = await fetch('http://localhost:3000/api/test')
    const {fakedata} = await payload.json()
   
    return {
        props:{
            fake:fakedata as string
        }
    }
  }