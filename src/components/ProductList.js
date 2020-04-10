import React, { useEffect, useState } from 'react'
import ProductComponent from './ProductComponent'
import NavBar from './NavBar';
import { storeProducts } from '../data';

function ProductList() {


    const [productItems, setProductItems] = useState([]);


    //calculate row count
    const rowCount = storeProducts.length / 4; // 4 products displayed per row in a desktop view
    console.log("no of phones : ", rowCount);




    useEffect(() => {
        let finalItems = [];
        let items = []
        let cur = 0;
        let count = 0;
        for (let k = 0; k < rowCount; ++k) {

            items = [];
            for (let i = 0; i < 4; ++i) {
                let curObj = storeProducts[cur++];
                ++count;
                items.push(<div className="col-sm-3 playcard" key={curObj.id}>
                    <ProductComponent product={curObj} />
                </div>)
            }

            finalItems.push(<div className="row slab" key={k}>
                {items.map(item => item)}
            </div>)
        }

        setProductItems(finalItems)
        console.log("Main loop ran : ", productItems.length);
    }, [])





    return (
        <>
            <NavBar />
            <h2> Hello From Product List </h2>

            <div className="container-fluid">

                {productItems.map( item => item)}

            </div>

        </>
    )
}

export default ProductList
