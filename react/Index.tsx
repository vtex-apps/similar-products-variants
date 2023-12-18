import React from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime, Link } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import productRecommendationsQuery from './queries/productRecommendations.gql'

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string
    }
  }
}

const CSS_HANDLES = [
  'variants',
  'title',
  'var-wrap',
  'link_wrap',
  'text',
] as const

function SimilarProductsVariants({
  productQuery,
}: SimilarProductsVariantsProps) {
  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()
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

  if (items.length === 0) {
    return <></>
  }

  return (
    <div className={`${handles.variants}`}>
      <p className={`${handles.title}`}>
        {intl.formatMessage({ id: 'store/title.label' })}
      </p>
      <div className={handles['var-wrap']}>
        {items.map((element: ProductTypes.Product, index: number) => {
          const dimensionSizeArray = items[index].specificationGroups.filter(
            item => item.name === 'Dimensions'
          )

          const dimensionSizeText =
            dimensionSizeArray.length && dimensionSizeArray[0].name
              ? dimensionSizeArray[0].specifications[0].name
              : `Size ${index + 1}`

          return (
            <Link
              key={element.productId}
              className={`${handles.link_wrap}${
                route?.params?.slug === element.linkText ? '--is-active' : ''
              }`}
              {...{
                page: 'store.product',
                params: {
                  slug: element?.linkText,
                  id: element?.productId,
                },
              }}
            >
              <p className={`${handles.text}`}>{dimensionSizeText}</p>
            </Link>
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
