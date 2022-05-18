# Similar Products Variants

The Similar Products Variants app returns similar products related to an SKU so users can select other colors or types of the same product.


![similar-in-action](https://user-images.githubusercontent.com/67270558/147780521-db76029b-c1fa-4627-a8bb-fa7485355424.png)

## Before you start
1. Set up similar products in your store’s **Products and SKU.** Access your store’s Admin and go to **Products > Catalog > Products and SKU**.
2. In **Products and SKU**, in the column **SKU**, click on the desired SKU.
3. In the field **Similar (Alternative Products)**, type the product name you desire

![similar-field](https://user-images.githubusercontent.com/67270558/147780337-ccc0d622-535e-47ce-9ede-d86f1d571546.gif)

4. Then, In **Products and SKU**, in the column **SKU**, click on the one you have added in the last step.
5. Go to the `Images` tab, and on the field `Label`, type a name to identify the image displayed in the thumbnail through the `imageLabel` prop of the `Similar Products` Variants app.

Now, follow the [app’s configuration below](#configuration) to show the similar products you have set up.


## Configuration

1. Using [VTEX IO CLI](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-installation-and-command-reference), install the app by running the following:

```bash
vtex install vtex.similar-products-variants
```
2. Add the `vtex.similar-products-variants` app to your theme's dependencies in the `manifest.json`

```json
"dependencies": {
    "vtex.similar-products-variants": “0.x”
}
```

3. Add the `similar-products-variants` block to the product template you desire, such as `store.product`, to display a similar product list. 


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

| Prop name  | Type | Description                                                                                                 | Default value |
|--------------|--------|------------------------------------| ------------- |
| `imageLabel` | `string` | Define which image will be displayed. If the label does not exist or is not defined, the first image is used. | `null`        |
| `textLabel` | `object` | Define the text label that will be displayed for each similar product, this text is obtained from some product specification. | `null` |

- **`textLabel` object:**

| Prop name    | Type   | Description                                                                                                   | Default value |
|--------------|--------|---------------------------------------------------------------------------------------------------------------| ------------- |
| `specificationGroupName` | `string` | Name of specification group where is the product specification that will be use as text label. | `null` |
| `specificationName` | `string` | Name of product specification from which the value to display will be taken. | `null` |


## Customization

To apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles | 
| ----------- |
| `variants`  |
| `title`     |
| `var-wrap`  |
| `img_wrap`  |
| `img`       |
