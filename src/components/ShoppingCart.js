import React from 'react';
import {Table} from 'react-bootstrap';

function ShoppingCart({ cartItems }) {
    console.log(cartItems)
    return (
        <>
            <h1>My ShoppingCart</h1>
            {
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems.map(item => (
                                <tr>
                                    <td>{item.title}</td>
                                    <td>1</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))
                        }

                        <tr>
                            <td colSpan={2}>Total Price</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            }
        </>
    );
}

export default ShoppingCart;