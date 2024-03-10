import Card from '../../components/admin/dashboard/Card'
import Layout from '@/components/admin/utils/Layout'
import React from 'react'
import { useEffect } from 'react'
import { getCookie, validateToken } from '@/libs/cookie.lib'

export default function index() {
  // useEffect(() => {
  //   if(getCookie('token') === "" && getCookie("username") === ""){
  //     window.location.href = "/login";
  //   }else{
  //     validateToken(getCookie('token')) ? null : window.location.href = "/login";
  //   }
  // }, [])
  return (
    <div>
        <Layout>
          <Card/>
        </Layout>
    </div>
  )
}
