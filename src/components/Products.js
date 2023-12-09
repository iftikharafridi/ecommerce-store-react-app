import React from 'react';
//import { useState, useEffect } from 'react';
//import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';



function Products({products, addToCart }) {
//function Products({addToCart}) {
//    const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 console.log('I am in useEffect and going to fetch the products')
//                 const items = await axios.get('https://fakestoreapi.com/products/');
//                 console.log(items)
//                 setProducts(items.data);

//             } catch (error) {
//                 console.error('Sorry got error while fetching the products: ', error);
//             }
//         };

//         fetchProducts();
//     }, []);


    return (
        <>
            
            <Container>
                <Row md={4}>
                    {
                        products.map(product => (
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        {/* <Card.Text>
                                            {product.description}
                                        </Card.Text> */}
                                        <p>Price: £{product.price}</p>
                                        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>


        </>
    );
}

export default Products;