import CardProduct from '@/components/admin/layanan/CardProduct'
import FormInputLayanan from '@/components/admin/layanan/FormInputLayanan'
import Layout from '@/components/admin/utils/Layout'
import React from 'react'

export default function layanan() {
  return (
    <div>
        <Layout>
          <FormInputLayanan />
          <CardProduct />
        </Layout>
    </div>
  )
}
