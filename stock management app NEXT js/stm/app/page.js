"use client"
// import { useState, useEffect } from 'react';
// import Header from '../components/Header';

// export default function Home() {
//   const [productform, setProductForm] = useState({ name: '', quantity: '', price: '' });
//   const [products, setProducts] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Fetch all products from the server when the component mounts
//     fetch('/api/product')
//       .then((response) => response.json())
//       .then((data) => setProducts(data.allproducts))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'search') {
//       setSearchQuery(value);
//     } else {
//       setProductForm({ ...productform, [name]: value });
//     }
//   };

//   const handleAddProduct = () => {
//     fetch('/api/product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(productform),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Product added successfully:', data.product);
//       setSuccessMessage('Product added!'); // Set the success message
//       // After adding the product, fetch all products again to update the list
//       fetch('/api/product')
//         .then((response) => response.json())
//         .then((data) => setProducts(data.allproducts))
//         .catch((error) => console.error('Error fetching products:', error));
//       setProductForm({})
//     })
//     .catch((error) => console.error('Error adding product:', error));
//   };

//   const handleIncrementQuantity = (productId) => {
//     // Find the product in the products array
//     const updatedProducts = products.map((product) => {
//       if (product._id === productId) {
//         return { ...product, quantity: parseInt(product.quantity) + 1 };
//       }
//       return product;
//     });

//     // Update the state with the updated products array
//     setProducts(updatedProducts);

//     // Update the product quantity in the database using the API
//     const updatedProduct = updatedProducts.find((product) => product._id === productId);
//     // ... (your API request to update the quantity)
//   };

//   const handleDecrementQuantity = (productId) => {
//     // Find the product in the products array
//     const updatedProducts = products.map((product) => {
//       if (product._id === productId && product.quantity > 0) {
//         return { ...product, quantity: parseInt(product.quantity) - 1 };
//       }
//       return product;
//     });

//     // Update the state with the updated products array
//     setProducts(updatedProducts);

//     // Update the product quantity in the database using the API
//     const updatedProduct = updatedProducts.find((product) => product._id === productId);
//     // ... (your API request to update the quantity)
//   };
  
  
//   return (
//     <>
//       <Header />
//       <div className="container mx-auto py-8 px-4">
//         <h2 className="text-4xl font-semibold mb-4 mx-auto">Add New Product</h2>
//         <form className="flex flex-col space-y-4">
//           {/* ... your existing form code ... */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mx-auto" htmlFor="search">
//               Search Product:
//             </label>
//             <input
//               onChange={handleChange}
//               className="border border-gray-300 rounded-full mx-auto px-4 py-2 text-black"
//               type="text"
//               name="search"
//               style={{ width: '500px' }}
//               value={searchQuery}
//               placeholder="Enter product name to search"
//             />
//           </div>
//           {successMessage && (
//             <div className="bg-green-100 border-l-40 border-green-500 text-red-700 p-4 mx-auto rounded-full max-w-md">
//               {successMessage}
//             </div>
//           )}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mx-auto" htmlFor="productName">
//               Product Name:
//             </label>
//             <input
//               onChange={handleChange}
//               className="border border-gray-300 rounded-full mx-auto px-4 py-2 text-black"
//               type="text"
//               name="name"
//               style={{ width: '500px' }}
//               value={productform?.name || ""}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mx-auto" htmlFor="quantity">
//               Quantity:
//             </label>
//             <input
//               onChange={handleChange}
//               name="quantity"
//               className="border border-gray-300 rounded-full mx-auto px-4 py-2 text-black"
//               type="number"
//               id="quantity"
//               style={{ width: '500px' }}
//               value={productform?.quantity || ""}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mx-auto" htmlFor="price">
//               Price:
//             </label>
//             <input
//               onChange={handleChange}
//               name="price"
//               className="border border-gray-300 rounded-full mx-auto px-4 py-2 text-black"
//               type="number"
//               step="0.01"
//               id="price"
//               style={{ width: '500px' }}
//               value={productform?.price || ""}
//             />
//           </div>
//           <button
//             className="bg-blue-500 text-white py-2 mx-auto px-2 rounded-full hover:bg-blue-600"
//             type="button"
//             onClick={handleAddProduct}
//             style={{ width: '300px' }}
//           >
//             Add Product
//           </button>
//         </form>

//         <h1 className="text-3xl font-semibold mx-auto mt-8 mx-auto">Current stock</h1>
//         <table className="w-full border-collapse mx-auto " style={{ width: '800px' }} >
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
//               <th className="px-4 py-2 bg-blue-500 text-white">Quantity</th>
//               <th className="px-4 py-2 bg-blue-500 text-white">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products && products.length > 0 ? (
//               products
//                 .filter((product) =>
//                   product.name.toLowerCase().includes(searchQuery.toLowerCase())
//                 )
//                 .map((product, index) => (
//                   <tr key={index}>
//                     <td className="border text-white px-4 py-2">{product.name}</td>
//                     <td className="border text-white px-4 py-2">
//                       {product.quantity}{' '}
//                       <button
//                         className="bg-green-500 text-white py-1 px-2 rounded-full hover:bg-green-600"
//                         onClick={() => handleIncrementQuantity(product._id)}
//                       >
//                         +
//                       </button>{' '}
//                       <button
//                         className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600"
//                         onClick={() => handleDecrementQuantity(product._id)}
//                       >
//                         -
//                       </button>
//                     </td>
//                     <td className="border text-white px-4 py-2">{product.price}</td>
//                   </tr>
//                 ))
//             ) : (
//               <tr>
//                 <td colSpan="3">No products available.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// Import the necessary dependencies
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

// Define the Home component
export default function Home() {
  // State to manage the form fields and product list
  const [productform, setProductForm] = useState({ name: '', quantity: '', price: '' });
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all products from the server when the component mounts
  useEffect(() => {
    fetch('/api/product')
      .then((response) => response.json())
      .then((data) => setProducts(data.allproducts))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      setSearchQuery(value);
    } else {
      setProductForm({ ...productform, [name]: value });
    }
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productform),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added successfully:', data.product);
        setSuccessMessage('Product added!');
        fetch('/api/product')
          .then((response) => response.json())
          .then((data) => setProducts(data.allproducts))
          .catch((error) => console.error('Error fetching products:', error));
        setProductForm({});
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  // for the Home component
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        {/* ... (your existing form code) ... */}
        <h1 className="text-3xl font-semibold mx-auto mt-8 mx-auto">Current stock</h1>
        <table className="w-full border-collapse mx-auto " style={{ width: '800px' }}>
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Quantity</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Price</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products
                .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((product, index) => (
                  <tr key={index}>
                    <td className="border text-white px-4 py-2">{product.name}</td>
                    <td className="border text-white px-4 py-2">
                      {product.quantity}{' '}
                      <button
                        className="bg-green-500 text-white py-1 px-2 rounded-full hover:bg-green-600"
                        onClick={() => handleIncrementQuantity(product._id)}
                      >
                        +
                      </button>{' '}
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600"
                        onClick={() => handleDecrementQuantity(product._id)}
                      >
                        -
                      </button>
                    </td>
                    <td className="border text-white px-4 py-2">{product.price}</td>
                    <td className="border text-white px-4 py-2">
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

