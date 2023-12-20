
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const product = useSelector(state => state.product)
    const navigate = useNavigate();
    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: product.name,
                    name: product.name,
                    id: Math.floor(Math.random() * 10000),
                    amount: {
                        currency_code: "",
                        value: product?.price,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);

            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const paypalOrder = localStorage.getItem('paypalOrder')
            if (paypalOrder) {
                const cardOrder = [
                    {
                        name: details.purchase_units[0].description,
                        price: details.purchase_units[0].amount.value,
                        desc: details.purchase_units[0].description + 'Paid By Card',
                        id: Math.floor(Math.random() * 10000)
                    },
                    ...JSON.parse(localStorage.paypalOrder)
                ]
                localStorage.setItem('paypalOrder', JSON.stringify(cardOrder));
            } else {
                localStorage.setItem('paypalOrder', JSON.stringify([{
                    name: details.purchase_units[0].description,
                    price: details.purchase_units[0].amount.value,
                    desc: details.purchase_units[0].description + 'Paid By Card',
                    id: Math.floor(Math.random() * 10000)
                }]))
            }
            setSuccess(true);
            navigate('/')
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        alert("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return (
        <Grid container spacing={{ xs: 3, md: 10 }} columns={{ xs: 1, sm: 2, md: 6 }}>
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>

                <Grid item xs={1} sm={1} md={3}>
                    <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '65vh' }} raised >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="550"
                                width="50"
                                image={product?.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Book cricket Turf
                                </Typography>
                                <Typography variant="bod12" color="text.secondary">
                                    {product?.desc}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Price: {`€${product?.price}`}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={1} sm={1} md={3}>
                    <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer' }} raised >
                        <CardActionArea>
                            <CardContent>
                                <PayPalButtons
                                    style={{ layout: "vertical", position: 'absolute', marginLeft: '20%', marginTop: '20px' }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </PayPalScriptProvider>
        </Grid>
    );
}

export default Checkout
