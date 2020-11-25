# Similar Products Variants

Return the similar products related to the sku

![Image](https://github.com/churrinfunflais/similar-products-variants/blob/master/public/metadata/Sample.png)

## Configuration

1. Use the vtex toolbelt to install.

```bash
vtex install vtex.similar-products-variants
```

2. Import the vtex.similar-products-variants app to your theme's dependencies in the manifest.json

```json
"dependencies": {
    "vtex.similar-products-variants"
}
```

## Usage

Add the similar-products-variants block to the store theme template where you desire to display a similar product list. For example:

```json
...
  "flex-layout.col#right-col": {
    "props": {
      "preventVerticalStretch": true,
      "rowGap": 0
    },
    "children": [
      "flex-layout.row#product-name",
      "product-rating-summary",
      "flex-layout.row#list-price-savings",
      "flex-layout.row#selling-price",
      "product-installments",
      "product-separator",
      "product-identifier.product",
      "sku-selector",
    + "similar-products-variants",
      "product-quantity",
      "link-seller",
      "product-availability",
      "product-assembly-options",
      "product-gifts",
      "flex-layout.row#buy-button",
      "availability-subscriber",
      "shipping-simulator",
      "share#default"
    ]
  },
...
```

*Notice that this block depends on the product context, so its recomended to declare it inside the product page contex. If the SKU doesn't have any similar product configured on the catalog the component wont render anything.*

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                | 
| -------------------------- |
| `variants`                 |
| `title`                    |
| `var-wrap`                 |
| `img_wrap`                 |
| `img`                      |
