import React from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import productRecommendationsQuery from './queries/productRecommendations.gql'

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string
    }
  },
  imageLabel: string,
  textLabel: {
    specificationGroupName: string,
    specificationName: string
  }
}

const CSS_HANDLES = [
  'variants',
  'title',
  'var-wrap',
  'img_wrap',
  'img',
  'textLabel'
] as const

function SimilarProductsVariants({
  productQuery,
  imageLabel,
  textLabel,
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

  return (
    <div className={`${handles.variants}`}>
      <p className={`${handles.title}`}>{intl.formatMessage({ id: "store/title.label" })}</p>
      <div className={handles['var-wrap']}>
        {items.map((element: ProductTypes.Product) => {
          const imageIndex = imageLabel === undefined
            ? 0
            : element.items[0].images.findIndex(image => image.imageLabel === imageLabel) === -1
              ? 0
              : element.items[0].images.findIndex(image => image.imageLabel === imageLabel)

          const srcImage = element.items[0].images[imageIndex].imageUrl

          // Labels
          let indexSpecificationGroup = -1,
              indexSpecification      = -1;

          if ( element.specificationGroups.length >= 0 && element.specificationGroups.find( group => group.name === textLabel?.specificationGroupName ) ) {
            indexSpecificationGroup = element.specificationGroups.findIndex( group => group.name === textLabel?.specificationGroupName )
            if ( indexSpecificationGroup !== -1 && element.specificationGroups[indexSpecificationGroup].specifications.find( specification => specification.name === textLabel?.specificationName ) ) {
              indexSpecification = element.specificationGroups[indexSpecificationGroup].specifications.findIndex(specification => specification.name === textLabel?.specificationName)
            }
          }

          return (
            <Link key={element.productId} {...{
              page: 'store.product',
              params: {
                slug: element?.linkText,
                id: element?.productId,
              },
            }}>
              <span
                className={`${handles.img_wrap}${route?.params?.slug === element.linkText ? '--is-active' : ''
                  }`}
              >
                <img
                  src={srcImage}
                  alt={element.productName}
                  height="50px"
                  className={`${handles.img} mr3 ${route?.params?.slug === element.linkText ? 'o-50' : ''
                    }`
                  }
                />
                {
                  indexSpecificationGroup > -1 && 
                    indexSpecification > -1 &&
                    <span className={`${handles.textLabel}`}>
                      { element.specificationGroups[ indexSpecificationGroup ].specifications[ indexSpecification ].values[0] }
                    </span>
                }
              </span>
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
