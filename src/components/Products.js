import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {STATUS} from '../store/productSlice';

const Products = () => {
    // const [products,setproducts]=useState([]);
    const dispatch = useDispatch();
    const {data:products,status}=useSelector((state)=>state.product)

    useEffect(()=>{
            dispatch(fetchProducts());
        // const fetchProducts=async()=>{
        //     const res=await fetch('https://fakestoreapi.com/products');
        //     const data=await res.json();
        //     console.log(data);
        //     setproducts(data);
        // }
        // fetchProducts();
    },[])

    const handleAdd=(product)=>{
        dispatch(add(product));
    }

    if(status===STATUS.LOADING){
        return <h2>Loading.....</h2>;
    }
    if(status===STATUS.ERROR){
        return <h2>Something went wrong :(</h2>;
    }

  return (
    <div className="productsWrapper">
            {
                products.map(product=>(
                    <div className="card" key={product.id}>
                        <img src={product.image} alt='product' />
                        <h4>{product.title}</h4>
                        <h5>{product.price}</h5>
                        <button onClick={()=>handleAdd(product)} className='btn'>Add to cart</button>
                    </div>
                ))
            }
    </div>
  );
}

export default Products;
