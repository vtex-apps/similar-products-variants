import React from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'

import productRecommendationsQuery from './queries/productRecommendations.gql'

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string
    }
  },
  imageLabel: string
}

const CSS_HANDLES = [
  'variants',
  'title',
  'var-wrap',
  'img_wrap',
  'img',
] as const

function SimilarProductsVariants({
  productQuery,
  imageLabel
}: SimilarProductsVariantsProps) {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()
  const { route } = useRuntime()
  const productId =
    productQuery?.product?.productId ?? productContext?.product?.productId

  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: 'id', value: productId },
      type: `similars`,
    },
    skip: !productId,
  })

  if (loading || error) return null

  const { productRecommendations } = data

  const { products } = {
    products: productRecommendations || [],
  }

  const unique = [
    ...new Set<string>(
      products.map((item: ProductTypes.Product) => item.productId)
    ),
  ]

  const items: ProductTypes.Product[] = []

  unique.forEach(id => {
    const item = products.find(
      (element: ProductTypes.Product) => element.productId === id
    )

    if (item) items.push(item)
  })

  return (
    <div className={`${handles.variants}`}>
      <p className={`${handles.title}`}>Colores</p>
      <div className={handles['var-wrap']}>
        {items.map((element: ProductTypes.Product) => {
          const imageIndex = imageLabel === undefined 
            ? 0
            : element.items[0].images.findIndex(image => image.imageLabel === imageLabel) === -1
              ? 0 
              : element.items[0].images.findIndex(image => image.imageLabel === imageLabel)
              
          const srcImage = element.items[0].images[imageIndex].imageUrl
          return (
            <a
              key={element.productId}
              href={`/${element.linkText}/p`}
              className={`${handles.img_wrap}${
                route?.params?.slug === element.linkText ? '--is-active' : ''
              }`}
            >
              <img
                src={ srcImage }
                alt={element.productName}
                height="50px"
                className={`${handles.img} mr3 ${
                  route?.params?.slug === element.linkText ? 'o-50' : ''
                }`}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

SimilarProductsVariants.schema = {
  title: 'SimilarProducts Variants',
  description: 'SimilarProducts Variants',
  type: 'object',
  properties: {},
}

export default SimilarProductsVariants
