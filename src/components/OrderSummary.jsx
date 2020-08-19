import React, { Component } from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

class OrderSummary extends Component {
  render() {
    let orderItems = this.props.order.items.edges.map(edge => edge.node);
    let discountCodes = this.props.order.discountCodes.edges.map(edge => edge.node);

    return (
      <Card>
        <Card.Header className="text-center">
          <strong>Order Summary</strong>
        </Card.Header>
        <ListGroup variant="flush">
          {orderItems.map(orderItem => (
            <ListGroup.Item key={orderItem.id} className="d-flex justify-content-between">
              <div>
                {orderItem.product.name} <Badge variant="primary" pill size="sm">{orderItem.quantity}</Badge>
              </div>
              <div className="font-weight-bold">{orderItem.cost} {orderItem.product.price.currency}</div>
            </ListGroup.Item>
          ))}
          {discountCodes.map(discountCode => (
            <ListGroup.Item key={discountCode.id} className="d-flex justify-content-between text-success font-weight-bold">
              <div>
                <h6 className="m-0">{discountCode.code}</h6>
                <small>{discountCode.store.name} products only</small>
              </div>
              <div>-{discountCode.value}%</div>
            </ListGroup.Item>
          ))}
          {/* <ListGroup.Item className="d-flex justify-content-between text-danger">
            <div>Shipping</div>
            <div>+10 USD</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between text-danger">
            <div>Tax</div>
            <div>+15 USD</div>
          </ListGroup.Item> */}
          <ListGroup.Item className="d-flex justify-content-between font-weight-bold">
            <div>Total</div>
            <div>{this.props.order.total} {orderItems[0].product.price.currency}</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default OrderSummary;