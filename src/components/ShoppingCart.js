import React from 'react';
import {Table, Button} from 'react-bootstrap';

function ShoppingCart({ cartItems, dropFromFireStore }) {
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
                                    <td>
                                        <button>-</button>{' '}
                                        {item.qty} {' '}
                                        <button>+</button>
                                    </td>
                                    <td>{item.price}</td>
                                    <Button variant='danger' onClick={() => dropFromFireStore(item.id)}>Delete</Button>
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