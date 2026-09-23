import { getProducts, createProduct, deleteProduct } from "@/actions/product";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>

      <form action={createProduct}>
        <input name="name" placeholder="Name" required />
        <input
          name="length"
          type="number"
          placeholder="Length (inches)"
          required
        />
        <input name="texture" placeholder="Texture" required />
        <input name="color" placeholder="Color" required />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          required
        />
        <input name="stock" type="number" placeholder="Stock" required />
        <button type="submit">Add Product</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Length</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.length}"</td>
              <td>₦{p.price.toString()}</td>
              <td>{p.stock}</td>
              <td>
                <form action={deleteProduct.bind(null, p.id)}>
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
