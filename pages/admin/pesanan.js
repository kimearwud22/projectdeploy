import TabelPemesanan from '@/components/admin/pemesanan/TabelPemesanan'
import Layout from '@/components/admin/utils/Layout'
import React from 'react'

export default function pesanan() {
  return (
    <div>
        <Layout>
            <TabelPemesanan />
        </Layout>
    </div>
  )
}
