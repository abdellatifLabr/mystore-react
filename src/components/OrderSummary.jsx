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
              <div className="font-weight-bold">{orderItem.cost}</div>
            </ListGroup.Item>
          ))}
          {discountCodes.map(discountCode => (
            <ListGroup.Item key={discountCode.id} className="d-flex justify-content-between text-success font-weight-bold">
              <div>
                <h6 className="m-0">{discountCode.code}</h6>
              </div>
              <div>-{discountCode.value}%</div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="d-flex justify-content-between text-danger font-weight-bold">
            <div>Shipping</div>
            <div>{this.props.order.store.shipping}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between font-weight-bold">
            <div>Total</div>
            <div>{this.props.order.total}</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default OrderSummary;