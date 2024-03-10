import FormInputProject from '@/components/admin/project/FormInputProject'
import Layout from '@/components/admin/utils/Layout'
import CardProject from '@/components/admin/project/CardProject'
import React from 'react'

export default function project() {
  return (
    <div>
        <Layout>
            <FormInputProject />
            <CardProject />
        </Layout>
    </div>
  )
}
