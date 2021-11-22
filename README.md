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

3. Add similar products in the SKU configuration section.

![image](https://user-images.githubusercontent.com/65255533/142908816-41a4d093-5680-4153-9c60-9d986b077fb1.png)

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
  "similar-products-variants": {
      "props": {
          "imageLabel": "swatch"
      }
  },
...
```

| Prop name    | Type   | Description                                                                                                   | Default value |
|--------------|--------|---------------------------------------------------------------------------------------------------------------| ------------- |
| `imageLabel` | String | Define which image will be displayed. If the label does not exist or is not defined, the first image is used. | `null`        |

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
